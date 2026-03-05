import { NextResponse } from "next/server";
import { migrate } from "@/lib/schema";

export async function GET() {
  try {
    const result = await migrate();
    return NextResponse.json(result);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Migration failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
