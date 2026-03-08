import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "How it Works — Flinchify",
  description: "Post your app URL, set your budget, get matched with real testers. Screen recordings, bug reports, and a Flinch Score in hours.",
  openGraph: { title: "How it Works — Flinchify", description: "Three steps to real human UX feedback. Fast, affordable, actionable." },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
