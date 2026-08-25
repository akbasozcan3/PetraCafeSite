import Link from "next/link";
import type { SiteContent } from "@/lib/content/types";
import { cleanRawText } from "@/lib/content/markdown-parser";
import SiteIcon from "@/components/site/SiteIcon";
import { Dumbbell, ArrowRight, CheckCircle2, Clock, MapPin } from "lucide-react";

export default function HomeGym({ content }: { content: SiteContent }) {
  const s = content.sporSalonu;
  const tel = s?.telefon || content.iletisim?.telefon || "0530 608 90 51";
  const instagramUrl = s?.instagramUrl || "https://www.instagram.com/petrasporsalonu";
  const instagramTag = s?.instagram || "@petrasporsalonu";

  return (
    <section className="section section--warm" id="spor-salonu" aria-label="Petra Spor Salonu">
      <div className="wrap">
        <div
          style={{
            background: "#16190F",
            color: "#F4EEE1",
            borderRadius: "28px",
            padding: "clamp(28px, 4.5vw, 48px)",
            border: "1.5px solid rgba(217, 164, 65, 0.3)",
            boxShadow: "0 12px 36px -10px rgba(0, 0, 0, 0.35)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px", alignItems: "center" }}>
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  borderRadius: "999px",
                  background: "rgba(217, 164, 65, 0.15)",
                  color: "#E8B84B",
                  fontSize: "12px",
                  fontWeight: 700,
                  marginBottom: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                <Dumbbell size={14} />
                <span>{cleanRawText(s?.eyebrow || "") || "PETRA YAŞAM MERKEZİ"}</span>
              </div>

              <h2
                style={{
                  color: "#FFFFFF",
                  fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
                  fontSize: "clamp(24px, 3.5vw, 38px)",
                  fontWeight: 600,
                  lineHeight: 1.2,
                  margin: "0 0 14px",
                }}
              >
                {cleanRawText(s?.baslik || "") || "Petra Spor Salonu"}
              </h2>

              <p style={{ color: "#F4EEE1", fontSize: "15px", lineHeight: 1.7, opacity: 0.9, margin: "0 0 20px", maxWidth: "56ch" }}>
                {cleanRawText(s?.lead || "") ||
                  "Çekmeköy Taşdelen Megakent Sitesi içerisinde; modern kardiyo ve serbest ağırlık ekipmanları, ferah antrenman alanları ve sağlıklı yaşam kültürüyle formunuzu zirveye taşıyın."}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px", marginBottom: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "#E0D7C6" }}>
                  <CheckCircle2 size={16} color="#7C8B4F" style={{ flexShrink: 0 }} />
                  <span>Kardiyo & Ağırlık Alanları</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "#E0D7C6" }}>
                  <CheckCircle2 size={16} color="#7C8B4F" style={{ flexShrink: 0 }} />
                  <span>Havalandırmalı Ferah Salon</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "#E0D7C6" }}>
                  <CheckCircle2 size={16} color="#7C8B4F" style={{ flexShrink: 0 }} />
                  <span>Açık Havuz & Cafe Entegrasyonu</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "#E0D7C6" }}>
                  <CheckCircle2 size={16} color="#7C8B4F" style={{ flexShrink: 0 }} />
                  <span>Haftanın 7 Günü: 07:00 – 23:00</span>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <Link href="/spor-salonu" className="btn btn--light">
                  Spor Salonunu Keşfet <ArrowRight size={15} />
                </Link>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--ghost"
                  style={{ border: "1.5px solid rgba(244, 238, 225, 0.35)", color: "#FFFFFF", background: "transparent" }}
                >
                  <SiteIcon name="instagram" size={15} />
                  {instagramTag}
                </a>
              </div>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ padding: "8px", borderRadius: "10px", background: "rgba(217, 164, 65, 0.15)", color: "#E8B84B" }}>
                  <Clock size={18} />
                </div>
                <div>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", display: "block" }}>Çalışma Saatleri</span>
                  <b style={{ fontSize: "14px", color: "#FFFFFF" }}>07:00 – 23:00 (Hergün)</b>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ padding: "8px", borderRadius: "10px", background: "rgba(124, 139, 79, 0.15)", color: "#7C8B4F" }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", display: "block" }}>Konum</span>
                  <b style={{ fontSize: "14px", color: "#FFFFFF" }}>Megakent Sitesi İçi, Taşdelen</b>
                </div>
              </div>

              <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "14px" }}>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", display: "block", marginBottom: "4px" }}>
                  Bilgi & Danışma
                </span>
                <b style={{ fontSize: "16px", color: "#E8B84B", fontFamily: "var(--f-head, serif)" }}>
                  {tel}
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
