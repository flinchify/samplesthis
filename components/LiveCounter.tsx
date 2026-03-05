"use client";

import { useEffect, useState } from "react";

export default function LiveCounter({ size = "sm" }: { size?: "sm" | "lg" }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/testers/count").then((r) => r.json()).then((d) => setCount(d.count)).catch(() => setCount(0));
    const i = setInterval(() => {
      fetch("/api/testers/count").then((r) => r.json()).then((d) => setCount(d.count)).catch(() => {});
    }, 30000);
    return () => clearInterval(i);
  }, []);

  if (count === null) return null;

  if (size === "lg") {
    return (
      <div className="badge">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span className="text-[13px]">
          <span className="text-white font-semibold tabular-nums">{count.toLocaleString()}</span>
          <span className="text-emerald-300/60 ml-1">humans ready</span>
        </span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.05] rounded-full px-3 py-1.5">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
      </span>
      <span className="text-[11px] text-white/40 h">
        <span className="text-white/70 font-medium tabular-nums">{count.toLocaleString()}</span> testers
      </span>
    </div>
  );
}
