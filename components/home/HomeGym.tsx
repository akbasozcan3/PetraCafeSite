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
      alt: "Petra Fitness & Antrenman Alanı",
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
      className="section home-gym-sec"
      id="spor-salonu"
      aria-label="Petra Spor Salonu"
      style={{
        paddingTop: "clamp(48px, 6vw, 90px)",
        paddingBottom: "clamp(48px, 6vw, 90px)",
      }}
    >
      <style>{`
        .home-gym-sec {
          position: relative;
        }
        .gym-card-clean {
          background: linear-gradient(145deg, #141B13 0%, #0A0E09 100%);
          border: 1.5px solid rgba(217, 164, 65, 0.38);
          border-radius: 32px;
          padding: clamp(32px, 5vw, 64px);
          box-shadow: 0 32px 90px -20px rgba(0, 0, 0, 0.8), 0 0 50px rgba(217, 164, 65, 0.1);
          position: relative;
          overflow: hidden;
          width: 100%;
          max-width: min(1360px, 100%);
          margin-inline: auto;
        }
        .gym-card-clean::before {
          content: "";
          position: absolute;
          top: -100px;
          right: -100px;
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, rgba(217, 164, 65, 0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .gym-card-clean::after {
          content: "";
          position: absolute;
          bottom: -100px;
          left: -100px;
          width: 360px;
          height: 360px;
          background: radial-gradient(circle, rgba(124, 139, 79, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .gym-grid-layout {
          display: grid;
          grid-template-columns: 1fr 1.08fr;
          gap: clamp(36px, 5vw, 64px);
          align-items: center;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 1024px) {
          .gym-grid-layout {
            grid-template-columns: 1fr;
          }
        }
        .gym-clean-title {
          color: #FFFFFF !important;
          -webkit-text-fill-color: #FFFFFF !important;
          font-family: var(--f-head, 'Playfair Display', Georgia, serif);
          font-size: clamp(32px, 4.4vw, 50px) !important;
          font-weight: 700 !important;
          line-height: 1.15;
          margin: 0 0 16px;
          letter-spacing: -0.015em;
        }
        .gym-clean-lead {
          color: #E6E0D6 !important;
          -webkit-text-fill-color: #E6E0D6 !important;
          font-size: clamp(15px, 1.6vw, 17.5px);
          line-height: 1.7;
          margin: 0 0 28px;
          max-width: 58ch;
        }
        .gym-glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 18px;
          padding: 15px 18px;
          display: flex;
          align-items: flex-start;
          gap: 13px;
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .gym-glass-card:hover {
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(217, 164, 65, 0.45);
          transform: translateY(-3px);
          box-shadow: 0 10px 24px -6px rgba(0, 0, 0, 0.4);
        }
        .gym-bento-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          position: relative;
        }
        .gym-bento-img-box {
          border-radius: 24px;
          overflow: hidden;
          border: 1.5px solid rgba(217, 164, 65, 0.35);
          box-shadow: 0 24px 60px -15px rgba(0, 0, 0, 0.8), 0 0 25px rgba(217, 164, 65, 0.12);
          position: relative;
          background: #090C08;
          height: 420px;
        }
        .gym-bento-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gym-bento-img-box:hover img {
          transform: scale(1.08);
        }
        .gym-floating-badge {
          position: absolute;
          bottom: 14px;
          left: 14px;
          right: 14px;
          padding: 10px 14px;
          border-radius: 14px;
          background: rgba(10, 14, 9, 0.88);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(217, 164, 65, 0.45);
          color: #F8F5EE;
          font-size: 12.5px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        }
        @media (max-width: 640px) {
          .gym-bento-wrapper {
            grid-template-columns: 1fr;
          }
          .gym-bento-img-box {
            height: 280px;
          }
        }
      `}</style>

      <div className="wrap" style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <div className="gym-card-clean">
          <div className="gym-grid-layout">
            {/* SOL KOLON: YAZILAR, 2x2 CAM KARTLAR VE BUTONLAR */}
            <div>
              <h2 className="gym-clean-title">
                {cleanRawText(s?.baslik || "") || "Petra Spor Salonu"}
              </h2>

              <p className="gym-clean-lead">
                {cleanRawText(s?.lead || "") ||
                  "Çekmeköy Taşdelen Megakent Sitesi içerisinde; modern kardiyo ve serbest ağırlık ekipmanları, ferah antrenman alanları ve sağlıklı yaşam kültürüyle formunuzu zirveye taşıyın."}
              </p>

              {/* 4 ÖZELLİK: 2x2 CAM EFEKTLİ KARTLAR */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "14px",
                  marginBottom: "32px",
                }}
              >
                {ozelliklerList.map((oz: any, ozi: number) => {
                  const isGold = ozi % 2 === 0;
                  return (
                    <div key={ozi} className="gym-glass-card">
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 10,
                          background: isGold ? "rgba(217, 164, 65, 0.22)" : "rgba(124, 139, 79, 0.26)",
                          color: isGold ? "#F3C562" : "#B5D172",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {oz.ikon === "dumbbell" ? (
                          <Dumbbell size={16} />
                        ) : oz.ikon === "waves" ? (
                          <Waves size={16} />
                        ) : oz.ikon === "clock" ? (
                          <Clock size={16} />
                        ) : (
                          <Sparkles size={16} />
                        )}
                      </div>
                      <div>
                        <b style={{ display: "block", fontSize: "14px", color: "#FFFFFF", marginBottom: 3, fontWeight: 700 }}>
                          {cleanRawText(oz.baslik)}
                        </b>
                        <span style={{ fontSize: "12px", color: "#B8C0B2", lineHeight: 1.4, display: "block" }}>
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
                    fontSize: "14.5px",
                    padding: "14px 24px",
                    borderRadius: "14px",
                    boxShadow: "0 8px 24px -4px rgba(217, 164, 65, 0.45)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                >
                  Spor Salonunu Keşfet <ArrowRight size={16} />
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
                    fontSize: "14.5px",
                    padding: "14px 22px",
                    borderRadius: "14px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 8px 24px -4px rgba(37, 211, 102, 0.4)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                >
                  <WhatsAppIcon size={18} />
                  WhatsApp'tan Bilgi Al
                </a>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--ghost"
                  style={{
                    border: "1.5px solid rgba(244, 238, 225, 0.28)",
                    color: "#FFFFFF",
                    background: "rgba(255, 255, 255, 0.04)",
                    padding: "13px 18px",
                    borderRadius: "14px",
                    fontSize: "14px",
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                  }}
                >
                  <SiteIcon name="instagram" size={16} />
                  {instagramTag}
                </a>
              </div>
            </div>

            {/* SAĞ KOLON: GENİŞLETİLMİŞ 2 FOTOĞRAFLI MODERN BENTO KOLAJ */}
            <div className="gym-bento-wrapper">
              {bentoList.map((b: any, bi: number) => (
                <div
                  key={bi}
                  className="gym-bento-img-box"
                  style={{ marginTop: bi === 1 ? "28px" : "0" }}
                >
                  <SafeImg
                    src={b.src || (bi === 0 ? "/assets/cms/petra-spor-salonu-afis.jpg" : "/assets/cms/petra-pool-beach-loca.jpg")}
                    alt={b.alt || "Petra Spor Salonu"}
                    fallback="/assets/cms/hero-ic.webp"
                    className="w-full h-full object-cover"
                  />
                  <div className="gym-floating-badge">
                    {bi === 0 ? (
                      <Dumbbell size={15} color="#F3C562" />
                    ) : (
                      <Waves size={15} color="#F3C562" />
                    )}
                    <span>{cleanRawText(b.rozet || b.alt || "Petra Fitness")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
