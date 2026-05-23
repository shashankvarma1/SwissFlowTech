"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

function AuthForm() {
  const router   = useRouter();
  const params   = useSearchParams();
  const redirect = params.get("redirect") || "/portal";

  const [mode, setMode]       = useState<"login" | "signup" | "reset">("login");
  const [form, setForm]       = useState({ full_name: "", email: "", password: "" });
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handle(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(""); setSuccess("");

    if (mode === "reset") {
      const { error } = await supabase!.auth.resetPasswordForEmail(form.email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      setLoading(false);
      if (error) { setError(error.message); return; }
      setSuccess("Password reset email sent! Check your inbox.");
      return;
    }

    if (mode === "signup") {
      const { data, error } = await supabase!.auth.signUp({
        email: form.email, password: form.password,
        options: { data: { full_name: form.full_name } },
      });
      if (error) { setError(error.message); setLoading(false); return; }
      if (data.user) {
        await fetch("/api/notify", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "welcome", data: { email: form.email, name: form.full_name } }),
        });
      }
      setLoading(false);
      setSuccess("Account created! Please check your email to verify.");
      return;
    }

    const { error } = await supabase!.auth.signInWithPassword({ email: form.email, password: form.password });
    if (error) { setError(error.message); setLoading(false); return; }
    router.push(redirect);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 32, justifyContent: "center" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--text-1)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "var(--bg)", fontFamily: "var(--font-display)", fontSize: 16 }}>S</div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.05rem", color: "var(--text-1)" }}>Swiss Flow Tech</span>
        </Link>

        <div className="card" style={{ padding: "2.5rem" }}>
          {mode !== "reset" && (
            <div style={{ display: "flex", background: "var(--bg-muted)", borderRadius: 9, padding: 4, marginBottom: 28 }}>
              {(["login", "signup"] as const).map((m) => (
                <button key={m} onClick={() => setMode(m)} style={{
                  flex: 1, padding: "8px", borderRadius: 7, border: "none", cursor: "pointer",
                  fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.85rem",
                  background: mode === m ? "var(--bg-card)" : "transparent",
                  color: mode === m ? "var(--text-1)" : "var(--text-3)",
                  boxShadow: mode === m ? "var(--shadow-sm)" : "none",
                  transition: "all 0.2s",
                }}>
                  {m === "login" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>
          )}

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, marginBottom: 6 }}>
            {mode === "login" ? "Welcome back" : mode === "signup" ? "Create your account" : "Reset Password"}
          </h1>
          <p style={{ color: "var(--text-3)", fontSize: "0.82rem", marginBottom: 24 }}>
            {mode === "login" ? "Sign in to view your application status." : mode === "signup" ? "Create an account to apply for jobs." : "Enter your email to receive a reset link."}
          </p>

          {success ? (
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 9, padding: "14px 16px", color: "#166534", fontSize: "0.88rem", lineHeight: 1.6 }}>✓ {success}</div>
          ) : (
            <form onSubmit={handle}>
              {mode === "signup" && (
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", color: "var(--text-2)", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Full Name</label>
                  <input className="input" type="text" placeholder="Jane Smith" required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
                </div>
              )}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", color: "var(--text-2)", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Email</label>
                <input className="input" type="email" placeholder="you@email.com" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              {mode !== "reset" && (
                <div style={{ marginBottom: mode === "login" ? 8 : 20 }}>
                  <label style={{ display: "block", color: "var(--text-2)", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Password</label>
                  <input className="input" type="password" placeholder="Min. 8 characters" required minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                </div>
              )}
              {mode === "login" && (
                <div style={{ textAlign: "right", marginBottom: 20 }}>
                  <button type="button" onClick={() => setMode("reset")} style={{ background: "none", border: "none", color: "var(--accent)", fontSize: "0.78rem", cursor: "pointer", fontFamily: "var(--font-body)" }}>
                    Forgot password?
                  </button>
                </div>
              )}
              {error && <p style={{ color: "#dc2626", fontSize: "0.82rem", marginBottom: 14 }}>{error}</p>}
              <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%", padding: "12px", borderRadius: 9, fontSize: "0.9rem" }}>
                {loading ? "Please wait..." : mode === "login" ? "Sign In →" : mode === "signup" ? "Create Account →" : "Send Reset Link →"}
              </button>
              {mode === "reset" && (
                <button type="button" onClick={() => setMode("login")} style={{ width: "100%", marginTop: 10, background: "none", border: "none", color: "var(--text-3)", fontSize: "0.82rem", cursor: "pointer", fontFamily: "var(--font-body)" }}>
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