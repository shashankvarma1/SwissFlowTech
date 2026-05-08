import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(99,179,237,0.1)",
        background: "#040810",
        padding: "4rem 2rem 2rem",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 800,
                  color: "white",
                  fontFamily: "Syne, sans-serif",
                }}
              >
                S
              </div>
              <span
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  color: "#f0f4ff",
                }}
              >
                Swiss Flow Tech
              </span>
            </div>
            <p
              style={{
                color: "#4a5a7a",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                maxWidth: 240,
              }}
            >
              Building scalable, intelligent digital products for the next generation of businesses.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#4a5a7a",
                marginBottom: 16,
              }}
            >
              Company
            </h4>
            {[
              { href: "/about", label: "About Us" },
              { href: "/services", label: "Services" },
              { href: "/careers", label: "Careers" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  display: "block",
                  color: "#8b9fc9",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  marginBottom: 10,
                  transition: "color 0.2s",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#4a5a7a",
                marginBottom: 16,
              }}
            >
              Services
            </h4>
            {[
              "Web Development",
              "AI Solutions",
              "Cloud Deployment",
              "UI/UX Design",
              "E-Commerce",
              "Custom Software",
            ].map((s) => (
              <span
                key={s}
                style={{
                  display: "block",
                  color: "#8b9fc9",
                  fontSize: "0.9rem",
                  marginBottom: 10,
                }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#4a5a7a",
                marginBottom: 16,
              }}
            >
              Get in Touch
            </h4>
            <p style={{ color: "#8b9fc9", fontSize: "0.9rem", marginBottom: 8 }}>
  swissflowtech@gmail.com
</p>
<p style={{ color: "#8b9fc9", fontSize: "0.9rem", marginBottom: 8 }}>
  Hyderabad, Telangana, India
</p>
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              {["LinkedIn", "Twitter", "GitHub"].map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: "0.8rem",
                    color: "#60a5fa",
                    cursor: "pointer",
                    padding: "4px 10px",
                    border: "1px solid rgba(59,130,246,0.25)",
                    borderRadius: 6,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(99,179,237,0.08)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ color: "#4a5a7a", fontSize: "0.8rem" }}>
            © 2026 Swiss Flow Tech. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Service"].map((t) => (
              <span
                key={t}
                style={{ color: "#4a5a7a", fontSize: "0.8rem", cursor: "pointer" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
