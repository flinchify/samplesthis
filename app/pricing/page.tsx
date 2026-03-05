import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const PLANS = [
  {
    name: "Quick Check",
    testers: 3,
    price: 29,
    turnaround: "4 hours",
    features: [
      "3 audience-matched testers",
      "Screen recordings (Loom)",
      "Bug report per tester",
      "Severity ratings",
      "4-hour turnaround",
    ],
  },
  {
    name: "Full Test",
    testers: 5,
    price: 49,
    turnaround: "4 hours",
    popular: true,
    features: [
      "5 audience-matched testers",
      "Screen recordings with audio",
      "Detailed bug reports",
      "UX friction notes",
      "Priority ranking",
      "4-hour turnaround",
      "Priority queue",
    ],
  },
  {
    name: "Deep Dive",
    testers: 10,
    price: 89,
    turnaround: "6 hours",
    features: [
      "10 audience-matched testers",
      "Screen recordings with audio",
      "Detailed bug reports",
      "UX friction + improvement notes",
      "Cross-device testing",
      "Summary report with priorities",
      "Tester demographic breakdown",
      "6-hour turnaround",
    ],
  },
];

const COMPARE = [
  { feature: "Real human testers", us: true, usertesting: true, betatesting: true },
  { feature: "Audience matching", us: true, usertesting: true, betatesting: false },
  { feature: "4-hour delivery", us: true, usertesting: false, betatesting: false },
  { feature: "No subscription", us: true, usertesting: false, betatesting: false },
  { feature: "From $29", us: true, usertesting: false, betatesting: false },
  { feature: "Built for indie devs", us: true, usertesting: false, betatesting: false },
  { feature: "Screen recordings", us: true, usertesting: true, betatesting: true },
  { feature: "Bug reports", us: true, usertesting: false, betatesting: true },
];

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="pt-16 min-h-screen">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-24">
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold text-[var(--accent)] tracking-[0.25em] uppercase mb-3">Pricing</p>
            <h1 className="text-3xl md:text-[3rem] font-bold tracking-tight mb-3">
              Pay per test. Cancel never.
            </h1>
            <p className="text-[16px] text-[var(--text-muted)] max-w-md mx-auto">
              No subscriptions, no minimums. Buy a test when you need one. Results in hours.
            </p>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-3 gap-5 mb-20">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`card p-6 flex flex-col ${plan.popular ? "!border-[var(--accent)]/30 glow" : ""}`}
              >
                {plan.popular && (
                  <span className="inline-block w-fit bg-[var(--accent)] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full mb-4">Most popular</span>
                )}
                <h3 className="text-[18px] font-semibold mb-1">{plan.name}</h3>
                <p className="text-[13px] text-[var(--text-muted)] mb-4">
                  {plan.testers} testers / {plan.turnaround}
                </p>
                <p className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-[13px] text-[var(--text-dim)] ml-1">per test</span>
                </p>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[13px] text-[var(--text-muted)]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" className="mt-0.5 shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/submit"
                  className={`btn w-full text-[13px] ${plan.popular ? "btn-primary" : "btn-secondary"}`}
                >
                  Get {plan.testers} testers
                </Link>
              </div>
            ))}
          </div>

          {/* Comparison */}
          <div className="mb-20">
            <h2 className="text-xl font-bold text-center mb-8">How we compare</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 pr-4 text-[var(--text-muted)] font-medium">Feature</th>
                    <th className="text-center py-3 px-4 text-[var(--accent)] font-semibold">ShipTest</th>
                    <th className="text-center py-3 px-4 text-[var(--text-muted)] font-medium">UserTesting</th>
                    <th className="text-center py-3 px-4 text-[var(--text-muted)] font-medium">BetaTesting</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row) => (
                    <tr key={row.feature} className="border-b border-[var(--border)]">
                      <td className="py-3 pr-4 text-[var(--text-muted)]">{row.feature}</td>
                      <td className="py-3 px-4 text-center">
                        {row.us ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" className="mx-auto"><polyline points="20 6 9 17 4 12" /></svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" className="mx-auto"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {row.usertesting ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" className="mx-auto"><polyline points="20 6 9 17 4 12" /></svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" className="mx-auto"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {row.betatesting ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" className="mx-auto"><polyline points="20 6 9 17 4 12" /></svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" className="mx-auto"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-3 pr-4 text-[var(--text-muted)] font-medium">Starting price</td>
                    <td className="py-3 px-4 text-center font-semibold text-white">$29</td>
                    <td className="py-3 px-4 text-center text-[var(--text-muted)]">$30K/yr</td>
                    <td className="py-3 px-4 text-center text-[var(--text-muted)]">$99/test</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Custom */}
          <div className="card p-8 text-center glow-sm">
            <h3 className="text-xl font-bold mb-2">Need something custom?</h3>
            <p className="text-[14px] text-[var(--text-muted)] mb-4 max-w-md mx-auto">
              Recurring testing, larger panels, specific demographics, or enterprise requirements.
            </p>
            <Link href="/contact" className="btn btn-secondary">
              Get in touch
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
