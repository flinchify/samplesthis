import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";

export async function GET(req: NextRequest) {
  const sql = getSql();

  const token = req.cookies.get("business_token")?.value;
  if (!token) return NextResponse.json({ authenticated: false });

  const [biz] = await sql`SELECT id, email, company, verified, created_at FROM businesses WHERE auth_token = ${token} AND verified = true`;
  if (!biz) return NextResponse.json({ authenticated: false });

  return NextResponse.json({ authenticated: true, business: biz });
}
