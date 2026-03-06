import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });
  // Clear both auth cookies (server-side, works with httpOnly)
  res.cookies.set("tester_token", "", { httpOnly: true, secure: true, sameSite: "lax", maxAge: 0, path: "/" });
  res.cookies.set("business_token", "", { httpOnly: true, secure: true, sameSite: "lax", maxAge: 0, path: "/" });
  return res;
}
