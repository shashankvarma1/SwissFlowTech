import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const services = [
  {
    icon: "⚡",
    title: "Web Development",
    color: "#2563eb",
    tagline: "Lightning-fast, production-ready web apps",
    desc: "We architect and build scalable web applications using Next.js, React, TypeScript, and modern tooling. Whether you need a marketing site, SaaS platform, or complex web app, we deliver with performance and quality.",
    features: ["Next.js & React", "TypeScript", "Tailwind CSS", "REST & GraphQL APIs", "SEO Optimization", "Performance Audits"],
  },
  {
    icon: "🤖",
    title: "AI Solutions",
    color: "#7c3aed",
    tagline: "Intelligent automation that scales",
    desc: "From LLM integrations and RAG pipelines to custom ML models, we embed AI capabilities into your products that actually solve business problems — not just demos.",
    features: ["LLM Integration (GPT, Claude)", "RAG Pipelines", "Computer Vision", "Predictive Analytics", "AI Chatbots", "Vector Databases"],
  },
  {
    icon: "☁️",
    title: "Cloud Deployment",
    color: "#0891b2",
    tagline: "Reliable infrastructure that grows with you",
    desc: "We design and manage cloud infrastructure on AWS, GCP, and Vercel. CI/CD pipelines, auto-scaling, monitoring, and zero-downtime deployments.",
    features: ["AWS / GCP / Azure", "Docker & Kubernetes", "CI/CD Pipelines", "Auto-Scaling", "99.9% Uptime SLA", "Cost Optimization"],
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    color: "#d97706",
    tagline: "Interfaces people love to use",
    desc: "Design systems, wireframes, and high-fidelity prototypes that convert visitors into loyal customers. We combine Swiss design precision with modern UX research.",
    features: ["Design Systems", "Wireframing & Prototyping", "User Research", "Accessibility (WCAG)", "Figma", "Motion Design"],
  },
  {
    icon: "🛒",
    title: "E-Commerce",
    color: "#059669",
    tagline: "Storefronts built to convert",
    desc: "Custom headless commerce solutions with Shopify, WooCommerce, or bespoke backends. Payment gateways, inventory systems, and analytics pipelines.",
    features: ["Headless Commerce", "Shopify / Stripe", "Inventory Management", "Conversion Optimization", "Analytics", "Multi-currency"],
  },
  {
    icon: "🔧",
    title: "Custom Software",
    color: "#dc2626",
    tagline: "Bespoke tools for your exact needs",
    desc: "When off-the-shelf doesn't cut it. We build bespoke SaaS platforms, internal tools, data dashboards, and developer APIs precisely to your specifications.",
    features: ["SaaS Platforms", "Internal Tools", "Data Dashboards", "API Development", "Database Design", "Supabase / PostgreSQL"],
  },
];

const pricing = [
  {
    name: "Starter",
    price: "$4,900",
    period: "one-time",
    desc: "Perfect for MVPs, landing pages, and early-stage products.",
    features: [
      "Up to 5 pages / screens",
      "Responsive design",
      "Basic CMS integration",
      "1 revision round",
      "2-week delivery",
      "30-day post-launch support",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    price: "$14,900",
    period: "project",
    desc: "For startups building their core product with full design + dev.",
    features: [
      "Full web application",
      "Custom design system",
      "Supabase backend",
      "Auth + user management",
      "3 revision rounds",
      "90-day post-launch support",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Ongoing partnership for complex, multi-product builds.",
    features: [
      "Dedicated team",
      "AI integration",
      "Cloud infrastructure",
      "Unlimited revisions",
      "SLA-backed uptime",
      "Priority support",
    ],
    highlight: false,
  },
];

export default function Services() {
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
            background: "radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)",
            filter: "blur(40px)", pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
          <div className="section-label animate-fade-up" style={{ marginBottom: 24 }}>Services</div>
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
            End-to-end solutions
            <br />
            <span className="text-gradient">that drive results</span>
          </h1>
          <p
            className="animate-fade-up-2"
            style={{ color: "#8b9fc9", fontSize: "1.05rem", lineHeight: 1.75 }}
          >
            From first-line design to production deployment, we handle the full stack
            so you can focus on your business.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: "80px 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {services.map((s, i) => (
            <div
              key={i}
              className="glass-card"
              style={{ borderRadius: 24, padding: "2.5rem", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "3rem", alignItems: "start" }}
            >
              <div>
                <div
                  style={{
                    width: 64, height: 64, borderRadius: 18,
                    background: `${s.color}20`,
                    border: `1px solid ${s.color}40`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 28, marginBottom: 16,
                  }}
                >
                  {s.icon}
                </div>
                <h2
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: "1.5rem",
                    marginBottom: 6,
                  }}
                >
                  {s.title}
                </h2>
                <p style={{ color: s.color, fontSize: "0.85rem", fontWeight: 600 }}>{s.tagline}</p>
              </div>
              <div>
                <p style={{ color: "#8b9fc9", lineHeight: 1.7, fontSize: "0.95rem", marginBottom: 20 }}>
                  {s.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {s.features.map((f) => (
                    <span
                      key={f}
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: "#8b9fc9",
                        background: "rgba(139,159,201,0.08)",
                        border: "1px solid rgba(139,159,201,0.15)",
                        padding: "4px 12px",
                        borderRadius: 99,
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section
        style={{
          padding: "100px 2rem",
          background: "rgba(8,14,28,0.5)",
          borderTop: "1px solid rgba(99,179,237,0.08)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label" style={{ marginBottom: 20 }}>Pricing</div>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(2rem, 5vw, 2.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              Simple, transparent
              <br />
              <span className="text-gradient">pricing</span>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {pricing.map((plan, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 24,
                  padding: "2.5rem",
                  background: plan.highlight
                    ? "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.15))"
                    : "rgba(8,14,28,0.7)",
                  border: plan.highlight
                    ? "1px solid rgba(59,130,246,0.4)"
                    : "1px solid rgba(99,179,237,0.12)",
                  position: "relative",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
              >
                {plan.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: -12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                      color: "white",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      fontFamily: "Syne, sans-serif",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "4px 14px",
                      borderRadius: 99,
                    }}
                  >
                    Most Popular
                  </div>
                )}
                <h3
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    marginBottom: 8,
                  }}
                >
                  {plan.name}
                </h3>
                <div style={{ marginBottom: 8 }}>
                  <span
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 800,
                      fontSize: "2.5rem",
                      background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span style={{ color: "#4a5a7a", fontSize: "0.85rem", marginLeft: 6 }}>
                      / {plan.period}
                    </span>
                  )}
                </div>
                <p style={{ color: "#8b9fc9", fontSize: "0.85rem", marginBottom: 24 }}>
                  {plan.desc}
                </p>
                <div style={{ marginBottom: 28 }}>
                  {plan.features.map((f) => (
                    <div
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 10,
                        color: "#8b9fc9",
                        fontSize: "0.88rem",
                      }}
                    >
                      <span style={{ color: "#60a5fa", fontSize: 12 }}>✓</span>
                      {f}
                    </div>
                  ))}
                </div>
                <Link href="/contact">
                  <button
                    className={plan.highlight ? "btn-primary" : "btn-outline"}
                    style={{ padding: "12px 24px", borderRadius: 12, width: "100%", fontSize: "0.9rem" }}
                  >
                    Get Started →
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
