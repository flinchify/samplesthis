"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Job {
  id: number; app_url: string; app_type: string | null; description: string | null;
  target_audience: string | null; testers_count: number; price_per_tester_cents: number;
  status: string; created_at: string; time_limit_hours: number;
  test_mode: string; tasks: string; private_listing: boolean;
  poster_name: string | null; poster_id: number | null; poster_bio: string | null;
  poster_rating: number | null; poster_location: string | null;
  poster_linkedin: string | null; poster_twitter: string | null; poster_github: string | null;
  applications_count: number; accepted_count: number;
}

function dom(url: string) {
  try { return new URL(url).hostname.replace("www.", ""); } catch { return url; }
}

function timeAgo(d: string) {
  const mins = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
  return `${Math.floor(mins / 1440)}d ago`;
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [applyNote, setApplyNote] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then(r => r.json())
      .then(d => { if (d.job) setJob(d.job); setLoading(false); })
      .catch(() => setLoading(false));
  }, [params.id]);

  const handleApply = async () => {
    setApplying(true); setError("");
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: job?.id, note: applyNote }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setApplied(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to apply");
    }
    setApplying(false);
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <div style={{ width: 32, height: 32, border: "3px solid var(--border)", borderTopColor: "#F97316", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!job) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--bg)", gap: 16 }}>
        <p style={{ fontSize: 18, fontWeight: 600, color: "var(--text)" }}>Job not found</p>
        <Link href="/dashboard?tab=explore" style={{ fontSize: 14, color: "#F97316" }}>← Back to jobs</Link>
      </div>
    );
  }

  const spotsLeft = job.testers_count - job.accepted_count;
  const tasks = (() => { try { return JSON.parse(job.tasks); } catch { return []; } })() as string[];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <Image src="/logo.png" alt="Flinchify" width={24} height={24} />
          <span style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", fontFamily: "var(--font-sora)" }}>Flinchify</span>
        </Link>
        <Link href="/dashboard?tab=explore" style={{ fontSize: 13, color: "#F97316", textDecoration: "none", fontWeight: 500 }}>← All jobs</Link>
      </header>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px 64px" }}>
        {/* Title area */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
            {job.app_type && <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, background: "rgba(249,115,22,0.08)", color: "#F97316", fontWeight: 500 }}>{job.app_type}</span>}
            <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{timeAgo(job.created_at)}</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "var(--text)", margin: "0 0 8px", fontFamily: "var(--font-sora)" }}>
            Test {dom(job.app_url)}
          </h1>
          <a href={job.app_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: "#F97316", textDecoration: "none" }}>
            {job.app_url} ↗
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32, alignItems: "start" }}>
          {/* Left — details */}
          <div>
            {/* Description / Tasks */}
            <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", margin: "0 0 12px" }}>
                {job.test_mode === "tasks" ? "Tasks" : "What to do"}
              </h2>
              {job.test_mode === "tasks" && tasks.length > 0 ? (
                <ol style={{ margin: 0, paddingLeft: 20, listStyle: "decimal" }}>
                  {tasks.map((t: string, i: number) => (
                    <li key={i} style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 4 }}>{t}</li>
                  ))}
                </ol>
              ) : (
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>{job.description || "Use the app freely and report any issues."}</p>
              )}
            </div>

            {/* Target audience */}
            {job.target_audience && (
              <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 12, padding: 24, marginBottom: 16 }}>
                <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", margin: "0 0 8px" }}>Ideal tester</h2>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0 }}>{job.target_audience}</p>
              </div>
            )}

            {/* Details grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 12, padding: 20 }}>
                <p style={{ fontSize: 11, color: "var(--text-dim)", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Pay per test</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", margin: 0 }}>${(job.price_per_tester_cents / 100).toFixed(0)}</p>
              </div>
              <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 12, padding: 20 }}>
                <p style={{ fontSize: 11, color: "var(--text-dim)", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Spots left</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: spotsLeft > 0 ? "#16A34A" : "#EF4444", margin: 0 }}>{spotsLeft}/{job.testers_count}</p>
              </div>
              <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 12, padding: 20 }}>
                <p style={{ fontSize: 11, color: "var(--text-dim)", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Time limit</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", margin: 0 }}>{job.time_limit_hours}h</p>
              </div>
              <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 12, padding: 20 }}>
                <p style={{ fontSize: 11, color: "var(--text-dim)", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Applicants</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", margin: 0 }}>{job.applications_count}</p>
              </div>
            </div>

            {/* Poster info */}
            {!job.private_listing && job.poster_name && (
              <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 12, padding: 24, marginTop: 16 }}>
                <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", margin: "0 0 12px" }}>Posted by</h2>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#F97316", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 700, flexShrink: 0 }}>
                    {job.poster_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", margin: 0 }}>{job.poster_name}</p>
                    {job.poster_location && <p style={{ fontSize: 12, color: "var(--text-dim)", margin: "2px 0 0" }}>{job.poster_location}</p>}
                    {job.poster_rating && Number(job.poster_rating) > 0 && (
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                        {[1,2,3,4,5].map(s => (
                          <span key={s} style={{ fontSize: 14, color: s <= Math.round(Number(job.poster_rating)) ? "#F97316" : "rgba(0,0,0,0.1)" }}>★</span>
                        ))}
                        <span style={{ fontSize: 11, color: "var(--text-dim)", marginLeft: 4 }}>{Number(job.poster_rating).toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>
                {job.poster_bio && <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "12px 0 0", lineHeight: 1.6 }}>{job.poster_bio}</p>}
                {(job.poster_linkedin || job.poster_twitter || job.poster_github) && (
                  <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                    {job.poster_linkedin && <a href={job.poster_linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#F97316" }}>LinkedIn ↗</a>}
                    {job.poster_twitter && <a href={`https://x.com/${job.poster_twitter}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#F97316" }}>X ↗</a>}
                    {job.poster_github && <a href={`https://github.com/${job.poster_github}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#F97316" }}>GitHub ↗</a>}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right — apply card */}
          <div style={{ position: "sticky", top: 24 }}>
            <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 16, padding: 28 }}>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <p style={{ fontSize: 28, fontWeight: 700, color: "var(--text)", margin: "0 0 4px" }}>${(job.price_per_tester_cents / 100).toFixed(0)}</p>
                <p style={{ fontSize: 12, color: "var(--text-dim)", margin: 0 }}>per completed test</p>
              </div>

              {applied ? (
                <div style={{ textAlign: "center", padding: "16px 0" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(22,163,74,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#16A34A", margin: "0 0 4px" }}>Applied!</p>
                  <p style={{ fontSize: 12, color: "var(--text-dim)" }}>You'll be notified when the poster reviews your application.</p>
                </div>
              ) : spotsLeft <= 0 ? (
                <div style={{ textAlign: "center", padding: "16px 0" }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#EF4444" }}>All spots filled</p>
                </div>
              ) : (
                <>
                  <textarea
                    placeholder="Why are you a good fit for this test? (optional)"
                    value={applyNote}
                    onChange={e => setApplyNote(e.target.value)}
                    style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid rgba(0,0,0,0.08)", fontSize: 13, resize: "vertical", minHeight: 80, marginBottom: 12, fontFamily: "inherit" }}
                  />
                  {error && <p style={{ fontSize: 12, color: "#EF4444", margin: "0 0 8px" }}>{error}</p>}
                  <button
                    onClick={handleApply}
                    disabled={applying}
                    style={{
                      width: "100%", padding: "14px 0", borderRadius: 10, border: "none",
                      background: "#F97316", color: "white", fontSize: 15, fontWeight: 600,
                      cursor: applying ? "wait" : "pointer", opacity: applying ? 0.6 : 1,
                    }}>
                    {applying ? "Applying..." : "Apply for this test"}
                  </button>
                </>
              )}

              <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-dim)", marginBottom: 6 }}>
                  <span>Time limit</span><span style={{ fontWeight: 500, color: "var(--text)" }}>{job.time_limit_hours} hours</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-dim)", marginBottom: 6 }}>
                  <span>Spots</span><span style={{ fontWeight: 500, color: "var(--text)" }}>{spotsLeft} of {job.testers_count} left</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-dim)" }}>
                  <span>Type</span><span style={{ fontWeight: 500, color: "var(--text)" }}>{job.test_mode === "tasks" ? "Task-based" : "Free exploration"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 768px) {
          [style*="gridTemplateColumns: 1fr 320px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
