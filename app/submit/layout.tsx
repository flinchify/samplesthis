import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Post a Test Job — Flinchify",
  description: "Get real humans to test your app. Set your budget, define tasks, get screen recordings and bug reports in hours. No subscriptions.",
  openGraph: { title: "Post a Test Job — Flinchify", description: "Pay per tester. Get UX feedback in hours. No subscriptions." },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
