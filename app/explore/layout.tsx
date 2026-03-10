import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Test Jobs | Get Paid to Test Apps on Flinchify",
  description: "Browse open usability testing jobs. Apply to test real apps and websites, give honest feedback, and get paid. New test jobs posted daily.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
