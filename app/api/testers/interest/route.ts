import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";

async function ensureTable() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS tester_interest (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const sql = getSql();
    await ensureTable();

    await sql`
      INSERT INTO tester_interest (email, name) VALUES (${email.toLowerCase().trim()}, ${name?.trim() || null})
      ON CONFLICT (email) DO UPDATE SET name = COALESCE(${name?.trim() || null}, tester_interest.name)
    `;

    const countRes = await sql`SELECT COUNT(*) FROM tester_interest`;
    const total = parseInt(countRes[0].count);

    return NextResponse.json({ success: true, total });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const sql = getSql();
    await ensureTable();
    const res = await sql`SELECT COUNT(*) FROM tester_interest`;
    return NextResponse.json({ total: parseInt(res[0].count) });
  } catch {
    return NextResponse.json({ total: 0 });
  }
}
