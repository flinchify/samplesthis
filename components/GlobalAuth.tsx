"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthModal from "./AuthModal";

export default function GlobalAuth() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"tester" | "login" | "business" | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === "login") {
        setAuthMode("login");
      } else if (detail === "business") {
        setAuthMode("business");
      } else {
        setAuthMode("tester");
      }
    };
    window.addEventListener("open-auth", handler);
    return () => window.removeEventListener("open-auth", handler);
  }, []);

  // Check URL param on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("auth") === "tester") setAuthMode("tester");
    else if (params.get("auth") === "login") setAuthMode("login");
  }, []);

  return (
    <AuthModal
      mode={authMode || "login"}
      open={authMode !== null}
      onClose={() => setAuthMode(null)}
      onSuccess={() => {
        setAuthMode(null);
        router.push("/dashboard");
      }}
      onSwitchMode={(m) => setAuthMode(m)}
    />
  );
}
