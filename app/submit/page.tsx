"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const PLANS = [
  { id: "quick", name: "Quick Check", testers: 3, price: 29, time: "4 hours" },
  { id: "full", name: "Full Test", testers: 5, price: 49, time: "4 hours", popular: true },
  { id: "deep", name: "Deep Dive", testers: 10, price: 89, time: "6 hours" },
];

const APP_TYPES = ["Web app", "Mobile app", "SaaS", "Chrome extension", "Desktop app", "API/CLI", "Other"];

export default function SubmitPage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    company: "",
    app_url: "",
    app_type: "",
    description: "",
    target_audience: "",
    plan: "full",
  });

  const selectedPlan = PLANS.find((p) => p.id === form.plan)!;

  const submit = async () => {
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDone(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Nav />
      <main className="pt-16 min-h-screen">
        <div className="max-w-xl mx-auto px-5 py-16 md:py-24">

          {done ? (
            <div className="text-center reveal-in">
              <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h1 className="text-2xl font-bold mb-3">Order received.</h1>
              <p className="text-[15px] text-[var(--text-muted)] mb-2">
                We&apos;re matching testers to your audience now.
              </p>
              <p className="text-[15px] text-[var(--text-muted)] mb-6">
                Expect results in your inbox within <span className="text-white font-medium">{selectedPlan.time}</span>.
              </p>
              <div className="card p-5 text-left">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[14px] font-medium">{selectedPlan.name}</span>
                  <span className="text-[14px] font-bold">${selectedPlan.price}</span>
                </div>
                <div className="text-[12px] text-[var(--text-muted)] space-y-1">
                  <p>{selectedPlan.testers} matched testers</p>
                  <p>{form.app_url}</p>
                  <p>{form.target_audience || "General audience"}</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Get your app tested</h1>
                <p className="text-[15px] text-[var(--text-muted)]">
                  Real humans, matched to your audience, results in hours.
                </p>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex-1 h-1 rounded-full overflow-hidden bg-[var(--card)]">
                    <div className={`h-full rounded-full transition-all duration-500 ${step >= s ? "bg-[var(--accent)] w-full" : "w-0"}`} />
                  </div>
                ))}
              </div>

              {/* Step 1: Your app */}
              {step === 1 && (
                <div className="space-y-4 reveal-up">
                  <div>
                    <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-1.5">App URL</label>
                    <input
                      className="input"
                      placeholder="https://your-app.vercel.app"
                      value={form.app_url}
                      onChange={(e) => setForm({ ...form, app_url: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-1.5">App type</label>
                    <select className="select" value={form.app_type} onChange={(e) => setForm({ ...form, app_type: e.target.value })}>
                      <option value="">Select type</option>
                      {APP_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-1.5">What should testers focus on? (optional)</label>
                    <textarea
                      className="input min-h-[80px] resize-none"
                      placeholder='E.g. "Test the checkout flow" or "Try to break the onboarding" or just "Use it naturally"'
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  </div>
                  <button
                    onClick={() => { if (form.app_url) setStep(2); }}
                    disabled={!form.app_url}
                    className="btn btn-primary w-full mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              )}

              {/* Step 2: Audience */}
              {step === 2 && (
                <div className="space-y-4 reveal-up">
                  <div>
                    <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-1.5">Who is your ideal tester?</label>
                    <textarea
                      className="input min-h-[80px] resize-none"
                      placeholder='E.g. "Women 25-40 who shop online" or "Crypto traders" or "Small business owners who use Shopify"'
                      value={form.target_audience}
                      onChange={(e) => setForm({ ...form, target_audience: e.target.value })}
                    />
                    <p className="text-[11px] text-[var(--text-dim)] mt-1">We&apos;ll match testers from our pool who fit this profile. Leave blank for general audience.</p>
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-1.5">Your email</label>
                    <input
                      className="input"
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-1.5">Company (optional)</label>
                    <input
                      className="input"
                      placeholder="Your company name"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="btn btn-secondary flex-1">Back</button>
                    <button
                      onClick={() => { if (form.email) setStep(3); }}
                      disabled={!form.email}
                      className="btn btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Plan */}
              {step === 3 && (
                <div className="space-y-5 reveal-up">
                  <div>
                    <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-3">Choose your plan</label>
                    <div className="space-y-3">
                      {PLANS.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setForm({ ...form, plan: p.id })}
                          className={`w-full text-left card p-4 flex items-center justify-between ${
                            form.plan === p.id ? "!border-[var(--accent)]/40 !bg-[var(--accent)]/[0.04]" : ""
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[15px] font-semibold">{p.name}</span>
                              {p.popular && <span className="bg-[var(--accent)] text-white text-[9px] font-semibold px-2 py-0.5 rounded-full">Popular</span>}
                            </div>
                            <p className="text-[12px] text-[var(--text-muted)]">{p.testers} testers / {p.time}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xl font-bold">${p.price}</span>
                            <div className={`w-5 h-5 rounded-full border-2 mt-1 ml-auto flex items-center justify-center ${
                              form.plan === p.id ? "border-[var(--accent)] bg-[var(--accent)]" : "border-[var(--border)]"
                            }`}>
                              {form.plan === p.id && (
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="card p-4 bg-[var(--surface)]">
                    <p className="text-[11px] font-semibold text-[var(--text-dim)] uppercase tracking-wider mb-2">Order summary</p>
                    <div className="space-y-1 text-[13px]">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">{selectedPlan.name} ({selectedPlan.testers} testers)</span>
                        <span className="font-medium">${selectedPlan.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Delivery</span>
                        <span className="text-[var(--text-muted)]">{selectedPlan.time}</span>
                      </div>
                      {form.target_audience && (
                        <div className="flex justify-between">
                          <span className="text-[var(--text-muted)]">Audience</span>
                          <span className="text-[var(--text-muted)] text-right max-w-[200px] truncate">{form.target_audience}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[13px] rounded-xl px-4 py-3">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="btn btn-secondary flex-1">Back</button>
                    <button
                      onClick={submit}
                      disabled={submitting}
                      className="btn btn-primary flex-1 glow disabled:opacity-60"
                    >
                      {submitting ? "Processing..." : `Pay $${selectedPlan.price}`}
                    </button>
                  </div>

                  <p className="text-[11px] text-[var(--text-dim)] text-center">
                    Secure payment via Stripe. Money-back guarantee if we can&apos;t match testers.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
