import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post a Test Job | Hire Real Users to Test Your App",
  description: "Post a usability test job and get real human feedback on your app. Set your budget, describe your tasks, and get detailed UX reports in hours.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
