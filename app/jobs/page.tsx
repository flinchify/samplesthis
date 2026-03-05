"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

interface Job {
  id: number;
  app_url: string;
  app_type: string | null;
  description: string | null;
  target_audience: string | null;
  testers_count: number;
  price_per_tester_cents: number;
  applications_count: number;
  accepted_count: number;
  created_at: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [tester, setTester] = useState<{ id: number; name: string } | null>(null);
  const [applying, setApplying] = useState<number | null>(null);
  const [applied, setApplied] = useState<Set<number>>(new Set());
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/orders").then(r => r.json()).then(d => { setJobs(d.jobs || []); setLoading(false); }).catch(() => setLoading(false));
    fetch("/api/testers/me").then(r => r.json()).then(d => { if (d.authenticated) setTester(d.tester); });
  }, []);

  const apply = async (jobId: number) => {
    if (!tester) return;
    setApplying(jobId);
    setError("");
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: jobId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setApplied(prev => new Set(prev).add(jobId));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to apply");
    } finally {
      setApplying(null);
    }
  };

  const timeAgo = (d: string) => {
    const mins = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
    if (mins < 60) return `${mins}m ago`;
    if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
    return `${Math.floor(mins / 1440)}d ago`;
  };

  const domain = (url: string) => {
    try { return new URL(url).hostname.replace("www.", ""); } catch { return url; }
  };

  return (
    <>
      <Nav />
      <main className="pt-20 min-h-screen pb-16">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="h text-2xl font-bold text-[var(--text)]">Open test jobs</h1>
              <p className="text-[14px] text-[var(--text-muted)] mt-1">Apply to test apps and earn money</p>
            </div>
            {!tester && (
              <Link href="/become-a-tester" className="btn btn-accent text-[13px] !py-2 !px-5">Sign up to apply</Link>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-xl px-4 py-3 mb-6">{error}</div>
          )}

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="h-4 bg-black/[0.04] rounded w-1/3 mb-3" />
                  <div className="h-3 bg-black/[0.04] rounded w-2/3 mb-2" />
                  <div className="h-3 bg-black/[0.04] rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[var(--text-muted)] mb-2">No active jobs right now.</p>
              <p className="text-[13px] text-[var(--text-dim)]">Check back soon — new jobs are posted daily.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => {
                const perTester = (job.price_per_tester_cents || 0) / 100;
                const spotsLeft = job.testers_count - job.accepted_count;
                const hasApplied = applied.has(job.id);

                return (
                  <div key={job.id} className="card p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="h text-[15px] font-semibold text-[var(--text)]">{domain(job.app_url)}</h3>
                          {job.app_type && <span className="text-[11px] text-[var(--text-dim)] bg-black/[0.03] px-2 py-0.5 rounded-full">{job.app_type}</span>}
                        </div>
                        {job.description && <p className="text-[13px] text-[var(--text-muted)] mb-2 line-clamp-2">{job.description}</p>}
                        {job.target_audience && (
                          <p className="text-[12px] text-[var(--text-dim)]">Looking for: {job.target_audience}</p>
                        )}
                        <div className="flex items-center gap-4 mt-3 text-[12px] text-[var(--text-dim)]">
                          <span>{timeAgo(job.created_at)}</span>
                          <span>{job.applications_count} applied</span>
                          <span>{spotsLeft > 0 ? `${spotsLeft} spot${spotsLeft > 1 ? "s" : ""} left` : "Full"}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right">
                          <p className="h text-xl font-bold text-[var(--text)]">${perTester}</p>
                          <p className="text-[10px] text-[var(--text-dim)]">per test</p>
                        </div>
                        {tester ? (
                          hasApplied ? (
                            <span className="btn btn-outline !py-2 !px-4 text-[12px] opacity-60 cursor-default">Applied</span>
                          ) : spotsLeft <= 0 ? (
                            <span className="btn btn-outline !py-2 !px-4 text-[12px] opacity-40 cursor-default">Full</span>
                          ) : (
                            <button onClick={() => apply(job.id)} disabled={applying === job.id}
                              className="btn btn-accent !py-2 !px-5 text-[12px]">
                              {applying === job.id ? "..." : "Apply"}
                            </button>
                          )
                        ) : (
                          <Link href="/become-a-tester" className="btn btn-accent !py-2 !px-5 text-[12px]">Sign up</Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
