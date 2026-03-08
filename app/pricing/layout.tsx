import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Pricing — Flinchify",
  description: "No subscriptions. No hidden fees. Pay per tester from $5. You set the budget, number of testers, and tasks. That's your total.",
  openGraph: { title: "Pricing — Flinchify", description: "Transparent pricing. Pay per tester from $5. No subscriptions." },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
