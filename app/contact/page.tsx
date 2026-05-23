"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { submitContactForm } from "../../lib/supabase";

const services = ["Web Development", "AI Solutions", "Cloud Deployment", "UI/UX Design", "E-Commerce", "Custom Software", "Other"];

export default function Contact() {
  const [form, setForm]     = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const { error } = await submitContactForm(form);
    if (error) { setStatus("error"); return; }
    await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "contact", data: form }),
    });
    setStatus("success");
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      <section style={{ padding: "100px 2rem 80px", textAlign: "center", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div className="label-chip anim-fade-up" style={{ marginBottom: 24 }}>Contact</div>
          <h1 className="anim-fade-up-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 7vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 20, lineHeight: 1.1 }}>
            Let&apos;s build<br /><span className="text-grad">something great</span>
          </h1>
          <p className="anim-fade-up-2" style={{ color: "var(--text-2)", fontSize: "1.05rem", lineHeight: 1.75 }}>
            Tell us about your project. We&apos;ll respond within 1 business day.
          </p>
        </div>
      </section>

      <section style={{ padding: "60px 2rem 100px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "4rem", alignItems: "start" }}>

          {/* Info */}
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", marginBottom: 24 }}>Get in touch</h2>
            {[
              { icon: "📧", label: "Email",     value: "swissflowtech@gmail.com" },
              { icon: "📍", label: "Location",  value: "Hyderabad, Telangana, India" },
              { icon: "🕐", label: "Response",  value: "Within 1 business day" },
              { icon: "🗓️", label: "Hours",     value: "Mon–Sat, 9 AM – 7 PM IST" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", gap: 14, marginBottom: 24 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--bg-muted)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ color: "var(--text-3)", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>{item.label}</div>
                  <div style={{ color: "var(--text-2)", fontSize: "0.875rem" }}>{item.value}</div>
                </div>
              </div>
            ))}

            <div style={{ background: "var(--accent-soft)", border: "1px solid #bfdbfe", borderRadius: 14, padding: "1.5rem", marginTop: 8 }}>
              <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1rem", marginBottom: 8, color: "var(--text-1)" }}>Free 30-min Discovery Call</h4>
              <p style={{ color: "var(--text-2)", fontSize: "0.82rem", lineHeight: 1.6 }}>
                No sales pitch. Just a genuine conversation about your project and whether we&apos;re the right fit.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="card" style={{ padding: "2.5rem" }}>
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", marginBottom: 12 }}>Message Sent!</h2>
                <p style={{ color: "var(--text-2)", lineHeight: 1.7 }}>Thank you for reaching out. We&apos;ll respond within 1 business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ display: "block", color: "var(--text-2)", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Full Name *</label>
                    <input className="input" type="text" placeholder="Jane Smith" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ display: "block", color: "var(--text-2)", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Email *</label>
                    <input className="input" type="email" placeholder="jane@company.com" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "var(--text-2)", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Company</label>
                  <input className="input" type="text" placeholder="Acme Inc." value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "var(--text-2)", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Service Needed</label>
                  <select className="input" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                    <option value="">Select a service...</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", color: "var(--text-2)", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Tell us about your project *</label>
                  <textarea className="input" placeholder="Describe your project, goals, and timeline..." required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ resize: "vertical" }} />
                </div>
                {status === "error" && <p style={{ color: "#dc2626", fontSize: "0.82rem", marginBottom: 12 }}>Something went wrong. Please try again.</p>}
                <button type="submit" className="btn btn-primary" disabled={status === "loading"} style={{ padding: "13px 28px", borderRadius: 9, width: "100%", fontSize: "0.95rem" }}>
                  {status === "loading" ? "Sending..." : "Send Message →"}
                </button>
                <p style={{ color: "var(--text-3)", fontSize: "0.75rem", textAlign: "center", marginTop: 12 }}>Your information is stored securely and never shared.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}