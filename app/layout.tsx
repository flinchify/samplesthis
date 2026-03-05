import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ShipTest — Real humans test your app in hours",
  description: "Audience-matched human testers for indie devs and startups. Screen recordings, bug reports, and honest feedback — delivered in 4 hours. From $29.",
  metadataBase: new URL("https://shiptest.dev"),
  openGraph: {
    title: "ShipTest — Real humans test your app in hours",
    description: "Audience-matched testers. Screen recordings. Bug reports. 4 hours. From $29.",
    type: "website",
    siteName: "ShipTest",
  },
  twitter: { card: "summary_large_image" },
  keywords: ["user testing", "app testing", "beta testing", "QA testing", "human testers", "vibe coding", "indie dev", "screen recordings", "bug reports"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-[family-name:var(--font-inter)] antialiased">
        <div className="mesh-bg" />
        {children}
      </body>
    </html>
  );
}
