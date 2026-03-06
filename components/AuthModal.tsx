"use client";

import { useState, useEffect } from "react";

interface AuthModalProps {
  mode: "tester" | "business";
  open: boolean;
  onClose: () => void;
  onSuccess: (data: { type: "tester" | "business"; email?: string }) => void;
}

export default function AuthModal({ mode, open, onClose, onSuccess }: AuthModalProps) {
  // Tester fields
  const [tStep, setTStep] = useState(1);
  const [tForm, setTForm] = useState({
    name: "", email: "", age: "", gender: "",
    devices: [] as string[], interests: [] as string[],
    linkedin: "", portfolio: "", twitter: "", github: "",
  });
  const [tLoading, setTLoading] = useState(false);
  const [tError, setTError] = useState("");

  // Business fields
  const [bEmail, setBEmail] = useState("");
  const [bCompany, setBCompany] = useState("");
  const [bCodeSent, setBCodeSent] = useState(false);
  const [bCode, setBCode] = useState("");
  const [bLoading, setBLoading] = useState(false);
  const [bError, setBError] = useState("");

  // Check if already authenticated
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    if (!open) return;
    setChecking(true);
    if (mode === "tester") {
      fetch("/api/testers/me").then(r => r.json()).then(d => {
        if (d.id) onSuccess({ type: "tester" });
        else setChecking(false);
      }).catch(() => setChecking(false));
    } else {
      fetch("/api/business/me").then(r => r.json()).then(d => {
        if (d.authenticated) onSuccess({ type: "business", email: d.business?.email });
        else setChecking(false);
      }).catch(() => setChecking(false));
    }
  }, [open, mode]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setTStep(1); setTError(""); setBCodeSent(false); setBCode(""); setBError("");
    }
  }, [open]);

  if (!open) return null;

  const DEVICES = ["iPhone", "Android", "Windows PC", "Mac", "iPad/Tablet"];
  const INTERESTS = ["E-commerce", "SaaS", "Fintech", "Health", "Gaming", "Social", "Education", "Crypto", "Productivity", "Food & Drink"];

  const toggleArr = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];

  // ═══ TESTER SIGNUP ═══
  async function submitTester() {
    setTLoading(true); setTError("");
    try {
      const res = await fetch("/api/testers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: tForm.name, email: tForm.email, age: tForm.age, gender: tForm.gender,
          devices: tForm.devices, interests: tForm.interests,
          linkedin: tForm.linkedin, portfolio: tForm.portfolio,
          twitter: tForm.twitter, github: tForm.github,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      onSuccess({ type: "tester" });
    } catch (e: unknown) {
      setTError(e instanceof Error ? e.message : "Failed");
    }
    setTLoading(false);
  }

  // ═══ BUSINESS VERIFY ═══
  async function sendCode() {
    setBLoading(true); setBError("");
    try {
      const res = await fetch("/api/business/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send", email: bEmail, company: bCompany }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setBCodeSent(true);
    } catch (e: unknown) {
      setBError(e instanceof Error ? e.message : "Failed");
    }
    setBLoading(false);
  }

  async function verifyCode() {
    setBLoading(true); setBError("");
    try {
      const res = await fetch("/api/business/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify", email: bEmail, code: bCode, company: bCompany }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onSuccess({ type: "business", email: bEmail });
    } catch (e: unknown) {
      setBError(e instanceof Error ? e.message : "Invalid code");
    }
    setBLoading(false);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5 transition-colors text-[var(--text-dim)] z-10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>

        {checking ? (
          <div className="p-12 text-center">
            <div className="w-6 h-6 border-2 border-black/10 border-t-[var(--accent)] rounded-full animate-spin mx-auto" />
          </div>
        ) : mode === "business" ? (
          /* ═══ BUSINESS AUTH ═══ */
          <div className="p-6 sm:p-8">
            <h2 className="h text-xl font-bold text-[var(--text)] mb-1">Post a test</h2>
            <p className="text-[13px] text-[var(--text-muted)] mb-6">
              {bCodeSent ? `Enter the code sent to ${bEmail}` : "Verify your email to get started"}
            </p>

            {!bCodeSent ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-1">Work email</label>
                  <input className="input" type="email" placeholder="you@company.com" value={bEmail}
                    onChange={e => setBEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && sendCode()} />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-1">Company (optional)</label>
                  <input className="input" placeholder="Your company" value={bCompany}
                    onChange={e => setBCompany(e.target.value)} />
                </div>
                {bError && <p className="text-[13px] text-red-600">{bError}</p>}
                <button onClick={sendCode} disabled={bLoading || !bEmail}
                  className="btn btn-primary w-full disabled:opacity-40">
                  {bLoading ? "Sending..." : "Send verification code"}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-1">6-digit code</label>
                  <input className="input text-center text-xl tracking-[0.3em] font-mono" type="text" maxLength={6}
                    placeholder="000000" value={bCode}
                    onChange={e => setBCode(e.target.value.replace(/\D/g, ""))}
                    onKeyDown={e => e.key === "Enter" && verifyCode()} />
                </div>
                {bError && <p className="text-[13px] text-red-600">{bError}</p>}
                <button onClick={verifyCode} disabled={bLoading || bCode.length !== 6}
                  className="btn btn-primary w-full disabled:opacity-40">
                  {bLoading ? "Verifying..." : "Verify & continue"}
                </button>
                <button onClick={() => { setBCodeSent(false); setBCode(""); setBError(""); }}
                  className="text-[12px] text-[var(--text-dim)] hover:text-[var(--text)] transition-colors w-full text-center">
                  Use a different email
                </button>
              </div>
            )}
          </div>
        ) : (
          /* ═══ TESTER SIGNUP ═══ */
          <div className="p-6 sm:p-8">
            <h2 className="h text-xl font-bold text-[var(--text)] mb-1">Become a tester</h2>
            <p className="text-[13px] text-[var(--text-muted)] mb-5">
              {tStep === 1 ? "Takes 60 seconds. Start earning today." :
               tStep === 2 ? "What devices do you use?" :
               tStep === 3 ? "What are you into?" : "Optional: add your links"}
            </p>

            {/* Progress */}
            <div className="flex gap-1.5 mb-5">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className="flex-1 h-1 rounded-full overflow-hidden bg-black/[0.04]">
                  <div className={`h-full rounded-full transition-all duration-500 ${tStep >= s ? "grad-warm-bg w-full" : "w-0"}`} />
                </div>
              ))}
            </div>

            {tStep === 1 && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-1">Full name</label>
                  <input className="input" placeholder="Your name" value={tForm.name}
                    onChange={e => setTForm({ ...tForm, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-1">Email</label>
                  <input className="input" type="email" placeholder="you@email.com" value={tForm.email}
                    onChange={e => setTForm({ ...tForm, email: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-1">Age range</label>
                    <select className="select" value={tForm.age} onChange={e => setTForm({ ...tForm, age: e.target.value })}>
                      <option value="">Select</option>
                      {["18-24", "25-34", "35-44", "45-54", "55+"].map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-1">Gender</label>
                    <select className="select" value={tForm.gender} onChange={e => setTForm({ ...tForm, gender: e.target.value })}>
                      <option value="">Select</option>
                      {["Male", "Female", "Non-binary", "Prefer not to say"].map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                </div>
                <button onClick={() => { if (tForm.name && tForm.email) setTStep(2); }}
                  disabled={!tForm.name || !tForm.email}
                  className="btn btn-primary w-full disabled:opacity-40">Continue</button>
              </div>
            )}

            {tStep === 2 && (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {DEVICES.map(d => (
                    <button key={d} onClick={() => setTForm({ ...tForm, devices: toggleArr(tForm.devices, d) })}
                      className={`px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-all ${
                        tForm.devices.includes(d) ? "bg-orange-50 border-orange-300 text-orange-700" : "bg-white border-black/[0.06] text-[var(--text-dim)] hover:border-orange-200"
                      }`}>{d}</button>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setTStep(1)} className="btn btn-outline flex-1">Back</button>
                  <button onClick={() => setTStep(3)} disabled={tForm.devices.length === 0}
                    className="btn btn-primary flex-1 disabled:opacity-40">Continue</button>
                </div>
              </div>
            )}

            {tStep === 3 && (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map(interest => (
                    <button key={interest} onClick={() => setTForm({ ...tForm, interests: toggleArr(tForm.interests, interest) })}
                      className={`px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-all ${
                        tForm.interests.includes(interest) ? "bg-orange-50 border-orange-300 text-orange-700" : "bg-white border-black/[0.06] text-[var(--text-dim)] hover:border-orange-200"
                      }`}>{interest}</button>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setTStep(2)} className="btn btn-outline flex-1">Back</button>
                  <button onClick={() => setTStep(4)} disabled={tForm.interests.length === 0}
                    className="btn btn-primary flex-1 disabled:opacity-40">Continue</button>
                </div>
              </div>
            )}

            {tStep === 4 && (
              <div className="space-y-3">
                <input className="input" placeholder="LinkedIn URL (optional)" value={tForm.linkedin}
                  onChange={e => setTForm({ ...tForm, linkedin: e.target.value })} />
                <input className="input" placeholder="Portfolio URL (optional)" value={tForm.portfolio}
                  onChange={e => setTForm({ ...tForm, portfolio: e.target.value })} />
                <input className="input" placeholder="Twitter/X (optional)" value={tForm.twitter}
                  onChange={e => setTForm({ ...tForm, twitter: e.target.value })} />
                <input className="input" placeholder="GitHub (optional)" value={tForm.github}
                  onChange={e => setTForm({ ...tForm, github: e.target.value })} />
                {tError && <p className="text-[13px] text-red-600">{tError}</p>}
                <div className="flex gap-3 pt-1">
                  <button onClick={() => setTStep(3)} className="btn btn-outline flex-1">Back</button>
                  <button onClick={submitTester} disabled={tLoading}
                    className="btn btn-primary flex-1 disabled:opacity-60">
                    {tLoading ? "Creating..." : "Start earning"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
