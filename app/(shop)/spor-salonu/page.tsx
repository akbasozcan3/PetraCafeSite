import type { Metadata } from "next";
import { getPublicContent } from "@/lib/db/content";
import { phoneToTelHref, buildWhatsappUrl } from "@/lib/content/contact-utils";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import { cleanRawText } from "@/lib/content/markdown-parser";
import SafeImg from "@/components/site/SafeImg";
import SiteIcon, { WhatsAppIcon } from "@/components/site/SiteIcon";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import MasaCTA from "@/components/site/MasaCTA";
import {
  Dumbbell,
  Clock,
  Phone,
  CheckCircle2,
  Sparkles,
  Flame,
  Activity,
  HeartPulse,
  MapPin,
  Users,
  Trophy,
  Zap,
  Star,
  ArrowRight,
} from "lucide-react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent().catch(() => null);
  const s = content?.sporSalonu;
  const brand = content?.brand?.displayName || "Petra Cafe Restaurant";
  const title = `Petra Spor Salonu | Fitness & Kardiyo | ${brand}`;
  const description =
    cleanRawText(s?.lead || "") ||
    "Çekmeköy Taşdelen Megakent Sitesi içerisinde yer alan Petra Spor Salonu; modern kardiyo ve serbest ağırlık ekipmanları sunar.";
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

/* ── ICON HELPERS ── */
const ALAN_ICONS: Record<string, React.ElementType> = {
  flame: Flame,
  dumbbell: Dumbbell,
  activity: Activity,
  "heart-pulse": HeartPulse,
};
const STAT_ICONS: Record<string, React.ElementType> = {
  dumbbell: Dumbbell,
  users: Users,
  clock: Clock,
  trophy: Trophy,
  zap: Zap,
  star: Star,
  activity: Activity,
};

