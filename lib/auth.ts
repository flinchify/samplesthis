import { cookies } from "next/headers";
import { getSql } from "./db";
import crypto from "crypto";

export function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function getTester() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("tester_token")?.value;
    if (!token) return null;

    const sql = getSql();
    const rows = await sql`SELECT * FROM testers WHERE auth_token = ${token} LIMIT 1`;
    return rows[0] || null;
  } catch {
    return null;
  }
}
