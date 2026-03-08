import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";

// GET: list all orders + auto-fix any with confirmed Stripe payments
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("key") || req.headers.get("x-admin-key");
  if (secret !== (process.env.ADMIN_SECRET || "flinchify-admin-2026")) {
    return NextResponse.json({ error: "Unauthorized", hint: "Pass ?key= or x-admin-key header" }, { status: 401 });
  }
  const sql = getSql();
  const orders = await sql`SELECT id, email, app_url, app_type, description, status, stripe_session_id, created_at FROM orders ORDER BY id DESC LIMIT 20`;
  
  // Auto-fix: check Stripe for any pending_payment orders
  const fixed: number[] = [];
  if (process.env.STRIPE_SECRET_KEY) {
    const stripe = (await import("stripe")).default;
    const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);
    
    for (const order of orders) {
      if (order.status === "pending_payment" && order.stripe_session_id) {
        try {
          const session = await stripeClient.checkout.sessions.retrieve(order.stripe_session_id);
          if (session.payment_status === "paid") {
            await sql`UPDATE orders SET status = 'paid' WHERE id = ${order.id}`;
            order.status = "paid";
            fixed.push(order.id);
          }
        } catch (e) {
          console.error(`Failed to check order ${order.id}:`, e);
        }
      }
    }
  }
  
  return NextResponse.json({ orders, fixed });
}

// POST: manually mark order as paid
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-admin-key");
  if (secret !== (process.env.ADMIN_SECRET || "flinchify-admin-2026")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { order_id } = await req.json();
  if (!order_id) return NextResponse.json({ error: "order_id required" }, { status: 400 });
  
  const sql = getSql();
  await sql`UPDATE orders SET status = 'paid' WHERE id = ${order_id}`;
  return NextResponse.json({ success: true, order_id });
}
