"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { submitJobApplication } from "../../lib/supabase";

const jobs = [
  {
    title: "Senior Full-Stack Engineer",
    type: "Remote",
    dept: "Engineering",
    desc: "Build scalable Next.js and Supabase applications for high-growth startup clients. You'll own features end-to-end, from API design to production deployment.",
    requirements: ["5+ years React/Next.js", "TypeScript proficiency", "PostgreSQL / Supabase", "Cloud deployment (AWS/Vercel)", "Strong communication"],
    salary: "CHF 110,000 – 140,000",
  },
  {
    title: "AI/ML Engineer",
    type: "Remote",
    dept: "AI",
    desc: "Design and implement AI features for client products — RAG pipelines, LLM integrations, fine-tuning workflows, and evaluation frameworks.",
    requirements: ["Python + PyTorch/JAX", "LLM API experience", "Vector databases (Pinecone, pgvector)", "MLOps / model serving", "Research background a plus"],
    salary: "CHF 120,000 – 160,000",
  },
  {
    title: "Product Designer",
    type: "Hybrid (Zurich)",
    dept: "Design",
    desc: "Own the design process for multiple client products — user research, design systems, high-fidelity prototypes, and design QA.",
    requirements: ["3+ years product design", "Figma mastery", "Design systems experience", "User research methods", "Motion design a plus"],
    salary: "CHF 90,000 – 120,000",
  },
  {
    title: "DevOps / Infrastructure Engineer",
    type: "Remote",
    dept: "Engineering",
    desc: "Build and maintain cloud infrastructure for our clients and internal platforms. You care deeply about reliability, security, and cost efficiency.",
    requirements: ["AWS / GCP experience", "Kubernetes & Docker", "Terraform / IaC", "Monitoring & observability", "Security best practices"],
    salary: "CHF 100,000 – 135,000",
  },
];

