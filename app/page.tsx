"use client";

import { useState } from "react";

const PLANS = [
  {
    name: "Quick Check",
    testers: 3,
    price: 29,
    turnaround: "4 hours",
    features: ["3 real human testers", "Screen recordings", "Bug report per tester", "4-hour turnaround"],
  },
  {
    name: "Full Test",
    testers: 5,
    price: 49,
    turnaround: "4 hours",
    popular: true,
    features: ["5 real human testers", "Screen recordings + audio", "Detailed bug reports", "UX friction notes", "4-hour turnaround", "Priority queue"],
  },
  {
    name: "Deep Dive",
    testers: 10,
    price: 89,
    turnaround: "6 hours",
    features: ["10 real human testers", "Screen recordings + audio", "Detailed bug reports", "UX friction + improvement notes", "Cross-device testing", "Summary report with priorities", "6-hour turnaround"],
  },
];

const STEPS = [
  { num: "01", title: "Paste your URL", desc: "Drop your app link and tell us what to test. Takes 30 seconds." },
  { num: "02", title: "We send real humans", desc: "Not bots. Not AI. Actual people using your app on real devices." },
  { num: "03", title: "Get results in hours", desc: "Screen recordings, bug reports, and honest feedback — delivered to your inbox." },
];

const FAQS = [
  { q: "Who are the testers?", a: "Real humans — a mix of tech-savvy early adopters and everyday users. We match testers to your app type (web, mobile, SaaS, etc.)." },
  { q: "What do I get back?", a: "Screen recordings (Loom), a structured bug report per tester (what broke, steps to reproduce, severity), and UX friction notes." },
  { q: "How fast is delivery?", a: "Quick Check and Full Test: 4 hours. Deep Dive: 6 hours. Clock starts when we confirm your order." },
  { q: "Can I test mobile apps?", a: "Yes. We test on both iOS and Android. Just share a TestFlight/Play Store link or a web URL." },
  { q: "What if testers find nothing?", a: "That's a win. You'll still get screen recordings showing real usage patterns, which is valuable for UX." },
  { q: "Do you offer recurring plans?", a: "Coming soon. For now, buy tests as you need them. Most devs test after each major deploy." },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6C5CE7] to-[#A29BFE] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <span className="text-[15px] font-semibold tracking-tight">ShipTest</span>
          </div>
          <a href="#pricing" className="text-[13px] font-medium bg-[#6C5CE7] text-white px-4 py-1.5 rounded-lg hover:bg-[#5A4BD1] transition-colors">
            Get testers
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] rounded-full px-3 py-1 mb-6 opacity-0 animate-reveal">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[12px] text-[var(--text-muted)]">Testers online now</span>
          </div>

          <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-bold leading-[1.05] tracking-tight mb-6 opacity-0 animate-reveal delay-100">
            Real humans test<br />
            your app in{" "}
            <span className="bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] bg-clip-text text-transparent">hours.</span>
          </h1>

          <p className="text-[16px] sm:text-[18px] text-[var(--text-muted)] max-w-xl mx-auto mb-8 leading-relaxed opacity-0 animate-reveal delay-200">
            You ship fast. Your testing should too. Get screen recordings,
            bug reports, and honest feedback from real people — not bots, not AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center opacity-0 animate-reveal delay-300">
            <a href="#pricing" className="inline-flex items-center justify-center bg-[#6C5CE7] hover:bg-[#5A4BD1] text-white font-medium text-[14px] px-7 py-3 rounded-xl transition-colors glow">
              Get testers — from $29
            </a>
            <a href="#how" className="inline-flex items-center justify-center border border-[var(--border)] text-[var(--text-muted)] hover:text-white font-medium text-[14px] px-7 py-3 rounded-xl hover:bg-white/[0.03] transition-all">
              How it works
            </a>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 mt-12 opacity-0 animate-reveal delay-400">
            {[
              { value: "4hr", label: "avg delivery" },
              { value: "500+", label: "apps tested" },
              { value: "4.9/5", label: "avg rating" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-[18px] font-semibold text-white">{s.value}</p>
                <p className="text-[11px] text-[var(--text-dim)]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logos / Built for */}
      <section className="pb-16 px-5">
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] text-[var(--text-dim)] text-center uppercase tracking-[0.2em] mb-6">Built for makers who ship with</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-60">
            {["Cursor", "Bolt", "Replit", "Vercel", "Lovable", "v0"].map((tool) => (
              <span key={tool} className="text-[14px] font-medium text-[var(--text-muted)]">{tool}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 md:py-28 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold text-[#6C5CE7] tracking-[0.25em] uppercase mb-3">How it works</p>
            <h2 className="text-2xl md:text-[2.5rem] font-bold tracking-tight">
              Three steps. Done.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {STEPS.map((step) => (
              <div key={step.num} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 card-hover">
                <div className="text-[11px] font-mono text-[#6C5CE7] mb-3">{step.num}</div>
                <h3 className="text-[16px] font-semibold mb-2">{step.title}</h3>
                <p className="text-[14px] text-[var(--text-muted)] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20 md:py-28 px-5 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold text-[#6C5CE7] tracking-[0.25em] uppercase mb-3">Deliverables</p>
            <h2 className="text-2xl md:text-[2.5rem] font-bold tracking-tight">
              What you get back
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: "M15 10l-4 4l6 6l4-16-18 7l4 2l2 6l3-4", title: "Screen recordings", desc: "Full session recordings on Loom. See exactly where users get confused, stuck, or frustrated." },
              { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", title: "Bug reports", desc: "Structured reports: what broke, steps to reproduce, screenshot, severity rating, device info." },
              { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", title: "UX friction notes", desc: "Plain-English notes on what felt awkward, confusing, or missing. The stuff you can't see yourself." },
              { icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", title: "Priority summary", desc: "A ranked list of issues by severity so you know exactly what to fix first. Ship the patch, not a rewrite." },
            ].map((item) => (
              <div key={item.title} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 card-hover">
                <div className="w-10 h-10 rounded-xl bg-[#6C5CE7]/10 flex items-center justify-center mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg>
                </div>
                <h3 className="text-[15px] font-semibold mb-1.5">{item.title}</h3>
                <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-28 px-5 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold text-[#6C5CE7] tracking-[0.25em] uppercase mb-3">Pricing</p>
            <h2 className="text-2xl md:text-[2.5rem] font-bold tracking-tight mb-3">
              Pay per test. No subscriptions.
            </h2>
            <p className="text-[15px] text-[var(--text-muted)] max-w-md mx-auto">
              Buy when you need it. Most devs test after each major deploy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-6 card-hover ${
                  plan.popular
                    ? "border-[#6C5CE7]/40 bg-[#6C5CE7]/[0.04] glow"
                    : "border-[var(--border)] bg-[var(--card)]"
                }`}
              >
                {plan.popular && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#6C5CE7] text-white text-[10px] font-semibold mb-4">Most popular</span>
                )}
                <h3 className="text-[17px] font-semibold mb-1">{plan.name}</h3>
                <p className="text-[13px] text-[var(--text-muted)] mb-4">
                  {plan.testers} testers / {plan.turnaround}
                </p>
                <p className="mb-5">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-[13px] text-[var(--text-dim)]"> one-time</span>
                </p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[13px] text-[var(--text-muted)]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" className="mt-0.5 shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full text-[13px] font-medium py-2.5 rounded-xl transition-colors ${
                  plan.popular
                    ? "bg-[#6C5CE7] text-white hover:bg-[#5A4BD1]"
                    : "bg-white/[0.05] text-white hover:bg-white/[0.08] border border-[var(--border)]"
                }`}>
                  Get {plan.testers} testers
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 px-5 border-t border-[var(--border)]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-[2.5rem] font-bold tracking-tight">Questions</h2>
          </div>

          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-[var(--border)] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-[14px] font-medium pr-4">{faq.q}</span>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className={`shrink-0 text-[var(--text-dim)] transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-5 border-t border-[var(--border)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-[2.5rem] font-bold tracking-tight mb-4">
            Ship with confidence.
          </h2>
          <p className="text-[15px] text-[var(--text-muted)] mb-8 max-w-md mx-auto">
            Join the waitlist for early access and founding member pricing.
          </p>
          {submitted ? (
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-6 py-3 rounded-xl text-[14px] font-medium">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              You&apos;re on the list. We&apos;ll be in touch.
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-[14px] text-white placeholder-[var(--text-dim)] focus:outline-none focus:border-[#6C5CE7]/40 focus:ring-1 focus:ring-[#6C5CE7]/20"
                required
              />
              <button
                type="submit"
                className="bg-[#6C5CE7] hover:bg-[#5A4BD1] text-white font-medium text-[14px] px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
              >
                Join waitlist
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 px-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#6C5CE7] to-[#A29BFE] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <span className="text-[13px] font-medium text-[var(--text-muted)]">ShipTest</span>
          </div>
          <p className="text-[12px] text-[var(--text-dim)]">&copy; 2026 ShipTest. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
