"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Link from "next/link";
import { Suspense } from "react";

function AuthForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/portal";
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handle(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.full_name } },
      });
      if (error) { setError(error.message); setLoading(false); return; }
      router.push(redirect);
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) { setError(error.message); setLoading(false); return; }
      router.push(redirect);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#03060f", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 32, justifyContent: "center" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#1d4ed8,#6d28d9)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "white", fontFamily: "Playfair Display, serif", fontSize: 18 }}>S</div>
          <span style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.1rem", color: "#eef2ff" }}>Swiss Flow Tech</span>
        </Link>

        <div style={{ background: "rgba(7,13,26,0.9)", border: "1px solid rgba(99,179,237,0.15)", borderRadius: 20, padding: "2.5rem" }}>
          {/* Toggle */}
          <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 4, marginBottom: 28 }}>
            {(["login", "signup"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)} style={{
                flex: 1, padding: "8px", borderRadius: 8, border: "none", cursor: "pointer",
                fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, fontSize: "0.85rem",
                background: mode === m ? "linear-gradient(135deg,#1d4ed8,#2563eb)" : "transparent",
                color: mode === m ? "#fff" : "#475569",
                transition: "all 0.2s",
              }}>
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: 6 }}>
            {mode === "login" ? "Welcome back" : "Join Swiss Flow Tech"}
          </h1>
          <p style={{ color: "#475569", fontSize: "0.82rem", marginBottom: 24 }}>
            {mode === "login" ? "Sign in to view your application status." : "Create an account to apply for jobs."}
          </p>

          <form onSubmit={handle}>
            {mode === "signup" && (
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", color: "#94a3b8", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Full Name</label>
                <input className="input" type="text" placeholder="Jane Smith" required
                  value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
              </div>
            )}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", color: "#94a3b8", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Email</label>
              <input className="input" type="email" placeholder="you@email.com" required
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", color: "#94a3b8", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Password</label>
              <input className="input" type="password" placeholder="Min. 8 characters" required minLength={8}
                value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>

            {error && <p style={{ color: "#ef4444", fontSize: "0.82rem", marginBottom: 14 }}>{error}</p>}

            <button className="btn btn-primary" type="submit" disabled={loading}
              style={{ width: "100%", padding: "12px", borderRadius: 10, fontSize: "0.9rem" }}>
              {loading ? "Please wait..." : mode === "login" ? "Sign In →" : "Create Account →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return <Suspense><AuthForm /></Suspense>;
}