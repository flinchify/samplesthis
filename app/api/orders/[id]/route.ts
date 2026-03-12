import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { ensureTables } from "@/lib/schema";

// GET: public job detail
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ensureTables();
    const { id } = await params;
    const orderId = parseInt(id);
    if (!orderId) return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });

    const sql = getSql();
    const [job] = await sql`
      SELECT o.id, o.app_url, o.app_type, o.description, o.target_audience, o.testers_count,
             o.price_per_tester_cents, o.status, o.created_at, o.time_limit_hours,
             o.test_mode, o.tasks, o.private_listing,
             CASE WHEN o.private_listing = true THEN NULL ELSE t.name END as poster_name,
             CASE WHEN o.private_listing = true THEN NULL ELSE t.id END as poster_id,
             CASE WHEN o.private_listing = true THEN NULL ELSE t.bio END as poster_bio,
             CASE WHEN o.private_listing = true THEN NULL ELSE t.avg_rating END as poster_rating,
             CASE WHEN o.private_listing = true THEN NULL ELSE t.location END as poster_location,
             CASE WHEN o.private_listing = true THEN NULL ELSE t.linkedin END as poster_linkedin,
             CASE WHEN o.private_listing = true THEN NULL ELSE t.twitter END as poster_twitter,
             CASE WHEN o.private_listing = true THEN NULL ELSE t.github END as poster_github,
             (SELECT COUNT(*)::int FROM applications WHERE order_id = o.id) as applications_count,
             (SELECT COUNT(*)::int FROM applications WHERE order_id = o.id AND status = 'accepted') as accepted_count
      FROM orders o
      LEFT JOIN testers t ON t.email = o.email
      WHERE o.id = ${orderId} AND o.status = 'paid'
    `;

    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
    return NextResponse.json({ job });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}
