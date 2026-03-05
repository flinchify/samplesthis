"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
      scrolled
        ? "bg-white/90 backdrop-blur-xl border-black/[0.04]"
        : "bg-transparent border-transparent"
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 h-[60px] flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Flinchify" width={36} height={36} priority />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/jobs" className="text-[13px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Browse jobs</Link>
          <Link href="/how-it-works" className="text-[13px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">How it works</Link>
          <Link href="/become-a-tester" className="text-[13px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Become a tester</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/submit" className="btn btn-accent text-[13px] !py-2 !px-5">Post a test</Link>
        </div>

        {/* Mobile */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 -mr-2 text-[var(--text-muted)]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <><path d="M4 7h16" /><path d="M4 12h12" /><path d="M4 17h16" /></>}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-black/[0.04]">
          <div className="px-6 py-5 space-y-4">
            <Link href="/jobs" onClick={() => setOpen(false)} className="block text-[15px] text-[var(--text-muted)]">Browse jobs</Link>
            <Link href="/how-it-works" onClick={() => setOpen(false)} className="block text-[15px] text-[var(--text-muted)]">How it works</Link>
            <Link href="/become-a-tester" onClick={() => setOpen(false)} className="block text-[15px] text-[var(--text-muted)]">Become a tester</Link>
            <div className="pt-3 border-t border-black/[0.04]">
              <Link href="/submit" onClick={() => setOpen(false)} className="btn btn-accent w-full">Post a test</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
