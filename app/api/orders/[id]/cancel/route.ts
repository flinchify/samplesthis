import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";

// POST: cancel a job — no refund, credit added to account
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const orderId = parseInt(id);
    if (!orderId) return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });

    const token = req.cookies.get("tester_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const sql = getSql();
    const [user] = await sql`SELECT id, email FROM testers WHERE auth_token = ${token}`;
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const [order] = await sql`SELECT id, email, status, price_cents FROM orders WHERE id = ${orderId}`;
    if (!order || order.email !== user.email) return NextResponse.json({ error: "Not your job" }, { status: 403 });

    if (order.status !== "paid") {
      return NextResponse.json({ error: "Can only cancel active jobs" }, { status: 400 });
    }

    // Check if any accepted testers have already submitted work
    const [{ submitted }] = await sql`
      SELECT COUNT(*)::int as submitted FROM applications 
      WHERE order_id = ${orderId} AND status = 'accepted' AND submitted_at IS NOT NULL
    `;
    if (submitted > 0) {
      return NextResponse.json({ error: "Cannot cancel — testers have already submitted work" }, { status: 400 });
    }

    // Cancel the order, add credit to user account
    await sql`UPDATE orders SET status = 'cancelled' WHERE id = ${orderId}`;
    
    // Add credit (stored in cents on the testers table)
    await sql`UPDATE testers SET credit_cents = COALESCE(credit_cents, 0) + ${order.price_cents} WHERE id = ${user.id}`;

    // Reject all pending/accepted applications
    await sql`UPDATE applications SET status = 'rejected' WHERE order_id = ${orderId} AND status IN ('pending', 'accepted')`;

    return NextResponse.json({ 
      success: true, 
      credit_cents: order.price_cents,
      message: `Job cancelled. $${(order.price_cents / 100).toFixed(2)} credit added to your account.`
    });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}
