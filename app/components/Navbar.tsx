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
    supabase?.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setUser({ email: session.user.email! });
        setAdmin(await isAdmin(session.user.id));
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase?.auth.onAuthStateChange(async (_e, session) => {
      if (session?.user) {
        setUser({ email: session.user.email! });
        setAdmin(await isAdmin(session.user.id));
      } else { setUser(null); setAdmin(false); }
    }) || { data: { subscription: { unsubscribe: () => {} } } };

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase?.auth.signOut();
    router.push("/");
  }

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      borderBottom: "1px solid var(--border)",
      background: "rgba(250,250,248,0.92)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
    }}>
      <div style={{
        maxWidth: 1180, margin: "0 auto",
        padding: "0 2rem", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "var(--text-1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, color: "var(--bg)", fontFamily: "var(--font-display)", fontSize: 16,
          }}>S</div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.05rem", color: "var(--text-1)", letterSpacing: "-0.01em" }}>
            Swiss Flow Tech
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="nav-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href} style={{
              fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500,
              color: pathname === l.href ? "var(--text-1)" : "var(--text-2)",
              textDecoration: "none", transition: "color 0.2s",
              borderBottom: pathname === l.href ? "1px solid var(--text-1)" : "1px solid transparent",
              paddingBottom: 2,
            }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="nav-links">
          {!loading && (
            <>
              {user ? (
                <>
                  {admin && (
                    <Link href="/admin">
                      <button className="btn btn-ghost" style={{ padding: "6px 14px", borderRadius: 7, fontSize: "0.82rem" }}>
                        Admin
                      </button>
                    </Link>
                  )}
                  <Link href="/portal">
                    <button className="btn btn-ghost" style={{ padding: "6px 14px", borderRadius: 7, fontSize: "0.82rem" }}>
                      My Portal
                    </button>
                  </Link>
                  <button className="btn btn-ghost" onClick={handleLogout} style={{ padding: "6px 14px", borderRadius: 7, fontSize: "0.82rem" }}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth">
                    <button className="btn btn-ghost" style={{ padding: "6px 16px", borderRadius: 7 }}>Sign In</button>
                  </Link>
                  <Link href="/auth?redirect=/admin">
                    <button className="btn btn-ghost" style={{ padding: "6px 16px", borderRadius: 7, color: "var(--accent)" }}>Admin</button>
                  </Link>
                  <Link href="/contact">
                    <button className="btn btn-primary" style={{ padding: "7px 18px", borderRadius: 7 }}>Get Started →</button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {/* Mobile burger */}
        <button onClick={() => setOpen(!open)} className="nav-mobile-btn"
          style={{ background: "none", border: "none", color: "var(--text-2)", cursor: "pointer", fontSize: 20, display: "none" }}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "1.25rem 2rem", background: "var(--bg)", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--text-2)", textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {user ? (
              <>
                {admin && <Link href="/admin" onClick={() => setOpen(false)} style={{ color: "var(--accent)", textDecoration: "none", fontSize: "0.9rem" }}>Admin Dashboard</Link>}
                <Link href="/portal" onClick={() => setOpen(false)} style={{ color: "var(--text-2)", textDecoration: "none", fontSize: "0.9rem" }}>My Portal</Link>
                <button onClick={handleLogout} style={{ background: "none", border: "none", color: "var(--text-2)", cursor: "pointer", textAlign: "left", fontSize: "0.9rem", padding: 0, fontFamily: "var(--font-body)" }}>Logout</button>
              </>
            ) : (
              <>
                <Link href="/auth" onClick={() => setOpen(false)} style={{ color: "var(--accent)", textDecoration: "none", fontSize: "0.9rem" }}>Sign In</Link>
                <Link href="/auth?redirect=/admin" onClick={() => setOpen(false)} style={{ color: "var(--text-2)", textDecoration: "none", fontSize: "0.9rem" }}>Admin Login</Link>
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