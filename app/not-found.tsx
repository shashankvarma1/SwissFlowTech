import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "404 — Page Not Found" };

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
      <div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "8rem", fontWeight: 700, color: "var(--border-dark)", lineHeight: 1, marginBottom: 8 }}>
          404
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, margin: "16px 0 10px" }}>Page not found</h1>
        <p style={{ color: "var(--text-3)", marginBottom: 32, maxWidth: 360, margin: "0 auto 32px" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <button className="btn btn-primary" style={{ padding: "12px 28px", borderRadius: 9 }}>← Back to Home</button>
        </Link>
      </div>
    </div>
  );
}