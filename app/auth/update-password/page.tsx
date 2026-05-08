"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function UpdatePassword() {
  const router = useRouter();
  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);

  async function handle(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    router.push("/portal");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#03060f", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ background: "rgba(7,13,26,0.9)", border: "1px solid rgba(99,179,237,0.15)", borderRadius: 20, padding: "2.5rem" }}>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: 6 }}>Set New Password</h1>
          <p style={{ color: "#475569", fontSize: "0.82rem", marginBottom: 24 }}>Choose a strong password for your account.</p>
          <form onSubmit={handle}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", color: "#94a3b8", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>New Password</label>
              <input className="input" type="password" placeholder="Min. 8 characters" required minLength={8}
                value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", color: "#94a3b8", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Confirm Password</label>
              <input className="input" type="password" placeholder="Repeat password" required minLength={8}
                value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </div>
            {error && <p style={{ color: "#ef4444", fontSize: "0.82rem", marginBottom: 14 }}>{error}</p>}
            <button className="btn btn-primary" type="submit" disabled={loading}
              style={{ width: "100%", padding: "12px", borderRadius: 10 }}>
              {loading ? "Updating..." : "Update Password →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}