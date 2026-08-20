"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Sparkles, Megaphone, ArrowRight } from "lucide-react";

export interface DuyuruData {
  aktif?: boolean;
  metin?: string;
  stil?: "gold" | "blue" | "green" | "red" | "dark";
  ikon?: string;
  butonMetin?: string;
  butonLink?: string;
}

const STYLES: Record<string, { bg: string; text: string; border: string; btnBg: string; btnText: string }> = {
  gold: {
    bg: "linear-gradient(90deg, #b8842c 0%, #d9a441 50%, #b8842c 100%)",
    text: "#0D0F0A",
    border: "rgba(255,255,255,0.2)",
    btnBg: "#0D0F0A",
    btnText: "#FFFFFF",
  },
  blue: {
    bg: "linear-gradient(90deg, #0369a1 0%, #0284c7 50%, #0369a1 100%)",
    text: "#FFFFFF",
    border: "rgba(255,255,255,0.2)",
    btnBg: "#FFFFFF",
    btnText: "#0369a1",
  },
  green: {
    bg: "linear-gradient(90deg, #047857 0%, #10b981 50%, #047857 100%)",
    text: "#FFFFFF",
    border: "rgba(255,255,255,0.2)",
    btnBg: "#FFFFFF",
    btnText: "#047857",
  },
  red: {
    bg: "linear-gradient(90deg, #be123c 0%, #e11d48 50%, #be123c 100%)",
    text: "#FFFFFF",
    border: "rgba(255,255,255,0.2)",
    btnBg: "#FFFFFF",
    btnText: "#be123c",
  },
  dark: {
    bg: "#141E2E",
    text: "#EEE9E0",
    border: "rgba(217, 164, 65, 0.3)",
    btnBg: "#D9A441",
    btnText: "#0D0F0A",
  },
};

export default function HomeDuyuru({
  aktif,
  metin,
  stil = "gold",
  ikon,
  butonMetin,
  butonLink,
}: DuyuruData) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (aktif && metin && !dismissed) {
      document.documentElement.classList.add("duyuru-acik");
    } else {
      document.documentElement.classList.remove("duyuru-acik");
    }
    return () => {
      document.documentElement.classList.remove("duyuru-acik");
    };
  }, [aktif, metin, dismissed]);

  if (!aktif || !metin || dismissed) return null;

  const currentStyle = STYLES[stil] || STYLES.gold;

  return (
    <aside
      id="duyuru"
      role="status"
      style={{
        position: "relative",
        zIndex: 50,
        background: currentStyle.bg,
        color: currentStyle.text,
        borderBottom: `1px solid ${currentStyle.border}`,
        padding: "8px 16px",
        fontSize: "13px",
        fontWeight: 600,
        textAlign: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "15px" }}>{ikon || "📢"}</span>
        <span>{metin}</span>
      </div>

      {butonMetin && (
        <a
          href={butonLink || "#rezervasyon"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            background: currentStyle.btnBg,
            color: currentStyle.btnText,
            padding: "3px 10px",
            borderRadius: "999px",
            fontSize: "11.5px",
            fontWeight: 700,
            textDecoration: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            transition: "transform 0.15s ease",
          }}
        >
          {butonMetin}
          <ArrowRight style={{ width: 12, height: 12 }} />
        </a>
      )}

      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Duyuruyu kapat"
        style={{
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "transparent",
          border: "none",
          color: currentStyle.text,
          opacity: 0.75,
          cursor: "pointer",
          padding: "4px",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <X style={{ width: 16, height: 16 }} />
      </button>
    </aside>
  );
}

