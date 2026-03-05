"use client";

import { useEffect, useState } from "react";

export default function LiveCounter({ size = "sm" }: { size?: "sm" | "lg" }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/testers/count")
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => setCount(0));

    // Refresh every 30s
    const interval = setInterval(() => {
      fetch("/api/testers/count")
        .then((r) => r.json())
        .then((d) => setCount(d.count))
        .catch(() => {});
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (count === null) return null;

  if (size === "lg") {
    return (
      <div className="inline-flex items-center gap-3 bg-[var(--card)] border border-[var(--border)] rounded-2xl px-5 py-3">
        <div className="relative">
          <span className="w-3 h-3 rounded-full bg-[var(--success)] block counter-live" />
          <span className="absolute inset-0 w-3 h-3 rounded-full bg-[var(--success)] animate-ping opacity-30" />
        </div>
        <div>
          <span className="text-2xl font-bold text-white tabular-nums">{count.toLocaleString()}</span>
          <span className="text-[13px] text-[var(--text-muted)] ml-2">verified humans ready to test</span>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] rounded-full px-3 py-1.5">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-50" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--success)]" />
      </span>
      <span className="text-[12px] font-medium text-[var(--text-muted)]">
        <span className="text-white tabular-nums">{count.toLocaleString()}</span> testers ready
      </span>
    </div>
  );
}
