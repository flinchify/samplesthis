import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET || !sig) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 400 });
    }

    const stripe = (await import("stripe")).default;
    const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);

    const event = stripeClient.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const orderId = session.metadata?.order_id;

      if (orderId) {
        const sql = getSql();
        await sql`UPDATE orders SET status = 'paid' WHERE id = ${parseInt(orderId)}`;
      }
    }

    return NextResponse.json({ received: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Webhook error";
    console.error("Stripe webhook error:", e);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
