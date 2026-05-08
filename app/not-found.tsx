import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "#03060f", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
      <div>
        <div style={{ fontFamily: "Playfair Display, serif", fontSize: "8rem", fontWeight: 800, background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>
          404
        </div>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.8rem", fontWeight: 700, margin: "16px 0 10px" }}>
          Page not found
        </h1>
        <p style={{ color: "#475569", marginBottom: 32 }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <button className="btn btn-primary" style={{ padding: "12px 28px", borderRadius: 12 }}>
            ← Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}