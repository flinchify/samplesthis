import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET() {
  const sk = process.env.STRIPE_SECRET_KEY;
  if (!sk) return NextResponse.json({ error: "No STRIPE_SECRET_KEY set" });

  const keyPrefix = sk.substring(0, 7) + "..." + sk.substring(sk.length - 4);
  const isLive = sk.startsWith("sk_live_");
  const isTest = sk.startsWith("sk_test_");

  try {
    const stripe = new Stripe(sk);
    const account = await stripe.accounts.retrieve();
    
    return NextResponse.json({
      keyPrefix,
      mode: isLive ? "LIVE" : isTest ? "TEST" : "UNKNOWN",
      accountId: account.id,
      accountName: account.settings?.dashboard?.display_name || account.business_profile?.name || "unnamed",
      country: account.country,
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
      connectEnabled: "Check dashboard.stripe.com/connect/accounts/overview",
    });
  } catch (e: unknown) {
    return NextResponse.json({ 
      keyPrefix, 
      mode: isLive ? "LIVE" : isTest ? "TEST" : "UNKNOWN",
      error: e instanceof Error ? e.message : "Failed to connect to Stripe" 
    });
  }
}
