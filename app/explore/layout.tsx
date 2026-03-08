import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Explore Test Jobs — Flinchify",
  description: "Browse open test jobs and get paid to find UX friction. $5-20+ per test, same-day payouts via Stripe.",
  openGraph: { title: "Explore Test Jobs — Flinchify", description: "Get paid to test real apps. Browse jobs, give feedback, earn money." },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
