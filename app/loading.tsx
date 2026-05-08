export default function Loading() {
  return (
    <div style={{ minHeight: "100vh", background: "#03060f", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          border: "3px solid rgba(37,99,235,0.2)",
          borderTop: "3px solid #2563eb",
          animation: "spin 0.8s linear infinite",
        }} />
        <p style={{ color: "#475569", fontSize: "0.85rem" }}>Loading...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}