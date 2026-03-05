"use client";

import Link from "next/link";
import { useState } from "react";
import LiveCounter from "./LiveCounter";

const LINKS = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/become-a-tester", label: "Become a tester" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C5CE7] to-[#A29BFE] flex items-center justify-center shadow-lg shadow-[#6C5CE7]/20">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <span className="text-[16px] font-semibold tracking-tight">ShipTest</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-[13px] text-[var(--text-muted)] hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
          <LiveCounter />
          <Link href="/submit" className="btn btn-primary text-[13px] px-5 py-2">
            Get testers
          </Link>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-[var(--text-muted)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl">
          <div className="px-5 py-4 space-y-3">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-[14px] text-[var(--text-muted)] hover:text-white py-1">
                {l.label}
              </Link>
            ))}
            <div className="pt-2">
              <LiveCounter />
            </div>
            <Link href="/submit" onClick={() => setOpen(false)} className="btn btn-primary w-full text-[13px] mt-2">
              Get testers
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
