import Link from "next/link";
import type { SiteContent } from "@/lib/content/types";
import { cleanRawText } from "@/lib/content/markdown-parser";
import SiteIcon from "@/components/site/SiteIcon";
import SafeImg from "@/components/site/SafeImg";
import { Dumbbell, ArrowRight, CheckCircle2, Clock, MapPin, Sparkles, Phone, MessageCircle } from "lucide-react";
import { phoneToTelHref, buildWhatsappUrl } from "@/lib/content/contact-utils";

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
  const posterImg = "/assets/cms/petra-spor-salonu-afis.jpg";

  return (
    <section className="section section--gym-showcase" id="spor-salonu" aria-label="Petra Spor Salonu">
      <style>{`
        .gym-card-wrap {
          background: radial-gradient(circle at 10% 20%, rgba(30, 42, 28, 0.95), #0E130D 85%);
          border: 1.5px solid rgba(217, 164, 65, 0.35);
          border-radius: 28px;
          padding: clamp(24px, 4vw, 48px);
          box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        .gym-title {
          color: #FFFFFF !important;
          -webkit-text-fill-color: #FFFFFF !important;
          font-family: var(--f-head, 'Playfair Display', Georgia, serif);
          font-size: clamp(28px, 4vw, 42px) !important;
          font-weight: 700 !important;
          line-height: 1.15;
          margin: 0 0 16px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }
        .gym-lead {
          color: #E2DBD0 !important;
          -webkit-text-fill-color: #E2DBD0 !important;
          font-size: clamp(14px, 1.6vw, 16px);
          line-height: 1.7;
          margin: 0 0 24px;
          max-width: 58ch;
        }
        .gym-poster-box {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.7);
          border: 1.5px solid rgba(217, 164, 65, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: #000000;
        }
        .gym-poster-box:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 45px -10px rgba(217, 164, 65, 0.25);
        }
        .gym-discount-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: linear-gradient(135deg, #107C41, #0B5C30);
          color: #FFFFFF;
          font-weight: 800;
          font-size: 13px;
          padding: 6px 14px;
          border-radius: 999px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          gap: 6px;
          z-index: 2;
          border: 1px solid rgba(255,255,255,0.2);
        }
      `}</style>

      <div className="wrap">
        <div className="gym-card-wrap">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "clamp(24px, 4vw, 44px)",
              alignItems: "center",
            }}
          >
            {/* SOL KOLON: BİLGİ VE ÇAĞRILAR */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  borderRadius: "999px",
                  background: "rgba(217, 164, 65, 0.18)",
                  color: "#E8B84B",
                  fontSize: "12px",
                  fontWeight: 700,
                  marginBottom: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  border: "1px solid rgba(217, 164, 65, 0.3)",
                }}
              >
                <Dumbbell size={14} />
                <span>{cleanRawText(s?.eyebrow || "") || "PETRA YAŞAM MERKEZİ"}</span>
              </div>

              <h2 className="gym-title">
                {cleanRawText(s?.baslik || "") || "Petra Spor Salonu"}
              </h2>

              <p className="gym-lead">
                {cleanRawText(s?.lead || "") ||
                  "Çekmeköy Taşdelen Megakent Sitesi içerisinde; modern kardiyo ve serbest ağırlık ekipmanları, ferah antrenman alanları ve sağlıklı yaşam kültürüyle formunuzu zirveye taşıyın."}
              </p>

              {/* Öne Çıkan Özellikler */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "12px",
                  marginBottom: "28px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "14px", color: "#F4EEE1", fontWeight: 500 }}>
                  <CheckCircle2 size={17} color="#7C8B4F" style={{ flexShrink: 0 }} />
                  <span>Ön Kayıta Özel %35 İndirim</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "14px", color: "#F4EEE1", fontWeight: 500 }}>
                  <CheckCircle2 size={17} color="#7C8B4F" style={{ flexShrink: 0 }} />
                  <span>Kardiyo & Serbest Ağırlık</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "14px", color: "#F4EEE1", fontWeight: 500 }}>
                  <CheckCircle2 size={17} color="#7C8B4F" style={{ flexShrink: 0 }} />
                  <span>Havuz & Teras Entegrasyonu</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "14px", color: "#F4EEE1", fontWeight: 500 }}>
                  <CheckCircle2 size={17} color="#7C8B4F" style={{ flexShrink: 0 }} />
                  <span>Hergün 07:00 – 23:00 Açık</span>
                </div>
              </div>

              {/* Aksiyon Butonları */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
                <Link
                  href="/spor-salonu"
                  className="btn"
                  style={{
                    background: "linear-gradient(135deg, #D9A441, #B8842C)",
                    color: "#0D0F0A",
                    fontWeight: 700,
                    padding: "12px 24px",
                    borderRadius: "14px",
                    boxShadow: "0 6px 18px rgba(217, 164, 65, 0.35)",
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
                    color: "#0B140C",
                    fontWeight: 700,
                    padding: "12px 20px",
                    borderRadius: "14px",
                  }}
                >
                  <MessageCircle size={16} />
                  WhatsApp'tan Bilgi Al
                </a>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--ghost"
                  style={{
                    border: "1.5px solid rgba(244, 238, 225, 0.35)",
                    color: "#FFFFFF",
                    background: "rgba(255, 255, 255, 0.05)",
                    padding: "12px 18px",
                    borderRadius: "14px",
                  }}
                >
                  <SiteIcon name="instagram" size={16} />
                  {instagramTag}
                </a>
              </div>
            </div>

            {/* SAĞ KOLON: RESMİ AFİŞ VE DETAY KARTI */}
            <div>
              <div className="gym-poster-box">
                <div className="gym-discount-badge">
                  <Sparkles size={14} />
                  <span>ÖN KAYITA ÖZEL %35 İNDİRİM</span>
                </div>

                <SafeImg
                  src={posterImg}
                  alt="Petra Spor Salonu Ön Kayıt İndirimi ve Antrenman Alanı"
                  fallback={posterImg}
                  width={600}
                  height={600}
                  className="w-full h-auto block object-cover"
                  loading="lazy"
                />

                {/* Alt Şerit */}
                <div
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.7) 70%, transparent)",
                    padding: "18px 20px",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "10px",
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "11px", color: "#E8B84B", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", fontWeight: 700 }}>
                      Konum
                    </span>
                    <span style={{ fontSize: "13px", color: "#FFFFFF", fontWeight: 600 }}>
                      Megakent Sitesi No:1/O Taşdelen
                    </span>
                  </div>

                  <a
                    href={`tel:${telHref}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "#E8B84B",
                      fontSize: "14px",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    <Phone size={14} />
                    {tel}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
