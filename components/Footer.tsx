import Link from "next/link";
import Image from "next/image";

const COLS = [
  { title: "Product", links: [{ href: "/explore", label: "Explore" }, { href: "/submit", label: "Post a Test" }, { href: "/how-it-works", label: "How it Works" }, { href: "/pricing", label: "Pricing" }] },
  { title: "Company", links: [{ href: "/about", label: "About" }, { href: "/contact", label: "Contact" }, { href: "/privacy", label: "Privacy" }, { href: "/terms", label: "Terms" }] },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.04]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-10 sm:mb-12">
          <div className="col-span-2 sm:col-span-1">
            <Image src="/logo.png" alt="Flinchify" width={28} height={28} className="mb-3" />
            <p className="text-[12px] text-[var(--text-dim)] leading-[1.6]">Find the flinch before<br />your users do.</p>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <p className="text-[12px] font-semibold text-[var(--text)] mb-3">{col.title}</p>
              <div className="space-y-2">
                {col.links.map((l) => (
                  <Link key={l.href} href={l.href} className="block text-[13px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">{l.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-6 border-t border-black/[0.04]">
          <p className="text-[11px] text-[var(--text-dim)]">&copy; {new Date().getFullYear()} Flinchify. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://x.com/Flinchify" target="_blank" rel="noopener noreferrer" className="text-[var(--text-dim)] hover:text-[var(--text)] transition-colors" aria-label="X">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="https://www.instagram.com/flinchify" target="_blank" rel="noopener noreferrer" className="text-[var(--text-dim)] hover:text-[var(--text)] transition-colors" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/flinchify-undefined-60b4123b6/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-dim)] hover:text-[var(--text)] transition-colors" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <p className="text-[11px] text-[var(--text-dim)]">Made in Australia</p>
          </div>
        </div>
        <p className="text-[10px] text-[var(--text-dim)]/50 text-center mt-4 leading-relaxed max-w-xl mx-auto">
          Flinchify, the Flinchify logo, &quot;Find the flinch,&quot; and all associated marks, designs, and content
          are the exclusive property of Flinchify and may not be reproduced, distributed, or used without prior
          written permission. All third-party trademarks shown are property of their respective owners.
        </p>
      </div>
    </footer>
  );
}