export default async function SporSalonuPage() {
  const content = await getPublicContent();
  const s = content.sporSalonu || ({} as NonNullable<typeof content.sporSalonu>);

  const tel = s.telefon || content.iletisim?.telefon || "0530 608 90 51";
  const telHref = phoneToTelHref(tel);
  const waHref = buildWhatsappUrl(
    content.iletisim?.whatsapp || tel,
    "Merhaba, Petra Yaşam Merkezi web siteniz üzerinden iletişime geçiyorum. Spor salonu hakkında bilgi almak istiyorum."
  );

  const posterImg =
    resolveMediaUrl(s.posterImg) || "/assets/cms/petra-spor-salonu-afis.jpg";

  const instagramUrl =
    s.instagramUrl || "https://www.instagram.com/petrasporsalonu";
  const instagramTag = s.instagram || "@petrasporsalonu";

  /* ── DEFAULTS ── */
  const alanlar =
    s.alanlar && s.alanlar.length > 0
      ? s.alanlar
      : [
          {
            baslik: "Kardiyo İstasyonları",
            kicker: "Kondisyon & Yağ Yakımı",
            metin:
              "Koşu bantları, eliptik bisikletler ve kondisyon aletleriyle dayanıklılığınızı artırın.",
            ikon: "flame",
          },
          {
            baslik: "Serbest Ağırlık & Dambıl",
            kicker: "Güç & Kas Gelişimi",
            metin:
              "Farklı kilo kademelerinde dambıl, barbell ve sehpalarla hedefinize odaklanın.",
            ikon: "dumbbell",
          },
          {
            baslik: "Fonksiyonel İstasyonlar",
            kicker: "Tüm Vücut Formu",
            metin:
              "Kablo makineleri, lat pulldown, chest press ve bacak egzersiz istasyonları.",
            ikon: "activity",
          },
          {
            baslik: "Esneme & Mobilite",
            kicker: "Esneklik & Toparlanma",
            metin:
              "Mat egzersizleri, foam roller ve soğuma hareketleri için ayrılmış ferah zemin.",
            ikon: "heart-pulse",
          },
        ];

  const paketler =
    s.paketler && s.paketler.length > 0
      ? s.paketler
      : [
          {
            ad: "Aylık",
            sure: "Aylık sınırsız üyelik",
            fiyat: "Fiyat için arayın",
            ozellikler: [
              "Sınırsız Kardiyo Alanı",
              "Serbest Ağırlık Bölümü",
              "Soyunma Odaları & Duşlar",
            ],
            populer: false,
          },
          {
            ad: "3 Aylık",
            sure: "En çok tercih edilen paket",
            fiyat: "Fiyat için arayın",
            ozellikler: [
              "Sınırsız Kardiyo Alanı",
              "Serbest Ağırlık Bölümü",
              "Soyunma Odaları & Duşlar",
              "Kişisel Antrenör Danışmanlığı",
            ],
            populer: true,
          },
          {
            ad: "Yıllık",
            sure: "En avantajlı uzun dönem paketi",
            fiyat: "Fiyat için arayın",
            ozellikler: [
              "Sınırsız Kardiyo Alanı",
              "Serbest Ağırlık Bölümü",
              "Soyunma Odaları & Duşlar",
              "Kişisel Antrenör Danışmanlığı",
              "Havuz & Pool Kulübü Erişimi",
            ],
            populer: false,
          },
        ];

  const istatistikler =
    s.istatistikler && s.istatistikler.length > 0
      ? s.istatistikler
      : [
          { deger: "50+", etiket: "Ekipman & Alet", ikon: "dumbbell" },
          { deger: "200+", etiket: "Aktif Üye", ikon: "users" },
          { deger: "16 Saat", etiket: "Günlük Açık", ikon: "clock" },
          { deger: "5 Yıl", etiket: "Deneyim", ikon: "trophy" },
          { deger: "PT Desteği", etiket: "Kişisel Antrenör", ikon: "zap" },
          { deger: "4.9 ★", etiket: "Kullanıcı Puanı", ikon: "star" },
        ];

  const imkanlar =
    s.imkanlar && s.imkanlar.length > 0
      ? s.imkanlar
      : [
          "Modern Kardiyo ve Fitness Ekipmanları",
          "Havalandırmalı & Ferah Antrenman Salonu",
          "Hijyenik Soyunma Odaları ve Duşlar",
          "Açık Havuz & Pool Kulübü Entegrasyonu",
          "Petra Cafe Sağlıklı İçecekler & Protein",
          "Geniş Ücretsiz Otopark Alanı",
          "Haftanın 7 Günü: 07:00 – 23:00",
          "Ön Kayıta Özel Avantajlı Kampanya",
        ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    name: "Petra Spor Salonu",
    description:
      cleanRawText(s.lead || "") ||
      "Çekmeköy Taşdelen Megakent Sitesi içerisinde yer alan Petra Spor Salonu.",
    url: "https://petra-cafe-site.vercel.app/spor-salonu",
    telephone: tel,
    address: {
      "@type": "PostalAddress",
      streetAddress:
        content.iletisim?.adresSatir1 || "Megakent Sitesi, Selen Sk. No:1/O",
      addressLocality: "Çekmeköy",
      addressRegion: "İstanbul",
      postalCode: "34788",
      addressCountry: "TR",
    },
    openingHours: "Mo-Su 07:00-23:00",
    sameAs: [
      instagramUrl,
      content.iletisim?.instagramUrl ||
        "https://www.instagram.com/petracaferestaurant/",
    ],
  };

  return (
    <article
      className="page-hakkimizda page-spor"
      style={{ paddingBottom: "80px" }}
    >
      {/* ── Global page styles ── */}
      <style>{`
        .spor-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 72px);
          align-items: center;
          margin-bottom: clamp(56px, 6vw, 80px);
        }
        @media (max-width: 960px) {
          .spor-hero-grid { grid-template-columns: 1fr; gap: 36px; }
        }

        /* Poster */
        .spor-poster {
          border-radius: 28px;
          overflow: hidden;
          background: #000;
          width: 100%;
          box-shadow: 0 30px 70px -15px rgba(0,0,0,0.22), 0 8px 24px -8px rgba(0,0,0,0.12);
          transform: perspective(1200px) rotateY(-3deg) rotateX(1deg);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .spor-poster:hover {
          transform: perspective(1200px) rotateY(0deg) rotateX(0deg) scale(1.015);
          box-shadow: 0 40px 80px -20px rgba(0,0,0,0.25), 0 12px 30px -10px rgba(0,0,0,0.15);
        }
        .spor-poster img { width: 100%; height: auto; display: block; object-fit: cover; }

        /* Cards */
        .spor-card {
          border-radius: 22px;
          border: 1px solid rgba(13,15,10,0.08);
          padding: 28px 24px;
          background: linear-gradient(145deg, #FFFFFF 0%, #FAF6EE 100%);
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          display: flex; flex-direction: column; gap: 14px;
          transition: transform 0.25s cubic-bezier(0.4,0,0.2,1),
                      box-shadow 0.25s cubic-bezier(0.4,0,0.2,1),
                      border-color 0.25s;
        }
        .spor-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 45px -10px rgba(0,0,0,0.14);
          border-color: rgba(217,164,65,0.35);
        }

        /* Stats */
        .spor-stat-wrap {
          background: linear-gradient(135deg, #FFFFFF 0%, #FAF6EE 100%);
          border-radius: 24px;
          border: 1px solid rgba(13,15,10,0.07);
          padding: clamp(32px,4vw,52px);
          box-shadow: 0 8px 28px -4px rgba(0,0,0,0.07);
        }

        /* Paketler */
        .spor-paket-popular {
          background: linear-gradient(155deg, #1A1F16 0%, #0D0F0A 100%);
          border: 2px solid rgba(217,164,65,0.65);
          box-shadow: 0 24px 60px -12px rgba(217,164,65,0.22);
          transform: scale(1.05);
        }
        @media (max-width: 600px) {
          .spor-paket-popular { transform: scale(1); }
        }
        .spor-paket-normal {
          background: #FFFFFF;
          border: 2px solid rgba(13,15,10,0.09);
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .spor-paket-normal:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 45px -10px rgba(0,0,0,0.12);
        }

        /* Dark CTA */
        .spor-dark-cta {
          background: #111610;
          border-radius: 28px;
          border: 1px solid rgba(217,164,65,0.25);
          padding: clamp(32px,4.5vw,56px);
        }

        /* Section dividers */
        .spor-section { margin-bottom: clamp(56px,6vw,80px); }

        /* Info badge */
        .spor-badge {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 10px 18px; border-radius: 14px;
          background: var(--cream-2, #F3EDE0);
          font-size: 14px; font-weight: 600;
          color: var(--ink, #0D0F0A);
          border: 1px solid rgba(13,15,10,0.07);
        }
      `}</style>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. HERO — editorial left + poster right
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="spor-hero-grid">
        {/* Left */}
        <div>
          <div style={{ marginBottom: 16 }}>
            <Breadcrumbs items={[{ label: "Spor Salonu" }]} />
          </div>

          {/* Eyebrow */}
          <p
            className="eyebrow"
            style={{ marginBottom: 14, letterSpacing: "0.14em" }}
          >
            {cleanRawText(s.eyebrow || "") || "PETRA SPOR SALONU"}
          </p>

          <h1
            style={{
              fontFamily: "var(--f-head,'Playfair Display',Georgia,serif)",
              fontSize: "clamp(36px,5.5vw,56px)",
              fontWeight: 800,
              color: "var(--ink,#0D0F0A)",
              lineHeight: 1.07,
              margin: "0 0 22px",
              letterSpacing: "-0.025em",
            }}
          >
            {cleanRawText(s.baslik || "") || "Petra Spor Salonu"}
          </h1>

          <p
            style={{
              fontSize: "clamp(16px,1.8vw,18px)",
              lineHeight: 1.75,
              color: "#4A5044",
              margin: "0 0 36px",
              maxWidth: "58ch",
            }}
          >
            {cleanRawText(s.lead || "") ||
              "Çekmeköy Taşdelen Megakent Sitesi içerisinde; modern kardiyo ve serbest ağırlık ekipmanları, ferah antrenman alanları ve sağlıklı yaşam kültürüyle formunuzu zirveye taşıyın."}
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "14px",
              marginBottom: "36px",
            }}
          >
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--light"
              style={{
                background: "linear-gradient(135deg,#E8B84B 0%,#D9A441 100%)",
                color: "#0D0F0A",
                fontWeight: 700,
                padding: "14px 28px",
                borderRadius: "16px",
                boxShadow: "0 8px 22px -6px rgba(217,164,65,0.45)",
                border: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <WhatsAppIcon size={18} />
              Ön Kayıt & Bilgi Al
            </a>

            <a
              href={`tel:${telHref}`}
              className="btn"
              style={{
                background: "#0D0F0A",
                color: "#FFFFFF",
                fontWeight: 600,
                padding: "14px 24px",
                borderRadius: "16px",
                boxShadow: "0 8px 22px -6px rgba(13,15,10,0.32)",
                border: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Phone size={16} />
              {tel}
            </a>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
              style={{
                border: "2px solid rgba(13,15,10,0.12)",
                padding: "14px 22px",
                borderRadius: "16px",
                background: "white",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <SiteIcon name="instagram" size={17} />
              {instagramTag}
            </a>
          </div>

          {/* Quick info badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <span className="spor-badge">
              <Clock size={17} color="var(--brass-lo,#B8842C)" />
              {cleanRawText(s.saatler || "") || "07:00 – 23:00 · Her Gün"}
            </span>
            <span className="spor-badge">
              <MapPin size={17} color="var(--olive-lo,#5A6838)" />
              {content.iletisim?.adresSatir1 || "Megakent Sitesi, Çekmeköy"}
            </span>
          </div>
        </div>

        {/* Right — Poster */}
        <div>
          <div className="spor-poster">
            <SafeImg
              src={posterImg}
              alt="Petra Spor Salonu afişi"
              fallback={posterImg}
              width={700}
              height={700}
              className="w-full h-auto block object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. İSTATİSTİKLER — sayfa açılışında ilk etkiyi güçlendiren bant
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="spor-stat-wrap spor-section">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "clamp(20px,3vw,40px)",
            textAlign: "center",
          }}
        >
          {istatistikler.map((stat, si) => {
            const IkonComp =
              STAT_ICONS[stat.ikon as keyof typeof STAT_ICONS] || Dumbbell;
            const ikonRenk =
              si % 2 === 0 ? "var(--brass-lo,#B8842C)" : "var(--olive-lo,#5A6838)";
            return (
              <div
                key={si}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    padding: 14,
                    borderRadius: 18,
                    background: "#FFFFFF",
                    border: "1px solid rgba(13,15,10,0.08)",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                  }}
                >
                  <IkonComp size={28} color={ikonRenk} strokeWidth={2} />
                </div>
                <b
                  style={{
                    fontSize: "clamp(22px,2.5vw,28px)",
                    fontWeight: 900,
                    color: "var(--ink,#0D0F0A)",
                    fontFamily: "var(--f-head,serif)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {cleanRawText(stat.deger || "")}
                </b>
                <span
                  style={{ fontSize: 13, color: "#4A5044", fontWeight: 600 }}
                >
                  {cleanRawText(stat.etiket || "")}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. ANTRENMAN ALANLARI
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="spor-section">
        <div
          className="section__head"
          style={{
            marginBottom: 40,
            textAlign: "center",
            maxWidth: "72ch",
            marginInline: "auto",
          }}
        >
          <p className="eyebrow" style={{ marginBottom: 12 }}>
            {cleanRawText(s.alanlarEyebrow || "") || "EGZERSİZ ALANLARI"}
          </p>
          <h2
            className="h2"
            style={{
              fontSize: "clamp(28px,3.5vw,40px)",
              marginBottom: 18,
            }}
          >
            {cleanRawText(s.alanlarBaslik || "") || "Antrenman Alanlarımız"}
          </h2>
          <p
            className="lead"
            style={{
              fontSize: "17px",
              lineHeight: 1.7,
              maxWidth: "62ch",
              marginInline: "auto",
            }}
          >
            {cleanRawText(s.alanlarLead || "") ||
              "Hedeflerinize yönelik tasarlanmış kardiyo, serbest ağırlık ve fonksiyonel fitness istasyonları."}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {alanlar.map((a, ai) => {
            const AlanIcon =
              ALAN_ICONS[a.ikon as keyof typeof ALAN_ICONS] || Dumbbell;
            return (
              <div key={ai} className="spor-card">
                {/* Icon circle */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: "rgba(217,164,65,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(217,164,65,0.2)",
                    flexShrink: 0,
                  }}
                >
                  <AlanIcon
                    size={26}
                    color="var(--brass-lo,#B8842C)"
                    strokeWidth={2}
                  />
                </div>

                {a.gorsel && (
                  <img
                    src={resolveMediaUrl(a.gorsel) || a.gorsel}
                    alt={a.baslik || "Antrenman alanı"}
                    style={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      borderRadius: 14,
                      display: "block",
                    }}
                  />
                )}

                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: "var(--brass-lo,#B8842C)",
                    textTransform: "uppercase",
                    letterSpacing: "0.09em",
                  }}
                >
                  {cleanRawText(a.kicker)}
                </span>

                <h3
                  style={{
                    fontFamily: "var(--f-head,serif)",
                    fontSize: 21,
                    fontWeight: 700,
                    color: "var(--ink,#0D0F0A)",
                    margin: 0,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                  }}
                >
                  {cleanRawText(a.baslik)}
                </h3>

                <p
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.72,
                    color: "#4A5044",
                    margin: 0,
                  }}
                >
                  {cleanRawText(a.metin)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. EKİPMAN & TESİS İMKANLARI
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        className="spor-section"
        style={{
          background: "linear-gradient(135deg,#FFFFFF 0%,#FAF6EE 100%)",
          borderRadius: 28,
          border: "1px solid rgba(13,15,10,0.07)",
          padding: "clamp(32px,4vw,52px)",
          boxShadow: "0 8px 28px -4px rgba(0,0,0,0.07)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              padding: 12,
              borderRadius: 14,
              background: "rgba(217,164,65,0.12)",
              border: "1px solid rgba(217,164,65,0.2)",
            }}
          >
            <Sparkles size={24} color="var(--brass-lo,#B8842C)" />
          </div>
          <h2
            style={{
              fontFamily: "var(--f-head,'Playfair Display',Georgia,serif)",
              fontSize: "clamp(22px,3vw,32px)",
              fontWeight: 700,
              color: "var(--ink,#0D0F0A)",
              margin: 0,
              letterSpacing: "-0.015em",
            }}
          >
            {cleanRawText(s.imkanlarBaslik || "") || "Ekipman ve Tesis İmkanları"}
          </h2>
        </div>

        <p
          style={{
            fontSize: 15.5,
            lineHeight: 1.75,
            color: "#4A5044",
            maxWidth: "68ch",
            margin: "0 0 32px",
          }}
        >
          {cleanRawText(s.imkanlarLead || "") ||
            "Petra Spor Salonu, antrenman konforunuz ve güvenliğiniz için eksiksiz donatılmıştır."}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 14,
          }}
        >
          {imkanlar.map((imkan, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "15px 20px",
                borderRadius: 14,
                background: "#FFFFFF",
                border: "1px solid rgba(13,15,10,0.07)",
                fontSize: 14.5,
                fontWeight: 600,
                color: "var(--ink,#0D0F0A)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              }}
            >
              <CheckCircle2
                size={19}
                color="var(--olive-lo,#5A6838)"
                style={{ flexShrink: 0 }}
              />
              <span>{cleanRawText(imkan)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. ÜYELİK PAKETLERİ
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="spor-section">
        <div
          className="section__head"
          style={{
            marginBottom: 40,
            textAlign: "center",
            maxWidth: "72ch",
            marginInline: "auto",
          }}
        >
          <p className="eyebrow" style={{ marginBottom: 12 }}>
            {cleanRawText(s.paketlerEyebrow || "") || "FİYATLANDIRMA"}
          </p>
          <h2
            className="h2"
            style={{ fontSize: "clamp(28px,3.5vw,40px)", marginBottom: 18 }}
          >
            {cleanRawText(s.paketlerBaslik || "") || "Üyelik Paketleri"}
          </h2>
          <p
            className="lead"
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              maxWidth: "60ch",
              marginInline: "auto",
            }}
          >
            {cleanRawText(s.paketlerLead || "") ||
              "Hedeflerinize ve programınıza göre esnek üyelik seçenekleri."}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(248px, 1fr))",
            gap: 24,
            alignItems: "start",
          }}
        >
          {paketler.map((paket, pi) => {
            const isPopuler = Boolean(paket.populer);
            return (
              <div
                key={pi}
                className={
                  isPopuler ? "spor-paket-popular" : "spor-paket-normal"
                }
                style={{
                  borderRadius: 24,
                  padding: "32px 26px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {isPopuler && (
                  <div
                    style={{
                      position: "absolute",
                      top: 20,
                      right: 20,
                      padding: "5px 13px",
                      borderRadius: 8,
                      background:
                        "linear-gradient(135deg,#E8B84B 0%,#D9A441 100%)",
                      color: "#0D0F0A",
                      fontSize: 10,
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      boxShadow: "0 4px 12px rgba(217,164,65,0.4)",
                    }}
                  >
                    ⭐ Popüler
                  </div>
                )}

                {/* Plan adı rozeti */}
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 13px",
                      borderRadius: 8,
                      background: isPopuler
                        ? "rgba(217,164,65,0.22)"
                        : "rgba(13,15,10,0.06)",
                      fontSize: 11,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      color: isPopuler ? "#E8B84B" : "#5A6838",
                    }}
                  >
                    {cleanRawText(paket.ad || "")}
                  </span>
                </div>

                {/* Fiyat */}
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13.5,
                      color: isPopuler
                        ? "rgba(255,255,255,0.62)"
                        : "#667085",
                      lineHeight: 1.5,
                    }}
                  >
                    {cleanRawText(paket.sure || "")}
                  </p>
                  <p
                    style={{
                      margin: "10px 0 0",
                      fontFamily: "var(--f-head,serif)",
                      fontSize: "clamp(28px,3vw,38px)",
                      fontWeight: 800,
                      color: isPopuler ? "#FFFFFF" : "var(--ink,#0D0F0A)",
                      lineHeight: 1,
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {cleanRawText(paket.fiyat || "")}
                  </p>
                </div>

                {/* Özellikler */}
                {(paket.ozellikler || []).length > 0 && (
                  <ul
                    style={{
                      margin: 0,
                      padding: 0,
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {(paket.ozellikler || []).map((f: string, fi: number) => (
                      <li
                        key={fi}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          fontSize: 14,
                          color: isPopuler
                            ? "rgba(255,255,255,0.88)"
                            : "#383C30",
                          fontWeight: 500,
                        }}
                      >
                        <CheckCircle2
                          size={17}
                          color={
                            isPopuler ? "#E8B84B" : "var(--olive-lo,#5A6838)"
                          }
                          style={{ flexShrink: 0 }}
                        />
                        {cleanRawText(f)}
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA */}
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    borderRadius: 14,
                    fontWeight: 700,
                    marginTop: "auto",
                    padding: "13px 20px",
                    fontSize: 14,
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                    ...(isPopuler
                      ? {
                          background:
                            "linear-gradient(135deg,#E8B84B 0%,#D9A441 100%)",
                          color: "#0D0F0A",
                          boxShadow: "0 4px 14px rgba(217,164,65,0.35)",
                          border: "none",
                        }
                      : {
                          background: "#0D0F0A",
                          color: "#FFFFFF",
                          border: "none",
                        }),
                  }}
                >
                  <WhatsAppIcon size={16} />
                  {isPopuler ? "Ön Kayıt Yap" : "Bilgi Al"}
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. DARK CTA — Sosyal medya + iletişim
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="spor-dark-cta spor-section">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 40,
            alignItems: "center",
          }}
        >
          {/* Left copy */}
          <div>
            <p
              className="eyebrow"
              style={{
                color: "#D9A441",
                margin: "0 0 12px",
                fontWeight: 700,
                letterSpacing: "0.16em",
              }}
            >
              {cleanRawText(s.ctaEyebrow || "") || "PETRA YAŞAM KÜLTÜRÜ"}
            </p>
            <h2
              style={{
                color: "#FFFFFF",
                fontFamily: "var(--f-head,serif)",
                fontSize: "clamp(24px,3vw,36px)",
                fontWeight: 700,
                margin: "0 0 16px",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              {cleanRawText(s.ctaTitle || "") || "Hedeflerinize Petra ile Ulaşın"}
            </h2>
            <p
              style={{
                color: "rgba(244,238,225,0.8)",
                fontSize: 15,
                lineHeight: 1.75,
                margin: "0 0 28px",
              }}
            >
              {cleanRawText(s.ctaLead || "") ||
                "Petra Spor Salonu; antrenmanlarınızı açık yüzme havuzu ve Petra Cafe'nin leziz kahve & sağlıklı menü seçenekleriyle birleştiren benzersiz bir yaşam alanı sunar."}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#25D366",
                  color: "#0B140C",
                  fontWeight: 700,
                  padding: "12px 22px",
                  borderRadius: 12,
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                <WhatsAppIcon size={16} />
                WhatsApp'tan Yazın
              </a>
              <a
                href={`tel:${telHref}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  border: "1px solid rgba(244,238,225,0.3)",
                  color: "#FFFFFF",
                  background: "transparent",
                  padding: "12px 20px",
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <Phone size={15} />
                {tel}
              </a>
            </div>
          </div>

          {/* Right — Instagram card */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 22,
              padding: "28px 24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                padding: 14,
                borderRadius: "50%",
                background: "rgba(217,164,65,0.18)",
                color: "#E8B84B",
                marginBottom: 14,
              }}
            >
              <SiteIcon name="instagram" size={30} />
            </div>
            <h3
              style={{
                color: "#FFFFFF",
                fontSize: 19,
                fontWeight: 700,
                margin: "0 0 10px",
              }}
            >
              Instagram'da Takip Edin
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 14,
                margin: "0 0 20px",
                lineHeight: 1.65,
              }}
            >
              Güncel antrenman anları, duyurular ve açılış içerikleri için
              resmi hesabımızı ziyaret edin.
            </p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                width: "100%",
                padding: "12px 16px",
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 14,
                background:
                  "linear-gradient(135deg,#E8B84B 0%,#D9A441 100%)",
                color: "#0D0F0A",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(217,164,65,0.3)",
              }}
            >
              {instagramTag}
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. MASA / REZERVASYON CTA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <MasaCTA
        tel={tel}
        telHref={telHref}
        waHref={waHref}
        baslik={
          cleanRawText(s.masaCtaBaslik || "") ||
          "Spor salonumuza katılmak ister misiniz?"
        }
        metin={
          cleanRawText(s.masaCtaMetin || "") ||
          "Üyelik ve detaylı bilgi için WhatsApp'tan yazın veya arayın."
        }
        btnLabel="WhatsApp ile Bilgi Al"
      />
    </article>
  );
}
