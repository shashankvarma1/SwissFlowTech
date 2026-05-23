import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const services = [
  { icon: "⚡", title: "Web Development",  desc: "Next-generation web apps built with Next.js, React, and TypeScript. Fast, scalable, and production-ready." },
  { icon: "🤖", title: "AI Solutions",      desc: "Integrate cutting-edge AI — from LLMs and RAG pipelines to computer vision and predictive analytics." },
  { icon: "☁️", title: "Cloud Deployment", desc: "Infrastructure on AWS, GCP, and Vercel. CI/CD pipelines, auto-scaling, and zero-downtime deploys." },
  { icon: "🎨", title: "UI/UX Design",      desc: "Design systems, wireframes, and polished interfaces that convert visitors into loyal customers." },
  { icon: "🛒", title: "E-Commerce",        desc: "Custom storefronts with headless commerce, payment gateways, and analytics pipelines." },
  { icon: "🔧", title: "Custom Software",   desc: "Bespoke SaaS platforms, internal tools, and APIs built precisely to your requirements." },
];

const stats = [
  { value: "50+", label: "Projects Shipped" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12",  label: "Countries Served" },
  { value: "3×",  label: "Avg. Revenue Growth" },
];

const testimonials = [
  { quote: "Swiss Flow Tech transformed our vision into a world-class product. Their AI integration cut our manual workload by 70%.", name: "Mia Kaufmann",  role: "CTO, FinEdge AG",      avatar: "MK" },
  { quote: "From wireframes to launch in 8 weeks. The quality is outstanding and they continue to be our go-to tech partner.",       name: "James Osei",   role: "Founder, Provado",      avatar: "JO" },
  { quote: "The redesign they delivered doubled our conversion rate. The attention to UX detail is unmatched.",                      name: "Sofia Bianchi", role: "Head of Growth, Lumio", avatar: "SB" },
];

const process = [
  { num: "01", title: "Discovery Sprint",      desc: "We deeply understand your business, users, and requirements in a focused 1-week sprint." },
  { num: "02", title: "Design & Architecture", desc: "Wireframes, design systems, and architecture crafted before a single line of code is written." },
  { num: "03", title: "Agile Development",     desc: "Two-week sprints with continuous delivery, testing, and client reviews at every checkpoint." },
  { num: "04", title: "Launch & Scale",        desc: "Production deployment, performance tuning, analytics, and ongoing support as you grow." },
];

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      {/* ── Hero ── */}
      <section className="grid-dots" style={{ padding: "120px 2rem 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Soft glow */}
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 600, height: 300, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(26,86,219,0.07) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}>
          <div className="label-chip anim-fade-up" style={{ marginBottom: 28 }}>
            Web &amp; AI Solutions — Hyderabad, India
          </div>

          <h1 className="anim-fade-up-1" style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(3.2rem, 8vw, 6rem)",
            letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: 28,
          }}>
            Building digital products
            <br />
            <span className="text-grad">that drive growth</span>
          </h1>

          <p className="anim-fade-up-2" style={{ color: "var(--text-2)", fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.75, maxWidth: 560, margin: "0 auto 40px" }}>
            We partner with startups and enterprises to architect scalable web applications, AI-powered platforms, and digital experiences.
          </p>

          <div className="anim-fade-up-3" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact">
              <button className="btn btn-primary" style={{ padding: "13px 32px", borderRadius: 9, fontSize: "0.95rem" }}>
                Start a Project →
              </button>
            </Link>
            <Link href="/services">
              <button className="btn btn-ghost" style={{ padding: "13px 28px", borderRadius: 9, fontSize: "0.95rem" }}>
                Our Services
              </button>
            </Link>
          </div>

          {/* Trust bar */}
          <div className="anim-fade-up-4" style={{ marginTop: 64, display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            {["Next.js", "Supabase", "OpenAI", "AWS", "Vercel"].map((tech) => (
              <span key={tech} style={{ color: "var(--text-3)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "5px 14px", border: "1px solid var(--border)", borderRadius: 6, background: "var(--bg-card)" }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--bg-card)", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "2rem", textAlign: "center" }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 700, color: "var(--text-1)", lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: "var(--text-3)", fontSize: "0.82rem", marginTop: 6, fontWeight: 500, letterSpacing: "0.04em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section style={{ padding: "100px 2rem", maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="label-chip" style={{ marginBottom: 20 }}>Our Capabilities</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Everything you need to<br /><span className="text-grad">build &amp; scale</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {services.map((s, i) => (
            <div key={i} className="card" style={{ padding: "2rem" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--bg-muted)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 16 }}>
                {s.icon}
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.2rem", marginBottom: 10 }}>{s.title}</h3>
              <p style={{ color: "var(--text-2)", fontSize: "0.875rem", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link href="/services">
            <button className="btn btn-ghost" style={{ padding: "11px 28px", borderRadius: 9 }}>View All Services</button>
          </Link>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "100px 2rem" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <div className="label-chip" style={{ marginBottom: 20 }}>Why Swiss Flow Tech</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 20, lineHeight: 1.15 }}>
              Precision engineering<br />meets bold creativity
            </h2>
            <p style={{ color: "var(--text-2)", lineHeight: 1.75, fontSize: "0.9rem", marginBottom: 32 }}>
              Founded by engineers and designers who have shipped products used by millions, Swiss Flow Tech blends precision with ambition. We don&apos;t just write code — we solve business problems.
            </p>
            {["Full-stack teams, no outsourcing", "Agile delivery with weekly demos", "Post-launch support & ownership", "Transparent pricing, no surprises"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--accent-soft)", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "var(--accent)", flexShrink: 0 }}>✓</div>
                <span style={{ color: "var(--text-2)", fontSize: "0.875rem" }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {process.map((step) => (
              <div key={step.num} className="card" style={{ padding: "1.25rem 1.5rem", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "var(--text-3)", flexShrink: 0, paddingTop: 2 }}>{step.num}</span>
                <div>
                  <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1rem", marginBottom: 4 }}>{step.title}</h4>
                  <p style={{ color: "var(--text-2)", fontSize: "0.82rem", lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: "100px 2rem", maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="label-chip" style={{ marginBottom: 20 }}>Client Stories</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Trusted by builders<br /><span className="text-grad">around the world</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {testimonials.map((t, i) => (
            <div key={i} className="card" style={{ padding: "2rem" }}>
              <div style={{ color: "#f59e0b", fontSize: "0.9rem", marginBottom: 16, letterSpacing: 2 }}>★★★★★</div>
              <p style={{ color: "var(--text-2)", fontSize: "0.9rem", lineHeight: 1.75, fontStyle: "italic", marginBottom: 24 }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--text-1)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.8rem", color: "var(--bg)" }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem", color: "var(--text-1)" }}>{t.name}</div>
                  <div style={{ color: "var(--text-3)", fontSize: "0.78rem" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "var(--text-1)", padding: "80px 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 20, color: "var(--bg)" }}>
            Ready to build something extraordinary?
          </h2>
          <p style={{ color: "rgba(250,250,248,0.65)", fontSize: "1rem", lineHeight: 1.7, marginBottom: 36 }}>
            Book a free 30-minute discovery call. No pressure — just an honest conversation about what you&apos;re building.
          </p>
          <Link href="/contact">
            <button style={{
              background: "var(--bg)", color: "var(--text-1)",
              fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.95rem",
              padding: "14px 36px", borderRadius: 9, border: "none", cursor: "pointer",
              transition: "all 0.2s", boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}>
              Book Free Discovery Call →
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}