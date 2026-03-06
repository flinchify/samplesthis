"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BecomeATester() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/?auth=tester");
  }, [router]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-[var(--text-dim)]">Loading...</div>
    </div>
  );
}
