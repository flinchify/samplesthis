import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flinchify Pricing | Pay Per Tester, No Subscriptions",
  description: "No subscriptions, no platform fees. Set your own budget and pay per tester. Usability testing starting at $5 per tester.",
};
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Pricing() {
  return (
    <>
      <Nav />
      <main className="pt-20 min-h-screen">
        <div className="max-w-[900px] mx-auto px-5 py-16 md:py-24">
          <div className="text-center mb-14">
            <h1 className="h text-3xl md:text-4xl font-bold text-[var(--text)] mb-3">You set the price</h1>
            <p className="text-[16px] text-[var(--text-muted)] max-w-lg mx-auto">No subscriptions, no tiers, no per-seat fees. You post a job, set what you'll pay per tester, and define the tasks. That's it.</p>
          </div>

          {/* How it works — the real flow */}
          <div className="bg-white rounded-2xl border border-black/[0.06] p-8 md:p-10 mb-10">
            <h2 className="h text-[18px] font-bold text-[var(--text)] mb-8">How pricing works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "Post your job",
                  desc: "Describe what you built, paste the URL, and tell us what you need tested — sign-up flow, checkout, onboarding, whatever matters.",
                },
                {
                  step: "2",
                  title: "Set your budget",
                  desc: "Choose how many testers you want and how much you'll pay each one. Minimum $5/tester. No ceiling — pay what the work is worth to you.",
                },
                {
                  step: "3",
                  title: "Define the tasks",
                  desc: "List specific tasks testers must complete within a time limit. \"Complete sign-up in under 3 minutes\" or \"Find 3 friction points in checkout.\"",
                },
                {
                  step: "4",
                  title: "Pay & go live",
                  desc: "Pay upfront via Stripe. Your job goes live immediately. Matched testers apply, complete your tasks, and deliver results.",
                },
              ].map((s) => (
                <div key={s.step}>
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-3">
                    <span className="h text-[16px] font-bold text-[var(--accent)]">{s.step}</span>
                  </div>
                  <h3 className="h text-[14px] font-semibold text-[var(--text)] mb-1.5">{s.title}</h3>
                  <p className="text-[13px] text-[var(--text-muted)] leading-[1.65]">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Example scenarios */}
          <div className="mb-10">
            <h2 className="h text-[18px] font-bold text-[var(--text)] mb-6 text-center">Example jobs</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "Quick sanity check",
                  app: "Landing page",
                  testers: 2,
                  price: 5,
                  tasks: "Sign up, explore homepage, report confusing copy",
                  time: "15 min",
                  total: 10,
                },
                {
                  title: "Full flow audit",
                  app: "SaaS onboarding",
                  testers: 5,
                  price: 12,
                  tasks: "Complete onboarding, create first project, note every friction point",
                  time: "30 min",
                  total: 60,
                  popular: true,
                },
                {
                  title: "Deep dive",
                  app: "Mobile app",
                  testers: 10,
                  price: 20,
                  tasks: "Use app for 3 days, submit daily friction log, record 2 screen sessions",
                  time: "3 days",
                  total: 200,
                },
              ].map((ex) => (
                <div key={ex.title} className={`rounded-2xl border p-6 relative ${ex.popular ? "border-[var(--accent)] bg-orange-50/30" : "border-black/[0.06] bg-white"}`}>
                  {ex.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[var(--accent)] text-white text-[10px] font-semibold uppercase tracking-wider">Most common</div>
                  )}
                  <p className="h text-[14px] font-semibold text-[var(--text)] mb-1">{ex.title}</p>
                  <p className="text-[12px] text-[var(--text-dim)] mb-4">{ex.app}</p>

                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between text-[13px]">
                      <span className="text-[var(--text-muted)]">Testers</span>
                      <span className="font-medium text-[var(--text)]">{ex.testers}</span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-[var(--text-muted)]">Per tester</span>
                      <span className="font-medium text-[var(--text)]">${ex.price}</span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-[var(--text-muted)]">Time limit</span>
                      <span className="font-medium text-[var(--text)]">{ex.time}</span>
                    </div>
                    <div className="h-px bg-black/[0.06]" />
                    <div className="flex justify-between text-[13px]">
                      <span className="text-[var(--text-muted)]">Total cost</span>
                      <span className="h font-bold text-[var(--text)]">${ex.total}</span>
                    </div>
                  </div>

                  <div className="bg-[var(--bg-2)] rounded-lg p-3">
                    <p className="text-[11px] font-medium text-[var(--text-dim)] uppercase tracking-wider mb-1">Tasks</p>
                    <p className="text-[12px] text-[var(--text-muted)] leading-[1.6]">{ex.tasks}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The formula */}
          <div className="bg-[var(--dark)] rounded-2xl p-8 md:p-10 mb-10 text-center">
            <p className="text-[13px] text-white/40 uppercase tracking-wider font-medium mb-4">The formula</p>
            <p className="h text-2xl md:text-3xl font-bold text-white mb-3">
              Testers <span className="text-orange-400">×</span> Price per tester <span className="text-orange-400">=</span> Total
            </p>
            <p className="text-[14px] text-white/50 max-w-md mx-auto">
              That's it. $5 minimum per tester. No platform fees, no surprise charges. You pay exactly what you set.
            </p>
          </div>

          {/* What testers must do */}
          <div className="bg-white rounded-2xl border border-black/[0.06] p-8 md:p-10 mb-10">
            <h2 className="h text-[18px] font-bold text-[var(--text)] mb-2">What testers must do to get paid</h2>
            <p className="text-[14px] text-[var(--text-muted)] mb-6">Testers don't just click around. They must complete your defined tasks within your time limit to pass.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Complete all tasks", desc: "Every task you listed must be attempted and documented. Partial submissions get rejected." },
                { title: "Stay within the time limit", desc: "You set the deadline — 15 minutes, 1 hour, 3 days. Testers must deliver within that window." },
                { title: "Provide real feedback", desc: "Screen recordings, written friction notes, and bug reports. Not one-liners — real, actionable observations." },
                { title: "Meet your quality bar", desc: "You review every submission. Accept the good ones, reject lazy work. You only pay for tests you approve." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 p-4 rounded-xl bg-[var(--bg)] border border-black/[0.04]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <div>
                    <h3 className="h text-[13px] font-semibold text-[var(--text)] mb-0.5">{item.title}</h3>
                    <p className="text-[12px] text-[var(--text-muted)] leading-[1.6]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-16">
            <Link href="/submit" className="btn btn-accent text-[14px] !px-8 !py-3">Post a test job</Link>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="h text-[18px] font-bold text-[var(--text)] mb-6 text-center">Common questions</h2>
            <div className="space-y-4">
              {[
                { q: "What's the minimum I can pay per tester?", a: "$5. But higher budgets attract more experienced testers faster. Most jobs land between $8-$15 per tester." },
                { q: "Is there a platform fee?", a: "No. You pay exactly (testers × price per tester). That's your total. No hidden charges, no percentage cut on top." },
                { q: "What if a tester does a bad job?", a: "You review every submission before it's marked complete. Reject low-quality work — you don't pay for it. Repeat offenders get removed from the platform." },
                { q: "How do testers get paid?", a: "Via Stripe Connect. When you approve their submission, payment goes directly to their bank. No invoicing needed." },
                { q: "Can I get a refund?", a: "If no testers complete your job within 7 days, you get a full refund. For partial issues, contact us." },
                { q: "Do I need a subscription?", a: "No. Post a job when you need one. No monthly fees, no commitments, no plans to choose from." },
              ].map((f) => (
                <div key={f.q} className="bg-white rounded-xl border border-black/[0.06] p-5">
                  <h3 className="h text-[14px] font-semibold text-[var(--text)] mb-1">{f.q}</h3>
                  <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
