"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("order");
  const sessionId = params.get("session_id");

  // Fallback: verify payment via API in case webhook didn't fire
  useEffect(() => {
    if (orderId && sessionId) {
      fetch(`/api/orders/verify?order=${orderId}&session_id=${sessionId}`)
        .catch(() => {});
    }
  }, [orderId, sessionId]);

  return (
    <div className="text-center">
      <div className="w-20 h-20 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-6">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
      </div>
      <h1 className="h text-3xl font-bold mb-3 text-[var(--text)]">Payment confirmed.</h1>
      <p className="text-[16px] text-[var(--text-muted)] mb-2 max-w-md mx-auto">
        Your test job is live. We&apos;re matching testers to your audience right now.
      </p>
      <p className="text-[14px] text-[var(--text-muted)] mb-8">
        You&apos;ll receive flinch reports via email as testers complete their sessions.
      </p>
      {orderId && (
        <p className="text-[12px] text-[var(--text-dim)] mb-6">Order #{orderId}</p>
      )}
      <Link href="/" className="btn btn-primary btn-pill">Back to home</Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <>
      <Nav />
      <main className="pt-16 min-h-screen flex items-center justify-center">
        <div className="max-w-xl mx-auto px-5 py-16">
          <Suspense fallback={<div className="text-center text-[var(--text-muted)]">Loading...</div>}>
            <SuccessContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
