import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { ensureTables } from "@/lib/schema";
import Stripe from "stripe";

// Tester submits their test results → auto-payout
export async function POST(req: NextRequest) {
  await ensureTables();
  const sql = getSql();

  // Auth: tester cookie
  const token = req.cookies.get("tester_token")?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const [tester] = await sql`SELECT * FROM testers WHERE auth_token = ${token}`;
  if (!tester) return NextResponse.json({ error: "Tester not found" }, { status: 404 });

  // Require Stripe Connect to submit results
  if (!tester.stripe_onboarded || !tester.stripe_account_id) {
    return NextResponse.json({ error: "Set up payouts before submitting results. Go to Dashboard → Payouts to connect your bank account." }, { status: 400 });
  }

  const { application_id, feedback, screen_recording_url, screenshots } = await req.json();
  if (!application_id) return NextResponse.json({ error: "application_id required" }, { status: 400 });
  if (!feedback || feedback.trim().length < 20) return NextResponse.json({ error: "Feedback must be at least 20 characters" }, { status: 400 });

  // Verify this application belongs to this tester and is accepted
  const [app] = await sql`
    SELECT a.*, o.price_per_tester_cents, o.app_url
    FROM applications a
    JOIN orders o ON a.order_id = o.id
    WHERE a.id = ${application_id} AND a.tester_id = ${tester.id}
  `;

  if (!app) return NextResponse.json({ error: "Application not found" }, { status: 404 });
  if (app.status !== "accepted") return NextResponse.json({ error: `Cannot submit: status is ${app.status}` }, { status: 400 });
  if (app.payout_transfer_id) return NextResponse.json({ error: "Already submitted and paid" }, { status: 400 });
  
  // Check deadline
  if (app.deadline_at && new Date(app.deadline_at) < new Date()) {
    await sql`UPDATE applications SET status = 'expired' WHERE id = ${application_id}`;
    return NextResponse.json({ error: "Deadline has passed. The spot has been reopened." }, { status: 400 });
  }

  // Save the submission
  await sql`
    UPDATE applications SET 
      feedback = ${feedback},
      screen_recording_url = ${screen_recording_url || null},
      screenshots = ${JSON.stringify(screenshots || [])},
      submitted_at = NOW(),
      status = 'submitted'
    WHERE id = ${application_id}
  `;

  // Auto-payout via Stripe Connect
  const sk = process.env.STRIPE_SECRET_KEY;
  let payoutResult = null;

  if (sk && tester.stripe_account_id && tester.stripe_onboarded) {
    try {
      const stripe = new Stripe(sk);
      const businessPaid = app.price_per_tester_cents || 0;
      const platformFee = Math.round(businessPaid * 0.20);
      const testerPayout = businessPaid - platformFee;

      if (testerPayout > 0) {
        const transfer = await stripe.transfers.create({
          amount: testerPayout,
          currency: "aud",
          destination: tester.stripe_account_id,
          description: `Flinchify: ${tester.name} - ${app.app_url}`,
          metadata: {
            application_id: String(application_id),
            tester_id: String(tester.id),
            order_id: String(app.order_id),
          },
        });

        await sql`
          UPDATE applications SET 
            status = 'completed',
            payout_cents = ${testerPayout},
            payout_transfer_id = ${transfer.id},
            completed_at = NOW()
          WHERE id = ${application_id}
        `;

        await sql`
          UPDATE testers SET 
            total_earned_cents = total_earned_cents + ${testerPayout},
            tests_completed = tests_completed + 1
          WHERE id = ${tester.id}
        `;

        payoutResult = {
          paid: true,
          amount: testerPayout,
          transfer_id: transfer.id,
        };
      }
    } catch (e: unknown) {
      // Payout failed — mark as submitted but not paid, admin can retry
      const msg = e instanceof Error ? e.message : "Unknown error";
      await sql`
        UPDATE applications SET 
          status = 'submitted',
          payout_error = ${msg}
        WHERE id = ${application_id}
      `;
      payoutResult = { paid: false, error: msg };
    }
  } else {
    // No Stripe Connect — mark submitted, payout pending
    payoutResult = { 
      paid: false, 
      error: !sk ? "Stripe not configured" : "Set up payouts in your dashboard to get paid automatically"
    };
  }

  return NextResponse.json({
    success: true,
    payout: payoutResult,
  });
}
