import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { ensureTables } from "@/lib/schema";

export async function POST(req: NextRequest) {
  try {
    await ensureTables();
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
        ${email.toLowerCase()},
        ${company || null},
        ${app_url},
        ${app_type || null},
        ${description || null},
        ${target_audience || null},
        ${'custom'},
        ${count},
        ${totalCents},
        ${Math.round(perTester * 100)},
        ${'pending_payment'}
      )
      RETURNING id
    `;

    const orderId = rows[0].id;

    // If Stripe is configured, create checkout session
    if (process.env.STRIPE_SECRET_KEY) {
      const stripe = (await import("stripe")).default;
      const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";

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
        metadata: {
          order_id: String(orderId),
          testers_count: String(count),
          price_per_tester: String(perTester),
        },
      });

      // Save stripe session ID
      await sql`UPDATE orders SET stripe_session_id = ${session.id} WHERE id = ${orderId}`;

      return NextResponse.json({
        success: true,
        orderId,
        checkoutUrl: session.url,
      });
    }

    // No Stripe configured — just save the order
    return NextResponse.json({
      success: true,
      orderId,
      total: totalCents / 100,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Order failed";
    console.error("Order error:", e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
