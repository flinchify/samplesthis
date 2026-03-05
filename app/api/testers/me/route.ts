import { NextResponse } from "next/server";
import { getTester } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const tester = await getTester();
  if (!tester) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({
    authenticated: true,
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
      created_at: tester.created_at,
    },
  });
}
