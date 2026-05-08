import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const services = [
  {
    icon: "⚡",
    title: "Web Development",
    desc: "Next-generation web apps built with Next.js, React, and TypeScript. Fast, scalable, and production-ready.",
  },
  {
    icon: "🤖",
    title: "AI Solutions",
    desc: "Integrate cutting-edge AI into your product — from LLMs and RAG pipelines to computer vision and predictive analytics.",
  },
  {
    icon: "☁️",
    title: "Cloud Deployment",
    desc: "Infrastructure on AWS, GCP, and Vercel. CI/CD pipelines, auto-scaling, monitoring, and zero-downtime deploys.",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    desc: "Design systems, wireframes, and polished interfaces that convert visitors into loyal customers.",
  },
  {
    icon: "🛒",
    title: "E-Commerce",
    desc: "Custom storefronts with headless commerce, payment gateways, inventory management, and analytics.",
  },
  {
    icon: "🔧",
    title: "Custom Software",
    desc: "Bespoke SaaS platforms, internal tools, and APIs built precisely to your business requirements.",
  },
];

const stats = [
  { value: "50+", label: "Projects Shipped" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12", label: "Countries Served" },
  { value: "3×", label: "Avg. Revenue Growth" },
];

const testimonials = [
  {
    quote:
      "Swiss Flow Tech transformed our vision into a world-class product. Their AI integration cut our manual workload by 70%.",
    name: "Mia Kaufmann",
    role: "CTO, FinEdge AG",
    avatar: "MK",
  },
  {
    quote:
      "From wireframes to launch in 8 weeks. The quality is outstanding, and they continue to be our go-to tech partner.",
    name: "James Osei",
    role: "Founder, Provado",
    avatar: "JO",
  },
  {
    quote:
      "The redesign they delivered doubled our conversion rate. The attention to UX detail is unmatched.",
    name: "Sofia Bianchi",
    role: "Head of Growth, Lumio",
    avatar: "SB",
  },
];

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#040810" }}>
      <Navbar />

      {/* HERO */}
      <section
        className="grid-bg"
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "120px 2rem 140px",
          textAlign: "center",
        }}
      >
        {/* Glow blobs */}
        <div
          className="animate-glow"
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(59,130,246,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "15%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
          <div className="section-label animate-fade-up" style={{ marginBottom: 24 }}>
            🚀 Modern Web &amp; AI Solutions
          </div>

          <h1
            className="animate-fade-up-1"
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: 28,
            }}
          >
            Building the Future
            <br />
            <span className="text-gradient">with Swiss Flow Tech</span>
          </h1>

          <p
            className="animate-fade-up-2"
            style={{
              color: "#8b9fc9",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              lineHeight: 1.7,
              maxWidth: 600,
              margin: "0 auto 40px",
            }}
          >
            We partner with startups and enterprises to architect scalable web applications,
            AI-powered platforms, and digital experiences that drive real growth.
          </p>

          <div
            className="animate-fade-up-3"
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/contact">
              <button
                className="btn-primary"
                style={{ padding: "14px 32px", borderRadius: 12, fontSize: "1rem" }}
              >
                Start a Project →
              </button>
            </Link>
            <Link href="/services">
              <button
                className="btn-outline"
                style={{ padding: "14px 32px", borderRadius: 12, fontSize: "1rem" }}
              >
                Explore Services
              </button>
            </Link>
          </div>

          {/* Trust badges */}
          <div
            className="animate-fade-up-4"
            style={{
              marginTop: 60,
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            {["Next.js", "Supabase", "OpenAI", "AWS", "Vercel"].map((tech) => (
              <span
                key={tech}
                style={{
                  color: "#4a5a7a",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "6px 14px",
                  border: "1px solid rgba(99,179,237,0.1)",
                  borderRadius: 8,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section
        style={{
          borderTop: "1px solid rgba(99,179,237,0.1)",
          borderBottom: "1px solid rgba(99,179,237,0.1)",
          padding: "3rem 2rem",
          background: "rgba(8, 14, 28, 0.5)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "2rem",
            textAlign: "center",
          }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "2.8rem",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: 4,
                }}
              >
                {s.value}
              </div>
              <div style={{ color: "#4a5a7a", fontSize: "0.85rem", fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "100px 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="section-label" style={{ marginBottom: 20 }}>
            Our Capabilities
          </div>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            Everything you need to
            <br />
            <span className="text-gradient">build &amp; scale</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {services.map((s, i) => (
            <div
              key={i}
              className="glass-card"
              style={{ borderRadius: 20, padding: "2rem" }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  marginBottom: 18,
                }}
              >
                {s.icon}
              </div>
              <h3
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.15rem",
                  marginBottom: 10,
                }}
              >
                {s.title}
              </h3>
              <p style={{ color: "#8b9fc9", fontSize: "0.9rem", lineHeight: 1.65 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link href="/services">
            <button
              className="btn-outline"
              style={{ padding: "12px 28px", borderRadius: 10 }}
            >
              View All Services
            </button>
          </Link>
        </div>
      </section>

      {/* WHY US */}
      <section
        style={{
          padding: "80px 2rem",
          background: "rgba(8, 14, 28, 0.5)",
          borderTop: "1px solid rgba(99,179,237,0.08)",
          borderBottom: "1px solid rgba(99,179,237,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          <div>
            <div className="section-label" style={{ marginBottom: 20 }}>
              Why Swiss Flow Tech
            </div>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                marginBottom: 20,
                lineHeight: 1.15,
              }}
            >
              Precision engineering
              <br />
              meets bold creativity
            </h2>
            <p
              style={{
                color: "#8b9fc9",
                lineHeight: 1.7,
                fontSize: "0.95rem",
                marginBottom: 32,
              }}
            >
              Founded by engineers and designers who have shipped products used by millions,
              Swiss Flow Tech blends Swiss precision with Silicon Valley ambition. We don&apos;t
              just write code — we solve business problems.
            </p>

            {[
              "Full-stack teams, no outsourcing",
              "Agile delivery with weekly demos",
              "Post-launch support & ownership",
              "Transparent pricing, no surprises",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                  color: "#8b9fc9",
                  fontSize: "0.9rem",
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "rgba(59,130,246,0.15)",
                    border: "1px solid rgba(59,130,246,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    color: "#60a5fa",
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                {item}
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gap: "1rem" }}>
            {[
              { num: "01", title: "Discovery Sprint", desc: "We deeply understand your business, users, and technical requirements in a focused 1-week sprint." },
              { num: "02", title: "Design & Architecture", desc: "Wireframes, design systems, and system architecture crafted before a single line of code is written." },
              { num: "03", title: "Agile Development", desc: "Two-week sprints with continuous delivery, testing, and client reviews at every checkpoint." },
              { num: "04", title: "Launch & Scale", desc: "Production deployment, performance tuning, analytics setup, and ongoing support as you grow." },
            ].map((step) => (
              <div
                key={step.num}
                className="glass-card"
                style={{ borderRadius: 16, padding: "1.25rem 1.5rem", display: "flex", gap: 16 }}
              >
                <span
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    color: "rgba(59,130,246,0.4)",
                    flexShrink: 0,
                    paddingTop: 2,
                  }}
                >
                  {step.num}
                </span>
                <div>
                  <h4
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      marginBottom: 4,
                    }}
                  >
                    {step.title}
                  </h4>
                  <p style={{ color: "#8b9fc9", fontSize: "0.82rem", lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "100px 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="section-label" style={{ marginBottom: 20 }}>
            Client Stories
          </div>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2rem, 5vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            Trusted by builders
            <br />
            <span className="text-gradient">around the world</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="glass-card"
              style={{ borderRadius: 20, padding: "2rem" }}
            >
              <div style={{ color: "#60a5fa", fontSize: "1.5rem", marginBottom: 16 }}>
                ★★★★★
              </div>
              <p
                style={{
                  color: "#8b9fc9",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  marginBottom: 24,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    color: "white",
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  >
                    {t.name}
                  </div>
                  <div style={{ color: "#4a5a7a", fontSize: "0.8rem" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "80px 2rem",
          textAlign: "center",
          background:
            "linear-gradient(180deg, rgba(59,130,246,0.05) 0%, rgba(124,58,237,0.05) 100%)",
          borderTop: "1px solid rgba(99,179,237,0.1)",
          borderBottom: "1px solid rgba(99,179,237,0.1)",
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: 20,
            }}
          >
            Ready to build
            <br />
            <span className="text-gradient">something extraordinary?</span>
          </h2>
          <p
            style={{
              color: "#8b9fc9",
              fontSize: "1rem",
              lineHeight: 1.7,
              marginBottom: 36,
            }}
          >
            Book a free 30-minute discovery call. No pressure, no commitment — just an honest
            conversation about what you&apos;re building and how we can help.
          </p>
          <Link href="/contact">
            <button
              className="btn-primary"
              style={{ padding: "16px 40px", borderRadius: 14, fontSize: "1rem" }}
            >
              Book Free Discovery Call →
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
