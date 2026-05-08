"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, isAdmin } from "../../lib/supabase";
import Link from "next/link";

type Application = {
  id: string;
  status: string;
  cover_letter: string | null;
  resume_url: string | null;
  resume_filename: string | null;
  applied_at: string;
  updated_at: string;
  admin_notes: string | null;
  profiles: {
    full_name: string | null;
    email: string | null;
    phone: string | null;
    linkedin_url: string | null;
  } | null;
  job_postings: {
    title: string;
    department: string | null;
  } | null;
};

type Contact = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service: string | null;
  message: string;
  created_at: string;
};

const STATUS_OPTIONS = ["applied", "reviewing", "interview", "offer", "rejected"];
const STATUS_COLORS: Record<string, string> = {
  applied:   "#60a5fa",
  reviewing: "#fbbf24",
  interview: "#a78bfa",
  offer:     "#34d399",
  rejected:  "#f87171",
};

export default function Admin() {
  const router = useRouter();
  const [authed, setAuthed]           = useState(false);
  const [loading, setLoading]         = useState(true);
  const [tab, setTab]                 = useState<"applications" | "contacts">("applications");
  const [applications, setApplications] = useState<Application[]>([]);
  const [contacts, setContacts]       = useState<Contact[]>([]);
  const [expanded, setExpanded]       = useState<string | null>(null);
  const [notes, setNotes]             = useState<Record<string, string>>({});
  const [saving, setSaving]           = useState<string | null>(null);
  const [filter, setFilter]           = useState("all");

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.push("/auth?redirect=/admin"); return; }
      const admin = await isAdmin(session.user.id);
      if (!admin) { router.push("/"); return; }
      setAuthed(true);
      fetchData();
    });
  }, [router]);

  async function fetchData() {
    const [appsRes, contactsRes] = await Promise.all([
      supabase
        .from("applications")
        .select("*, profiles(full_name,email,phone,linkedin_url), job_postings(title,department)")
        .order("applied_at", { ascending: false }),
      supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);

    const apps = (appsRes.data as Application[]) || [];
    setApplications(apps);
    setContacts((contactsRes.data as Contact[]) || []);

    const n: Record<string, string> = {};
    apps.forEach(a => { n[a.id] = a.admin_notes || ""; });
    setNotes(n);
    setLoading(false);
  }

async function updateStatus(id: string, status: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from("applications").update({ status }).eq("id", id);
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));

    const app = applications.find(a => a.id === id);
    if (app?.profiles?.email) {
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "status_update",
          data: {
            email: app.profiles.email,
            name: app.profiles.full_name,
            job_title: app.job_postings?.title,
            status,
          },
        }),
      });
    }
  }

  async function saveNotes(id: string) {
    setSaving(id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from("applications").update({ admin_notes: notes[id] }).eq("id", id);
    setSaving(null);
  }

  async function getResumeLink(resumeUrl: string) {
    const match = resumeUrl.match(/\/object\/sign\/resumes\/(.+?)\?/);
    if (match) {
      const { data } = await supabase.storage
        .from("resumes")
        .createSignedUrl(decodeURIComponent(match[1]), 3600);
      if (data?.signedUrl) { window.open(data.signedUrl, "_blank"); return; }
    }
    window.open(resumeUrl, "_blank");
  }

  const fmt = (d: string) =>
    new Date(d).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

  const filtered = filter === "all"
    ? applications
    : applications.filter(a => a.status === filter);

  if (!authed || loading) return (
    <div style={{ minHeight: "100vh", background: "#03060f", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#475569" }}>Loading...</p>
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
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg,#1d4ed8,#6d28d9)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, color: "white", fontFamily: "Playfair Display, serif",
          }}>S</div>
          <span style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, color: "#eef2ff" }}>
            Admin Dashboard
          </span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Link href="/">
            <button className="btn btn-ghost" style={{ padding: "7px 16px", borderRadius: 8, fontSize: "0.82rem" }}>
              ← Site
            </button>
          </Link>
          <button
            className="btn btn-ghost"
            onClick={() => { supabase.auth.signOut(); router.push("/"); }}
            style={{ padding: "7px 16px", borderRadius: 8, fontSize: "0.82rem" }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2.5rem 2rem" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: "1rem", marginBottom: 32 }}>
          {[
            { label: "Total",     value: applications.length,                                       color: "#60a5fa" },
            { label: "Reviewing", value: applications.filter(a => a.status === "reviewing").length, color: "#fbbf24" },
            { label: "Interview", value: applications.filter(a => a.status === "interview").length, color: "#a78bfa" },
            { label: "Offers",    value: applications.filter(a => a.status === "offer").length,     color: "#34d399" },
            { label: "Contacts",  value: contacts.length,                                           color: "#94a3b8" },
          ].map((s) => (
            <div key={s.label} style={{
              background: "rgba(7,13,26,0.8)",
              border: "1px solid rgba(99,179,237,0.1)",
              borderRadius: 14,
              padding: "1.25rem",
            }}>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", fontWeight: 700, color: s.color }}>
                {s.value}
              </div>
              <div style={{ color: "#475569", fontSize: "0.75rem", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {(["applications", "contacts"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "8px 20px", borderRadius: 99, fontSize: "0.82rem", fontWeight: 600,
              cursor: "pointer", border: "none", fontFamily: "Plus Jakarta Sans, sans-serif",
              background: tab === t ? "linear-gradient(135deg,#1d4ed8,#2563eb)" : "rgba(255,255,255,0.04)",
              color: tab === t ? "#fff" : "#94a3b8",
              transition: "all 0.2s",
            }}>
              {t === "applications"
                ? `🧑‍💻 Applications (${applications.length})`
                : `📬 Contacts (${contacts.length})`}
            </button>
          ))}
        </div>

        {/* Status filter */}
        {tab === "applications" && (
          <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
            {["all", ...STATUS_OPTIONS].map((s) => (
              <button key={s} onClick={() => setFilter(s)} style={{
                padding: "5px 14px", borderRadius: 99, fontSize: "0.72rem", fontWeight: 600,
                cursor: "pointer",
                border: `1px solid ${filter === s ? (STATUS_COLORS[s] || "#60a5fa") : "rgba(99,179,237,0.12)"}`,
                background: filter === s ? `${STATUS_COLORS[s] || "#60a5fa"}18` : "transparent",
                color: filter === s ? (STATUS_COLORS[s] || "#60a5fa") : "#475569",
                fontFamily: "Plus Jakarta Sans, sans-serif",
                transition: "all 0.2s",
              }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
                {" "}({s === "all" ? applications.length : applications.filter(a => a.status === s).length})
              </button>
            ))}
          </div>
        )}

        {/* Applications */}
        {tab === "applications" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {filtered.length === 0 && (
              <p style={{ color: "#475569", textAlign: "center", padding: "3rem" }}>No applications.</p>
            )}
            {filtered.map((app) => (
              <div key={app.id} style={{
                background: "rgba(7,13,26,0.8)",
                border: "1px solid rgba(99,179,237,0.1)",
                borderRadius: 20,
                overflow: "hidden",
              }}>
                <div
                  style={{ padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, cursor: "pointer" }}
                  onClick={() => setExpanded(expanded === app.id ? null : app.id)}
                >
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%",
                      background: "linear-gradient(135deg,#1d4ed8,#6d28d9)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, color: "white", fontSize: "0.9rem", flexShrink: 0,
                    }}>
                      {(app.profiles?.full_name || app.profiles?.email || "?").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{app.profiles?.full_name || "—"}</div>
                      <div style={{ color: "#60a5fa", fontSize: "0.75rem" }}>{app.profiles?.email}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{
                      fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8",
                      background: "rgba(148,163,184,0.08)", border: "1px solid rgba(148,163,184,0.15)",
                      padding: "3px 10px", borderRadius: 99,
                    }}>
                      {app.job_postings?.title}
                    </span>
                    <select
                      value={app.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      style={{
                        fontSize: "0.75rem", fontWeight: 700,
                        color: STATUS_COLORS[app.status],
                        background: `${STATUS_COLORS[app.status]}18`,
                        border: `1px solid ${STATUS_COLORS[app.status]}40`,
                        padding: "4px 10px", borderRadius: 99,
                        cursor: "pointer", fontFamily: "Plus Jakarta Sans, sans-serif", outline: "none",
                      }}
                    >
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s} style={{ background: "#070d1a", color: STATUS_COLORS[s] }}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                    <span style={{ color: "#475569", fontSize: "0.72rem" }}>{fmt(app.applied_at)}</span>
                    <span style={{ color: "#475569" }}>{expanded === app.id ? "▲" : "▼"}</span>
                  </div>
                </div>

                {expanded === app.id && (
                  <div style={{ borderTop: "1px solid rgba(99,179,237,0.08)", padding: "1.5rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "1rem", marginBottom: 20 }}>
                      {[
                        { label: "Email",      value: app.profiles?.email || "—" },
                        { label: "Phone",      value: app.profiles?.phone || "—" },
                        { label: "Department", value: app.job_postings?.department || "—" },
                        { label: "Applied",    value: fmt(app.applied_at) },
                        { label: "Updated",    value: fmt(app.updated_at) },
                      ].map((f) => (
                        <div key={f.label}>
                          <div style={{ color: "#475569", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{f.label}</div>
                          <div style={{ fontSize: "0.85rem" }}>{f.value}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
                      {app.profiles?.linkedin_url && (
                        <a href={app.profiles.linkedin_url} target="_blank" rel="noreferrer"
                          className="btn btn-ghost"
                          style={{ padding: "7px 16px", borderRadius: 8, fontSize: "0.8rem", textDecoration: "none" }}>
                          🔗 LinkedIn
                        </a>
                      )}
                      {app.resume_url && (
                        <button
                          className="btn btn-primary"
                          onClick={() => getResumeLink(app.resume_url!)}
                          style={{ padding: "7px 16px", borderRadius: 8, fontSize: "0.8rem" }}
                        >
                          📄 View Resume {app.resume_filename ? `(${app.resume_filename})` : ""}
                        </button>
                      )}
                    </div>

                    {app.cover_letter && (
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ color: "#475569", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Cover Letter</div>
                        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(99,179,237,0.08)", borderRadius: 10, padding: "12px 14px", color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.65 }}>
                          {app.cover_letter}
                        </div>
                      </div>
                    )}

                    <div>
                      <div style={{ color: "#475569", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Admin Notes</div>
                      <textarea
                        className="input"
                        rows={3}
                        placeholder="Internal notes about this candidate..."
                        value={notes[app.id] || ""}
                        onChange={(e) => setNotes({ ...notes, [app.id]: e.target.value })}
                        style={{ resize: "vertical", marginBottom: 8 }}
                      />
                      <button
                        className="btn btn-primary"
                        onClick={() => saveNotes(app.id)}
                        disabled={saving === app.id}
                        style={{ padding: "7px 18px", borderRadius: 8, fontSize: "0.8rem" }}
                      >
                        {saving === app.id ? "Saving..." : "Save Notes"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Contacts */}
        {tab === "contacts" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {contacts.length === 0 && (
              <p style={{ color: "#475569", textAlign: "center", padding: "3rem" }}>No contact submissions yet.</p>
            )}
            {contacts.map((c) => (
              <div key={c.id} style={{
                background: "rgba(7,13,26,0.8)",
                border: "1px solid rgba(99,179,237,0.1)",
                borderRadius: 16,
                overflow: "hidden",
              }}>
                <div
                  style={{ padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, cursor: "pointer" }}
                  onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                >
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: "linear-gradient(135deg,#059669,#0891b2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, color: "white", fontSize: "0.85rem", flexShrink: 0,
                    }}>
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{c.name}</div>
                      <div style={{ color: "#60a5fa", fontSize: "0.75rem" }}>{c.email}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    {c.service && (
                      <span style={{
                        fontSize: "0.72rem", fontWeight: 600, color: "#60a5fa",
                        background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)",
                        padding: "3px 10px", borderRadius: 99,
                      }}>{c.service}</span>
                    )}
                    <span style={{ color: "#475569", fontSize: "0.72rem" }}>{fmt(c.created_at)}</span>
                    <span style={{ color: "#475569" }}>{expanded === c.id ? "▲" : "▼"}</span>
                  </div>
                </div>

                {expanded === c.id && (
                  <div style={{ borderTop: "1px solid rgba(99,179,237,0.08)", padding: "1.25rem 1.5rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: 14 }}>
                      <div>
                        <div style={{ color: "#475569", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Company</div>
                        <div style={{ fontSize: "0.85rem" }}>{c.company || "—"}</div>
                      </div>
                      <div>
                        <div style={{ color: "#475569", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Service</div>
                        <div style={{ fontSize: "0.85rem" }}>{c.service || "—"}</div>
                      </div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ color: "#475569", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Message</div>
                      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(99,179,237,0.08)", borderRadius: 10, padding: "12px 14px", color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.65 }}>
                        {c.message}
                      </div>
                    </div>
                    <a href={`mailto:${c.email}`}
                      className="btn btn-primary"
                      style={{ padding: "7px 16px", borderRadius: 8, fontSize: "0.8rem", textDecoration: "none", display: "inline-flex" }}>
                      ✉️ Reply to {c.name}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}