import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const team = [
  {
    name: "Shashank Varma",
    role: "CEO & Co-Founder",
    bio: "Thriving and result-driven CEO with excellent leadership skills",
    avatar: "LM",
    color: "#2563eb",
  },
  {
    name: "Vineeth Gongati",
    role: "CTO & Co-Founder",
    bio: "ML researcher turned builder. Led AI infrastructure teams at two Series-B startups.",
    avatar: "AS",
    color: "#7c3aed",
  },
];

const values = [
  {
    icon: "🎯",
    title: "Precision",
    desc: "Every decision is intentional. We obsess over details — from system architecture to pixel alignment.",
  },
  {
    icon: "🔍",
    title: "Transparency",
    desc: "Open communication, honest timelines, and no black boxes. You'll always know where your project stands.",
  },
  {
    icon: "🚀",
    title: "Velocity",
    desc: "We move fast without breaking things. Our agile process ships value every two weeks.",
  },
  {
    icon: "🌍",
    title: "Impact",
    desc: "We measure success by the real-world outcomes we create for your users and your business.",
  },
];

export default function About() {
  return (
    <main style={{ minHeight: "100vh", background: "#040810" }}>
      <Navbar />

      {/* Hero */}
      <section
        className="grid-bg"
        style={{
          padding: "100px 2rem 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}>
          <div className="section-label animate-fade-up" style={{ marginBottom: 24 }}>
            Our Story
          </div>
          <h1
            className="animate-fade-up-1"
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: 24,
              lineHeight: 1.1,
            }}
          >
            Built by builders,
            <br />
            <span className="text-gradient">for builders</span>
          </h1>
          <p
            className="animate-fade-up-2"
            style={{
              color: "#8b9fc9",
              fontSize: "1.05rem",
              lineHeight: 1.75,
              maxWidth: 620,
              margin: "0 auto",
            }}
          >
            Swiss Flow Tech was founded in 2022 in Zurich by a team of engineers and designers
            who had grown tired of the gap between great ideas and great execution. We set out
            to bridge that gap — one product at a time.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section
        style={{
          padding: "80px 2rem",
          borderTop: "1px solid rgba(99,179,237,0.08)",
          background: "rgba(8,14,28,0.5)",
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
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                marginBottom: 20,
              }}
            >
              Our Mission
            </h2>
            <p
              style={{
                color: "#8b9fc9",
                lineHeight: 1.75,
                fontSize: "0.95rem",
                marginBottom: 20,
              }}
            >
              To democratize world-class product engineering by making it accessible to
              every ambitious startup and growing business — not just those with nine-figure budgets.
            </p>
            <p style={{ color: "#8b9fc9", lineHeight: 1.75, fontSize: "0.95rem" }}>
              We believe that thoughtful technology, built with precision and care, is one of
              the most powerful forces for positive change in the world. Every product we ship
              is a chance to prove that.
            </p>
          </div>
          <div
            style={{
              background: "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(124,58,237,0.1))",
              border: "1px solid rgba(59,130,246,0.15)",
              borderRadius: 24,
              padding: "3rem",
            }}
          >
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "#f0f4ff",
                lineHeight: 1.5,
                fontStyle: "italic",
              }}
            >
              &ldquo;Great software isn&apos;t just written — it&apos;s crafted with the same
              discipline and care as the finest Swiss engineering.&rdquo;
            </div>
            <div style={{ marginTop: 20, color: "#4a5a7a", fontSize: "0.85rem" }}>
              — Shashank Varma, CEO
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "100px 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="section-label" style={{ marginBottom: 20 }}>
            Our Values
          </div>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2rem, 5vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            Principles we live by
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {values.map((v, i) => (
            <div
              key={i}
              className="glass-card"
              style={{ borderRadius: 20, padding: "2rem", textAlign: "center" }}
            >
              <div style={{ fontSize: 36, marginBottom: 16 }}>{v.icon}</div>
              <h3
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  marginBottom: 10,
                }}
              >
                {v.title}
              </h3>
              <p style={{ color: "#8b9fc9", fontSize: "0.88rem", lineHeight: 1.65 }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section
        style={{
          padding: "100px 2rem",
          background: "rgba(8,14,28,0.5)",
          borderTop: "1px solid rgba(99,179,237,0.08)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label" style={{ marginBottom: 20 }}>
              The Team
            </div>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(2rem, 5vw, 2.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              The people behind
              <br />
              <span className="text-gradient">the products</span>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {team.map((member, i) => (
              <div
                key={i}
                className="glass-card"
                style={{ borderRadius: 20, padding: "2rem", textAlign: "center" }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${member.color}, ${member.color}88)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    color: "white",
                    margin: "0 auto 16px",
                  }}
                >
                  {member.avatar}
                </div>
                <h3
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    marginBottom: 4,
                  }}
                >
                  {member.name}
                </h3>
                <div
                  style={{
                    color: "#60a5fa",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    marginBottom: 12,
                  }}
                >
                  {member.role}
                </div>
                <p style={{ color: "#8b9fc9", fontSize: "0.85rem", lineHeight: 1.6 }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
