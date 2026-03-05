import { getSql } from "./db";

let migrated = false;

export async function ensureTables() {
  if (migrated) return;
  try {
    const sql = getSql();
    await sql`CREATE TABLE IF NOT EXISTS testers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      age_range VARCHAR(20),
      location VARCHAR(100),
      devices TEXT DEFAULT '[]',
      interests TEXT DEFAULT '[]',
      tech_comfort INTEGER DEFAULT 3,
      bio TEXT,
      status VARCHAR(20) DEFAULT 'pending',
      verified BOOLEAN DEFAULT false,
      tests_completed INTEGER DEFAULT 0,
      avg_rating NUMERIC(3,2) DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW()
    )`;
    await sql`CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      company VARCHAR(255),
      app_url TEXT NOT NULL,
      app_type VARCHAR(50),
      description TEXT,
      target_audience TEXT,
      plan VARCHAR(30) NOT NULL DEFAULT 'custom',
      testers_count INTEGER NOT NULL,
      price_cents INTEGER NOT NULL,
      price_per_tester_cents INTEGER,
      status VARCHAR(20) DEFAULT 'pending_payment',
      turnaround VARCHAR(20),
      stripe_session_id VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
    )`;
    // Add column if upgrading from old schema
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS price_per_tester_cents INTEGER`;
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending_payment'`;
    await sql`CREATE TABLE IF NOT EXISTS waitlist (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      type VARCHAR(20) DEFAULT 'business',
      created_at TIMESTAMP DEFAULT NOW()
    )`;
    migrated = true;
  } catch (e) {
    console.error("Auto-migrate failed:", e);
  }
}

export async function migrate() {
  migrated = false;
  await ensureTables();
  return { success: true, tables: ["testers", "orders", "waitlist"] };
}
