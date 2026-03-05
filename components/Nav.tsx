"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const MENUS = [
  {
    label: "Product",
    items: [
      { href: "/submit", title: "Post a Test Job", desc: "Submit your app and set your budget", icon: "M12 4v16m8-8H4" },
      { href: "/how-it-works", title: "How It Works", desc: "From submission to flinch report", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
      { href: "/pricing", title: "Budget Guide", desc: "Recommended budgets per tester", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    ],
  },
  {
    label: "Testers",
    items: [
      { href: "/become-a-tester", title: "Become a Tester", desc: "Sign up and start earning", icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" },
      { href: "/how-it-works#testers", title: "How Earning Works", desc: "Pick jobs, test, get paid same day", icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" },
    ],
  },
  {
    label: "Company",
    items: [
      { href: "/about", title: "About", desc: "Our story", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
      { href: "/contact", title: "Contact", desc: "Get in touch", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    ],
  },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState<string | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? "bg-white/80 backdrop-blur-2xl border-b border-black/[0.04] shadow-sm"
        : "bg-transparent"
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo mark */}
        <Link href="/" className="flex items-center group">
          <Image src="/logo.png" alt="Flinchify" width={44} height={44} className="transition-transform duration-300 group-hover:scale-105" priority />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {MENUS.map((menu) => (
            <div key={menu.label} className="dropdown relative">
              <button className="h text-[13px] font-medium text-[var(--text-muted)] hover:text-[var(--text)] px-4 py-2 transition-colors duration-200 flex items-center gap-1.5">
                {menu.label}
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-40 mt-px"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              <div className="dropdown-panel absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72">
                <div className="bg-white/95 backdrop-blur-2xl border border-black/[0.06] rounded-2xl p-2 shadow-2xl shadow-black/8">
                  {menu.items.map((item) => (
                    <Link key={item.href} href={item.href} className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-black/[0.02] transition-colors group/item">
                      <div className="w-9 h-9 rounded-[10px] grad-warm-subtle border border-orange-500/8 flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60"><path d={item.icon} /></svg>
                      </div>
                      <div>
                        <span className="h text-[13px] font-semibold text-[var(--text)] block">{item.title}</span>
                        <span className="text-[11px] text-[var(--text-dim)] mt-0.5 block">{item.desc}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Link href="/submit" className="btn btn-primary btn-pill text-[13px] !py-2.5 !px-6">Post a test</Link>
        </div>

        {/* Mobile */}
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 -mr-2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <><path d="M4 7h16" /><path d="M4 12h10" /><path d="M4 17h16" /></>}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-t border-black/[0.04]">
          <div className="px-6 py-6 space-y-1 max-h-[75vh] overflow-y-auto">
            {MENUS.map((menu) => (
              <div key={menu.label}>
                <button onClick={() => setMobileMenu(mobileMenu === menu.label ? null : menu.label)} className="w-full flex items-center justify-between py-3 h text-[15px] font-medium text-[var(--text-muted)]">
                  {menu.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 ${mobileMenu === menu.label ? "rotate-180" : ""}`}><polyline points="6 9 12 15 18 9" /></svg>
                </button>
                {mobileMenu === menu.label && (
                  <div className="pl-1 pb-2 space-y-1">
                    {menu.items.map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center gap-3 py-2.5 text-[14px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
                        <div className="w-8 h-8 rounded-lg grad-warm-subtle flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.5" className="opacity-50"><path d={item.icon} /></svg>
                        </div>
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-black/[0.04]">
              <Link href="/submit" onClick={() => setOpen(false)} className="btn btn-primary btn-pill w-full">Post a test</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
