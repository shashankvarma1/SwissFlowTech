import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg-card)", padding: "4rem 2rem 2rem" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "3rem", marginBottom: "3rem" }}>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 30, height: 30, borderRadius: 7, background: "var(--text-1)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "var(--bg)", fontFamily: "var(--font-display)", fontSize: 15 }}>S</div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--text-1)", fontSize: "1rem" }}>Swiss Flow Tech</span>
            </div>
            <p style={{ color: "var(--text-3)", fontSize: "0.85rem", lineHeight: 1.7, maxWidth: 220 }}>
              Building intelligent digital products for ambitious businesses. Based in Hyderabad, India.
            </p>
          </div>

          <div>
            <h4 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 16 }}>Company</h4>
            {[{ href: "/about", label: "About" }, { href: "/services", label: "Services" }, { href: "/careers", label: "Careers" }, { href: "/contact", label: "Contact" }].map((l) => (
              <Link key={l.href} href={l.href} style={{ display: "block", color: "var(--text-2)", textDecoration: "none", fontSize: "0.875rem", marginBottom: 10, transition: "color 0.2s" }}>
                {l.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 16 }}>Services</h4>
            {["Web Development", "AI Solutions", "Cloud Deployment", "UI/UX Design", "E-Commerce", "Custom Software"].map((s) => (
              <span key={s} style={{ display: "block", color: "var(--text-2)", fontSize: "0.875rem", marginBottom: 10 }}>{s}</span>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 16 }}>Contact</h4>
            <a href="mailto:swissflowtech@gmail.com" style={{ display: "block", color: "var(--accent)", fontSize: "0.875rem", marginBottom: 8, textDecoration: "none" }}>swissflowtech@gmail.com</a>
            <p style={{ color: "var(--text-2)", fontSize: "0.875rem", marginBottom: 20 }}>Hyderabad, Telangana, India</p>
            <div style={{ display: "flex", gap: 8 }}>
              {["LinkedIn", "Twitter", "GitHub"].map((s) => (
                <span key={s} style={{ fontSize: "0.75rem", color: "var(--text-2)", cursor: "pointer", padding: "4px 10px", border: "1px solid var(--border)", borderRadius: 6, transition: "all 0.2s" }}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ color: "var(--text-3)", fontSize: "0.8rem" }}>© 2026 Swiss Flow Tech. All rights reserved.</p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Service"].map((t) => (
              <span key={t} style={{ color: "var(--text-3)", fontSize: "0.8rem", cursor: "pointer" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}