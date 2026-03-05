"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LiveCounter from "@/components/LiveCounter";

const AUDIENCE_TYPES = [
  "Gen Z mobile users", "SaaS power users", "Non-tech everyday people",
  "Crypto / Web3 natives", "Gamers", "Parents & families",
  "Small business owners", "Students", "Seniors (60+)", "Fitness enthusiasts",
];

const TOOLS = ["Cursor", "Bolt", "Replit", "Lovable", "v0", "Windsurf", "Claude", "GPT"];

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-16">

        {/* ─── Hero ─── */}
        <section className="pt-20 pb-16 md:pt-28 md:pb-24 px-5">
          <div className="max-w-4xl mx-auto text-center">
            <div className="reveal-up mb-6">
              <LiveCounter size="lg" />
            </div>

            <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-bold leading-[1.05] tracking-tight mb-6 reveal-up d-1">
              Your real customers.<br />
              Testing your app.{" "}
              <span className="gradient-text">Today.</span>
            </h1>

            <p className="text-[16px] sm:text-[18px] text-[var(--text-muted)] max-w-2xl mx-auto mb-8 leading-relaxed reveal-up d-2">
              Not QA professionals. Not bots. Actual humans who match your target audience —
              testing your app on real devices and telling you exactly what&apos;s broken.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center reveal-up d-3">
              <Link href="/submit" className="btn btn-primary btn-lg glow">
                Get testers now — from $29
              </Link>
              <Link href="/become-a-tester" className="btn btn-secondary btn-lg">
                Earn money testing apps
              </Link>
            </div>

            <p className="text-[12px] text-[var(--text-dim)] mt-4 reveal-up d-4">
              No subscription. Pay per test. Results in 4 hours.
            </p>
          </div>
        </section>

        {/* ─── Two sides ─── */}
        <section className="pb-20 px-5">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5">
            {/* Business side */}
            <Link href="/submit" className="card p-8 group">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">I need testers</h2>
              <p className="text-[14px] text-[var(--text-muted)] leading-relaxed mb-4">
                Submit your app URL, describe your target user, and we&apos;ll match you
                with real humans who fit your audience. Screen recordings and bug reports
                delivered in hours.
              </p>
              <span className="text-[13px] text-[var(--accent)] font-medium group-hover:underline">
                Submit your app &rarr;
              </span>
            </Link>

            {/* Tester side */}
            <Link href="/become-a-tester" className="card p-8 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">I want to test apps</h2>
              <p className="text-[14px] text-[var(--text-muted)] leading-relaxed mb-4">
                Get paid to try new apps and give honest feedback. No experience needed —
                we match you to apps based on who you are, not what you know.
                Takes 60 seconds to sign up.
              </p>
              <span className="text-[13px] text-emerald-400 font-medium group-hover:underline">
                Sign up as a tester &rarr;
              </span>
            </Link>
          </div>
        </section>

        {/* ─── Built for vibe coders ─── */}
        <section className="py-16 px-5 border-t border-[var(--border)]">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[11px] text-[var(--text-dim)] uppercase tracking-[0.2em] mb-5">Built for makers who ship with</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {TOOLS.map((t) => (
                <span key={t} className="bg-[var(--card)] border border-[var(--border)] rounded-full px-4 py-2 text-[13px] font-medium text-[var(--text-muted)]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Audience matching ─── */}
        <section className="py-20 md:py-28 px-5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[11px] font-semibold text-[var(--accent)] tracking-[0.25em] uppercase mb-3">Audience matching</p>
              <h2 className="text-2xl md:text-[2.5rem] font-bold tracking-tight mb-3">
                Test with your actual users.
              </h2>
              <p className="text-[15px] text-[var(--text-muted)] max-w-lg mx-auto">
                Tell us who your app is for. We match testers from our pool who fit that profile.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {AUDIENCE_TYPES.map((a) => (
                <span key={a} className="bg-[var(--card)] border border-[var(--border)] rounded-full px-4 py-2 text-[13px] text-[var(--text-muted)] hover:border-[var(--border-hover)] hover:text-white transition-all cursor-default">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── How it works (both sides) ─── */}
        <section className="py-20 md:py-28 px-5 border-t border-[var(--border)]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[11px] font-semibold text-[var(--accent)] tracking-[0.25em] uppercase mb-3">How it works</p>
              <h2 className="text-2xl md:text-[2.5rem] font-bold tracking-tight">
                Simple for everyone.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Business flow */}
              <div>
                <h3 className="text-[13px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-6">For businesses</h3>
                <div className="space-y-6">
                  {[
                    { num: "1", title: "Paste your app URL", desc: "Drop your link and tell us what to focus on. 30 seconds." },
                    { num: "2", title: "Describe your ideal tester", desc: "\"Women 25-40 who shop online\" or \"Crypto traders\" — we match from our pool." },
                    { num: "3", title: "Get matched results", desc: "Screen recordings, bug reports, and UX feedback from real users in your target demo." },
                  ].map((s) => (
                    <div key={s.num} className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center shrink-0 text-[13px] font-bold text-[var(--accent)]">{s.num}</div>
                      <div>
                        <h4 className="text-[15px] font-semibold mb-1">{s.title}</h4>
                        <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tester flow */}
              <div>
                <h3 className="text-[13px] font-semibold text-emerald-400 uppercase tracking-wider mb-6">For testers</h3>
                <div className="space-y-6">
                  {[
                    { num: "1", title: "Tell us about yourself", desc: "Age, interests, devices you use. That's it. No tests, no interviews." },
                    { num: "2", title: "Get matched to apps", desc: "We send you apps that match your profile. Use it naturally for 15 minutes." },
                    { num: "3", title: "Give feedback, get paid", desc: "Record your screen, note what's broken or confusing. $5-15 per test, paid same day." },
                  ].map((s) => (
                    <div key={s.num} className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 text-[13px] font-bold text-emerald-400">{s.num}</div>
                      <div>
                        <h4 className="text-[15px] font-semibold mb-1">{s.title}</h4>
                        <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── What you get ─── */}
        <section className="py-20 md:py-28 px-5 border-t border-[var(--border)]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[11px] font-semibold text-[var(--accent)] tracking-[0.25em] uppercase mb-3">Deliverables</p>
              <h2 className="text-2xl md:text-[2.5rem] font-bold tracking-tight">
                What you get back.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z", title: "Screen recordings", desc: "Full session videos. See exactly where users stumble." },
                { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", title: "Bug reports", desc: "Structured: what broke, steps to reproduce, severity." },
                { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", title: "UX feedback", desc: "Plain English on what felt awkward or confusing." },
                { icon: "M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12", title: "Priority list", desc: "Issues ranked by severity. Fix what matters first." },
              ].map((d) => (
                <div key={d.title} className="card p-5">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d.icon} /></svg>
                  </div>
                  <h3 className="text-[14px] font-semibold mb-1">{d.title}</h3>
                  <p className="text-[12px] text-[var(--text-muted)] leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Pricing preview ─── */}
        <section className="py-20 md:py-28 px-5 border-t border-[var(--border)]">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[11px] font-semibold text-[var(--accent)] tracking-[0.25em] uppercase mb-3">Pricing</p>
            <h2 className="text-2xl md:text-[2.5rem] font-bold tracking-tight mb-3">
              Pay per test. No subscriptions.
            </h2>
            <p className="text-[15px] text-[var(--text-muted)] mb-10 max-w-md mx-auto">
              Results in hours, not weeks. Most devs test after each deploy.
            </p>

            <div className="grid md:grid-cols-3 gap-5 max-w-3xl mx-auto">
              {[
                { name: "Quick Check", testers: 3, price: 29, time: "4hrs" },
                { name: "Full Test", testers: 5, price: 49, time: "4hrs", popular: true },
                { name: "Deep Dive", testers: 10, price: 89, time: "6hrs" },
              ].map((p) => (
                <div key={p.name} className={`card p-6 text-center ${p.popular ? "border-[var(--accent)]/30 glow-sm" : ""}`}>
                  {p.popular && <span className="inline-block bg-[var(--accent)] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full mb-3">Most popular</span>}
                  <h3 className="text-[16px] font-semibold mb-1">{p.name}</h3>
                  <p className="text-[12px] text-[var(--text-muted)] mb-3">{p.testers} testers / {p.time}</p>
                  <p className="text-3xl font-bold mb-4">${p.price}</p>
                  <Link href="/submit" className={`btn w-full text-[13px] ${p.popular ? "btn-primary" : "btn-secondary"}`}>
                    Get started
                  </Link>
                </div>
              ))}
            </div>

            <Link href="/pricing" className="inline-block text-[13px] text-[var(--text-muted)] hover:text-white mt-6 transition-colors">
              View full pricing details &rarr;
            </Link>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-20 px-5 border-t border-[var(--border)]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-[2.5rem] font-bold tracking-tight mb-3">
              Ship with confidence.
            </h2>
            <p className="text-[15px] text-[var(--text-muted)] mb-8">
              Stop guessing if your app works. Let real humans tell you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/submit" className="btn btn-primary btn-lg glow">
                Get testers now
              </Link>
              <Link href="/become-a-tester" className="btn btn-secondary btn-lg">
                Become a tester
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
