"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

function AuthForm() {
  const router  = useRouter();
  const params  = useSearchParams();
  const redirect = params.get("redirect") || "/portal";

  const [mode, setMode]     = useState<"login" | "signup" | "reset">("login");
  const [form, setForm]     = useState({ full_name: "", email: "", password: "" });
  const [error, setError]   = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handle(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (mode === "reset") {
      const { error } = await supabase.auth.resetPasswordForEmail(form.email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      setLoading(false);
      if (error) { setError(error.message); return; }
      setSuccess("Password reset email sent! Check your inbox.");
      return;
    }

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.full_name } },
      });
      if (error) { setError(error.message); setLoading(false); return; }
      if (data.user) {
        await fetch("/api/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "welcome",
            data: { email: form.email, name: form.full_name },
          }),
        });
      }
      setLoading(false);
      setSuccess("Account created! Please check your email to verify your account.");
      return;
    }

    // Login
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    if (error) { setError(error.message); setLoading(false); return; }
    router.push(redirect);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#03060f", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 32, justifyContent: "center" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#1d4ed8,#6d28d9)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "white", fontFamily: "Playfair Display, serif", fontSize: 18 }}>S</div>
          <span style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.1rem", color: "#eef2ff" }}>Swiss Flow Tech</span>
        </Link>

        <div style={{ background: "rgba(7,13,26,0.9)", border: "1px solid rgba(99,179,237,0.15)", borderRadius: 20, padding: "2.5rem" }}>

          {/* Toggle — only login/signup */}
          {mode !== "reset" && (
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
          )}

          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: 6 }}>
            {mode === "login" ? "Welcome back" : mode === "signup" ? "Join Swiss Flow Tech" : "Reset Password"}
          </h1>
          <p style={{ color: "#475569", fontSize: "0.82rem", marginBottom: 24 }}>
            {mode === "login"
              ? "Sign in to view your application status."
              : mode === "signup"
              ? "Create an account to apply for jobs."
              : "Enter your email and we'll send a reset link."}
          </p>

          {success ? (
            <div style={{ background: "rgba(5,150,105,0.1)", border: "1px solid rgba(5,150,105,0.25)", borderRadius: 10, padding: "14px 16px", color: "#34d399", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: 16 }}>
              ✓ {success}
            </div>
          ) : (
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
              {mode !== "reset" && (
                <div style={{ marginBottom: 8 }}>
                  <label style={{ display: "block", color: "#94a3b8", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Password</label>
                  <input className="input" type="password" placeholder="Min. 8 characters" required minLength={8}
                    value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                </div>
              )}

              {mode === "login" && (
                <div style={{ textAlign: "right", marginBottom: 20 }}>
                  <button type="button" onClick={() => setMode("reset")}
                    style={{ background: "none", border: "none", color: "#60a5fa", fontSize: "0.78rem", cursor: "pointer", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                    Forgot password?
                  </button>
                </div>
              )}

              {error && <p style={{ color: "#ef4444", fontSize: "0.82rem", marginBottom: 14 }}>{error}</p>}

              <button className="btn btn-primary" type="submit" disabled={loading}
                style={{ width: "100%", padding: "12px", borderRadius: 10, fontSize: "0.9rem", marginTop: mode === "login" ? 0 : 20 }}>
                {loading ? "Please wait..." : mode === "login" ? "Sign In →" : mode === "signup" ? "Create Account →" : "Send Reset Email →"}
              </button>

              {mode === "reset" && (
                <button type="button" onClick={() => setMode("login")}
                  style={{ width: "100%", marginTop: 10, background: "none", border: "none", color: "#475569", fontSize: "0.82rem", cursor: "pointer", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  ← Back to Sign In
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return <Suspense><AuthForm /></Suspense>;
}