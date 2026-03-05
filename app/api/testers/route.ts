import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { ensureTables } from "@/lib/schema";

export async function POST(req: NextRequest) {
  try {
    await ensureTables();
    const body = await req.json();
    const { name, email, age_range, location, devices, interests, tech_comfort, bio } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const sql = getSql();

    const existing = await sql`SELECT id FROM testers WHERE email = ${email.toLowerCase()}`;
    if (existing.length > 0) {
      return NextResponse.json({ error: "You're already registered! We'll be in touch." }, { status: 409 });
    }

    const rows = await sql`
      INSERT INTO testers (name, email, age_range, location, devices, interests, tech_comfort, bio)
      VALUES (
        ${name},
        ${email.toLowerCase()},
        ${age_range || null},
        ${location || null},
        ${JSON.stringify(devices || [])},
        ${JSON.stringify(interests || [])},
        ${tech_comfort || 3},
        ${bio || null}
      )
      RETURNING id
    `;

    const countRows = await sql`SELECT COUNT(*)::int as count FROM testers`;

    return NextResponse.json({
      success: true,
      id: rows[0].id,
      totalTesters: countRows[0].count,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Registration failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
