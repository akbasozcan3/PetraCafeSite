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
      src: "/assets/cms/hero-ic.webp",
      alt: "Petra Fitness & Antrenman Alanı",
      rozet: "Kardiyo & Serbest Ağırlık",
    },
    {
      src: "/assets/cms/hero-cephe.webp",
      alt: "Petra Spor ve Yaşam Kompleksi",
      rozet: "Ferah & Hijyenik Salon",
    },
  ];

  const bentoList = s?.bentoGorseller && s.bentoGorseller.length > 0 ? s.bentoGorseller : defaultBento;

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
          padding: clamp(28px, 4.5vw, 54px);
          box-shadow: 0 24px 70px -20px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.05);
          position: relative;
          overflow: hidden;
          max-width: min(1200px, 100%);
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
          grid-template-columns: 1.02fr 0.98fr;
          gap: clamp(32px, 4.5vw, 56px);
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
          font-size: clamp(30px, 4vw, 44px) !important;
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
          padding: 13px 15px;
          display: flex;
          align-items: flex-start;
          gap: 11px;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .gym-glass-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(217, 164, 65, 0.35);
          transform: translateY(-2px);
        }
        .gym-bento-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          position: relative;
        }
        .gym-bento-img-box {
          border-radius: 20px;
          overflow: hidden;
          border: 1.5px solid rgba(217, 164, 65, 0.28);
          box-shadow: 0 18px 45px -12px rgba(0, 0, 0, 0.65);
          position: relative;
          background: #0E130D;
          height: 330px;
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
          padding: 9px 12px;
          border-radius: 12px;
          background: rgba(14, 19, 13, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(217, 164, 65, 0.35);
          color: #F4EEE1;
          font-size: 11.5px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        @media (max-width: 600px) {
          .gym-bento-wrapper {
            grid-template-columns: 1fr;
          }
          .gym-bento-img-box {
            height: 240px;
          }
        }
      `}</style>

      <div className="wrap" style={{ display: "flex", justifyContent: "center" }}>
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

              {/* 4 ÖZELLİK: 2x2 CAM EFEKTLİ MİNİK KARTÇIKLAR */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "11px",
                  marginBottom: "26px",
                }}
              >
                {ozelliklerList.map((oz: any, ozi: number) => {
                  const isGold = ozi % 2 === 0;
                  return (
                    <div key={ozi} className="gym-glass-card">
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          background: isGold ? "rgba(217, 164, 65, 0.18)" : "rgba(124, 139, 79, 0.22)",
                          color: isGold ? "#E8B84B" : "#A4BD63",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {oz.ikon === "dumbbell" ? (
                          <Dumbbell size={14} />
                        ) : oz.ikon === "waves" ? (
                          <Waves size={14} />
                        ) : oz.ikon === "clock" ? (
                          <Clock size={14} />
                        ) : (
                          <Sparkles size={14} />
                        )}
                      </div>
                      <div>
                        <b style={{ display: "block", fontSize: "13px", color: "#FFFFFF", marginBottom: 2 }}>
                          {cleanRawText(oz.baslik)}
                        </b>
                        <span style={{ fontSize: "11.5px", color: "#A8B0A2", lineHeight: 1.35, display: "block" }}>
                          {cleanRawText(oz.alt)}
                        </span>
                      </div>
                    </div>
                  );
                })}
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

            {/* SAĞ KOLON: GENİŞLETİLMİŞ 2 FOTOĞRAFLI MODERN BENTO KOLAJ */}
            <div className="gym-bento-wrapper">
              {bentoList.map((b: any, bi: number) => (
                <div
                  key={bi}
                  className="gym-bento-img-box"
                  style={{ marginTop: bi === 1 ? "24px" : "0" }}
                >
                  <SafeImg
                    src={b.src || "/assets/cms/hero-ic.webp"}
                    alt={b.alt || "Petra Spor Salonu"}
                    fallback="/assets/cms/hero-ic.webp"
                    className="w-full h-full object-cover"
                  />
                  <div className="gym-floating-badge">
                    {bi === 0 ? (
                      <Dumbbell size={13} color="#E8B84B" />
                    ) : (
                      <Sparkles size={13} color="#E8B84B" />
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
