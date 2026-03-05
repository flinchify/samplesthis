import { NextResponse } from "next/server";
import { ensureTables } from "@/lib/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureTables();
    const { getSql } = await import("@/lib/db");
    const sql = getSql();
    const rows = await sql`SELECT COUNT(*)::int as count FROM testers`;
    return NextResponse.json({ count: rows[0]?.count || 0, live: true });
  } catch {
    return NextResponse.json({ count: 0, live: false });
  }
}
