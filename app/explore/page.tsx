"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Job {
  id: number;
  app_url: string;
  app_type: string | null;
  description: string | null;
  testers_count: number;
  price_per_tester_cents: number;
  applications_count: number;
  accepted_count: number;
  created_at: string;
}

const SORT_OPTIONS = ["Newest", "Highest pay", "Most spots"];
const TYPE_FILTERS = ["All", "Web App", "Mobile App", "SaaS", "E-commerce", "Other"];

function dom(url: string) {
  try { return new URL(url).hostname.replace("www.", ""); } catch { return url; }
}

function avatarColor(s: string) {
  const colors = ["#F97316", "#EF4444", "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EC4899", "#6366F1"];
  let hash = 0;
  for (let i = 0; i < s.length; i++) hash = s.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export default function ExplorePage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Logged in users go to dashboard explore tab
    fetch("/api/testers/me").then(r => r.json()).then(d => {
      if (d.id) { router.push("/dashboard?tab=explore"); return; }
    }).catch(() => {});
    fetch("/api/orders").then(r => r.json()).then(d => {
      setJobs(d.jobs || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [router]);

  const filtered = jobs
    .filter(j => {
      const q = search.toLowerCase();
      if (q && !dom(j.app_url).toLowerCase().includes(q) && !(j.description || "").toLowerCase().includes(q) && !(j.app_type || "").toLowerCase().includes(q)) return false;
      if (typeFilter !== "All" && (j.app_type || "").toLowerCase() !== typeFilter.toLowerCase()) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === "Highest pay") return (b.price_per_tester_cents || 0) - (a.price_per_tester_cents || 0);
      if (sort === "Most spots") return (b.testers_count - b.accepted_count) - (a.testers_count - a.accepted_count);
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Simple top bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/[0.04]">
        <div className="max-w-[1100px] mx-auto px-5 md:px-10 h-[56px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Flinchify" width={28} height={28} />
            <span className="h text-[15px] font-bold text-[var(--text)]">Flinchify</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-[13px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors font-medium">Home</Link>
            <button onClick={() => window.dispatchEvent(new CustomEvent("open-auth", { detail: "tester" }))} className="btn btn-accent text-[13px] !py-2 !px-5">Sign up</button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-[1100px] mx-auto px-5 md:px-10 py-10">
        <h1 className="h text-[22px] md:text-[28px] font-bold text-[var(--text)] mb-2">Explore opportunities</h1>
        <p className="text-[14px] text-[var(--text-muted)] mb-8">Get paid to test real apps. Sign up to start earning.</p>

        {/* Search + sort */}
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setShowFilters(!showFilters)} className="w-10 h-10 rounded-xl border border-black/[0.08] flex items-center justify-center shrink-0 hover:bg-black/[0.02] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          </button>
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder="Search jobs..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full h-10 rounded-xl border border-black/[0.08] pl-10 pr-4 text-[13px] text-[var(--text)] placeholder:text-[var(--text-dim)] focus:outline-none focus:border-black/[0.15]" />
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="h-10 rounded-xl border border-black/[0.08] px-3 text-[13px] text-[var(--text-muted)] bg-white focus:outline-none shrink-0">
            {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>

        {/* Filter chips */}
        {showFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {TYPE_FILTERS.map(f => (
              <button key={f} onClick={() => setTypeFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-colors ${
                  typeFilter === f ? "bg-black text-white border-black" : "bg-white text-[var(--text-muted)] border-black/[0.08] hover:border-black/[0.15]"
                }`}>{f}</button>
            ))}
          </div>
        )}

        {/* Jobs grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="rounded-xl border border-black/[0.06] p-5 animate-pulse">
                <div className="h-4 bg-black/[0.04] rounded w-2/3 mb-2" /><div className="h-3 bg-black/[0.03] rounded w-1/3 mb-6" /><div className="h-3 bg-black/[0.03] rounded w-full" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--text-muted)] text-[15px]">{search || typeFilter !== "All" ? "No jobs match your filters." : "No active test jobs right now."}</p>
            <p className="text-[13px] text-[var(--text-dim)] mt-1">Check back soon or post your own test.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(job => {
              const pay = (job.price_per_tester_cents || 0) / 100;
              const spots = job.testers_count - job.accepted_count;
              const hostname = dom(job.app_url);
              return (
                <div key={job.id} className="rounded-xl border border-black/[0.06] p-5 hover:border-black/[0.12] hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="h text-[14px] font-semibold text-[var(--text)] line-clamp-1">{hostname}</h3>
                      {job.app_type && <span className="text-[11px] text-[var(--text-dim)]">{job.app_type}</span>}
                    </div>
                    <p className="h text-[16px] font-bold text-[var(--text)] shrink-0">${pay.toFixed(0)}</p>
                  </div>
                  {job.description && <p className="text-[12px] text-[var(--text-dim)] line-clamp-2 mb-3">{job.description}</p>}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <div className="flex -space-x-1.5">
                        {Array.from({ length: Math.min(job.applications_count, 3) }).map((_, i) => (
                          <div key={i} className="w-5 h-5 rounded-full border-2 border-white text-[8px] font-bold text-white flex items-center justify-center"
                            style={{ backgroundColor: avatarColor(`${job.id}-${i}`) }} />
                        ))}
                      </div>
                      <span className="text-[11px] text-[var(--text-dim)] ml-1">{job.applications_count} applied</span>
                    </div>
                    <span className="text-[11px] text-[var(--text-dim)]">{spots > 0 ? `${spots} spots` : "Full"}</span>
                  </div>
                  <button onClick={() => window.dispatchEvent(new CustomEvent("open-auth", { detail: "tester" }))} className="block w-full py-2 rounded-lg bg-black text-white text-[12px] font-semibold text-center hover:bg-black/90 transition-colors">
                    Sign up to apply
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16 py-10 border-t border-black/[0.06]">
          <h2 className="h text-[18px] font-bold text-[var(--text)] mb-2">Ready to start earning?</h2>
          <p className="text-[14px] text-[var(--text-muted)] mb-4">Sign up and get paid for your feedback.</p>
          <button onClick={() => window.dispatchEvent(new CustomEvent("open-auth", { detail: "tester" }))} className="btn btn-primary">Get started</button>
        </div>
      </main>
    </div>
  );
}
