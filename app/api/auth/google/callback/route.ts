import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { ensureTables } from "@/lib/schema";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const role = searchParams.get("state") || "tester";
  const error = searchParams.get("error");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin;

  if (error || !code) {
    return NextResponse.redirect(`${baseUrl}/?auth_error=cancelled`);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
  const redirectUri = `${baseUrl}/api/auth/google/callback`;

  try {
    // Exchange code for tokens
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

    // Get user info
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

    let redirectPath: string;
    const res = NextResponse.redirect(`${baseUrl}/auth-redirect`);

    if (role === "business") {
      // Upsert business
      const existing = await sql`SELECT id FROM businesses WHERE email = ${email}`;
      if (existing.length > 0) {
        await sql`UPDATE businesses SET verified = true, auth_token = ${token}, company = COALESCE(company, ${name}) WHERE email = ${email}`;
      } else {
        await sql`INSERT INTO businesses (email, company, verified, auth_token) VALUES (${email}, ${name}, true, ${token})`;
      }
      res.cookies.set("business_token", token, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 365, path: "/" });
      redirectPath = "/submit";
    } else {
      // Upsert tester
      const existing = await sql`SELECT id FROM testers WHERE email = ${email}`;
      if (existing.length > 0) {
        await sql`UPDATE testers SET auth_token = ${token} WHERE email = ${email}`;
      } else {
        await sql`INSERT INTO testers (name, email, auth_token, devices, interests, other_links) VALUES (${name}, ${email}, ${token}, '[]', '[]', '[]')`;
      }
      res.cookies.set("tester_token", token, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 365, path: "/" });
      redirectPath = "/dashboard";
    }

    // Set redirect path cookie so client-side page can read it
    res.cookies.set("auth_redirect", redirectPath, { maxAge: 60, path: "/" });
    return res;
  } catch (e) {
    console.error("Google OAuth error:", e);
    return NextResponse.redirect(`${baseUrl}/?auth_error=failed`);
  }
}
