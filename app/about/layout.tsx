import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About — Flinchify",
  description: "Flinchify is a human testing marketplace connecting product teams with real users who find UX friction before launch.",
  openGraph: { title: "About — Flinchify", description: "The story behind Flinchify — making UX testing fast, affordable, and human." },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
