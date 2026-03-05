import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { getSql } = await import("@/lib/db");
    const sql = getSql();
    const rows = await sql`SELECT COUNT(*)::int as count FROM testers`;
    return NextResponse.json({ count: rows[0]?.count || 0, live: true });
  } catch {
    // DB not configured yet — return 0
    return NextResponse.json({ count: 0, live: false });
  }
}
