import Link from "next/link";
import type { SiteContent } from "@/lib/content/types";
import { cleanRawText } from "@/lib/content/markdown-parser";
import SiteIcon, { WhatsAppIcon } from "@/components/site/SiteIcon";
import SafeImg from "@/components/site/SafeImg";
import { Dumbbell, ArrowRight, Sparkles, Clock, Waves, ShieldCheck, Trophy, Phone } from "lucide-react";
import { buildWhatsappUrl, phoneToTelHref } from "@/lib/content/contact-utils";

export default function HomeGym({ content }: { content: SiteContent }) {
  const s = content.sporSalonu;
  const tel = s?.telefon || content.iletisim?.telefon || "0530 608 90 51";
  const telHref = phoneToTelHref(tel);
  const waHref = buildWhatsappUrl(
    content.iletisim?.whatsapp || tel,
    "Merhaba, Petra Spor Salonu ön kayıt indirimi ve üyelik hakkında bilgi almak istiyorum."
  );
  const instagramUrl = s?.instagramUrl || "https://www.instagram.com/petrasporsalonu";
  const instagramTag = s?.instagram || "@petrasporsalonu";

  const defaultOzellikler = [
    {
      baslik: "%35 Ön Kayıt Avantajı",
      alt: "Erken dönem üyelik indirimi",
      ikon: "sparkles",
    },
    {
      baslik: "Kardiyo & Serbest Ağırlık",
      alt: "Modern istasyonlar & dambıllar",
      ikon: "dumbbell",
    },
    {
      baslik: "Havuz & Teras Entegrasyonu",
      alt: "Antrenman sonrası serinleme",
      ikon: "waves",
    },
    {
      baslik: "07:00 – 23:00 Kesintisiz",
      alt: "Haftanın 7 günü açık salon",
      ikon: "clock",
    },
  ];

  const ozelliklerList = s?.ozellikler && s.ozellikler.length > 0 ? s.ozellikler : defaultOzellikler;

  const defaultBento = [
    {
      src: "/assets/cms/petra-spor-salonu-afis.jpg",
      alt: "Petra Spor Salonu & Antrenman Alanı",
      rozet: "Kardiyo & Serbest Ağırlık",
    },
    {
      src: "/assets/cms/petra-pool-beach-loca.jpg",
      alt: "Petra Spor ve Yaşam Kompleksi",
      rozet: "Havuz & Teras Entegrasyonu",
    },
  ];

  const bentoList = s?.bentoGorseller && s.bentoGorseller.length > 0 ? s.bentoGorseller : defaultBento;

  return (
    <section
      className="section section--dark home-gym-sec"
      id="spor-salonu"
      aria-label="Petra Spor Salonu"
      style={{
        backgroundColor: "#0B1009",
        borderTop: "1px solid rgba(217, 164, 65, 0.22)",
        borderBottom: "1px solid rgba(217, 164, 65, 0.22)",
        paddingTop: "clamp(56px, 7vw, 110px)",
        paddingBottom: "clamp(56px, 7vw, 110px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .home-gym-sec::before {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1000px;
          height: 500px;
          background: radial-gradient(circle, rgba(217, 164, 65, 0.12) 0%, rgba(124, 139, 79, 0.05) 45%, transparent 70%);
          pointer-events: none;
        }
        .gym-full-container {
          width: 100%;
          max-width: min(1400px, 94vw);
          margin-inline: auto;
          position: relative;
          z-index: 1;
        }
        .gym-main-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: clamp(36px, 5.5vw, 72px);
          align-items: center;
        }
        @media (max-width: 1060px) {
          .gym-main-grid {
            grid-template-columns: 1fr;
            gap: 44px;
          }
        }
        .gym-title {
          color: #FFFFFF !important;
          -webkit-text-fill-color: #FFFFFF !important;
          font-family: var(--f-head, 'Playfair Display', Georgia, serif);
          font-size: clamp(32px, 4.5vw, 54px) !important;
          font-weight: 700 !important;
          line-height: 1.12;
          margin: 0 0 16px;
          letter-spacing: -0.015em;
        }
        .gym-lead {
          color: #E2DBD0 !important;
          -webkit-text-fill-color: #E2DBD0 !important;
          font-size: clamp(15.5px, 1.6vw, 17.5px);
          line-height: 1.7;
          margin: 0 0 28px;
          max-width: 60ch;
        }
        .gym-stats-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 28px;
        }
        .gym-stat-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(217, 164, 65, 0.3);
          border-radius: 999px;
          color: #F4EEE1;
          font-size: 13px;
          font-weight: 600;
        }
        .gym-glass-card {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 18px;
          padding: 16px 18px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .gym-glass-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(217, 164, 65, 0.5);
          transform: translateY(-3px);
          box-shadow: 0 12px 28px -6px rgba(0, 0, 0, 0.5);
        }
        .gym-bento-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          position: relative;
        }
        .gym-bento-box {
          border-radius: 26px;
          overflow: hidden;
          border: 1.5px solid rgba(217, 164, 65, 0.38);
          box-shadow: 0 28px 70px -15px rgba(0, 0, 0, 0.85), 0 0 35px rgba(217, 164, 65, 0.12);
          position: relative;
          background: #090C08;
          height: 480px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .gym-bento-box:hover {
          border-color: rgba(217, 164, 65, 0.7);
          box-shadow: 0 32px 80px -15px rgba(0, 0, 0, 0.95), 0 0 45px rgba(217, 164, 65, 0.25);
        }
        .gym-bento-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gym-bento-box:hover img {
          transform: scale(1.08);
        }
        @media (max-width: 640px) {
          .gym-bento-grid {
            grid-template-columns: 1fr;
          }
          .gym-bento-box {
            height: 300px;
          }
        }
      `}</style>

      <div className="gym-full-container">
        <div className="gym-main-grid">
          {/* SOL KOLON: BAŞLIKLAR, STAT CHIPLER, 2x2 CAM ÖZELLİKLER VE BUTONLAR */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "999px",
                background: "rgba(217, 164, 65, 0.15)",
                border: "1.5px solid rgba(217, 164, 65, 0.4)",
                color: "#E8B84B",
                fontSize: "12.5px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "18px",
              }}
            >
              <Sparkles size={14} />
              <span>{cleanRawText(s?.eyebrow || "") || "PETRA YAŞAM MERKEZİ · FITNESS"}</span>
            </div>

            <h2 className="gym-title">
              {cleanRawText(s?.baslik || "") || "Petra Spor Salonu & Fitness Kulübü"}
            </h2>

            <p className="gym-lead">
              {cleanRawText(s?.lead || "") ||
                "Çekmeköy Taşdelen Megakent Sitesi içerisinde; modern kardiyo ve serbest ağırlık ekipmanları, ferah antrenman alanları ve sağlıklı yaşam kültürüyle formunuzu zirveye taşıyın."}
            </p>

            {/* HIZLI İSTATİSTİK ROZETLERİ */}
            <div className="gym-stats-row">
              <div className="gym-stat-chip">
                <Trophy size={14} color="#E8B84B" />
                <span>1000+ m² Yaşam Kompleksi</span>
              </div>
              <div className="gym-stat-chip">
                <Clock size={14} color="#E8B84B" />
                <span>07:00 – 23:00 Açık</span>
              </div>
              <div className="gym-stat-chip">
                <ShieldCheck size={14} color="#E8B84B" />
                <span>%35 Ön Kayıt İndirimi</span>
              </div>
            </div>

            {/* 4 ÖZELLİK: 2x2 CAM EFEKTLİ KARTLAR */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "14px",
                marginBottom: "36px",
              }}
            >
              {ozelliklerList.map((oz: any, ozi: number) => {
                const isGold = ozi % 2 === 0;
                return (
                  <div key={ozi} className="gym-glass-card">
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 12,
                        background: isGold ? "rgba(217, 164, 65, 0.22)" : "rgba(124, 139, 79, 0.25)",
                        color: isGold ? "#F3C562" : "#B5D172",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {oz.ikon === "dumbbell" ? (
                        <Dumbbell size={18} />
                      ) : oz.ikon === "waves" ? (
                        <Waves size={18} />
                      ) : oz.ikon === "clock" ? (
                        <Clock size={18} />
                      ) : (
                        <Sparkles size={18} />
                      )}
                    </div>
                    <div>
                      <b style={{ display: "block", fontSize: "14.5px", color: "#FFFFFF", marginBottom: 3, fontWeight: 700 }}>
                        {cleanRawText(oz.baslik)}
                      </b>
                      <span style={{ fontSize: "12.5px", color: "#B8C0B2", lineHeight: 1.4, display: "block" }}>
                        {cleanRawText(oz.alt)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AKSİYON BUTONLARI */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}>
              <Link
                href="/spor-salonu"
                className="btn"
                style={{
                  background: "#D9A441",
                  color: "#090C08",
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "15px 26px",
                  borderRadius: "14px",
                  boxShadow: "0 8px 26px -4px rgba(217, 164, 65, 0.5)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "9px",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                Spor Salonunu Keşfet <ArrowRight size={17} />
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
                  fontSize: "15px",
                  padding: "15px 24px",
                  borderRadius: "14px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "9px",
                  boxShadow: "0 8px 26px -4px rgba(37, 211, 102, 0.45)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <WhatsAppIcon size={19} />
                WhatsApp'tan Bilgi Al
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost"
                style={{
                  border: "1.5px solid rgba(244, 238, 225, 0.3)",
                  color: "#FFFFFF",
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "14px 20px",
                  borderRadius: "14px",
                  fontSize: "14.5px",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <SiteIcon name="instagram" size={17} />
                {instagramTag}
              </a>
            </div>
          </div>

          {/* SAĞ KOLON: BÜYÜTÜLMÜŞ 480PX 2 FOTOĞRAFLI MODERN BENTO KOLAJ */}
          <div className="gym-bento-grid">
            {bentoList.map((b: any, bi: number) => (
              <div
                key={bi}
                className="gym-bento-box"
                style={{ marginTop: bi === 1 ? "36px" : "0" }}
              >
                <SafeImg
                  src={b.src || (bi === 0 ? "/assets/cms/petra-spor-salonu-afis.jpg" : "/assets/cms/petra-pool-beach-loca.jpg")}
                  alt={b.alt || "Petra Spor Salonu"}
                  fallback="/assets/cms/hero-ic.webp"
                  className="w-full h-full object-cover"
                />
                  <span>{cleanRawText(b.rozet || b.alt || "Petra Fitness")}</span>
                </div>
            ))}
          </div>
      </div>
      </div>
    </section>
  );
}
