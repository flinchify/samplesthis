import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { generateToken } from "@/lib/auth";

// One-time migration: move all business accounts into testers table
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("key") || req.headers.get("x-admin-key");
  if (secret !== (process.env.ADMIN_SECRET || "flinchify-admin-2026")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getSql();
  const businesses = await sql`SELECT * FROM businesses WHERE verified = true`;
  
  const migrated: string[] = [];
  const skipped: string[] = [];

  for (const biz of businesses) {
    const [existing] = await sql`SELECT id FROM testers WHERE email = ${biz.email}`;
    if (existing) {
      skipped.push(biz.email);
      continue;
    }
    
    const token = generateToken();
    await sql`
      INSERT INTO testers (name, email, auth_token, verified)
      VALUES (${biz.company || biz.email.split("@")[0]}, ${biz.email}, ${token}, true)
    `;
    migrated.push(biz.email);
  }

  return NextResponse.json({ migrated, skipped, total: businesses.length });
}
