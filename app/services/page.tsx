import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const services = [
  {
    icon: "⚡", title: "Web Development", color: "#1a56db",
    tagline: "Lightning-fast, production-ready web apps",
    desc: "We architect and build scalable web applications using Next.js, React, TypeScript, and modern tooling. Whether you need a marketing site, SaaS platform, or complex web app, we deliver with performance and quality.",
    features: ["Next.js & React", "TypeScript", "REST & GraphQL APIs", "SEO Optimisation", "Performance Audits", "Accessibility"],
  },
  {
    icon: "🤖", title: "AI Solutions", color: "#7c3aed",
    tagline: "Intelligent automation that scales",
    desc: "From LLM integrations and RAG pipelines to custom ML models, we embed AI capabilities into your products that actually solve business problems — not just demos.",
    features: ["LLM Integration (GPT, Claude)", "RAG Pipelines", "Computer Vision", "Predictive Analytics", "AI Chatbots", "Vector Databases"],
  },
  {
    icon: "☁️", title: "Cloud Deployment", color: "#0891b2",
    tagline: "Reliable infrastructure that grows with you",
    desc: "We design and manage cloud infrastructure on AWS, GCP, and Vercel. CI/CD pipelines, auto-scaling, monitoring, and zero-downtime deployments.",
    features: ["AWS / GCP / Azure", "Docker & Kubernetes", "CI/CD Pipelines", "Auto-Scaling", "99.9% Uptime SLA", "Cost Optimisation"],
  },
  {
    icon: "🎨", title: "UI/UX Design", color: "#b45309",
    tagline: "Interfaces people love to use",
    desc: "Design systems, wireframes, and high-fidelity prototypes that convert visitors into loyal customers. We combine design precision with modern UX research.",
    features: ["Design Systems", "Wireframing & Prototyping", "User Research", "Accessibility (WCAG)", "Figma", "Motion Design"],
  },
  {
    icon: "🛒", title: "E-Commerce", color: "#059669",
    tagline: "Storefronts built to convert",
    desc: "Custom headless commerce solutions with Shopify, WooCommerce, or bespoke backends. Payment gateways, inventory systems, and analytics pipelines.",
    features: ["Headless Commerce", "Shopify / Stripe", "Inventory Management", "Conversion Optimisation", "Analytics", "Multi-currency"],
  },
  {
    icon: "🔧", title: "Custom Software", color: "#dc2626",
    tagline: "Bespoke tools for your exact needs",
    desc: "When off-the-shelf doesn't cut it. We build bespoke SaaS platforms, internal tools, data dashboards, and developer APIs precisely to your specifications.",
    features: ["SaaS Platforms", "Internal Tools", "Data Dashboards", "API Development", "Database Design", "Supabase / PostgreSQL"],
  },
];

export default function Services() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "100px 2rem 80px", textAlign: "center", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div className="label-chip anim-fade-up" style={{ marginBottom: 24 }}>Services</div>
          <h1 className="anim-fade-up-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 7vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 20, lineHeight: 1.1 }}>
            End-to-end solutions<br /><span className="text-grad">that drive results</span>
          </h1>
          <p className="anim-fade-up-2" style={{ color: "var(--text-2)", fontSize: "1.05rem", lineHeight: 1.75 }}>
            From first-line design to production deployment, we handle the full stack so you can focus on your business.
          </p>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "80px 2rem", maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {services.map((s, i) => (
            <div key={i} className="card" style={{ padding: "2.5rem", display: "grid", gridTemplateColumns: "280px 1fr", gap: "3rem", alignItems: "start" }}>
              <div>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: `${s.color}12`, border: `1px solid ${s.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 }}>
                  {s.icon}
                </div>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", marginBottom: 6 }}>{s.title}</h2>
                <p style={{ color: s.color, fontSize: "0.82rem", fontWeight: 600 }}>{s.tagline}</p>
              </div>
              <div>
                <p style={{ color: "var(--text-2)", lineHeight: 1.75, fontSize: "0.9rem", marginBottom: 20 }}>{s.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {s.features.map((f) => (
                    <span key={f} style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--text-2)", background: "var(--bg-muted)", border: "1px solid var(--border)", padding: "4px 12px", borderRadius: 99 }}>{f}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--text-1)", padding: "80px 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 2.8rem)", fontWeight: 700, marginBottom: 16, color: "var(--bg)" }}>
            Not sure what you need?
          </h2>
          <p style={{ color: "rgba(250,250,248,0.65)", marginBottom: 32 }}>Book a free discovery call and we&apos;ll figure it out together.</p>
          <Link href="/contact">
            <button style={{ background: "var(--bg)", color: "var(--text-1)", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.95rem", padding: "13px 32px", borderRadius: 9, border: "none", cursor: "pointer" }}>
              Book Free Call →
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}