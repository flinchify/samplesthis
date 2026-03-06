"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Read the redirect cookie
    const match = document.cookie.match(/auth_redirect=([^;]+)/);
    const path = match ? decodeURIComponent(match[1]) : "/dashboard";
    // Clear it
    document.cookie = "auth_redirect=; path=/; max-age=0";
    router.replace(path);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-6 h-6 border-2 border-black/10 border-t-[var(--accent)] rounded-full animate-spin mx-auto mb-3" />
        <p className="text-[13px] text-[var(--text-muted)]">Signing you in...</p>
      </div>
    </div>
  );
}
