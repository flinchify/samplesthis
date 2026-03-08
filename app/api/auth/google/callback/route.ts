import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { ensureTables } from "@/lib/schema";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin;

  if (error || !code) {
    return NextResponse.redirect(`${baseUrl}/?auth_error=cancelled`);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
  const redirectUri = `${baseUrl}/api/auth/google/callback`;

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) throw new Error(tokenData.error_description || "Token exchange failed");

    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const userInfo = await userRes.json();

    if (!userInfo.email) throw new Error("No email from Google");

    await ensureTables();
    const sql = getSql();
    const email = userInfo.email.toLowerCase();
    const name = userInfo.name || email.split("@")[0];
    const token = crypto.randomBytes(32).toString("hex");

    // One account — always goes to testers table
    const existing = await sql`SELECT id FROM testers WHERE email = ${email}`;
    if (existing.length > 0) {
      await sql`UPDATE testers SET auth_token = ${token} WHERE email = ${email}`;
    } else {
      await sql`INSERT INTO testers (name, email, auth_token, devices, interests, other_links) VALUES (${name}, ${email}, ${token}, '[]', '[]', '[]')`;
    }

    const res = NextResponse.redirect(`${baseUrl}/auth-redirect`);
    res.cookies.set("tester_token", token, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 14, path: "/" });
    res.cookies.set("auth_redirect", "/dashboard", { maxAge: 60, path: "/" });
    return res;
  } catch (e) {
    console.error("Google OAuth error:", e);
    return NextResponse.redirect(`${baseUrl}/?auth_error=failed`);
  }
}
