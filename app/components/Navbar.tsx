"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase, isAdmin } from "../../lib/supabase";

const links = [
  { href: "/about",    label: "About" },
  { href: "/services", label: "Services" },
  { href: "/careers",  label: "Careers" },
  { href: "/contact",  label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router   = useRouter();
  const [open, setOpen]       = useState(false);
  const [user, setUser]       = useState<{ email: string } | null>(null);
  const [admin, setAdmin]     = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setUser({ email: session.user.email! });
        const a = await isAdmin(session.user.id);
        setAdmin(a);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser({ email: session.user.email! });
        const a = await isAdmin(session.user.id);
        setAdmin(a);
      } else {
        setUser(null);
        setAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      borderBottom: "1px solid rgba(99,179,237,0.1)",
      background: "rgba(3,6,15,0.92)",
      backdropFilter: "blur(20px)",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "0 2rem", height: 68,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: "linear-gradient(135deg,#1d4ed8,#6d28d9)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, color: "white", fontFamily: "Playfair Display, serif", fontSize: 17,
          }}>S</div>
          <span style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.05rem", color: "#eef2ff" }}>
            Swiss Flow Tech
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }} className="nav-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href} style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: "0.88rem", fontWeight: 500,
              color: pathname === l.href ? "#60a5fa" : "#94a3b8",
              textDecoration: "none", transition: "color 0.2s",
            }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="nav-links">
          {!loading && (
            <>
              {user ? (
                <>
                  {admin && (
                    <Link href="/admin">
                      <button className="btn btn-ghost" style={{ padding: "7px 16px", borderRadius: 9, fontSize: "0.82rem" }}>
                        🛡️ Admin
                      </button>
                    </Link>
                  )}
                  <Link href="/portal">
                    <button className="btn btn-ghost" style={{ padding: "7px 16px", borderRadius: 9, fontSize: "0.82rem" }}>
                      My Portal
                    </button>
                  </Link>
                  <button
                    className="btn btn-ghost"
                    onClick={handleLogout}
                    style={{ padding: "7px 16px", borderRadius: 9, fontSize: "0.82rem" }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth">
                    <button className="btn btn-ghost" style={{ padding: "7px 18px", borderRadius: 9, fontSize: "0.88rem" }}>
                      Sign In
                    </button>
                  </Link>
                  <Link href="/auth?redirect=/admin">
                    <button className="btn btn-ghost" style={{
                      padding: "7px 18px", borderRadius: 9, fontSize: "0.88rem",
                      borderColor: "rgba(109,40,217,0.4)", color: "#a78bfa",
                    }}>
                      🛡️ Admin
                    </button>
                  </Link>
                  <Link href="/contact">
                    <button className="btn btn-primary" style={{ padding: "8px 20px", borderRadius: 9, fontSize: "0.88rem" }}>
                      Get Started →
                    </button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="nav-mobile-btn"
          style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: 22, display: "none" }}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          borderTop: "1px solid rgba(99,179,237,0.1)",
          padding: "1rem 2rem",
          display: "flex", flexDirection: "column", gap: "1rem",
          background: "rgba(3,6,15,0.98)",
        }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: "1rem", color: "#94a3b8", textDecoration: "none",
            }}>
              {l.label}
            </Link>
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 8, borderTop: "1px solid rgba(99,179,237,0.08)" }}>
            {user ? (
              <>
                {admin && <Link href="/admin" onClick={() => setOpen(false)} style={{ color: "#a78bfa", textDecoration: "none", fontSize: "0.9rem" }}>🛡️ Admin Dashboard</Link>}
                <Link href="/portal" onClick={() => setOpen(false)} style={{ color: "#60a5fa", textDecoration: "none", fontSize: "0.9rem" }}>My Portal</Link>
                <button onClick={handleLogout} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", textAlign: "left", fontSize: "0.9rem", padding: 0 }}>Logout</button>
              </>
            ) : (
              <>
                <Link href="/auth" onClick={() => setOpen(false)} style={{ color: "#60a5fa", textDecoration: "none", fontSize: "0.9rem" }}>Sign In</Link>
                <Link href="/auth?redirect=/admin" onClick={() => setOpen(false)} style={{ color: "#a78bfa", textDecoration: "none", fontSize: "0.9rem" }}>🛡️ Admin Login</Link>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}