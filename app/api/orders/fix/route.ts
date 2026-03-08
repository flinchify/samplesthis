import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";

// GET: list all orders (admin debug)
// POST: mark an order as paid (admin fix)
export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-admin-key");
  if (secret !== (process.env.ADMIN_SECRET || "flinchify-admin-2026")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const sql = getSql();
  const rows = await sql`SELECT id, email, app_url, status, stripe_session_id, created_at FROM orders ORDER BY id DESC LIMIT 20`;
  return NextResponse.json({ orders: rows });
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-admin-key");
  if (secret !== (process.env.ADMIN_SECRET || "flinchify-admin-2026")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { order_id } = await req.json();
  if (!order_id) return NextResponse.json({ error: "order_id required" }, { status: 400 });
  
  const sql = getSql();
  
  // If we have Stripe key, verify payment first
  if (process.env.STRIPE_SECRET_KEY) {
    const [order] = await sql`SELECT stripe_session_id FROM orders WHERE id = ${order_id}`;
    if (order?.stripe_session_id) {
      const stripe = (await import("stripe")).default;
      const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);
      const session = await stripeClient.checkout.sessions.retrieve(order.stripe_session_id);
      if (session.payment_status !== "paid") {
        return NextResponse.json({ error: "Payment not confirmed in Stripe", status: session.payment_status }, { status: 400 });
      }
    }
  }
  
  await sql`UPDATE orders SET status = 'paid' WHERE id = ${order_id}`;
  return NextResponse.json({ success: true, order_id });
}
