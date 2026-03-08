import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const orderId = req.nextUrl.searchParams.get("order");
    const sessionId = req.nextUrl.searchParams.get("session_id");

    if (!orderId || !sessionId || !process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    const stripe = (await import("stripe")).default;
    const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);

    // Verify the checkout session is actually paid
    const session = await stripeClient.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid" && session.metadata?.order_id === orderId) {
      const sql = getSql();
      await sql`UPDATE orders SET status = 'paid' WHERE id = ${parseInt(orderId)} AND status = 'pending_payment'`;
      return NextResponse.json({ verified: true, status: "paid" });
    }

    return NextResponse.json({ verified: false, payment_status: session.payment_status });
  } catch (e: unknown) {
    console.error("Verify error:", e);
    return NextResponse.json({ error: e instanceof Error ? e.message : "Verify failed" }, { status: 500 });
  }
}
