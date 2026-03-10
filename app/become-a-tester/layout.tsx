import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Tester | Get Paid to Test Websites and Apps",
  description: "Earn $5-20 per test. Get paid to test websites and apps from real companies. No experience needed — sign up free and start earning in minutes.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
