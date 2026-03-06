import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { ensureTables } from "@/lib/schema";

export async function GET(req: NextRequest) {
  await ensureTables();
  const sql = getSql();

  const token = req.cookies.get("tester_token")?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const [tester] = await sql`SELECT id FROM testers WHERE auth_token = ${token}`;
  if (!tester) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const apps = await sql`
    SELECT a.*, o.app_url, o.app_type, o.description as job_description, o.price_per_tester_cents
    FROM applications a
    JOIN orders o ON a.order_id = o.id
    WHERE a.tester_id = ${tester.id}
    ORDER BY a.created_at DESC
  `;

  return NextResponse.json({ applications: apps });
}
