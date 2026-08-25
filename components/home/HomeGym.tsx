import Link from "next/link";
import type { SiteContent } from "@/lib/content/types";
import { cleanRawText } from "@/lib/content/markdown-parser";
import SiteIcon from "@/components/site/SiteIcon";
import SafeImg from "@/components/site/SafeImg";
import { Dumbbell, ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { phoneToTelHref, buildWhatsappUrl } from "@/lib/content/contact-utils";

export default function HomeGym({ content }: { content: SiteContent }) {
  const s = content.sporSalonu;
  const tel = s?.telefon || content.iletisim?.telefon || "0530 608 90 51";
  const waHref = buildWhatsappUrl(
    content.iletisim?.whatsapp || tel,
    "Merhaba, Petra Spor Salonu ön kayıt indirimi ve üyelik hakkında bilgi almak istiyorum."
  );
  const instagramUrl = s?.instagramUrl || "https://www.instagram.com/petrasporsalonu";
  const instagramTag = s?.instagram || "@petrasporsalonu";
  const posterImg = "/assets/cms/petra-spor-salonu-afis.jpg";

  return (
    <section
      className="section home-gym-sec"
      id="spor-salonu"
      aria-label="Petra Spor Salonu"
      style={{
        paddingTop: "clamp(64px, 8vw, 110px)",
        paddingBottom: "clamp(64px, 8vw, 110px)",
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
          padding: clamp(32px, 5vw, 56px);
          box-shadow: 0 24px 70px -20px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
          position: relative;
          overflow: hidden;
          max-width: min(1140px, 100%);
          margin-inline: auto;
        }
        .gym-card-clean::before {
          content: "";
          position: absolute;
          top: -120px;
          right: -120px;
          width: 280px;
          height: 280px;
          background: radial-gradient(circle, rgba(217, 164, 65, 0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .gym-grid-layout {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: clamp(32px, 5vw, 56px);
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 960px) {
          .gym-grid-layout {
            grid-template-columns: 1fr;
            text-align: left;
          }
        }
        .gym-clean-title {
          color: #FFFFFF !important;
          -webkit-text-fill-color: #FFFFFF !important;
          font-family: var(--f-head, 'Playfair Display', Georgia, serif);
          font-size: clamp(28px, 4vw, 44px) !important;
          font-weight: 700 !important;
          line-height: 1.16;
          margin: 0 0 16px;
          letter-spacing: -0.01em;
        }
        .gym-clean-lead {
          color: #E2DBD0 !important;
          -webkit-text-fill-color: #E2DBD0 !important;
          font-size: clamp(14.5px, 1.6vw, 16px);
          line-height: 1.72;
          margin: 0 0 28px;
          max-width: 52ch;
        }
        .gym-clean-poster-box {
          border-radius: 20px;
          overflow: hidden;
          border: 1.5px solid rgba(217, 164, 65, 0.22);
          box-shadow: 0 18px 45px -12px rgba(0, 0, 0, 0.6);
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 420px;
          margin: 0 auto;
          transition: transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .gym-clean-poster-box:hover {
          transform: translateY(-4px);
        }
        .gym-clean-poster-box img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          border-radius: 19px;
        }
      `}</style>

      <div className="wrap" style={{ display: "flex", justifyContent: "center" }}>
        <div className="gym-card-clean">
          <div className="gym-grid-layout">
            {/* SOL KOLON: YAZILAR VE BUTONLAR */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "5px 14px",
                  borderRadius: "999px",
                  background: "rgba(217, 164, 65, 0.15)",
                  color: "#E8B84B",
                  fontSize: "12px",
                  fontWeight: 700,
                  marginBottom: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  border: "1px solid rgba(217, 164, 65, 0.25)",
                }}
              >
                <Dumbbell size={14} />
                <span>{cleanRawText(s?.eyebrow || "") || "PETRA YAŞAM MERKEZİ"}</span>
              </div>

              <h2 className="gym-clean-title">
                {cleanRawText(s?.baslik || "") || "Petra Spor Salonu"}
              </h2>

              <p className="gym-clean-lead">
                {cleanRawText(s?.lead || "") ||
                  "Çekmeköy Taşdelen Megakent Sitesi içerisinde; modern kardiyo ve serbest ağırlık ekipmanları, ferah antrenman alanları ve sağlıklı yaşam kültürüyle formunuzu zirveye taşıyın."}
              </p>

              {/* Özellikler */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "10px",
                  marginBottom: "26px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "#F4EEE1" }}>
                  <CheckCircle2 size={16} color="#7C8B4F" style={{ flexShrink: 0 }} />
                  <span>Ön Kayıta Özel %35 İndirim</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "#F4EEE1" }}>
                  <CheckCircle2 size={16} color="#7C8B4F" style={{ flexShrink: 0 }} />
                  <span>Kardiyo & Serbest Ağırlık</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "#F4EEE1" }}>
                  <CheckCircle2 size={16} color="#7C8B4F" style={{ flexShrink: 0 }} />
                  <span>Havuz & Teras Entegrasyonu</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "#F4EEE1" }}>
                  <CheckCircle2 size={16} color="#7C8B4F" style={{ flexShrink: 0 }} />
                  <span>Hergün 07:00 – 23:00 Açık</span>
                </div>
              </div>

              {/* Aksiyon Butonları */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
                <Link
                  href="/spor-salonu"
                  className="btn"
                  style={{
                    background: "#D9A441",
                    color: "#0D0F0A",
                    fontWeight: 700,
                    padding: "11px 22px",
                    borderRadius: "12px",
                    boxShadow: "none",
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
                    background: "rgba(255, 255, 255, 0.08)",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    padding: "11px 18px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    boxShadow: "none",
                  }}
                >
                  <MessageCircle size={15} color="#25D366" />
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
                    padding: "11px 16px",
                    borderRadius: "12px",
                    boxShadow: "none",
                  }}
                >
                  <SiteIcon name="instagram" size={15} />
                  {instagramTag}
                </a>
              </div>
            </div>

            {/* SAĞ KOLON: SADECE SAF GÖRSEL (ÜZERİNDE HİÇBİR YAZI / ROZET YOK) */}
            <div>
              <div className="gym-clean-poster-box">
                <SafeImg
                  src={posterImg}
                  alt="Petra Spor Salonu"
                  fallback={posterImg}
                  width={600}
                  height={600}
                  className="w-full h-auto block object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
