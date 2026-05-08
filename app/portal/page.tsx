"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

type Application = {
  id: string;
  status: string;
  cover_letter: string | null;
  resume_filename: string | null;
  applied_at: string;
  updated_at: string;
  job_postings: { title: string; department: string | null; type: string | null } | null;
};

type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  linkedin_url: string | null;
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  applied:   { label: "Applied",        color: "#60a5fa", bg: "rgba(37,99,235,0.12)",  icon: "📋" },
  reviewing: { label: "Under Review",   color: "#fbbf24", bg: "rgba(251,191,36,0.12)", icon: "🔍" },
  interview: { label: "Interview",      color: "#a78bfa", bg: "rgba(109,40,217,0.12)", icon: "🎯" },
  offer:     { label: "Offer Received", color: "#34d399", bg: "rgba(5,150,105,0.12)",  icon: "🎉" },
  rejected:  { label: "Not Selected",   color: "#f87171", bg: "rgba(220,38,38,0.12)",  icon: "❌" },
};

const STEPS = ["applied", "reviewing", "interview", "offer"];

export default function Portal() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"applications" | "profile">("applications");
  const [profileForm, setProfileForm] = useState({ full_name: "", phone: "", linkedin_url: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.push("/auth?redirect=/portal"); return; }
      const uid = session.user.id;

      const [profRes, appsRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", uid).single(),
        supabase.from("applications")
          .select("*, job_postings(title,department,type)")
          .eq("user_id", uid)
          .order("applied_at", { ascending: false }),
      ]);

      const prof = profRes.data as unknown as Profile;
      const apps = appsRes.data;

      setProfile(prof);
      setProfileForm({
        full_name: prof?.full_name || "",
        phone: prof?.phone || "",
        linkedin_url: prof?.linkedin_url || "",
      });
      setApplications((apps as Application[]) || []);
      setLoading(false);
    });
  }, [router]);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
