export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#0d0f0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
      }}
      aria-busy="true"
      aria-label="Yükleniyor"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/cms/logo.png"
        alt=""
        width={72}
        height={72}
        style={{ width: 72, height: 72, objectFit: "contain", borderRadius: "50%" }}
      />
      <p
        style={{
          margin: 0,
          color: "#d9a441",
          fontSize: 11,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Petra Cafe
      </p>
    </div>
  );
}
