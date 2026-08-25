import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/db/content";
import { phoneToTelHref, buildWhatsappUrl } from "@/lib/content/contact-utils";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import { cleanRawText } from "@/lib/content/markdown-parser";
import SafeImg from "@/components/site/SafeImg";
import { WhatsAppIcon } from "@/components/site/SiteIcon";
import {
  Waves,
  Sun,
  ShieldCheck,
  Clock,
  Phone,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Sparkles,
} from "lucide-react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent().catch(() => null);
  const p = content?.pasta;
  const brand = content?.brand?.displayName || "Petra Cafe Restaurant";
  const title = `Havuz & Plaj (Pool & Beach) | ${brand}`;
  const description =
    cleanRawText(p?.lead || "") ||
    "Çekmeköy Taşdelen'de açık yüzme havuzu, çocuk havuzu, güneşlenme şezlongları, yüzme kursu ve havuz başı kafe-restoran.";
  const canonicalUrl = "https://petra-cafe-site.vercel.app/havuz-plaj";
  const ogImg = resolveMediaUrl(
    liveMedia(p?.gorseller?.[0]?.src || content?.images?.heroCephe, SITE_PHOTOS.facade)
  );

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: brand,
      locale: "tr_TR",
      images: [{ url: ogImg || "/assets/cms/hero-cephe.webp", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImg || "/assets/cms/hero-cephe.webp"],
    },
  };
}

