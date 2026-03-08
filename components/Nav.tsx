"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "/explore", label: "Explore" },
  { href: "/submit", label: "Post a Test" },
  { href: "/how-it-works", label: "How it Works" },
  { href: "/pricing", label: "Pricing" },
];

interface UserInfo {
  type: "tester" | "business";
  name?: string;
  email?: string;
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  // Check auth on mount
  useEffect(() => {
    fetch("/api/testers/me").then(r => r.json()).then(d => {
      if (d.id) setUser({ type: "tester", name: d.name, email: d.email });
    }).catch(() => {});
  }, []);

  const signOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/";
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
      scrolled || open
        ? "bg-white/95 backdrop-blur-xl border-black/[0.04]"
        : "bg-transparent border-transparent"
    }`}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 h-[56px] sm:h-[60px] flex items-center justify-between">
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/logo.png" alt="Flinchify" width={32} height={32} className="sm:w-9 sm:h-9" priority />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href}
              className="px-3 py-2 rounded-lg text-[13px] font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link href="/dashboard" className="text-[13px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors font-medium">Dashboard</Link>
              <button onClick={signOut} className="btn btn-outline text-[13px] !py-2 !px-5">Sign out</button>
            </>
          ) : (
            <>
              <button onClick={() => {
                if (window.location.pathname === "/") {
                  window.dispatchEvent(new CustomEvent("open-auth", { detail: "login" }));
                } else {
                  window.location.href = "/?auth=login";
                }
              }} className="text-[13px] font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Log in</button>
              <button onClick={() => {
                if (window.location.pathname === "/") {
                  window.dispatchEvent(new CustomEvent("open-auth", { detail: "tester" }));
                } else {
                  window.location.href = "/?auth=tester";
                }
              }} className="btn btn-accent text-[13px] !py-2 !px-5">Sign up</button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 -mr-2 text-[var(--text)]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <><path d="M4 7h16" /><path d="M4 12h12" /><path d="M4 17h16" /></>}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-black/[0.04] animate-in">
          <div className="px-5 py-4 space-y-1">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                className="block py-3 text-[15px] text-[var(--text-2)] font-medium border-b border-black/[0.03] last:border-0">
                {link.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="btn btn-accent w-full">Dashboard</Link>
                  <button onClick={() => { setOpen(false); signOut(); }} className="btn btn-outline w-full">Sign out</button>
                </>
              ) : (
                <>
                  <button onClick={() => {
                    setOpen(false);
                    if (window.location.pathname === "/") {
                      window.dispatchEvent(new CustomEvent("open-auth", { detail: "login" }));
                    } else {
                      window.location.href = "/?auth=login";
                    }
                  }} className="btn btn-outline w-full">Log in</button>
                  <button onClick={() => {
                    setOpen(false);
                    if (window.location.pathname === "/") {
                      window.dispatchEvent(new CustomEvent("open-auth", { detail: "tester" }));
                    } else {
                      window.location.href = "/?auth=tester";
                    }
                  }} className="btn btn-accent w-full">Sign up</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
