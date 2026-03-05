import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ShipTest — Real humans test your app in hours, not weeks",
  description: "Ship with confidence. 5 real testers, screen recordings, bug reports, and honest feedback — delivered in 4 hours. Built for indie devs and vibe coders.",
  metadataBase: new URL("https://shiptest.dev"),
  openGraph: {
    title: "ShipTest — Real humans test your app in hours",
    description: "5 real testers. Screen recordings. Bug reports. 4 hours. From $49.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
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
