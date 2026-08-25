import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/db/content";
import { phoneToTelHref, buildWhatsappUrl } from "@/lib/content/contact-utils";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import { cleanRawText } from "@/lib/content/markdown-parser";
import SafeImg from "@/components/site/SafeImg";
import SiteIcon from "@/components/site/SiteIcon";
import {
  Dumbbell,
  Clock,
  Phone,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Flame,
  Activity,
  HeartPulse,
  ShieldCheck,
  MapPin,
  Waves,
  Coffee,
  ArrowRight,
  BadgePercent,
  Calendar,
} from "lucide-react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent().catch(() => null);
  const s = content?.sporSalonu;
  const brand = content?.brand?.displayName || "Petra Cafe Restaurant";
  const title = `Petra Spor Salonu | Fitness, Kardiyo & %35 Ön Kayıt İndirimi | ${brand}`;
  const description =
    cleanRawText(s?.lead || "") ||
    "Çekmeköy Taşdelen Megakent Sitesi içerisinde yer alan Petra Spor Salonu; ön kayıta özel %35 indirim, modern kardiyo ve serbest ağırlık ekipmanları sunar.";
  const canonicalUrl = "https://petra-cafe-site.vercel.app/spor-salonu";
  const ogImg = "/assets/cms/petra-spor-salonu-afis.jpg";

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
      images: [{ url: ogImg, width: 1000, height: 1000, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImg],
    },
  };
}

