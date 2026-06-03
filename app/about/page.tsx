import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const team = [
  { name: "Shashank Varma",  role: "CEO & Co-Founder",     bio: "Thriving and results-driven CEO",                     avatar: "SV" },
  { name: "Vineeth Gongati", role: "CTO & Co-Founder",     bio: "ML researcher turned builder. Led AI infrastructure teams at two Series-B startups.",                       avatar: "VG" },
  ];

const values = [
  { icon: "🎯", title: "Precision",     desc: "Every decision is intentional. We obsess over details — from system architecture to pixel alignment." },
  { icon: "🔍", title: "Transparency",  desc: "Open communication, honest timelines, no black boxes. You'll always know where your project stands." },
  { icon: "🚀", title: "Velocity",      desc: "We move fast without breaking things. Our agile process ships value every two weeks." },
  { icon: "🌍", title: "Impact",        desc: "We measure success by the real-world outcomes we create for your users and your business." },
];

export default function About() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "100px 2rem 80px", textAlign: "center", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div className="label-chip anim-fade-up" style={{ marginBottom: 24 }}>Our Story</div>
          <h1 className="anim-fade-up-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 7vw, 5rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 24, lineHeight: 1.1 }}>
            Built by builders,<br /><span className="text-grad">for builders</span>
          </h1>
          <p className="anim-fade-up-2" style={{ color: "var(--text-2)", fontSize: "1.05rem", lineHeight: 1.75 }}>
            Swiss Flow Tech was founded in Hyderabad by a team of engineers and designers who had grown tired of the gap between great ideas and great execution. We set out to bridge that gap — one product at a time.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: "80px 2rem", background: "var(--bg-card)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 20 }}>Our Mission</h2>
            <p style={{ color: "var(--text-2)", lineHeight: 1.75, fontSize: "0.9rem", marginBottom: 20 }}>
              To make world-class product engineering accessible to every ambitious startup and growing business — not just those with nine-figure budgets.
            </p>
            <p style={{ color: "var(--text-2)", lineHeight: 1.75, fontSize: "0.9rem" }}>
              We believe that thoughtful technology, built with precision and care, is one of the most powerful forces for positive change. Every product we ship is a chance to prove that.
            </p>
          </div>
          <div style={{ background: "var(--bg-muted)", border: "1px solid var(--border)", borderRadius: 20, padding: "3rem" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 600, color: "var(--text-1)", lineHeight: 1.5, fontStyle: "italic" }}>
              &ldquo;Great software isn&apos;t just written — it&apos;s crafted with the same discipline and care as the finest precision engineering.&rdquo;
            </p>
            <p style={{ marginTop: 20, color: "var(--text-3)", fontSize: "0.82rem" }}>— Lucas Müller, CEO</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "100px 2rem", maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="label-chip" style={{ marginBottom: 20 }}>Our Values</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 2.8rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>Principles we live by</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
          {values.map((v, i) => (
            <div key={i} className="card" style={{ padding: "2rem", textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{v.icon}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.15rem", marginBottom: 10 }}>{v.title}</h3>
              <p style={{ color: "var(--text-2)", fontSize: "0.85rem", lineHeight: 1.65 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", padding: "100px 2rem" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="label-chip" style={{ marginBottom: 20 }}>The Team</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 2.8rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              The people behind<br /><span className="text-grad">the products</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
            {team.map((member, i) => (
              <div key={i} className="card" style={{ padding: "2rem", textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--text-1)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1rem", color: "var(--bg)", margin: "0 auto 16px" }}>
                  {member.avatar}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.1rem", marginBottom: 4 }}>{member.name}</h3>
                <div style={{ color: "var(--accent)", fontSize: "0.78rem", fontWeight: 600, marginBottom: 12 }}>{member.role}</div>
                <p style={{ color: "var(--text-2)", fontSize: "0.82rem", lineHeight: 1.6 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}