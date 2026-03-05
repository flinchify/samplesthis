import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";

const PLANS: Record<string, { testers: number; price: number; turnaround: string }> = {
  quick: { testers: 3, price: 2900, turnaround: "4 hours" },
  full: { testers: 5, price: 4900, turnaround: "4 hours" },
  deep: { testers: 10, price: 8900, turnaround: "6 hours" },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, company, app_url, app_type, description, target_audience, plan } = body;

    if (!email || !app_url || !plan) {
      return NextResponse.json({ error: "Email, app URL, and plan are required" }, { status: 400 });
    }

    const planConfig = PLANS[plan];
    if (!planConfig) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const sql = getSql();

    const rows = await sql`
      INSERT INTO orders (email, company, app_url, app_type, description, target_audience, plan, testers_count, price_cents, turnaround)
      VALUES (
        ${email.toLowerCase()},
        ${company || null},
        ${app_url},
        ${app_type || null},
        ${description || null},
        ${target_audience || null},
        ${plan},
        ${planConfig.testers},
        ${planConfig.price},
        ${planConfig.turnaround}
      )
      RETURNING id
    `;

    return NextResponse.json({
      success: true,
      orderId: rows[0].id,
      plan: planConfig,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Order failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