export default async function SporSalonuPage() {
  const content = await getPublicContent();
  const s = content.sporSalonu || ({} as any);

  const tel = s.telefon || content.iletisim?.telefon || "0530 608 90 51";
  const tel2 = s.telefon2 || content.iletisim?.telefon2 || "+90 216 706 80 51";
  const telHref = phoneToTelHref(tel);
  const tel2Href = phoneToTelHref(tel2);
  const waHref = buildWhatsappUrl(
    content.iletisim?.whatsapp || tel,
    "Merhaba, Petra Spor Salonu ön kayıt indirimi (%35 indirim) ve üyelik hakkında bilgi almak istiyorum."
  );

  const instagramUrl = s.instagramUrl || "https://www.instagram.com/petrasporsalonu";
  const instagramTag = s.instagram || "@petrasporsalonu";
  const posterImg = "/assets/cms/petra-spor-salonu-afis.jpg";

  const alanlar = s.alanlar || [
    {
      baslik: "Kardiyo İstasyonları",
      kicker: "Kondisyon & Yağ Yakımı",
      metin: "Koşu bantları, eliptik bisikletler ve kondisyon aletleriyle dayanıklılığınızı artırın.",
      ikon: "flame",
    },
    {
      baslik: "Serbest Ağırlık & Dambıl",
      kicker: "Güç & Kas Gelişimi",
      metin: "Farklı kilo kademelerinde dambıl, barbell ve sehpalarla hedefinize odaklanın.",
      ikon: "dumbbell",
    },
    {
      baslik: "Fonksiyonel İstasyonlar",
      kicker: "Tüm Vücut Formu",
      metin: "Kablo makineleri, lat pulldown, chest press ve bacak egzersiz istasyonları.",
      ikon: "activity",
    },
    {
      baslik: "Esneme & Mobilite",
      kicker: "Esneklik & Toparlanma",
      metin: "Mat egzersizleri, foam roller ve soğuma hareketleri için ayrılmış ferah zemin.",
      ikon: "heart-pulse",
    },
  ];

  const imkanlar = (s.imkanlar as string[]) || [
    "Ön Kayıta Özel %35 İndirim Fırsatı",
    "Modern Kardiyo ve Fitness Ekipmanları",
    "Havalandırmalı & Ferah Antrenman Salonu",
    "Hijyenik Soyunma Odaları ve Duşlar",
    "Açık Havuz & Pool Kulübü Entegrasyonu",
    "Petra Cafe Sağlıklı İçecekler & Protein",
    "Geniş Ücretsiz Otopark Alanı",
    "Haftanın 7 Günü: 07:00 – 23:00",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    name: "Petra Spor Salonu",
    description: cleanRawText(s.lead) || "Çekmeköy Taşdelen Megakent Sitesi içerisinde yer alan Petra Spor Salonu.",
    url: "https://petra-cafe-site.vercel.app/spor-salonu",
    telephone: tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: content.iletisim?.adresSatir1 || "Megakent Sitesi, Selen Sk. No:1/O",
      addressLocality: "Çekmeköy",
      addressRegion: "İstanbul",
      postalCode: "34788",
      addressCountry: "TR",
    },
    openingHours: "Mo-Su 07:00-23:00",
    sameAs: [
      instagramUrl,
      content.iletisim?.instagramUrl || "https://www.instagram.com/petracaferestaurant/",
    ],
  };

  return (
    <article className="page-hakkimizda page-spor" style={{ paddingBottom: "60px" }}>
      <style>{`
        .spor-hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: clamp(24px, 4vw, 44px);
          align-items: center;
          margin-bottom: clamp(32px, 5vw, 56px);
        }
        @media (max-width: 960px) {
          .spor-hero-grid {
            grid-template-columns: 1fr;
          }
        }
        .spor-poster-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.4);
          border: 2px solid rgba(217, 164, 65, 0.4);
          background: #0D1117;
        }
        .spor-badge-discount {
          position: absolute;
          top: 16px;
          left: 16px;
          background: linear-gradient(135deg, #107C41, #0B5C30);
          color: #FFFFFF;
          font-weight: 800;
          font-size: 13.5px;
          padding: 8px 16px;
          border-radius: 999px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
          display: flex;
          align-items: center;
          gap: 6px;
          z-index: 2;
          border: 1px solid rgba(255, 255, 255, 0.25);
        }
      `}</style>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. EDİTORYAL HERO & AFİŞ VITRINI */}
      <section className="spor-hero-grid">
        {/* Sol Kolon: Başlık ve Açıklamalar */}
        <div>
          <div style={{ marginBottom: "14px" }}>
            <Breadcrumbs items={[{ label: "Spor Salonu" }]} />
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "999px",
              background: "rgba(217, 164, 65, 0.15)",
              color: "var(--brass-lo, #B8842C)",
              fontSize: "12px",
              fontWeight: 700,
              marginBottom: "14px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            <Dumbbell size={14} />
            <span>{cleanRawText(s.eyebrow) || "PETRA YAŞAM MERKEZİ"}</span>
          </div>

          <h1
            style={{
              fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
              fontSize: "clamp(32px, 4.5vw, 48px)",
              fontWeight: 700,
              color: "var(--ink, #0D0F0A)",
              lineHeight: 1.15,
              margin: "0 0 16px",
            }}
          >
            {cleanRawText(s.baslik) || "Petra Spor Salonu"}
          </h1>

          <p
            style={{
              fontSize: "clamp(15px, 1.8vw, 17px)",
              lineHeight: 1.7,
              color: "#555A4C",
              margin: "0 0 24px",
              maxWidth: "58ch",
            }}
          >
            {cleanRawText(s.lead) ||
              "Çekmeköy Taşdelen Megakent Sitesi içerisinde; modern kardiyo ve serbest ağırlık ekipmanları, ferah antrenman alanları ve sağlıklı yaşam kültürüyle formunuzu zirveye taşıyın."}
          </p>

          {/* Aksiyon Butonları */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "28px" }}>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--light"
              style={{
                background: "linear-gradient(135deg, #D9A441, #B8842C)",
                color: "#0D0F0A",
                fontWeight: 700,
                padding: "12px 22px",
                borderRadius: "14px",
              }}
            >
              <MessageCircle size={17} />
              Ön Kayıt & %35 İndirim
            </a>

            <a
              href={`tel:${telHref}`}
              className="btn"
              style={{
                background: "#0D0F0A",
                color: "#FFFFFF",
                fontWeight: 600,
                padding: "12px 20px",
                borderRadius: "14px",
              }}
            >
              <Phone size={15} />
              {tel}
            </a>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
              style={{
                border: "1.5px solid rgba(13, 15, 10, 0.2)",
                padding: "12px 18px",
                borderRadius: "14px",
              }}
            >
              <SiteIcon name="instagram" size={16} />
              {instagramTag}
            </a>
          </div>

          {/* Hızlı Bilgi Rozetleri */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "12px", background: "var(--cream-2, #F3EDE0)", fontSize: "13.5px", fontWeight: 600, color: "var(--ink, #0D0F0A)" }}>
              <Clock size={16} color="var(--brass-lo, #B8842C)" />
              <span>07:00 – 23:00 (Hergün)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "12px", background: "var(--cream-2, #F3EDE0)", fontSize: "13.5px", fontWeight: 600, color: "var(--ink, #0D0F0A)" }}>
              <MapPin size={16} color="var(--olive-lo, #5A6838)" />
              <span>Megakent Sitesi No:1/O</span>
            </div>
          </div>
        </div>

        {/* Sağ Kolon: Resmi Afiş & Vitrin */}
        <div>
          <div className="spor-poster-card">
            <div className="spor-badge-discount">
              <BadgePercent size={17} />
              <span>ÖN KAYITA ÖZEL %35 İNDİRİM</span>
            </div>

            <SafeImg
              src={posterImg}
              alt="Petra Spor Salonu Ön Kayıt İndirimi ve Antrenman Alanı"
              fallback={posterImg}
              width={700}
              height={700}
              className="w-full h-auto block object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* 2. ANTRENMAN ALANLARIMIZ */}
      <section style={{ marginBottom: "48px" }}>
        <div className="section__head" style={{ marginBottom: "28px" }}>
          <p className="eyebrow">EGZERSİZ ALANLARI</p>
          <h2 className="h2">Antrenman Alanlarımız</h2>
          <p className="lead">
            Hedeflerinize yönelik tasarlanmış kardiyo, serbest ağırlık ve fonksiyonel fitness istasyonları.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {alanlar.map((a: any, ai: number) => {
            const iconsMap: Record<string, any> = {
              flame: Flame,
              dumbbell: Dumbbell,
              activity: Activity,
              "heart-pulse": HeartPulse,
            };
            const IconComp = iconsMap[a.ikon] || Dumbbell;

            return (
              <div
                key={ai}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "20px",
                  border: "1.5px solid rgba(13, 15, 10, 0.08)",
                  padding: "26px 22px",
                  boxShadow: "0 8px 24px -8px rgba(13, 15, 10, 0.06)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "rgba(217, 164, 65, 0.12)",
                    color: "var(--brass-lo, #B8842C)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconComp size={22} />
                </div>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--brass-lo, #B8842C)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {cleanRawText(a.kicker)}
                </span>
                <h3 style={{ fontFamily: "var(--f-head, serif)", fontSize: "20px", fontWeight: 600, color: "var(--ink, #0D0F0A)", margin: 0 }}>
                  {cleanRawText(a.baslik)}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: 1.65, color: "#555A4C", margin: 0 }}>
                  {cleanRawText(a.metin)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. EKİPMAN VE İMKANLAR (Checklist) */}
      <section
        style={{
          background: "#FFFFFF",
          borderRadius: "24px",
          border: "1.5px solid rgba(13, 15, 10, 0.08)",
          padding: "clamp(28px, 4vw, 44px)",
          boxShadow: "0 10px 30px -10px rgba(13, 15, 10, 0.06)",
          marginBottom: "48px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <Sparkles size={24} color="var(--brass-lo, #B8842C)" />
          <h2 style={{ fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 600, color: "var(--ink, #0D0F0A)", margin: 0 }}>
            Ekipman ve Tesis İmkanları
          </h2>
        </div>
        <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#555A4C", maxWidth: "68ch", margin: "0 0 24px" }}>
          Petra Spor Salonu, antrenman konforunuz ve güvenliğiniz için eksiksiz donatılmıştır.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "14px" }}>
          {imkanlar.map((imkan, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 18px",
                borderRadius: "14px",
                background: "var(--cream-2, #F3EDE0)",
                border: "1px solid rgba(13, 15, 10, 0.06)",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--ink, #0D0F0A)",
              }}
            >
              <CheckCircle2 size={18} color="var(--olive-lo, #5A6838)" style={{ flexShrink: 0 }} />
              <span>{cleanRawText(imkan)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SOSYAL MEDYA & CTA BANNERI */}
      <section
        style={{
          background: "radial-gradient(circle at 10% 20%, #1a2517, #0D1117 85%)",
          color: "#F4EEE1",
          borderRadius: "28px",
          padding: "clamp(32px, 5vw, 56px)",
          border: "1.5px solid rgba(217, 164, 65, 0.35)",
          boxShadow: "0 18px 45px -12px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "36px", alignItems: "center" }}>
          <div>
            <p className="eyebrow" style={{ color: "#D9A441", margin: "0 0 10px", fontWeight: 700, letterSpacing: "0.15em" }}>
              PETRA YAŞAM KÜLTÜRÜ
            </p>
            <h2 style={{ color: "#FFFFFF", fontFamily: "var(--f-head, serif)", fontSize: "clamp(24px, 3.2vw, 36px)", fontWeight: 700, margin: "0 0 16px", lineHeight: 1.2 }}>
              {cleanRawText(s.ctaTitle) || "Hedeflerinize Petra ile Ulaşın"}
            </h2>
            <p style={{ color: "#E0D7C6", fontSize: "15px", lineHeight: 1.75, opacity: 0.9, margin: "0 0 24px" }}>
              {cleanRawText(s.ctaLead) ||
                "Petra Spor Salonu; antrenmanlarınızı açık yüzme havuzu ve Petra Cafe'nin leziz kahve & sağlıklı menü seçenekleriyle birleştiren benzersiz bir yaşam alanı sunar."}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ background: "#25D366", color: "#0B140C", fontWeight: 700, padding: "12px 22px", borderRadius: "14px" }}
              >
                <MessageCircle size={16} />
                WhatsApp'tan Yazın
              </a>
              <a
                href={`tel:${telHref}`}
                className="btn btn--ghost"
                style={{ border: "1.5px solid rgba(244, 238, 225, 0.35)", color: "#FFFFFF", background: "rgba(255,255,255,0.05)", padding: "12px 20px", borderRadius: "14px" }}
              >
                <Phone size={15} />
                {tel}
              </a>
            </div>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "24px",
              padding: "28px 24px",
              textAlign: "center",
            }}
          >
            <div style={{ display: "inline-flex", padding: 14, borderRadius: "50%", background: "rgba(217, 164, 65, 0.2)", color: "#E8B84B", marginBottom: 14 }}>
              <SiteIcon name="instagram" size={32} />
            </div>
            <h3 style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: 700, margin: "0 0 8px" }}>
              Instagram'da Takip Edin
            </h3>
            <p style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: "14px", margin: "0 0 18px", lineHeight: 1.6 }}>
              Güncel antrenman anları, açılış videoları ve özel indirim duyuruları için resmi hesabımızı ziyaret edin.
            </p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--light"
              style={{ width: "100%", justifyContent: "center", padding: "12px", borderRadius: "12px", fontWeight: 700 }}
            >
              {instagramTag} →
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
