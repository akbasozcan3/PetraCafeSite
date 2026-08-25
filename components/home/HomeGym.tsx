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
    <section className="section" id="spor-salonu" aria-label="Petra Spor Salonu" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
      <style>{`
        .gym-card-clean {
          background: #111610;
          border: 1px solid rgba(217, 164, 65, 0.3);
          border-radius: 24px;
          padding: clamp(24px, 4vw, 44px);
          box-shadow: none !important;
          position: relative;
          overflow: hidden;
        }
        .gym-clean-title {
          color: #FFFFFF !important;
          -webkit-text-fill-color: #FFFFFF !important;
          font-family: var(--f-head, 'Playfair Display', Georgia, serif);
          font-size: clamp(26px, 3.6vw, 40px) !important;
          font-weight: 700 !important;
          line-height: 1.18;
          margin: 0 0 14px;
        }
        .gym-clean-lead {
          color: #DDD6C8 !important;
          -webkit-text-fill-color: #DDD6C8 !important;
          font-size: clamp(14px, 1.5vw, 15.5px);
          line-height: 1.7;
          margin: 0 0 24px;
          max-width: 54ch;
        }
        .gym-clean-poster-box {
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: none !important;
          background: #000000;
          display: flex;
          align-items: center;
          justifyContent: center;
        }
        .gym-clean-poster-box img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          border-radius: 18px;
        }
      `}</style>

      <div className="wrap">
        <div className="gym-card-clean">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "clamp(24px, 3.5vw, 40px)",
              alignItems: "center",
            }}
          >
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
