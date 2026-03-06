import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { ensureTables } from "@/lib/schema";
import Stripe from "stripe";

// Admin-only: trigger payout for a completed application
const ADMIN_KEY = process.env.ADMIN_SECRET || "flinchify-admin-2026";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-admin-key");
  if (auth !== ADMIN_KEY) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sk = process.env.STRIPE_SECRET_KEY;
  if (!sk) return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });

  await ensureTables();
  const sql = getSql();
  const stripe = new Stripe(sk);

  const { application_id } = await req.json();
  if (!application_id) return NextResponse.json({ error: "application_id required" }, { status: 400 });

  // Get application with tester and order info
  const [app] = await sql`
    SELECT a.*, t.stripe_account_id, t.stripe_onboarded, t.name as tester_name,
      o.price_per_tester_cents, o.app_url
    FROM applications a
    JOIN testers t ON a.tester_id = t.id
    JOIN orders o ON a.order_id = o.id
    WHERE a.id = ${application_id}
  `;

  if (!app) return NextResponse.json({ error: "Application not found" }, { status: 404 });
  if (app.payout_transfer_id) return NextResponse.json({ error: "Already paid out", transfer_id: app.payout_transfer_id }, { status: 400 });
  if (!app.stripe_account_id || !app.stripe_onboarded) {
    return NextResponse.json({ error: "Tester has not completed Stripe onboarding" }, { status: 400 });
  }

  // Calculate payout: price_per_tester is what the business paid
  // Platform takes 20% fee, tester gets 80%
  const businessPaid = app.price_per_tester_cents || 0;
  const platformFee = Math.round(businessPaid * 0.20);
  const testerPayout = businessPaid - platformFee;

  if (testerPayout <= 0) {
    return NextResponse.json({ error: "Payout amount too low" }, { status: 400 });
  }

  try {
    // Transfer funds to tester's connected account
    const transfer = await stripe.transfers.create({
      amount: testerPayout,
      currency: "aud",
      destination: app.stripe_account_id,
      description: `Flinchify payout: ${app.tester_name} - ${app.app_url}`,
      metadata: {
        application_id: String(application_id),
        tester_id: String(app.tester_id),
        order_id: String(app.order_id),
      },
    });

    // Update application with payout info
    await sql`
      UPDATE applications 
      SET status = 'completed', payout_cents = ${testerPayout}, payout_transfer_id = ${transfer.id}, completed_at = NOW()
      WHERE id = ${application_id}
    `;

    // Update tester earnings
    await sql`
      UPDATE testers 
      SET total_earned_cents = total_earned_cents + ${testerPayout}, tests_completed = tests_completed + 1
      WHERE id = ${app.tester_id}
    `;

    return NextResponse.json({
      success: true,
      transfer_id: transfer.id,
      payout_cents: testerPayout,
      platform_fee_cents: platformFee,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: `Stripe transfer failed: ${msg}` }, { status: 500 });
  }
}
