"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { submitContactForm } from "../../lib/supabase";

const services = [
  "Web Development",
  "AI Solutions",
  "Cloud Deployment",
  "UI/UX Design",
  "E-Commerce",
  "Custom Software",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const { error } = await submitContactForm(form);
    setStatus(error ? "error" : "success");
  }

  return (
    <main style={{ minHeight: "100vh", background: "#040810" }}>
      <Navbar />

      {/* Hero */}
      <section
        className="grid-bg"
        style={{ padding: "100px 2rem 60px", textAlign: "center", position: "relative", overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)",
            width: 600, height: 300, borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)",
            filter: "blur(40px)", pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>
          <div className="section-label animate-fade-up" style={{ marginBottom: 24 }}>Contact</div>
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
            Let&apos;s build
            <br />
            <span className="text-gradient">something great</span>
          </h1>
          <p className="animate-fade-up-2" style={{ color: "#8b9fc9", fontSize: "1.05rem", lineHeight: 1.75 }}>
            Tell us about your project. We&apos;ll respond within 1 business day with a clear
            proposal and no obligation.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section style={{ padding: "60px 2rem 100px", maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* Info */}
          <div>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.5rem", marginBottom: 20 }}>
              Get in touch
            </h2>

            {[
              { icon: "📧", label: "Email", value: "swissflowtech@gmail.com" },
              { icon: "📍", label: "Location", value: "Hyderabad,India" },
            ].map((item) => (
              <div
                key={item.label}
                style={{ display: "flex", gap: 14, marginBottom: 24 }}
              >
                <div
                  style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "rgba(59,130,246,0.1)",
                    border: "1px solid rgba(59,130,246,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div style={{ color: "#4a5a7a", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>
                    {item.label}
                  </div>
                  <div style={{ color: "#8b9fc9", fontSize: "0.9rem" }}>{item.value}</div>
                </div>
              </div>
            ))}

            <div
              style={{
                marginTop: 36,
                background: "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(124,58,237,0.08))",
                border: "1px solid rgba(59,130,246,0.15)",
                borderRadius: 16,
                padding: "1.5rem",
              }}
            >
              <h4 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "0.9rem", marginBottom: 8 }}>
                Free 30-min Discovery Call
              </h4>
              <p style={{ color: "#8b9fc9", fontSize: "0.82rem", lineHeight: 1.6 }}>
                No sales pitch. Just a genuine conversation about your project, your goals,
                and whether we&apos;re the right fit.
              </p>
            </div>
          </div>

          {/* Form */}
          <div
            className="glass-card"
            style={{ borderRadius: 24, padding: "2.5rem" }}
          >
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ fontSize: 52, marginBottom: 20 }}>✅</div>
                <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.5rem", marginBottom: 12 }}>
                  Message Sent!
                </h2>
                <p style={{ color: "#8b9fc9", lineHeight: 1.7 }}>
                  Thank you for reaching out. We&apos;ll review your message and
                  respond within 1 business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ display: "block", color: "#8b9fc9", fontSize: "0.8rem", fontWeight: 600, marginBottom: 6 }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Jane Smith"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={{ padding: "10px 14px", borderRadius: 10 }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", color: "#8b9fc9", fontSize: "0.8rem", fontWeight: 600, marginBottom: 6 }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      className="input-field"
                      placeholder="jane@company.com"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={{ padding: "10px 14px", borderRadius: 10 }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "#8b9fc9", fontSize: "0.8rem", fontWeight: 600, marginBottom: 6 }}>
                    Company (optional)
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Acme Inc."
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    style={{ padding: "10px 14px", borderRadius: 10 }}
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "#8b9fc9", fontSize: "0.8rem", fontWeight: 600, marginBottom: 6 }}>
                    Service Needed
                  </label>
                  <select
                    className="input-field"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    style={{ padding: "10px 14px", borderRadius: 10 }}
                  >
                    <option value="">Select a service...</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", color: "#8b9fc9", fontSize: "0.8rem", fontWeight: 600, marginBottom: 6 }}>
                    Tell us about your project *
                  </label>
                  <textarea
                    className="input-field"
                    placeholder="Describe your project, goals, and timeline..."
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ padding: "10px 14px", borderRadius: 10, resize: "vertical" }}
                  />
                </div>

                {status === "error" && (
                  <p style={{ color: "#ef4444", fontSize: "0.85rem", marginBottom: 12 }}>
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={status === "loading"}
                  style={{ padding: "14px 28px", borderRadius: 12, width: "100%", fontSize: "1rem" }}
                >
                  {status === "loading" ? "Sending..." : "Send Message →"}
                </button>

                <p style={{ color: "#4a5a7a", fontSize: "0.75rem", textAlign: "center", marginTop: 14 }}>
                  Your information is stored securely and never shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
