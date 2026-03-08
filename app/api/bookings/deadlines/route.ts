import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("tester_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const sql = getSql();
    const [user] = await sql`SELECT id, email FROM testers WHERE auth_token = ${token}`;
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const deadlines = await sql`
      SELECT b.id, b.order_id, b.scheduled_date, b.scheduled_time, b.timezone,
             b.duration_minutes, b.status, b.app_ready, b.app_ready_deadline,
             o.app_url, o.app_type,
             t.name as tester_name
      FROM bookings b
      JOIN orders o ON o.id = b.order_id
      LEFT JOIN testers t ON t.id = b.tester_id
      WHERE o.email = ${user.email}
        AND b.status IN ('pending', 'confirmed')
        AND b.scheduled_date >= CURRENT_DATE
      ORDER BY b.app_ready_deadline ASC
    `;

    return NextResponse.json({ deadlines });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}