await (supabase as any).from("profiles").update(profileForm).eq("id", profile.id);
    setProfile({ ...profile, ...profileForm });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#03060f", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#475569" }}>Loading your portal...</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#03060f" }}>
      {/* Nav */}
      <nav style={{
        borderBottom: "1px solid rgba(99,179,237,0.1)",
        background: "rgba(3,6,15,0.92)",
        backdropFilter: "blur(20px)",
        padding: "0 2rem",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#1d4ed8,#6d28d9)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "white", fontFamily: "Playfair Display, serif" }}>S</div>
          <span style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, color: "#eef2ff" }}>Swiss Flow Tech</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "#475569", fontSize: "0.8rem", display: "none" }} className="hide-mobile">{profile?.email}</span>
          <button className="btn btn-ghost" onClick={handleLogout} style={{ padding: "7px 16px", borderRadius: 8, fontSize: "0.82rem" }}>Logout</button>
        </div>
      </nav>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "3rem 2rem" }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              background: "linear-gradient(135deg,#1d4ed8,#6d28d9)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "1.2rem", color: "white",
            }}>
              {(profile?.full_name || profile?.email || "?").charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.6rem", fontWeight: 700, lineHeight: 1.2 }}>
                Welcome, {profile?.full_name?.split(" ")[0] || "there"} 👋
              </h1>
              <p style={{ color: "#475569", fontSize: "0.82rem" }}>{profile?.email}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: "1rem", marginBottom: 36 }}>
          {[
            { label: "Applied",   value: applications.length,                                          color: "#60a5fa" },
            { label: "Reviewing", value: applications.filter(a => a.status === "reviewing").length,    color: "#fbbf24" },
            { label: "Interview", value: applications.filter(a => a.status === "interview").length,    color: "#a78bfa" },
            { label: "Offers",    value: applications.filter(a => a.status === "offer").length,        color: "#34d399" },
          ].map((s) => (
            <div key={s.label} style={{ background: "rgba(7,13,26,0.8)", border: "1px solid rgba(99,179,237,0.1)", borderRadius: 14, padding: "1.25rem" }}>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ color: "#475569", fontSize: "0.75rem", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
          {(["applications", "profile"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "8px 20px", borderRadius: 99, fontSize: "0.82rem", fontWeight: 600,
              cursor: "pointer", border: "none", fontFamily: "Plus Jakarta Sans, sans-serif",
              background: tab === t ? "linear-gradient(135deg,#1d4ed8,#2563eb)" : "rgba(255,255,255,0.04)",
              color: tab === t ? "#fff" : "#94a3b8",
              transition: "all 0.2s",
            }}>
              {t === "applications" ? `📋 My Applications (${applications.length})` : "👤 My Profile"}
            </button>
          ))}
        </div>

        {/* Applications tab */}
        {tab === "applications" && (
          <>
            {applications.length === 0 ? (
              <div style={{ background: "rgba(7,13,26,0.8)", border: "1px solid rgba(99,179,237,0.1)", borderRadius: 20, padding: "4rem", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>📋</div>
                <p style={{ color: "#475569", marginBottom: 20 }}>No applications yet.</p>
                <Link href="/careers">
                  <button className="btn btn-primary" style={{ padding: "10px 24px", borderRadius: 10 }}>Browse Open Roles →</button>
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {applications.map((app) => {
                  const cfg = STATUS_CONFIG[app.status] || STATUS_CONFIG.applied;
                  const stepIdx = STEPS.indexOf(app.status);
                  return (
                    <div key={app.id} style={{ background: "rgba(7,13,26,0.8)", border: "1px solid rgba(99,179,237,0.1)", borderRadius: 20, padding: "1.75rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
                        <div>
                          <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.1rem", fontWeight: 700, marginBottom: 6 }}>
                            {app.job_postings?.title}
                          </h3>
                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            {[app.job_postings?.department, app.job_postings?.type].filter(Boolean).map((tag) => (
                              <span key={tag} style={{ fontSize: "0.7rem", fontWeight: 600, color: "#94a3b8", background: "rgba(148,163,184,0.08)", border: "1px solid rgba(148,163,184,0.15)", padding: "2px 10px", borderRadius: 99 }}>{tag}</span>
                            ))}
                          </div>
                        </div>
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: cfg.color, background: cfg.bg, padding: "5px 14px", borderRadius: 99, border: `1px solid ${cfg.color}40`, whiteSpace: "nowrap" }}>
                          {cfg.icon} {cfg.label}
                        </span>
                      </div>

                      {/* Progress */}
                      {app.status !== "rejected" && (
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ display: "flex", marginBottom: 8 }}>
                            {STEPS.map((step, i) => (
                              <div key={step} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <div style={{
                                  width: 28, height: 28, borderRadius: "50%",
                                  background: i <= stepIdx ? "linear-gradient(135deg,#1d4ed8,#2563eb)" : "rgba(255,255,255,0.06)",
                                  border: i <= stepIdx ? "none" : "1px solid rgba(99,179,237,0.15)",
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                  fontSize: "0.7rem", color: i <= stepIdx ? "white" : "#475569",
                                  fontWeight: 700, marginBottom: 4,
                                }}>
                                  {i < stepIdx ? "✓" : i + 1}
                                </div>
                                <span style={{ fontSize: "0.62rem", color: i <= stepIdx ? "#60a5fa" : "#475569", textTransform: "capitalize", textAlign: "center" }}>{step}</span>
                              </div>
                            ))}
                          </div>
                          <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 99 }}>
                            <div style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg,#1d4ed8,#2563eb)", width: `${(Math.max(stepIdx, 0) / (STEPS.length - 1)) * 100}%`, transition: "width 0.5s ease" }} />
                          </div>
                        </div>
                      )}

                      <div style={{ display: "flex", justifyContent: "space-between", color: "#475569", fontSize: "0.72rem", flexWrap: "wrap", gap: 4 }}>
                        <span>Applied {fmt(app.applied_at)}</span>
                        <span>Last updated {fmt(app.updated_at)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div style={{ marginTop: 24, textAlign: "center" }}>
              <Link href="/careers">
                <button className="btn btn-ghost" style={{ padding: "10px 24px", borderRadius: 10 }}>Browse More Roles →</button>
              </Link>
            </div>
          </>
        )}

        {/* Profile tab */}
        {tab === "profile" && (
          <div style={{ background: "rgba(7,13,26,0.8)", border: "1px solid rgba(99,179,237,0.1)", borderRadius: 20, padding: "2.5rem", maxWidth: 560 }}>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: 6 }}>Your Profile</h2>
            <p style={{ color: "#475569", fontSize: "0.82rem", marginBottom: 28 }}>This info is visible to Swiss Flow Tech admins when you apply.</p>
            <form onSubmit={saveProfile}>
              {[
                { label: "Full Name", key: "full_name", type: "text", placeholder: "Jane Smith" },
                { label: "Phone Number", key: "phone", type: "tel", placeholder: "+91 98765 43210" },
                { label: "LinkedIn URL", key: "linkedin_url", type: "url", placeholder: "https://linkedin.com/in/yourname" },
              ].map((f) => (
                <div key={f.key} style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", color: "#94a3b8", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>{f.label}</label>
                  <input
                    className="input"
                    type={f.type}
                    placeholder={f.placeholder}
                    value={profileForm[f.key as keyof typeof profileForm]}
                    onChange={(e) => setProfileForm({ ...profileForm, [f.key]: e.target.value })}
                  />
                </div>
              ))}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", color: "#94a3b8", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Email</label>
                <input className="input" type="email" value={profile?.email || ""} disabled style={{ opacity: 0.5, cursor: "not-allowed" }} />
                <p style={{ color: "#475569", fontSize: "0.72rem", marginTop: 4 }}>Email cannot be changed.</p>
              </div>
              <button className="btn btn-primary" type="submit" disabled={saving} style={{ padding: "11px 28px", borderRadius: 10 }}>
                {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}