export default async function HavuzPlajPage() {
  const content = await getPublicContent();
  const p = content.pasta || ({} as any);

  const tel = content.iletisim?.telefon || "0530 608 90 51";
  const telHref = phoneToTelHref(tel);
  const waHref = buildWhatsappUrl(
    content.iletisim?.whatsapp || tel,
    "Merhaba, Petra Yaşam Merkezi web siteniz üzerinden iletişime geçiyorum. Bilgi almak istiyorum."
  );

  const havuzSaat = p.cafeSaat || "09:00 – 18:00";
  const derinlik = p.derinlik || "1.45 m – 1.95 m";
  const kurallar = (p.kurallar as string[]) || [
    "Dışarıdan yiyecek ve içecek getirilmez.",
    "0–2 yaş havuz girişi ücretsizdir.",
    "Havuz kullanımı için mayo ve bone zorunludur.",
    "Cankurtaran talimatlarına ve havuz kurallarına uyulmalıdır.",
  ];
  const fiyatlar = (p.fiyatlar as any[]) || [
    { kategori: "0–2 yaş", haftaIci: "Ücretsiz", haftaSonu: "Ücretsiz" },
    { kategori: "2–10 yaş", haftaIci: "400 TL", haftaSonu: "450 TL" },
    { kategori: "10–18 yaş", haftaIci: "600 TL", haftaSonu: "650 TL" },
    { kategori: "Yetişkin", haftaIci: "800 TL", haftaSonu: "850 TL" },
  ];

  return (
    <article className="page-hakkimizda page-havuz">
      {/* 1. EDİTORYAL BAŞLIK */}
      <header className="about-head-sec">
        <div style={{ marginBottom: "14px", display: "block" }}>
          <Breadcrumbs items={[{ label: "Havuz & Plaj" }]} />
        </div>

        <div className="about-head-sec__badge">
          <Waves size={14} />
          <span>{cleanRawText(p.eyebrow) || "POOL & BEACH KULÜBÜ"}</span>
        </div>

        <h1 className="about-head-sec__title">
          {cleanRawText(p.baslik) || "Petra Pool & Beach"}
        </h1>

        <p className="about-head-sec__lead">
          {cleanRawText(p.lead) ||
            "Petra Yaşam Merkezi'nde tertemiz açık yüzme havuzu, çocuk havuzu, güneşlenme şezlongları ve havuz başı dünya mutfağı lezzetleri."}
        </p>

        <div className="about-head-sec__actions">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--light"
          >
            <WhatsAppIcon size={18} />
            Havuz Rezervasyonu & Bilgi
          </a>
          <a href={`tel:${telHref}`} className="btn">
            <Phone size={15} />
            {tel}
          </a>
        </div>
      </header>

      {/* 2. HAVUZ & YAŞAM MERKEZİ FOTOĞRAF VİTRİNİ */}
      <section className="havuz-cards-grid" aria-label="Havuz ve Yaşam Alanları">
        {((p.gorseller && p.gorseller.length > 0)
          ? p.gorseller
          : [
              {
                src: "/assets/cms/petra-pool-beach-loca.jpg",
                alt: "Pool & Beach & VIP Hasır Localar",
                desc: "Güneşlenme şezlongları, yetişkin havuzu ve konforlu hasır localarla gün boyu lüks tatil ve serinlik keyfi.",
                tag: "Açık Yüzme Havuzu",
                position: "center 40%",
              },
              {
                src: "/assets/cms/petra-nargile-havuz-gece.jpg",
                alt: "Gece Havuz Kenarı Lounge & Nargile",
                desc: "Işıklı su havuzu manzarası eşliğinde premium nargile çeşitleri, kokteyller ve ferah açık hava oturma alanı.",
                tag: "Teras & Akşam Keyfi",
                position: "center center",
              },
              {
                src: "/assets/cms/petra-restoran-salon-organizasyon.jpg",
                alt: "Özel Günler & Restoran Salonu",
                desc: "Doğum günleri, evlilik teklifleri ve kurumsal davetler için havuz manzaralı şık masa düzeni ve zengin dünya mutfağı.",
                tag: "Kutlama & Davet",
                position: "center center",
              },
              {
                src: "/assets/cms/hero-cephe.webp",
                alt: "Petra Yaşam Merkezi & Tesis Alanı",
                desc: "Taşdelen'de açık yetişkin havuzu, ayrı çocuk havuzu, modern fitness salonu ve zengin restoranı bir arada sunan yaşam alanı.",
                tag: "Sosyal Yaşam Alanı",
                position: "center center",
              },
            ]
        ).map((g: any, gi: number) => (
          <article key={gi} className="havuz-feature-card">
            <div className="havuz-card-img-wrap">
              <SafeImg
                src={resolveMediaUrl(g.src) || "/assets/cms/hero-cephe.webp"}
                alt={g.alt || "Petra Havuz & Plaj"}
                fallback={SITE_PHOTOS.facade}
                style={{ objectPosition: g.position || "center" }}
              />
            </div>
            <div className="havuz-card-content">
              {g.tag ? (
                <span className="havuz-card-badge">
                  <Sparkles size={12} />
                  {cleanRawText(g.tag)}
                </span>
              ) : null}
              <h3 className="havuz-card-title">
                {cleanRawText(g.alt || "Petra Pool & Beach")}
              </h3>
              <p className="havuz-card-desc">
                {cleanRawText(
                  g.desc ||
                    "Petra Yaşam Merkezi'nde konforlu şezlonglar, temiz yüzme havuzu ve ferah açık hava dinlenme alanı."
                )}
              </p>
            </div>
          </article>
        ))}
      </section>

      {/* 3. ÖNE ÇIKAN BİLGİ KARTLARI (Saatler, Derinlik, Hijyen, Konum) */}
      <section
        style={{
          padding: "clamp(20px, 3vw, 28px)",
          background: "var(--cream-2, #F3EDE0)",
          borderRadius: "24px",
          border: "1px solid rgba(13, 15, 10, 0.08)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "14px",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "18px 16px",
              textAlign: "center",
              border: "1px solid rgba(13, 15, 10, 0.08)",
              boxShadow: "0 4px 14px -6px rgba(13, 15, 10, 0.06)",
            }}
          >
            <div style={{ display: "inline-flex", padding: 8, borderRadius: 10, background: "rgba(217, 164, 65, 0.12)", color: "var(--brass-lo, #B8842C)", marginBottom: 8 }}>
              <Clock size={18} />
            </div>
            <b style={{ display: "block", fontSize: "16px", color: "var(--ink, #0D0F0A)", marginBottom: 3 }}>
              {havuzSaat}
            </b>
            <span style={{ fontSize: "12px", color: "var(--muted, #6E6A5C)", fontWeight: 600 }}>
              Havuz Hizmet Saatleri
            </span>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "18px 16px",
              textAlign: "center",
              border: "1px solid rgba(13, 15, 10, 0.08)",
              boxShadow: "0 4px 14px -6px rgba(13, 15, 10, 0.06)",
            }}
          >
            <div style={{ display: "inline-flex", padding: 8, borderRadius: 10, background: "rgba(124, 139, 79, 0.12)", color: "var(--olive-lo, #5A6838)", marginBottom: 8 }}>
              <Waves size={18} />
            </div>
            <b style={{ display: "block", fontSize: "16px", color: "var(--ink, #0D0F0A)", marginBottom: 3 }}>
              {derinlik}
            </b>
            <span style={{ fontSize: "12px", color: "var(--muted, #6E6A5C)", fontWeight: 600 }}>
              Kademeli Havuz Derinliği
            </span>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "18px 16px",
              textAlign: "center",
              border: "1px solid rgba(13, 15, 10, 0.08)",
              boxShadow: "0 4px 14px -6px rgba(13, 15, 10, 0.06)",
            }}
          >
            <div style={{ display: "inline-flex", padding: 8, borderRadius: 10, background: "rgba(217, 164, 65, 0.12)", color: "var(--brass-lo, #B8842C)", marginBottom: 8 }}>
              <Sun size={18} />
            </div>
            <b style={{ display: "block", fontSize: "16px", color: "var(--ink, #0D0F0A)", marginBottom: 3 }}>
              Şezlong & Şemsiye
            </b>
            <span style={{ fontSize: "12px", color: "var(--muted, #6E6A5C)", fontWeight: 600 }}>
              Güneşlenme Alanı Dahil
            </span>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "18px 16px",
              textAlign: "center",
              border: "1px solid rgba(13, 15, 10, 0.08)",
              boxShadow: "0 4px 14px -6px rgba(13, 15, 10, 0.06)",
            }}
          >
            <div style={{ display: "inline-flex", padding: 8, borderRadius: 10, background: "rgba(124, 139, 79, 0.12)", color: "var(--olive-lo, #5A6838)", marginBottom: 8 }}>
              <ShieldCheck size={18} />
            </div>
            <b style={{ display: "block", fontSize: "16px", color: "var(--ink, #0D0F0A)", marginBottom: 3 }}>
              Çocuk Havuzu
            </b>
            <span style={{ fontSize: "12px", color: "var(--muted, #6E6A5C)", fontWeight: 600 }}>
              Ayrı Güvenli Alan & Hijyen
            </span>
          </div>
        </div>
      </section>

      {/* 4. 2026 GÜNCEL FİYAT LİSTESİ (Kompakt, Karşılaştırmalı ve Boşluksuz) */}
      <section
        style={{
          background: "#FFFFFF",
          borderRadius: "24px",
          border: "1.5px solid rgba(13, 15, 10, 0.08)",
          padding: "clamp(24px, 3.5vw, 36px)",
          boxShadow: "0 10px 30px -10px rgba(13, 15, 10, 0.06)",
        }}
        aria-labelledby="havuz-fiyat-heading"
      >
        <div style={{ marginBottom: "20px" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "11.5px",
              fontWeight: 700,
              color: "#B8842C",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "4px",
            }}
          >
            2026 SEZONU GİRİŞ TARİFESİ
          </span>
          <h2
            id="havuz-fiyat-heading"
            style={{
              fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
              fontSize: "clamp(24px, 3.5vw, 32px)",
              fontWeight: 700,
              color: "var(--ink, #0D0F0A)",
              margin: "0 0 6px",
            }}
          >
            {cleanRawText(p.fiyatBaslik || "") || "Günlük Havuz Giriş Ücretlerimiz"}
          </h2>
          <p style={{ margin: 0, fontSize: "14.5px", color: "#555A4C", lineHeight: 1.6 }}>
            Haftanın her günü geçerli günlük havuz kullanımı, yetişkin havuzu, ayrı çocuk havuzu, şezlong ve şemsiye dahil giriş tarifesi.
          </p>
        </div>

        {/* 4 Kartlı Karşılaştırmalı Fiyat Tablosu */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          {fiyatlar.map((f: any, fi: number) => {
            const isFree = f.haftaIci === "Ücretsiz" || f.kategori?.includes("0–2");
            return (
              <div
                key={fi}
                style={{
                  background: isFree ? "rgba(124, 139, 79, 0.06)" : "var(--cream-2, #F8F5EE)",
                  borderRadius: "18px",
                  border: isFree
                    ? "1.5px solid rgba(124, 139, 79, 0.25)"
                    : "1.5px solid rgba(217, 164, 65, 0.22)",
                  padding: "20px 18px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      background: isFree ? "#7C8B4F" : "#D9A441",
                      color: "#FFFFFF",
                      marginBottom: "10px",
                    }}
                  >
                    {isFree ? "Ücretsiz" : "2026 Sezonu"}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--f-head, serif)",
                      fontSize: "19px",
                      fontWeight: 700,
                      color: "var(--ink, #0D0F0A)",
                      margin: "0 0 6px",
                    }}
                  >
                    {cleanRawText(f.kategori || "")}
                  </h3>
                  <p style={{ margin: "0 0 16px", fontSize: "12px", color: "#667085", lineHeight: 1.4 }}>
                    Şezlong, şemsiye & havuz kullanımı dahil
                  </p>
                </div>

                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "12px",
                    padding: "12px 14px",
                    border: "1px solid rgba(13, 15, 10, 0.08)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "12.5px", color: "#667085" }}>Hafta İçi:</span>
                    <b style={{ fontSize: "16px", color: isFree ? "#5A6838" : "#B8842C" }}>
                      {cleanRawText(f.haftaIci || "")}
                    </b>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "12.5px", color: "#667085" }}>Hafta Sonu:</span>
                    <b style={{ fontSize: "16px", color: isFree ? "#5A6838" : "#B8842C" }}>
                      {cleanRawText(f.haftaSonu || f.haftaIci || "")}
                    </b>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fiyat Notu & Butonlar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            background: "rgba(217, 164, 65, 0.08)",
            borderRadius: "16px",
            border: "1px solid rgba(217, 164, 65, 0.25)",
          }}
        >
          <div style={{ flex: "1 1 300px" }}>
            <p style={{ margin: 0, fontSize: "13px", color: "#5A4E30", lineHeight: 1.5 }}>
              <b>💡 Hijyen & Güvenlik Kuralı:</b> 0–2 yaş ücretsizdir. Havuz alanı <b>09:00 – 18:00</b> saatleri arasında açıktır. Dışarıdan yiyecek & içecek getirilmez. Mayo ve bone zorunludur.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                background: "#25D366",
                color: "#FFFFFF",
                fontWeight: 700,
                padding: "10px 18px",
                borderRadius: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
              }}
            >
              <WhatsAppIcon size={16} />
              WhatsApp Rezervasyon
            </a>
            <a
              href={`tel:${telHref}`}
              className="btn btn--ghost"
              style={{
                padding: "10px 16px",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "13px",
              }}
            >
              <Phone size={14} />
              {tel}
            </a>
          </div>
        </div>
      </section>

      {/* 4. YÜZME DERSLERİ & KURSLAR */}
      <section
        style={{
          background: "linear-gradient(135deg, #FFFFFF 0%, #FBF9F4 100%)",
          borderRadius: "24px",
          border: "1.5px solid rgba(217, 164, 65, 0.25)",
          padding: "clamp(28px, 4vw, 44px)",
          boxShadow: "0 14px 36px -12px rgba(13, 15, 10, 0.08)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(24px, 4vw, 44px)",
            alignItems: "center",
          }}
        >
          {/* Sol Kolon: Kurs Bilgileri & Fiyatlar */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "999px",
                background: "rgba(220, 38, 38, 0.1)",
                color: "#DC2626",
                fontSize: "12px",
                fontWeight: 700,
                marginBottom: "14px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                border: "1px solid rgba(220, 38, 38, 0.2)",
              }}
            >
              <span>🔥</span>
              <span>Kayıtlarımız Başlamıştır</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <GraduationCap size={28} color="var(--brass-lo, #B8842C)" />
              <h2
                style={{
                  fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
                  fontSize: "clamp(24px, 3.5vw, 34px)",
                  fontWeight: 700,
                  color: "var(--ink, #0D0F0A)",
                  margin: 0,
                }}
              >
                Yüzme Kursu & Özel Dersler
              </h2>
            </div>

            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#555A4C", margin: "0 0 24px" }}>
              Uzman eğitmenlerimiz eşliğinde, çocuklarınızın suya olan güvenini artırmak ve temel yüzme becerilerini öğrenmelerini amaçlıyoruz.
            </p>

            {/* Program & Detaylar Kartları */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "14px",
                marginBottom: "24px",
              }}
            >
              {/* Program Kartı */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  padding: "16px",
                  border: "1.5px solid rgba(13, 15, 10, 0.1)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                }}
              >
                <div
                  style={{
                    background: "#E53935",
                    color: "#FFFFFF",
                    fontSize: "12px",
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: "8px",
                    textAlign: "center",
                    marginBottom: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Program
                </div>
                <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13.5px", color: "#333D29", lineHeight: 1.8 }}>
                  <li><b>SALI - PERŞEMBE</b></li>
                  <li>Başlangıç: <b>08:45</b> · Bitiş: <b>09:30</b></li>
                  <li><b>5 – 8 Yaş</b> Grubu</li>
                  <li><b>9 – 12 Yaş</b> Grubu</li>
                </ul>
              </div>

              {/* Detaylar & Fiyatlar Kartı */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  padding: "16px",
                  border: "1.5px solid rgba(13, 15, 10, 0.1)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                }}
              >
                <div
                  style={{
                    background: "#E53935",
                    color: "#FFFFFF",
                    fontSize: "12px",
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: "8px",
                    textAlign: "center",
                    marginBottom: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Ücret Tarifesi
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13.5px", color: "#333D29" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px dashed rgba(0,0,0,0.1)", paddingBottom: "6px" }}>
                    <span>Grup Ders Fiyatı:</span>
                    <b style={{ color: "#B8842C", fontSize: "15px" }}>7.000 TL</b>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px dashed rgba(0,0,0,0.1)", paddingBottom: "6px" }}>
                    <span>Özel Ders Fiyatı:</span>
                    <b style={{ color: "#B8842C", fontSize: "15px" }}>9.000 TL</b>
                  </div>
                  <span style={{ fontSize: "11.5px", color: "#667085" }}>
                    * Uzman lisanslı antrenörler eşliğinde hijyenik ortam.
                  </span>
                </div>
              </div>
            </div>

            {/* İletişim & WhatsApp Butonları */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
              <a
                href={buildWhatsappUrl(
                  tel,
                  "Merhaba, Petra Yaşam Merkezi yüzme kursu ön kaydı ve detayları hakkında bilgi almak istiyorum."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  background: "#25D366",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  padding: "12px 22px",
                  borderRadius: "14px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 6px 18px rgba(37, 211, 102, 0.25)",
                }}
              >
                <WhatsAppIcon size={18} />
                WhatsApp ile Kursa Kayıt Ol
              </a>

              <a
                href={phoneToTelHref(tel)}
                className="btn btn--ghost"
                style={{
                  padding: "12px 18px",
                  borderRadius: "14px",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Phone size={16} />
                {tel}
              </a>
            </div>
          </div>

          {/* Sağ Kolon: Kursun Avantajları & Kalite Standartları */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "24px",
              border: "1.5px solid rgba(217, 164, 65, 0.2)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
                fontSize: "19px",
                fontWeight: 700,
                color: "var(--ink, #0D0F0A)",
                margin: "0 0 6px",
              }}
            >
              🏊‍♂️ Neden Petra Yüzme Eğitimi?
            </h3>
            
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(217, 164, 65, 0.15)", color: "#B8842C", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0, fontSize: "13px" }}>✓</div>
              <div>
                <b style={{ display: "block", fontSize: "14px", color: "var(--ink, #0D0F0A)" }}>Uzman & Lisanslı Antrenörler</b>
                <p style={{ margin: "2px 0 0", fontSize: "12.5px", color: "#667085", lineHeight: 1.5 }}>
                  Çocuk psikolojisine ve pedagojisine hakim, suya alıştırma ve teknik stillerde deneyimli eğitmenler.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(217, 164, 65, 0.15)", color: "#B8842C", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0, fontSize: "13px" }}>✓</div>
              <div>
                <b style={{ display: "block", fontSize: "14px", color: "var(--ink, #0D0F0A)" }}>Ayrı Çocuk Havuzu Güvenliği</b>
                <p style={{ margin: "2px 0 0", fontSize: "12.5px", color: "#667085", lineHeight: 1.5 }}>
                  Tesis bünyesinde miniklerin güvenle, derinlik korkusu yaşamadan çalışabileceği kontrollü çocuk havuzu.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(217, 164, 65, 0.15)", color: "#B8842C", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0, fontSize: "13px" }}>✓</div>
              <div>
                <b style={{ display: "block", fontSize: "14px", color: "var(--ink, #0D0F0A)" }}>Hijyen ve Günlük Su Analizi</b>
                <p style={{ margin: "2px 0 0", fontSize: "12.5px", color: "#667085", lineHeight: 1.5 }}>
                  Düzenli filtreleme, klor-pH ölçümü ve her gün kapanış sonrası dezenfeksiyon standartları.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(217, 164, 65, 0.15)", color: "#B8842C", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0, fontSize: "13px" }}>✓</div>
              <div>
                <b style={{ display: "block", fontSize: "14px", color: "var(--ink, #0D0F0A)" }}>Butik Gruplar & Birebir İlgi</b>
                <p style={{ margin: "2px 0 0", fontSize: "12.5px", color: "#667085", lineHeight: 1.5 }}>
                  Kalabalık olmayan seanslar sayesinde her öğrencinin gelişimini yakından takip eden eğitim modeli.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HAVUZ KURALLARI & DİKKAT EDİLMESİ GEREKENLER */}
      <section
        style={{
          background: "rgba(217, 164, 65, 0.08)",
          borderRadius: "20px",
          border: "1.5px solid rgba(217, 164, 65, 0.25)",
          padding: "24px 28px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <AlertCircle size={20} color="var(--brass-lo, #B8842C)" />
          <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700, color: "var(--ink, #0D0F0A)" }}>
            Havuz Kuralları & Güvenlik Standartları
          </h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "10px" }}>
          {kurallar.map((k, ki) => (
            <div key={ki} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "13.5px", color: "#383C30" }}>
              <CheckCircle2 size={15} color="var(--olive-lo, #5A6838)" style={{ flexShrink: 0 }} />
              <span>{cleanRawText(k)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SON CTA — REZERVASYON ÇAĞRISI */}
      <section className="section--dark about-cta-sec" aria-label="Havuz Rezervasyon">
        <div
          className="about-cta-card"
          style={{
            backgroundColor: "#16190F",
            color: "#F4EEE1",
          }}
        >
          <p
            className="eyebrow"
            style={{
              color: "#D9A441",
              margin: 0,
              fontWeight: 700,
              letterSpacing: "0.15em",
            }}
          >
            POOL & BEACH
          </p>
          <h2
            style={{
              color: "#FFFFFF",
              fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
              fontSize: "clamp(24px, 3.4vw, 38px)",
              fontWeight: 600,
              margin: 0,
            }}
          >
            Güneşin ve Serinliğin Tadını Çıkarın
          </h2>
          <p
            style={{
              color: "#F4EEE1",
              fontSize: "15.5px",
              lineHeight: 1.6,
              maxWidth: "54ch",
              margin: 0,
              opacity: 0.95,
            }}
          >
            Hafta sonu yoğunluğu öncesinde yerinizi ayırtın, havuz başı lezzetler ve şezlong keyfiyle günün tadını çıkarın.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--light"
            >
              <WhatsAppIcon size={18} />
              WhatsApp Havuz Rezervasyonu
            </a>
            <Link
              href="/menu"
              className="btn btn--ghost"
              style={{
                background: "rgba(244, 238, 225, 0.12)",
                color: "#FFFFFF",
                border: "1.5px solid rgba(244, 238, 225, 0.4)",
              }}
            >
              Havuz Başı Menüsü
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
