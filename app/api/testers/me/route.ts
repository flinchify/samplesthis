import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSql } from "@/lib/db";
import { generateToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("tester_token")?.value;
    const bizToken = cookieStore.get("business_token")?.value;
    const sql = getSql();

    let tester = null;

    // 1. Try tester_token first
    if (token) {
      const rows = await sql`SELECT * FROM testers WHERE auth_token = ${token} LIMIT 1`;
      tester = rows[0] || null;
    }

    // 2. If no tester found, check business_token and auto-migrate
    if (!tester && bizToken) {
      const [biz] = await sql`SELECT * FROM businesses WHERE auth_token = ${bizToken} AND verified = true`;
      if (biz) {
        // Check if tester account exists with this email
        const [existing] = await sql`SELECT * FROM testers WHERE email = ${biz.email}`;
        if (existing) {
          // Tester exists — just set cookie and return
          tester = existing;
          const res = buildResponse(tester);
          res.cookies.set("tester_token", existing.auth_token, {
            httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 14, path: "/"
          });
          return res;
        } else {
          // Auto-create tester account from business data
          const newToken = generateToken();
          const rows = await sql`
            INSERT INTO testers (name, email, auth_token, verified)
            VALUES (${biz.company || biz.email.split("@")[0]}, ${biz.email}, ${newToken}, true)
            RETURNING *
          `;
          tester = rows[0];
          const res = buildResponse(tester);
          res.cookies.set("tester_token", newToken, {
            httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 14, path: "/"
          });
          return res;
        }
      }
    }

    if (!tester) {
      return NextResponse.json({ authenticated: false, reason: token ? "token_not_found" : "no_cookie" }, { status: 401 });
    }

    return buildResponse(tester);
  } catch (e: unknown) {
    console.error("testers/me error:", e);
    return NextResponse.json({ authenticated: false, reason: "error", detail: e instanceof Error ? e.message : "unknown" }, { status: 500 });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildResponse(tester: any) {
  return NextResponse.json({
    authenticated: true,
    id: tester.id,
    name: tester.name,
    email: tester.email,
    tester: {
      id: tester.id,
      name: tester.name,
      email: tester.email,
      age_range: tester.age_range,
      location: tester.location,
      devices: tester.devices,
      interests: tester.interests,
      tech_comfort: tester.tech_comfort,
      bio: tester.bio,
      tests_completed: tester.tests_completed,
      total_earned_cents: tester.total_earned_cents,
      avg_rating: tester.avg_rating,
      stripe_onboarded: tester.stripe_onboarded,
      created_at: tester.created_at,
    },
  });
}
