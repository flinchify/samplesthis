import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("tester_token")?.value;
  if (!token) return null;
  const sql = getSql();
  const [user] = await sql`SELECT * FROM testers WHERE auth_token = ${token} LIMIT 1`;
  return user || null;
}

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ authenticated: false }, { status: 401 });

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
        country: user.country,
        currency: user.currency || "usd",
        credit_cents: user.credit_cents || 0,
        linkedin: user.linkedin || "",
        twitter: user.twitter || "",
        github: user.github || "",
        portfolio: user.portfolio || "",
        created_at: user.created_at,
      },
    });
  } catch (e: unknown) {
    console.error("testers/me error:", e);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const body = await req.json();
    const sql = getSql();

    // Allowed fields
    const allowed: Record<string, { max: number; type: "string" | "number" | "json" }> = {
      name: { max: 100, type: "string" },
      bio: { max: 1000, type: "string" },
      location: { max: 100, type: "string" },
      age_range: { max: 20, type: "string" },
      country: { max: 100, type: "string" },
      tech_comfort: { max: 5, type: "number" },
      devices: { max: 2000, type: "json" },
      interests: { max: 2000, type: "json" },
      linkedin: { max: 500, type: "string" },
      twitter: { max: 100, type: "string" },
      github: { max: 100, type: "string" },
      portfolio: { max: 500, type: "string" },
    };

    const updates: Record<string, string | number> = {};
    for (const [key, config] of Object.entries(allowed)) {
      if (body[key] === undefined) continue;
      if (config.type === "number") {
        const n = Number(body[key]);
        if (isNaN(n) || n < 1 || n > config.max) continue;
        updates[key] = n;
      } else if (config.type === "json") {
        const val = typeof body[key] === "string" ? body[key] : JSON.stringify(body[key]);
        if (val.length > config.max) continue;
        updates[key] = val;
      } else {
        const val = String(body[key]).trim().slice(0, config.max);
        updates[key] = val;
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    // Update fields — keys from allowlist, use individual tagged template calls
    const id = user.id;
    if (updates.name !== undefined) await sql`UPDATE testers SET name = ${updates.name} WHERE id = ${id}`;
    if (updates.bio !== undefined) await sql`UPDATE testers SET bio = ${updates.bio} WHERE id = ${id}`;
    if (updates.location !== undefined) await sql`UPDATE testers SET location = ${updates.location} WHERE id = ${id}`;
    if (updates.age_range !== undefined) await sql`UPDATE testers SET age_range = ${updates.age_range} WHERE id = ${id}`;
    if (updates.country !== undefined) await sql`UPDATE testers SET country = ${updates.country} WHERE id = ${id}`;
    if (updates.tech_comfort !== undefined) await sql`UPDATE testers SET tech_comfort = ${updates.tech_comfort} WHERE id = ${id}`;
    if (updates.devices !== undefined) await sql`UPDATE testers SET devices = ${updates.devices} WHERE id = ${id}`;
    if (updates.interests !== undefined) await sql`UPDATE testers SET interests = ${updates.interests} WHERE id = ${id}`;
    if (updates.linkedin !== undefined) await sql`UPDATE testers SET linkedin = ${updates.linkedin} WHERE id = ${id}`;
    if (updates.twitter !== undefined) await sql`UPDATE testers SET twitter = ${updates.twitter} WHERE id = ${id}`;
    if (updates.github !== undefined) await sql`UPDATE testers SET github = ${updates.github} WHERE id = ${id}`;
    if (updates.portfolio !== undefined) await sql`UPDATE testers SET portfolio = ${updates.portfolio} WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    console.error("testers/me PATCH error:", e);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
