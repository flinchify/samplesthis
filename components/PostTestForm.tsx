"use client";

import { useState } from "react";

const APP_TYPES = ["Web app", "Mobile app", "SaaS", "Chrome extension", "Desktop app", "API/CLI", "Other"];

export default function PostTestForm() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    app_url: "",
    app_type: "",
    description: "",
    target_audience: "",
    testers_count: 5,
    price_per_tester: 12,
    custom_price: "",
  });

  const pricePerTester = form.custom_price ? Number(form.custom_price) : form.price_per_tester;
  const total = form.testers_count * pricePerTester;
  const isValidPrice = pricePerTester >= 5;

  async function handleSubmit() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          app_url: form.app_url,
          app_type: form.app_type,
          description: form.description,
          target_audience: form.target_audience,
          testers_count: form.testers_count,
          price_per_tester: pricePerTester,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
        return;
      }
      setDone(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
    setSubmitting(false);
  }

  if (done) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <h2 className="h text-[18px] font-bold text-[var(--text)] mb-2">Test job posted!</h2>
        <p className="text-[13px] text-[var(--text-muted)]">Testers will start applying soon. You'll be notified by email.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex gap-1.5 mb-6">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex-1 h-1 rounded-full overflow-hidden bg-black/[0.04]">
            <div className={`h-full rounded-full transition-all duration-500 ${step >= s ? "grad-warm-bg w-full" : "w-0"}`} />
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="h text-[15px] font-semibold text-[var(--text)]">About your app</h3>
          <div>
            <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-1">App URL</label>
            <input className="input" type="url" placeholder="https://yourapp.com" value={form.app_url}
              onChange={e => setForm({ ...form, app_url: e.target.value })} />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-1">App type</label>
            <div className="flex flex-wrap gap-2">
              {APP_TYPES.map(t => (
                <button key={t} onClick={() => setForm({ ...form, app_type: t })}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-all ${
                    form.app_type === t ? "bg-orange-50 border-orange-300 text-orange-700" : "bg-white border-black/[0.06] text-[var(--text-dim)] hover:border-orange-200"
                  }`}>{t}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-1">What should testers do?</label>
            <textarea className="input min-h-[100px] resize-y" placeholder="E.g. Sign up, complete onboarding, try to make a purchase. Note anything confusing or broken."
              value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-1">Target audience (optional)</label>
            <input className="input" placeholder="E.g. Women 25-40 who shop online" value={form.target_audience}
              onChange={e => setForm({ ...form, target_audience: e.target.value })} />
          </div>
          <button onClick={() => { if (form.app_url && form.description) setStep(2); }}
            disabled={!form.app_url || !form.description}
            className="btn btn-primary w-full disabled:opacity-40">Continue</button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="h text-[15px] font-semibold text-[var(--text)]">Set your budget</h3>
          
          <div>
            <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-2">Number of testers</label>
            <div className="flex items-center gap-4">
              <input type="range" min={1} max={50} value={form.testers_count}
                onChange={e => setForm({ ...form, testers_count: Number(e.target.value) })}
                className="flex-1 accent-orange-500" />
              <span className="h text-[18px] font-bold text-[var(--text)] w-10 text-right">{form.testers_count}</span>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-2">Price per tester</label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { per: 8, label: "Economy" },
                { per: 12, label: "Standard" },
                { per: 20, label: "Priority" },
              ].map(b => (
                <button key={b.per} onClick={() => setForm({ ...form, price_per_tester: b.per, custom_price: "" })}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    form.price_per_tester === b.per && !form.custom_price
                      ? "border-orange-300 bg-orange-50"
                      : "border-black/[0.06] hover:border-orange-200"
                  }`}>
                  <p className="h text-[16px] font-bold text-[var(--text)]">${b.per}</p>
                  <p className="text-[11px] text-[var(--text-dim)]">{b.label}</p>
                </button>
              ))}
            </div>
            <div>
              <input className="input" type="number" min={5} placeholder="Custom price ($5 min)"
                value={form.custom_price} onChange={e => setForm({ ...form, custom_price: e.target.value })} />
            </div>
          </div>

          <div className="bg-[var(--bg-2)] rounded-xl p-4">
            <div className="flex justify-between text-[14px] mb-1">
              <span className="text-[var(--text-muted)]">{form.testers_count} testers × ${pricePerTester}</span>
              <span className="h font-bold text-[var(--text)]">${total}</span>
            </div>
            {!isValidPrice && <p className="text-[12px] text-red-500">Minimum $5 per tester</p>}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="btn btn-outline flex-1">Back</button>
            <button onClick={() => { if (isValidPrice) setStep(3); }}
              disabled={!isValidPrice}
              className="btn btn-primary flex-1 disabled:opacity-40">Review</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="h text-[15px] font-semibold text-[var(--text)]">Review & pay</h3>

          <div className="space-y-3">
            <div className="bg-[var(--bg-2)] rounded-xl p-4">
              <div className="grid grid-cols-2 gap-3 text-[13px]">
                <div><span className="text-[var(--text-dim)]">URL</span><p className="font-medium text-[var(--text)] truncate">{form.app_url}</p></div>
                <div><span className="text-[var(--text-dim)]">Type</span><p className="font-medium text-[var(--text)]">{form.app_type || "—"}</p></div>
                <div><span className="text-[var(--text-dim)]">Testers</span><p className="font-medium text-[var(--text)]">{form.testers_count}</p></div>
                <div><span className="text-[var(--text-dim)]">Per tester</span><p className="font-medium text-[var(--text)]">${pricePerTester}</p></div>
              </div>
            </div>
            <div className="bg-[var(--bg-2)] rounded-xl p-4">
              <span className="text-[12px] text-[var(--text-dim)]">Tasks</span>
              <p className="text-[13px] text-[var(--text)] mt-1">{form.description}</p>
            </div>
            <div className="bg-black rounded-xl p-4 flex justify-between items-center">
              <span className="text-[14px] text-white/60">Total</span>
              <span className="h text-xl font-bold text-white">${total} AUD</span>
            </div>
          </div>

          {error && <p className="text-[13px] text-red-600">{error}</p>}

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="btn btn-outline flex-1">Back</button>
            <button onClick={handleSubmit} disabled={submitting}
              className="btn btn-primary flex-1 disabled:opacity-60">
              {submitting ? "Processing..." : `Pay $${total} & post`}
            </button>
          </div>
          <p className="text-[11px] text-[var(--text-dim)] text-center">Secure payment via Stripe. You'll be redirected to checkout.</p>
        </div>
      )}
    </div>
  );
}
