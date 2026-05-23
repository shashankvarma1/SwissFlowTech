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
  { icon: "🌍", title: "Remote-First",    desc: "Work from anywhere. Team across India and beyond." },
  { icon: "📈", title: "Equity Package",  desc: "Meaningful equity in a fast-growing startup." },
  { icon: "🏖️", title: "Unlimited PTO",  desc: "We trust you to get the work done." },
  { icon: "🎓", title: "Learning Budget", desc: "₹50,000/year for courses, conferences, and books." },
  { icon: "💻", title: "Top Hardware",    desc: "Latest MacBook Pro and peripherals — your choice." },
  { icon: "🏥", title: "Health Coverage", desc: "Comprehensive health, dental, and vision insurance." },
];

export default function Careers() {
  const router = useRouter();
  const [jobs, setJobs]               = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [form, setForm]               = useState<AppForm>({ cover_letter: "", resume: null });
  const [status, setStatus]           = useState<"idle" | "loading" | "success" | "error" | "duplicate">("idle");
  const [authChecking, setAuthChecking] = useState(false);

  useEffect(() => {
    supabase?.from("job_postings").select("*").eq("is_active", true).order("created_at", { ascending: false })
      .then(({ data }) => setJobs((data as Job[]) || []));
  }, []);

  async function handleApplyClick(job: Job) {
    setAuthChecking(true);
    const { data: { session } } = await supabase!.auth.getSession();
    setAuthChecking(false);
    if (!session) { router.push(`/auth?redirect=/careers`); return; }
    setSelectedJob(job);
    setForm({ cover_letter: "", resume: null });
    setStatus("idle");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedJob) return;
    setStatus("loading");

    const { data: { session } } = await supabase!.auth.getSession();
    if (!session) { router.push("/auth"); return; }

    let resume_url      = null;
    let resume_filename = null;
    let resume_path     = null;

    if (form.resume) {
      const ext  = form.resume.name.split(".").pop();
      const path = `${session.user.id}/${selectedJob.id}.${ext}`;
      resume_path = path;

      const { error: uploadError } = await supabase!.storage
        .from("resumes")
        .upload(path, form.resume, { upsert: true, contentType: form.resume.type });

      if (uploadError) { setStatus("error"); return; }

      const { data: urlData, error: urlError } = await supabase!.storage
        .from("resumes")
        .createSignedUrl(path, 60 * 60 * 24 * 365);

      if (urlError || !urlData?.signedUrl) { setStatus("error"); return; }

      resume_url      = urlData.signedUrl;
      resume_filename = form.resume.name;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from("applications").insert([{
      job_id:       selectedJob.id,
      user_id:      session.user.id,
      cover_letter: form.cover_letter || null,
      resume_url,
      resume_filename,
    }]);

    if (error?.code === "23505") { setStatus("duplicate"); return; }
    if (error) { setStatus("error"); return; }

    const applicantName = session.user.user_metadata?.full_name || session.user.email || "Candidate";

    await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "job",
        data: {
          job_title:      selectedJob.title,
          applicant_name: applicantName,
          email:          session.user.email,
          resume_url,
          resume_path,
          resume_filename,
          cover_letter:   form.cover_letter || "—",
        },
      }),
    });

    await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "application_confirmation",
        data: {
          email:     session.user.email,
          name:      applicantName,
          job_title: selectedJob.title,
        },
      }),
    });

    setStatus("success");
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "100px 2rem 80px", textAlign: "center", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div className="label-chip anim-fade-up" style={{ marginBottom: 24 }}>We&apos;re Hiring</div>
          <h1 className="anim-fade-up-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 7vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 20, lineHeight: 1.1 }}>
            Build the future<br /><span className="text-grad">with us</span>
          </h1>
          <p className="anim-fade-up-2" style={{ color: "var(--text-2)", fontSize: "1.05rem", lineHeight: 1.75 }}>
            Join a remote-first team building world-class digital products from Hyderabad.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section style={{ padding: "60px 2rem", background: "var(--bg-card)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem" }}>
          {perks.map((p) => (
            <div key={p.title} className="card" style={{ padding: "1.5rem", textAlign: "center" }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{p.icon}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1rem", marginBottom: 6 }}>{p.title}</h3>
              <p style={{ color: "var(--text-2)", fontSize: "0.82rem", lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Jobs */}
      <section style={{ padding: "80px 2rem", maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="label-chip" style={{ marginBottom: 16 }}>Open Roles</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 2.8rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            {jobs.length} open position{jobs.length !== 1 ? "s" : ""}
          </h2>
        </div>

        {jobs.length === 0 ? (
          <div className="card" style={{ padding: "4rem", textAlign: "center" }}>
            <p style={{ color: "var(--text-3)" }}>No open positions right now. Check back soon!</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {jobs.map((job) => (
              <div key={job.id} className="card" style={{ padding: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", marginBottom: 8 }}>{job.title}</h3>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {[job.type, job.location, job.department].filter(Boolean).map((tag) => (
                        <span key={tag} style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--accent)", background: "var(--accent-soft)", border: "1px solid #bfdbfe", padding: "3px 10px", borderRadius: 99 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    {job.salary && (
                      <span style={{ color: "var(--text-2)", fontSize: "0.875rem", fontWeight: 500 }}>{job.salary}</span>
                    )}
                    <button
                      className="btn btn-primary"
                      onClick={() => handleApplyClick(job)}
                      disabled={authChecking}
                      style={{ padding: "9px 22px", borderRadius: 9, fontSize: "0.85rem" }}
                    >
                      Apply Now →
                    </button>
                  </div>
                </div>
                <p style={{ color: "var(--text-2)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: 14 }}>{job.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {job.requirements?.map((r) => (
                    <span key={r} style={{ fontSize: "0.72rem", color: "var(--text-2)", background: "var(--bg-muted)", border: "1px solid var(--border)", padding: "3px 10px", borderRadius: 99 }}>{r}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
          onClick={() => { setSelectedJob(null); setStatus("idle"); }}
        >
          <div
            className="card"
            style={{ padding: "2.5rem", maxWidth: 520, width: "100%", maxHeight: "90vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", marginBottom: 10 }}>Application Submitted!</h2>
                <p style={{ color: "var(--text-2)", lineHeight: 1.7, marginBottom: 20 }}>We&apos;ll review it and update your portal within 3 business days.</p>
                <button className="btn btn-primary" onClick={() => router.push("/portal")} style={{ padding: "10px 24px", borderRadius: 9 }}>View Portal →</button>
              </div>
            ) : status === "duplicate" ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.3rem", marginBottom: 10 }}>Already Applied</h2>
                <p style={{ color: "var(--text-2)", marginBottom: 20 }}>You&apos;ve already applied for this role. Track it in your portal.</p>
                <button className="btn btn-primary" onClick={() => router.push("/portal")} style={{ padding: "10px 24px", borderRadius: 9 }}>View Portal →</button>
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.4rem", marginBottom: 4 }}>
                  Apply: {selectedJob.title}
                </h2>
                <p style={{ color: "var(--text-3)", fontSize: "0.82rem", marginBottom: 24 }}>
                  {[selectedJob.department, selectedJob.type, selectedJob.location].filter(Boolean).join(" · ")}
                </p>
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", color: "var(--text-2)", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>
                      Upload Resume (PDF/DOC) *
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      required
                      className="input"
                      style={{ padding: "8px 14px", cursor: "pointer" }}
                      onChange={(e) => setForm({ ...form, resume: e.target.files?.[0] || null })}
                    />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: "block", color: "var(--text-2)", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>
                      Cover Letter (optional)
                    </label>
                    <textarea
                      className="input"
                      rows={4}
                      placeholder="Why are you excited about this role?"
                      style={{ resize: "vertical" }}
                      value={form.cover_letter}
                      onChange={(e) => setForm({ ...form, cover_letter: e.target.value })}
                    />
                  </div>
                  {status === "error" && (
                    <p style={{ color: "#dc2626", fontSize: "0.82rem", marginBottom: 12 }}>
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={status === "loading"}
                      style={{ flex: 1, padding: "12px", borderRadius: 9 }}
                    >
                      {status === "loading" ? "Submitting..." : "Submit Application →"}
                    </button>
                    <button
                      className="btn btn-ghost"
                      type="button"
                      onClick={() => { setSelectedJob(null); setStatus("idle"); }}
                      style={{ padding: "12px 18px", borderRadius: 9 }}
                    >
                      Cancel
                    </button>
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