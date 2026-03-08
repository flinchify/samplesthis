import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("tester_token")?.value;
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const sql = getSql();
    const [user] = await sql`SELECT * FROM testers WHERE auth_token = ${token} LIMIT 1`;
    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      id: user.id,
      name: user.name,
      email: user.email,
      tester: {
        id: user.id,
        name: user.name,
        email: user.email,
        age_range: user.age_range,
        location: user.location,
        devices: user.devices,
        interests: user.interests,
        tech_comfort: user.tech_comfort,
        bio: user.bio,
        tests_completed: user.tests_completed,
        total_earned_cents: user.total_earned_cents,
        avg_rating: user.avg_rating,
        stripe_onboarded: user.stripe_onboarded,
        created_at: user.created_at,
      },
    });
  } catch (e: unknown) {
    console.error("testers/me error:", e);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
