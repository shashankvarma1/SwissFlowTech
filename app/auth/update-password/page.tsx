"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function UpdatePassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handle(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    const { error } = await supabase!.auth.updateUser({ password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    router.push("/portal");
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div className="card" style={{ padding: "2.5rem" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, marginBottom: 6 }}>Set New Password</h1>
          <p style={{ color: "var(--text-3)", fontSize: "0.82rem", marginBottom: 24 }}>Choose a strong password for your account.</p>
          <form onSubmit={handle}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", color: "var(--text-2)", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>New Password</label>
              <input className="input" type="password" placeholder="Min. 8 characters" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", color: "var(--text-2)", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Confirm Password</label>
              <input className="input" type="password" placeholder="Repeat password" required minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </div>
            {error && <p style={{ color: "#dc2626", fontSize: "0.82rem", marginBottom: 14 }}>{error}</p>}
            <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%", padding: "12px", borderRadius: 9 }}>
              {loading ? "Updating..." : "Update Password →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}