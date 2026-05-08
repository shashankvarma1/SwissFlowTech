"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid rgba(99,179,237,0.1)",
        background: "rgba(4, 8, 16, 0.85)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 2rem",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
                fontSize: "1.1rem",
                color: "#f0f4ff",
                letterSpacing: "-0.01em",
              }}
            >
              Swiss Flow Tech
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
          className="hidden-mobile"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.9rem",
                fontWeight: 500,
                color: pathname === l.href ? "#60a5fa" : "#8b9fc9",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact">
            <button
              className="btn-primary"
              style={{
                padding: "8px 20px",
                borderRadius: 10,
                fontSize: "0.85rem",
              }}
            >
              Get Started →
            </button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#8b9fc9",
            cursor: "pointer",
            fontSize: 24,
          }}
          className="mobile-menu-btn"
          aria-label="Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            borderTop: "1px solid rgba(99,179,237,0.1)",
            padding: "1rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "1rem",
                color: "#8b9fc9",
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
