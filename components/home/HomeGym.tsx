import Link from "next/link";
import type { SiteContent } from "@/lib/content/types";
import { cleanRawText } from "@/lib/content/markdown-parser";
import SiteIcon, { WhatsAppIcon } from "@/components/site/SiteIcon";
import SafeImg from "@/components/site/SafeImg";
import { Dumbbell, ArrowRight, Sparkles, Clock, Waves, Flame } from "lucide-react";
import { buildWhatsappUrl } from "@/lib/content/contact-utils";

export default function HomeGym({ content }: { content: SiteContent }) {
  const s = content.sporSalonu;
  const tel = s?.telefon || content.iletisim?.telefon || "0530 608 90 51";
  const waHref = buildWhatsappUrl(
    content.iletisim?.whatsapp || tel,
    "Merhaba, Petra Spor Salonu ön kayıt indirimi ve üyelik hakkında bilgi almak istiyorum."
  );
  const instagramUrl = s?.instagramUrl || "https://www.instagram.com/petrasporsalonu";
  const instagramTag = s?.instagram || "@petrasporsalonu";

  return (
    <section
      className="section home-gym-sec"
      id="spor-salonu"
      aria-label="Petra Spor Salonu"
      style={{
        paddingTop: "clamp(60px, 7vw, 100px)",
        paddingBottom: "clamp(60px, 7vw, 100px)",
      }}
    >
      <style>{`
        .home-gym-sec {
          position: relative;
        }
        .gym-card-clean {
          background: linear-gradient(145deg, #161D15 0%, #0E130D 100%);
          border: 1.5px solid rgba(217, 164, 65, 0.32);
          border-radius: 28px;
          padding: clamp(28px, 4.5vw, 52px);
          box-shadow: 0 24px 70px -20px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.05);
          position: relative;
          overflow: hidden;
          max-width: min(1180px, 100%);
          margin-inline: auto;
        }
        .gym-card-clean::before {
          content: "";
          position: absolute;
          top: -120px;
          right: -120px;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(217, 164, 65, 0.14) 0%, transparent 70%);
          pointer-events: none;
        }
        .gym-grid-layout {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: clamp(32px, 4.5vw, 54px);
          align-items: center;
        }
        @media (max-width: 980px) {
          .gym-grid-layout {
            grid-template-columns: 1fr;
          }
        }
        .gym-clean-title {
          color: #FFFFFF !important;
          -webkit-text-fill-color: #FFFFFF !important;
          font-family: var(--f-head, 'Playfair Display', Georgia, serif);
          font-size: clamp(28px, 3.8vw, 42px) !important;
          font-weight: 700 !important;
          line-height: 1.18;
          margin: 0 0 14px;
          letter-spacing: -0.01em;
        }
        .gym-clean-lead {
          color: #E2DBD0 !important;
          -webkit-text-fill-color: #E2DBD0 !important;
          font-size: clamp(14px, 1.5vw, 15.5px);
          line-height: 1.68;
          margin: 0 0 24px;
          max-width: 52ch;
        }
        .gym-glass-card {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 12px 14px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .gym-glass-card:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(217, 164, 65, 0.3);
        }
        .gym-bento-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          position: relative;
        }
        .gym-bento-img-box {
          border-radius: 18px;
          overflow: hidden;
          border: 1.5px solid rgba(217, 164, 65, 0.24);
          box-shadow: 0 14px 34px -10px rgba(0, 0, 0, 0.6);
          position: relative;
          background: #0E130D;
          aspect-ratio: 4 / 5;
        }
        .gym-bento-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gym-bento-img-box:hover img {
          transform: scale(1.06);
        }
        .gym-floating-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          right: 12px;
          padding: 8px 12px;
          border-radius: 12px;
          background: rgba(14, 19, 13, 0.88);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(217, 164, 65, 0.3);
          color: #F4EEE1;
          font-size: 11.5px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }
      `}</style>

      <div className="wrap" style={{ display: "flex", justifyContent: "center" }}>
        <div className="gym-card-clean">
          <div className="gym-grid-layout">
            {/* SOL KOLON: YAZILAR, CAM KARTLAR VE BUTONLAR */}
            <div>
              {/* ÜST ROZETLER */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 12px",
                    borderRadius: "999px",
                    background: "rgba(217, 164, 65, 0.15)",
                    color: "#E8B84B",
                    fontSize: "11.5px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    border: "1px solid rgba(217, 164, 65, 0.28)",
                  }}
                >
                  <Dumbbell size={13} />
                  <span>{cleanRawText(s?.eyebrow || "") || "PETRA YAŞAM MERKEZİ"}</span>
                </div>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "5px 12px",
                    borderRadius: "999px",
                    background: "rgba(220, 38, 38, 0.18)",
                    color: "#FF6B6B",
                    fontSize: "11.5px",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    border: "1px solid rgba(220, 38, 38, 0.3)",
                  }}
                >
                  <Flame size={13} color="#FF6B6B" />
                  <span>Ön Kayıta Özel %35 İndirim</span>
                </div>
              </div>

              <h2 className="gym-clean-title">
                {cleanRawText(s?.baslik || "") || "Petra Spor Salonu"}
              </h2>

              <p className="gym-clean-lead">
                {cleanRawText(s?.lead || "") ||
                  "Çekmeköy Taşdelen Megakent Sitesi içerisinde; modern kardiyo ve serbest ağırlık ekipmanları, ferah antrenman alanları ve sağlıklı yaşam kültürüyle formunuzu zirveye taşıyın."}
              </p>

              {/* 4 ÖZELLİK: CAM EFEKTLİ MİNİK KARTÇIKLAR */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "10px",
                  marginBottom: "26px",
                }}
              >
                <div className="gym-glass-card">
                  <div style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(217, 164, 65, 0.16)", color: "#E8B84B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Sparkles size={14} />
                  </div>
                  <div>
                    <b style={{ display: "block", fontSize: "13px", color: "#FFFFFF" }}>%35 Ön Kayıt Avantajı</b>
                    <span style={{ fontSize: "11.5px", color: "#A8B0A2" }}>Erken dönem üyelik indirimi</span>
                  </div>
                </div>

                <div className="gym-glass-card">
                  <div style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(217, 164, 65, 0.16)", color: "#E8B84B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Dumbbell size={14} />
                  </div>
                  <div>
                    <b style={{ display: "block", fontSize: "13px", color: "#FFFFFF" }}>Kardiyo & Serbest Ağırlık</b>
                    <span style={{ fontSize: "11.5px", color: "#A8B0A2" }}>Modern istasyonlar & dambıllar</span>
                  </div>
                </div>

                <div className="gym-glass-card">
                  <div style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(124, 139, 79, 0.2)", color: "#A4BD63", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Waves size={14} />
                  </div>
                  <div>
                    <b style={{ display: "block", fontSize: "13px", color: "#FFFFFF" }}>Havuz & Teras Entegrasyonu</b>
                    <span style={{ fontSize: "11.5px", color: "#A8B0A2" }}>Antrenman sonrası serinleme</span>
                  </div>
                </div>

                <div className="gym-glass-card">
                  <div style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(124, 139, 79, 0.2)", color: "#A4BD63", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Clock size={14} />
                  </div>
                  <div>
                    <b style={{ display: "block", fontSize: "13px", color: "#FFFFFF" }}>07:00 – 23:00 Kesintisiz</b>
                    <span style={{ fontSize: "11.5px", color: "#A8B0A2" }}>Haftanın 7 günü açık salon</span>
                  </div>
                </div>
              </div>

              {/* AKSİYON BUTONLARI */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
                <Link
                  href="/spor-salonu"
                  className="btn"
                  style={{
                    background: "#D9A441",
                    color: "#0D0F0A",
                    fontWeight: 700,
                    padding: "12px 22px",
                    borderRadius: "12px",
                    boxShadow: "0 6px 20px -4px rgba(217, 164, 65, 0.35)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  Spor Salonunu Keşfet <ArrowRight size={15} />
                </Link>

                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{
                    background: "#25D366",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    padding: "12px 20px",
                    borderRadius: "12px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 6px 20px -4px rgba(37, 211, 102, 0.35)",
                  }}
                >
                  <WhatsAppIcon size={17} />
                  WhatsApp'tan Bilgi Al
                </a>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--ghost"
                  style={{
                    border: "1px solid rgba(244, 238, 225, 0.25)",
                    color: "#FFFFFF",
                    background: "transparent",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <SiteIcon name="instagram" size={15} />
                  {instagramTag}
                </a>
              </div>
            </div>

            {/* SAĞ KOLON: 2 FOTOĞRAFLI MODERN BENTO KOLAJ */}
            <div className="gym-bento-wrapper">
              <div className="gym-bento-img-box" style={{ marginTop: "0" }}>
                <SafeImg
                  src="/assets/cms/hero-ic.webp"
                  alt="Petra Fitness ve Antrenman Alanı"
                  fallback="/assets/cms/hero-ic.webp"
                  className="w-full h-full object-cover"
                />
                <div className="gym-floating-badge">
                  <Dumbbell size={13} color="#E8B84B" />
                  <span>Kardiyo & Serbest Ağırlık</span>
                </div>
              </div>

              <div className="gym-bento-img-box" style={{ marginTop: "24px" }}>
                <SafeImg
                  src="/assets/cms/hero-cephe.webp"
                  alt="Petra Spor ve Yaşam Kompleksi"
                  fallback="/assets/cms/hero-cephe.webp"
                  className="w-full h-full object-cover"
                />
                <div className="gym-floating-badge">
                  <Sparkles size={13} color="#E8B84B" />
                  <span>Ferah & Hijyenik Salon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
