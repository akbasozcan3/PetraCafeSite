"use client";

import type { CSSProperties } from "react";

const ink = "#0D0F0A";
const cream = "#FBF8F1";
const muted = "#6E6A5C";
const brass = "#D9A441";

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const map = {
    tl: { top: 18, left: 18, borderTop: `1.5px solid ${brass}`, borderLeft: `1.5px solid ${brass}` },
    tr: { top: 18, right: 18, borderTop: `1.5px solid ${brass}`, borderRight: `1.5px solid ${brass}` },
    bl: { bottom: 18, left: 18, borderBottom: `1.5px solid ${brass}`, borderLeft: `1.5px solid ${brass}` },
    br: { bottom: 18, right: 18, borderBottom: `1.5px solid ${brass}`, borderRight: `1.5px solid ${brass}` },
  } as const;
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        width: 28,
        height: 28,
        opacity: 0.7,
        ...map[pos],
      }}
    />
  );
}

function Btn({
  label,
  href,
  onClick,
  tone,
}: {
  label: string;
  href?: string;
  onClick?: () => void;
  tone: "solid" | "ghost";
}) {
  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    padding: "0 22px",
    borderRadius: 999,
    fontWeight: 600,
    fontSize: 15,
    letterSpacing: "0.02em",
    textDecoration: "none",
    cursor: "pointer",
    fontFamily: "Inter, system-ui, sans-serif",
    border: tone === "ghost" ? `1px solid ${ink}` : 0,
    background: tone === "solid" ? ink : "transparent",
    color: tone === "solid" ? cream : ink,
  };
  if (href) {
    return (
      <a href={href} style={style}>
        {label}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} style={style}>
      {label}
    </button>
  );
}

export default function SiteFault({
  kicker = "404 HATA",
  title = "Sayfa Bulunamadı",
  lead = "Ulaşmaya çalıştığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı olabilir. Menüyü inceleyebilir veya ana sayfaya dönebilirsiniz.",
  primary,
  secondary,
  logoUrl,
}: {
  kicker?: string;
  title: string;
  lead: string;
  primary: { label: string; href?: string; onClick?: () => void };
  secondary?: { label: string; href?: string };
  logoUrl?: string;
}) {
  const finalLogo = logoUrl || "/assets/img/petra-mark.svg";
  const isCustomLogo = Boolean(logoUrl && !logoUrl.includes("petra-mark"));

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: "48px 24px",
        background: `radial-gradient(ellipse 70% 45% at 50% 0%, rgba(217,164,65,0.16), transparent 58%), ${cream}`,
        color: ink,
        textAlign: "center",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />

      <div style={{ maxWidth: 480 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={finalLogo}
          alt="Petra Logo"
          width={isCustomLogo ? 90 : 200}
          height={isCustomLogo ? 90 : 50}
          style={{
            display: "block",
            width: isCustomLogo ? 84 : 180,
            height: isCustomLogo ? 84 : "auto",
            maxWidth: "70%",
            objectFit: "contain",
            borderRadius: isCustomLogo ? "50%" : 0,
            boxShadow: isCustomLogo ? "0 8px 24px rgba(217, 164, 65, 0.2)" : "none",
            margin: "0 auto 20px",
          }}
        />
        {kicker && !/^petra$/i.test(kicker.trim()) ? (
        <p
          style={{
            margin: 0,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: brass,
          }}
        >
          {kicker}
        </p>
        ) : null}
        <h1
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 600,
            fontSize: "clamp(1.85rem, 4.4vw, 2.7rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.12,
            margin: "12px 0 14px",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            margin: "0 auto 28px",
            maxWidth: "36ch",
            color: muted,
            fontSize: 16,
            lineHeight: 1.6,
          }}
        >
          {lead}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
          }}
        >
          <Btn {...primary} tone="solid" />
          {secondary ? <Btn {...secondary} tone="ghost" /> : null}
        </div>
        <p style={{ marginTop: 36, fontSize: 13, color: muted, letterSpacing: "0.04em" }}>
          <a href="tel:+905306089051" style={{ color: ink, fontWeight: 600, textDecoration: "none" }}>
            0530 608 90 51
          </a>
          <span style={{ opacity: 0.45 }}> · </span>
          Çekmeköy · Petra Yaşam Merkezi
        </p>
      </div>
    </main>
  );
}

export function isStaleChunkError(error?: { message?: string; name?: string } | null) {
  const text = `${error?.name || ""} ${error?.message || ""}`;
  return /chunk|loading css chunk|failed to fetch dynamically imported/i.test(text);
}
