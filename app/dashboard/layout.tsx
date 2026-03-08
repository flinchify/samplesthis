import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard — Flinchify",
  description: "Manage your tests, track earnings, view applicants, and post new jobs.",
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
