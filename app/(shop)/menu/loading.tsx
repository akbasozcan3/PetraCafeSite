export default function MenuLoading() {
  return (
    <div
      className="ys"
      style={{ minHeight: "40vh", display: "grid", placeItems: "center" }}
      aria-busy="true"
      aria-label="Menü yükleniyor"
    >
      <p style={{ color: "#6E6A5C", fontSize: 14 }}>Menü yükleniyor…</p>
    </div>
  );
}