const perks = [
  { icon: "🌍", title: "Remote-First", desc: "Work from anywhere. We have team members across 8 countries." },
  { icon: "📈", title: "Equity Package", desc: "Meaningful equity in a fast-growing startup with real upside." },
  { icon: "🏖️", title: "Unlimited PTO", desc: "Recharge when you need to. We trust you to get the work done." },
  { icon: "🎓", title: "Learning Budget", desc: "CHF 2,000/year for courses, conferences, and books." },
  { icon: "💻", title: "Top Hardware", desc: "Latest MacBook Pro, monitors, and peripherals — your choice." },
  { icon: "🏥", title: "Health Coverage", desc: "Comprehensive health, dental, and vision insurance." },
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [form, setForm] = useState({ applicant_name: "", email: "", linkedin_url: "", cover_letter: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleApply(e: React.FormEvent) {
  e.preventDefault();
  if (!selectedJob) return;
  setStatus("loading");

  const { error } = await submitJobApplication({ job_title: selectedJob, ...form });
  if (error) { setStatus("error"); return; }

  await fetch('/api/notify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'job', data: { job_title: selectedJob, ...form } }),
  });

  setStatus("success");
}

  return (
    <main style={{ minHeight: "100vh", background: "#040810" }}>
      <Navbar />

      {/* Hero */}
      <section
        className="grid-bg"
        style={{ padding: "100px 2rem 80px", textAlign: "center", position: "relative", overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)",
            width: 600, height: 300, borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 70%)",
            filter: "blur(40px)", pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
          <div className="section-label animate-fade-up" style={{ marginBottom: 24 }}>We&apos;re Hiring</div>
          <h1
            className="animate-fade-up-1"
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2.5rem, 7vw, 4rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: 20,
              lineHeight: 1.1,
            }}
          >
            Build the future
            <br />
            <span className="text-gradient">with us</span>
          </h1>
          <p className="animate-fade-up-2" style={{ color: "#8b9fc9", fontSize: "1.05rem", lineHeight: 1.75 }}>
            Join a remote-first team of engineers, designers, and AI researchers building
            world-class digital products for the most ambitious startups on the planet.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section
        style={{
          padding: "80px 2rem",
          background: "rgba(8,14,28,0.5)",
          borderTop: "1px solid rgba(99,179,237,0.08)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "2rem", letterSpacing: "-0.02em" }}>
              Why you&apos;ll love it here
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            {perks.map((p, i) => (
              <div
                key={i}
                className="glass-card"
                style={{ borderRadius: 16, padding: "1.5rem", textAlign: "center" }}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: 8 }}>
                  {p.title}
                </h3>
                <p style={{ color: "#8b9fc9", fontSize: "0.83rem", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section style={{ padding: "100px 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="section-label" style={{ marginBottom: 20 }}>Open Roles</div>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 2.8rem)", letterSpacing: "-0.02em" }}>
            {jobs.length} open positions
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {jobs.map((job, i) => (
            <div
              key={i}
              className="glass-card"
              style={{ borderRadius: 20, padding: "2rem" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.15rem", marginBottom: 6 }}>
                    {job.title}
                  </h3>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#60a5fa", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", padding: "3px 10px", borderRadius: 99 }}>
                      {job.type}
                    </span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#8b9fc9", background: "rgba(139,159,201,0.08)", border: "1px solid rgba(139,159,201,0.15)", padding: "3px 10px", borderRadius: 99 }}>
                      {job.dept}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#60a5fa", fontSize: "0.88rem", fontWeight: 600, marginBottom: 8 }}>
                    {job.salary}
                  </div>
                  <button
                    className="btn-primary"
                    onClick={() => setSelectedJob(job.title)}
                    style={{ padding: "8px 20px", borderRadius: 10, fontSize: "0.85rem" }}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
              <p style={{ color: "#8b9fc9", fontSize: "0.88rem", lineHeight: 1.65, marginBottom: 14 }}>
                {job.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {job.requirements.map((r) => (
                  <span
                    key={r}
                    style={{ fontSize: "0.75rem", color: "#8b9fc9", background: "rgba(139,159,201,0.06)", border: "1px solid rgba(139,159,201,0.12)", padding: "3px 10px", borderRadius: 99 }}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(4,8,16,0.85)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => { setSelectedJob(null); setStatus("idle"); }}
        >
          <div
            style={{
              background: "#080e1c",
              border: "1px solid rgba(99,179,237,0.2)",
              borderRadius: 24,
              padding: "2.5rem",
              maxWidth: 540,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.4rem", marginBottom: 6 }}>
              Apply: {selectedJob}
            </h2>
            <p style={{ color: "#4a5a7a", fontSize: "0.85rem", marginBottom: 24 }}>
              Applications are stored securely and reviewed within 3 business days.
            </p>

            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.2rem", marginBottom: 8 }}>
                  Application Received!
                </h3>
                <p style={{ color: "#8b9fc9", fontSize: "0.9rem" }}>
                  We&apos;ll review your application and be in touch within 3 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply}>
                {[
                  { label: "Full Name", key: "applicant_name", type: "text", placeholder: "Jane Smith" },
                  { label: "Email", key: "email", type: "email", placeholder: "jane@example.com" },
                  { label: "LinkedIn URL (optional)", key: "linkedin_url", type: "url", placeholder: "https://linkedin.com/in/..." },
                ].map((field) => (
                  <div key={field.key} style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", color: "#8b9fc9", fontSize: "0.82rem", fontWeight: 600, marginBottom: 6 }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      className="input-field"
                      placeholder={field.placeholder}
                      required={field.key !== "linkedin_url"}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      style={{ padding: "10px 14px", borderRadius: 10 }}
                    />
                  </div>
                ))}

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", color: "#8b9fc9", fontSize: "0.82rem", fontWeight: 600, marginBottom: 6 }}>
                    Cover Letter (optional)
                  </label>
                  <textarea
                    className="input-field"
                    placeholder="Tell us why you'd be a great fit..."
                    rows={4}
                    value={form.cover_letter}
                    onChange={(e) => setForm({ ...form, cover_letter: e.target.value })}
                    style={{ padding: "10px 14px", borderRadius: 10, resize: "vertical" }}
                  />
                </div>

                {status === "error" && (
                  <p style={{ color: "#ef4444", fontSize: "0.85rem", marginBottom: 12 }}>
                    Something went wrong. Please try again.
                  </p>
                )}

                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={status === "loading"}
                    style={{ padding: "12px 24px", borderRadius: 12, flex: 1, fontSize: "0.9rem" }}
                  >
                    {status === "loading" ? "Submitting..." : "Submit Application →"}
                  </button>
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => { setSelectedJob(null); setStatus("idle"); }}
                    style={{ padding: "12px 20px", borderRadius: 12 }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
