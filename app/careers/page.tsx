"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Job = {
  id: string;
  title: string;
  department: string | null;
  type: string | null;
  location: string | null;
  salary: string | null;
  description: string | null;
  requirements: string[] | null;
};

type AppForm = {
  cover_letter: string;
  resume: File | null;
};

const perks = [
  { icon: "🌍", title: "Remote-First", desc: "Work from anywhere. Team across India and beyond." },
  { icon: "📈", title: "Equity Package", desc: "Meaningful equity in a fast-growing startup." },
  { icon: "🏖️", title: "Unlimited PTO", desc: "We trust you to get the work done." },
  { icon: "🎓", title: "Learning Budget", desc: "₹50,000/year for courses, conferences, and books." },
  { icon: "💻", title: "Top Hardware", desc: "Latest MacBook Pro and peripherals — your choice." },
  { icon: "🏥", title: "Health Coverage", desc: "Comprehensive health, dental, and vision insurance." },
];

export default function Careers() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [form, setForm] = useState<AppForm>({ cover_letter: "", resume: null });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "duplicate">("idle");
  const [authChecking, setAuthChecking] = useState(false);

  useEffect(() => {
    supabase.from("job_postings").select("*").eq("is_active", true).order("created_at", { ascending: false })
      .then(({ data }) => setJobs((data as Job[]) || []));
  }, []);

  async function handleApplyClick(job: Job) {
    setAuthChecking(true);
    const { data: { session } } = await supabase.auth.getSession();
    setAuthChecking(false);
    if (!session) {
      router.push(`/auth?redirect=/careers`);
      return;
    }
    setSelectedJob(job);
    setForm({ cover_letter: "", resume: null });
    setStatus("idle");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedJob) return;
    setStatus("loading");

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { router.push("/auth"); return; }

    let resume_url = null;
    let resume_filename = null;

    if (form.resume) {
      const ext = form.resume.name.split(".").pop();
      const path = `${session.user.id}/${selectedJob.id}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(path, form.resume, { upsert: true });
      if (uploadError) { setStatus("error"); return; }
      const { data: urlData } = await supabase.storage.from("resumes").createSignedUrl(path, 60 * 60 * 24 * 365);
      resume_url = urlData?.signedUrl || null;
      resume_filename = form.resume.name;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
const { error } = await (supabase as any).from("applications").insert([{
      job_id: selectedJob.id,
      user_id: session.user.id,
      cover_letter: form.cover_letter || null,
      resume_url,
      resume_filename,
    }]);

    if (error?.code === "23505") { setStatus("duplicate"); return; }
    if (error) { setStatus("error"); return; }

    // Notify admin
    // Notify admin
    await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "job",
        data: {
          job_title: selectedJob.title,
          applicant_name: session.user.user_metadata?.full_name || session.user.email,
          email: session.user.email,
          resume_url,
          cover_letter: form.cover_letter,
        },
      }),
    });

    // Confirm to candidate
    await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "application_confirmation",
        data: {
          email: session.user.email,
          name: session.user.user_metadata?.full_name || "",
          job_title: selectedJob.title,
        },
      }),
    });
    setStatus("success");
  }

  return (
    <main style={{ minHeight: "100vh", background: "#03060f" }}>
      <Navbar />

      {/* Hero */}
      <section className="grid-dots" style={{ padding: "100px 2rem 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 600, height: 300, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(109,40,217,0.15) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
          <div className="label-chip anim-fade-up" style={{ marginBottom: 24 }}>We&apos;re Hiring</div>
          <h1 className="anim-fade-up-1" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem,7vw,4rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 20, lineHeight: 1.1 }}>
            Build the future<br /><span className="text-grad">with us</span>
          </h1>
          <p className="anim-fade-up-2" style={{ color: "#94a3b8", fontSize: "1.05rem", lineHeight: 1.75 }}>
            Join a remote-first team building world-class digital products from Hyderabad.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section style={{ padding: "60px 2rem", background: "rgba(7,13,26,0.5)", borderTop: "1px solid rgba(99,179,237,0.08)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem" }}>
          {perks.map((p) => (
            <div key={p.title} className="card" style={{ padding: "1.5rem", textAlign: "center" }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{p.icon}</div>
              <h3 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: 6 }}>{p.title}</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.8rem", lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Jobs */}
      <section style={{ padding: "80px 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="label-chip" style={{ marginBottom: 16 }}>Open Roles</div>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem,5vw,2.8rem)", fontWeight: 800 }}>{jobs.length} open positions</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {jobs.map((job) => (
            <div key={job.id} className="card" style={{ padding: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
                <div>
                  <h3 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.15rem", marginBottom: 8 }}>{job.title}</h3>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {[job.type, job.location, job.department].filter(Boolean).map((tag) => (
                      <span key={tag} style={{ fontSize: "0.72rem", fontWeight: 600, color: "#60a5fa", background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)", padding: "3px 10px", borderRadius: 99 }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ color: "#34d399", fontSize: "0.88rem", fontWeight: 600 }}>{job.salary}</span>
                  <button className="btn btn-primary" onClick={() => handleApplyClick(job)} disabled={authChecking}
                    style={{ padding: "9px 22px", borderRadius: 10, fontSize: "0.85rem" }}>
                    Apply Now →
                  </button>
                </div>
              </div>
              <p style={{ color: "#94a3b8", fontSize: "0.88rem", lineHeight: 1.65, marginBottom: 12 }}>{job.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {job.requirements?.map((r) => (
                  <span key={r} style={{ fontSize: "0.72rem", color: "#94a3b8", background: "rgba(148,163,184,0.06)", border: "1px solid rgba(148,163,184,0.12)", padding: "3px 10px", borderRadius: 99 }}>{r}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(3,6,15,0.88)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
          onClick={() => { setSelectedJob(null); setStatus("idle"); }}>
          <div style={{ background: "#070d1a", border: "1px solid rgba(99,179,237,0.2)", borderRadius: 24, padding: "2.5rem", maxWidth: 540, width: "100%", maxHeight: "90vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}>

            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <h2 style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "1.4rem", marginBottom: 10 }}>Application Submitted!</h2>
                <p style={{ color: "#94a3b8", lineHeight: 1.7, marginBottom: 20 }}>We&apos;ll review it and update your portal within 3 business days.</p>
                <button className="btn btn-primary" onClick={() => router.push("/portal")} style={{ padding: "10px 24px", borderRadius: 10 }}>View Portal →</button>
              </div>
            ) : status === "duplicate" ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
                <h2 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: 10 }}>Already Applied</h2>
                <p style={{ color: "#94a3b8", marginBottom: 20 }}>You&apos;ve already applied for this role. Track it in your portal.</p>
                <button className="btn btn-primary" onClick={() => router.push("/portal")} style={{ padding: "10px 24px", borderRadius: 10 }}>View Portal →</button>
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "1.4rem", marginBottom: 4 }}>Apply: {selectedJob.title}</h2>
                <p style={{ color: "#475569", fontSize: "0.82rem", marginBottom: 24 }}>{selectedJob.department} · {selectedJob.type} · {selectedJob.location}</p>
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", color: "#94a3b8", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Upload Resume (PDF/DOC) *</label>
                    <input type="file" accept=".pdf,.doc,.docx" required className="input" style={{ padding: "8px 14px", cursor: "pointer" }}
                      onChange={(e) => setForm({ ...form, resume: e.target.files?.[0] || null })} />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: "block", color: "#94a3b8", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Cover Letter (optional)</label>
                    <textarea className="input" rows={4} placeholder="Why are you excited about this role?" style={{ resize: "vertical" }}
                      value={form.cover_letter} onChange={(e) => setForm({ ...form, cover_letter: e.target.value })} />
                  </div>
                  {status === "error" && <p style={{ color: "#ef4444", fontSize: "0.82rem", marginBottom: 12 }}>Something went wrong. Please try again.</p>}
                  <div style={{ display: "flex", gap: 10 }}>
                    <button className="btn btn-primary" type="submit" disabled={status === "loading"} style={{ flex: 1, padding: "12px", borderRadius: 10 }}>
                      {status === "loading" ? "Submitting..." : "Submit Application →"}
                    </button>
                    <button className="btn btn-ghost" type="button" onClick={() => { setSelectedJob(null); setStatus("idle"); }} style={{ padding: "12px 18px", borderRadius: 10 }}>Cancel</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}