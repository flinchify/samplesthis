import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { ensureTables } from "@/lib/schema";

export async function GET() {
  try {
    await ensureTables();
    const sql = getSql();
    const rows = await sql`
      SELECT id, app_url, app_type, description, target_audience, testers_count, 
             price_per_tester_cents, status, created_at,
             (SELECT COUNT(*)::int FROM applications WHERE order_id = orders.id) as applications_count,
             (SELECT COUNT(*)::int FROM applications WHERE order_id = orders.id AND status = 'accepted') as accepted_count
      FROM orders 
      WHERE status = 'paid' 
      ORDER BY created_at DESC
    `;
    return NextResponse.json({ jobs: rows });
  } catch (e: unknown) {
    return NextResponse.json({ jobs: [], error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureTables();

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Payment system not configured. Please try again later." }, { status: 503 });
    }

    const body = await req.json();
    const { email, company, app_url, app_type, description, target_audience, testers_count, price_per_tester } = body;

    if (!email || !app_url) {
      return NextResponse.json({ error: "Email and app URL are required" }, { status: 400 });
    }

    const count = Math.max(1, Math.min(100, parseInt(testers_count) || 1));
    const perTester = Math.max(5, parseFloat(price_per_tester) || 5);
    const totalCents = Math.round(count * perTester * 100);

    const sql = getSql();

    const rows = await sql`
      INSERT INTO orders (email, company, app_url, app_type, description, target_audience, plan, testers_count, price_cents, price_per_tester_cents, status)
      VALUES (
        ${email.toLowerCase()}, ${company || null}, ${app_url}, ${app_type || null},
        ${description || null}, ${target_audience || null}, ${'custom'}, ${count},
        ${totalCents}, ${Math.round(perTester * 100)}, ${'pending_payment'}
      )
      RETURNING id
    `;

    const orderId = rows[0].id;
    const stripe = (await import("stripe")).default;
    const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
      || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: {
            name: `Flinchify — ${count} tester${count > 1 ? "s" : ""}`,
            description: `${count} human tester${count > 1 ? "s" : ""} at $${perTester}/each for ${app_url}`,
          },
          unit_amount: Math.round(perTester * 100),
        },
        quantity: count,
      }],
      mode: "payment",
      success_url: `${baseUrl}/submit/success?order=${orderId}`,
      cancel_url: `${baseUrl}/submit?cancelled=true`,
      customer_email: email.toLowerCase(),
      metadata: { order_id: String(orderId) },
    });

    await sql`UPDATE orders SET stripe_session_id = ${session.id} WHERE id = ${orderId}`;

    return NextResponse.json({ success: true, orderId, checkoutUrl: session.url });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Order failed";
    console.error("Order error:", e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
