"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <Nav />
      <main className="pt-16 min-h-screen">
        <div className="max-w-xl mx-auto px-5 py-16 md:py-24">
          <h1 className="text-3xl md:text-[3rem] font-bold tracking-tight mb-3">Get in touch</h1>
          <p className="text-[15px] text-[var(--text-muted)] mb-10">
            Custom testing plans, enterprise needs, partnerships, or just questions.
          </p>

          {sent ? (
            <div className="card p-8 text-center">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Message sent.</h2>
              <p className="text-[14px] text-[var(--text-muted)]">We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-1.5">Name</label>
                  <input className="input" placeholder="Your name" required />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-1.5">Email</label>
                  <input className="input" type="email" placeholder="you@company.com" required />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-1.5">Subject</label>
                <select className="select">
                  <option>Custom testing plan</option>
                  <option>Enterprise inquiry</option>
                  <option>Partnership</option>
                  <option>Tester question</option>
                  <option>General question</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-1.5">Message</label>
                <textarea className="input min-h-[120px] resize-none" placeholder="Tell us what you need..." required />
              </div>
              <button type="submit" className="btn btn-primary w-full">Send message</button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
