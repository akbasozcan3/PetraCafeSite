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
  MapPin,
  ArrowRight,
  Users,
  Star,
  CalendarDays,
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
    "Merhaba, Petra Yaşam Merkezi havuz rezervasyonu ve bilgi almak istiyorum."
  );
  const waKursHref = buildWhatsappUrl(
    content.iletisim?.whatsapp || tel,
    "Merhaba, Petra Yaşam Merkezi yüzme kursu ön kaydı ve detayları hakkında bilgi almak istiyorum."
  );

  const havuzSaat = p.havuzSaat || p.cafeSaat || "09:00 – 18:00";
  const derinlik = p.derinlik || "1.45 m – 1.95 m";

  const kurallar: string[] = (p.kurallar as string[]) || [
    "Dışarıdan yiyecek ve içecek getirilmez.",
    "0–2 yaş havuz girişi ücretsizdir.",
    "Havuz kullanımı için mayo ve bone zorunludur.",
    "Cankurtaran talimatlarına ve havuz kurallarına uyulmalıdır.",
    "Havuz alanı 09:00 – 18:00 saatleri arasında açıktır.",
    "Çocuk havuzu ve yetişkin havuzu ayrı alanlarda hizmet verir.",
  ];

  const fiyatlar: any[] = (p.fiyatlar as any[]) || [
    { kategori: "0–2 yaş", haftaIci: "Ücretsiz", haftaSonu: "Ücretsiz" },
    { kategori: "2–10 yaş", haftaIci: "400 TL", haftaSonu: "450 TL" },
    { kategori: "10–18 yaş", haftaIci: "600 TL", haftaSonu: "650 TL" },
    { kategori: "Yetişkin", haftaIci: "800 TL", haftaSonu: "850 TL" },
  ];

  const gorseller: any[] = (p.gorseller && p.gorseller.length > 0)
    ? p.gorseller
    : [
        {
          src: "/assets/cms/petra-pool-beach-loca.jpg",
          alt: "Pool & Beach & VIP Hasır Localar",
          desc: "Güneşlenme şezlongları, yetişkin havuzu ve konforlu hasır localarla gün boyu lüks tatil keyfi.",
          tag: "Açık Yüzme Havuzu",
          position: "center 40%",
        },
        {
          src: "/assets/cms/petra-nargile-havuz-gece.jpg",
          alt: "Gece Havuz Kenarı Lounge & Nargile",
          desc: "Işıklı su havuzu manzarası eşliğinde premium nargile çeşitleri, kokteyller ve ferah lounge alanı.",
          tag: "Teras & Akşam Keyfi",
          position: "center center",
        },
        {
          src: "/assets/cms/petra-restoran-salon-organizasyon.jpg",
          alt: "Özel Günler & Restoran Salonu",
          desc: "Doğum günleri, özel kutlamalar ve kurumsal davetler için havuz manzaralı şık masa düzeni.",
          tag: "Kutlama & Davet",
          position: "center center",
        },
        {
          src: "/assets/cms/hero-cephe.webp",
          alt: "Petra Yaşam Merkezi & Tesis Alanı",
          desc: "Taşdelen'de açık yetişkin havuzu, ayrı çocuk havuzu, modern fitness ve zengin restoran bir arada.",
          tag: "Sosyal Yaşam Alanı",
          position: "center center",
        },
      ];

  /* Yüzme kursu — tamamen admindan */
  const yk = p.yuzmeKursu || {};
  const kursuBaslik = cleanRawText(yk.baslik || "") || "Yüzme Kursu & Özel Dersler";
  const kursuRozet = cleanRawText(yk.rozet || "") || "Kayıtlarımız Başlamıştır";
  const kursuLead =
    cleanRawText(yk.lead || "") ||
    "Uzman eğitmenlerimiz eşliğinde çocuklarınızın suya olan güvenini artırıyor ve temel yüzme becerilerini öğrenmelerini sağlıyoruz.";
  const kursuGunler = cleanRawText(yk.programGunler || "") || "Salı – Perşembe";
  const kursuSaat = cleanRawText(yk.programSaat || "") || "08:45 – 09:30";
  const kursuYaslar: string[] = Array.isArray(yk.yasGruplari) && yk.yasGruplari.length > 0
    ? yk.yasGruplari
    : ["5–8 Yaş", "9–12 Yaş"];
  const kursuGrupFiyat = cleanRawText(yk.grupFiyat || "") || "7.000 TL";
  const kursuOzelFiyat = cleanRawText(yk.ozelFiyat || "") || "9.000 TL";
  const kursuAfis = yk.afisGorsel || "/assets/cms/petra-pool-beach-loca.jpg";

  const instagramHref =
    p.instagramHref || content.iletisim?.instagramUrl || "https://www.instagram.com/petracaferestaurant/";
  const instagramEtiket = p.instagramEtiket || content.iletisim?.instagram || "@petracaferestaurant";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Petra Pool & Beach",
    description:
      cleanRawText(p.lead) ||
      "Çekmeköy Taşdelen Petra Yaşam Merkezi açık yüzme havuzu, çocuk havuzu ve yüzme kursu.",
    url: "https://petra-cafe-site.vercel.app/havuz-plaj",
    telephone: tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: content.iletisim?.adresSatir1 || "Megakent Sitesi, Selen Sk. No:1/O",
      addressLocality: "Çekmeköy",
      addressRegion: "İstanbul",
      postalCode: "34788",
      addressCountry: "TR",
    },
    openingHours: "Mo-Su 09:00-18:00",
    sameAs: [instagramHref],
  };

  return (
    <article className="page-hakkimizda page-havuz">
      <style>{`
        /* ── Sayfa genel ── */
        .page-havuz {
          padding-bottom: 60px;
        }

        /* ── Hero header ── */
        .havuz-hero {
          margin-bottom: clamp(32px, 4vw, 52px);
        }

        /* ── Hızlı bilgi çipleri ── */
        .havuz-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 20px;
        }

        .havuz-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 14px;
          border-radius: 12px;
          background: var(--cream-2, #F3EDE0);
          border: 1px solid rgba(13, 15, 10, 0.07);
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #0D0F0A);
        }

        /* ── 4'lü görsel grid ── */
        .havuz-foto-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: clamp(28px, 4vw, 44px);
        }

        @media (max-width: 640px) {
          .havuz-foto-grid {
            grid-template-columns: 1fr;
          }
        }

        .havuz-foto-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(13, 15, 10, 0.09);
          background: #f0ede6;
          aspect-ratio: 16 / 9;
          transition: transform 0.3s ease;
        }

        .havuz-foto-card:hover {
          transform: translateY(-3px);
        }

        .havuz-foto-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .havuz-foto-card:hover img {
          transform: scale(1.05);
        }

        .havuz-foto-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px 18px 16px;
          background: linear-gradient(to top, rgba(10, 13, 8, 0.82) 0%, transparent 100%);
        }

        .havuz-foto-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 9px;
          border-radius: 6px;
          background: rgba(217, 164, 65, 0.9);
          color: #0D0F0A;
          font-size: 10.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }

        .havuz-foto-title {
          color: #FFFFFF;
          font-family: var(--f-head, 'Playfair Display', Georgia, serif);
          font-size: clamp(14px, 1.8vw, 17px);
          font-weight: 600;
          margin: 0 0 3px;
          line-height: 1.3;
        }

        .havuz-foto-desc {
          color: rgba(255, 255, 255, 0.75);
          font-size: 12px;
          line-height: 1.5;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ── Bilgi kartları ── */
        .havuz-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 12px;
          padding: clamp(18px, 2.5vw, 26px);
          background: var(--cream-2, #F3EDE0);
          border-radius: 22px;
          border: 1px solid rgba(13, 15, 10, 0.07);
          margin-bottom: clamp(24px, 3.5vw, 38px);
        }

        .havuz-info-card {
          background: #FFFFFF;
          border-radius: 14px;
          padding: 16px 14px;
          text-align: center;
          border: 1px solid rgba(13, 15, 10, 0.07);
        }

        .havuz-info-icon {
          display: inline-flex;
          padding: 8px;
          border-radius: 10px;
          margin-bottom: 8px;
        }

        .havuz-info-value {
          display: block;
          font-size: 15px;
          font-weight: 700;
          color: var(--ink, #0D0F0A);
          margin-bottom: 2px;
        }

        .havuz-info-label {
          font-size: 11.5px;
          color: var(--muted, #6E6A5C);
          font-weight: 600;
        }

        /* ── Fiyat bölümü ── */
        .havuz-fiyat-sec {
          background: #FFFFFF;
          border-radius: 24px;
          border: 1.5px solid rgba(13, 15, 10, 0.08);
          padding: clamp(24px, 3.5vw, 36px);
          margin-bottom: clamp(24px, 3.5vw, 38px);
        }

        .havuz-fiyat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 14px;
          margin: 20px 0;
        }

        .havuz-fiyat-kart {
          border-radius: 18px;
          padding: 20px 16px;
          border: 1.5px solid rgba(217, 164, 65, 0.22);
          background: var(--cream-2, #F8F5EE);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .havuz-fiyat-kart--free {
          border-color: rgba(124, 139, 79, 0.25);
          background: rgba(124, 139, 79, 0.05);
        }

        .havuz-fiyat-badge {
          display: inline-block;
          padding: 3px 9px;
          border-radius: 6px;
          font-size: 10.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #FFFFFF;
        }

        .havuz-fiyat-kateg {
          font-family: var(--f-head, 'Playfair Display', Georgia, serif);
          font-size: 18px;
          font-weight: 700;
          color: var(--ink, #0D0F0A);
          margin: 0;
        }

        .havuz-fiyat-rows {
          background: #FFFFFF;
          border-radius: 12px;
          padding: 11px 13px;
          border: 1px solid rgba(13, 15, 10, 0.07);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .havuz-fiyat-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12.5px;
        }

        .havuz-fiyat-tutar {
          font-size: 15px;
          font-weight: 700;
        }

        .havuz-fiyat-not {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          background: rgba(217, 164, 65, 0.07);
          border-radius: 14px;
          border: 1px solid rgba(217, 164, 65, 0.22);
        }

        /* ── Yüzme kursu bölümü ── */
        .havuz-kurs-sec {
          background: linear-gradient(135deg, #FFFFFF 0%, #FBF9F4 100%);
          border-radius: 24px;
          border: 1.5px solid rgba(217, 164, 65, 0.25);
          padding: clamp(28px, 4vw, 44px);
          margin-bottom: clamp(24px, 3.5vw, 38px);
        }

        .havuz-kurs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: clamp(24px, 4vw, 44px);
          align-items: start;
        }

        .havuz-kurs-avantajlar {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 24px 20px;
          border: 1.5px solid rgba(217, 164, 65, 0.2);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .havuz-kurs-avantaj-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .havuz-kurs-avantaj-ico {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(217, 164, 65, 0.14);
          color: #B8842C;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
          font-size: 13px;
        }

        /* ── Kurallar ── */
        .havuz-kurallar-sec {
          background: rgba(217, 164, 65, 0.07);
          border-radius: 20px;
          border: 1.5px solid rgba(217, 164, 65, 0.22);
          padding: 24px 26px;
          margin-bottom: clamp(24px, 3.5vw, 38px);
        }

        .havuz-kurallar-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 10px;
          margin-top: 14px;
        }

        .havuz-kural-item {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 13.5px;
          color: #383C30;
        }

        /* ── CTA ── */
        .havuz-cta-sec {
          border-radius: 24px;
          overflow: hidden;
        }

        /* ── Kurs afiş ── */
        .havuz-kurs-afis {
          border-radius: 18px;
          overflow: hidden;
          border: 1.5px solid rgba(217, 164, 65, 0.3);
          background: #090C08;
          aspect-ratio: 4 / 3;
          position: relative;
        }

        .havuz-kurs-afis img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* ── Program & fiyat kartçıkları ── */
        .havuz-kurs-detail-card {
          background: #FFFFFF;
          border-radius: 14px;
          padding: 16px;
          border: 1.5px solid rgba(13, 15, 10, 0.09);
        }

        .havuz-kurs-detail-card__head {
          padding: 4px 9px;
          border-radius: 7px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #FFFFFF;
          text-align: center;
          margin-bottom: 11px;
          background: #E53935;
        }
      `}</style>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── 1. HERO BAŞLIK ─── */}
      <header className="havuz-hero">
        <div style={{ marginBottom: "14px" }}>
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

        {/* CTA butonları */}
        <div className="about-head-sec__actions">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--light"
          >
            <WhatsAppIcon size={17} />
            Havuz Rezervasyonu & Bilgi
          </a>
          <a href={`tel:${telHref}`} className="btn">
            <Phone size={15} />
            {tel}
          </a>
        </div>

        {/* Hızlı bilgi çipleri */}
        <div className="havuz-chips">
          <span className="havuz-chip">
            <Clock size={15} color="var(--brass-lo, #B8842C)" />
            <span>Havuz {havuzSaat}</span>
          </span>
          <span className="havuz-chip">
            <Waves size={15} color="var(--olive-lo, #5A6838)" />
            <span>Derinlik {derinlik}</span>
          </span>
          <span className="havuz-chip">
            <Sun size={15} color="var(--brass-lo, #B8842C)" />
            <span>Şezlong & Şemsiye Dahil</span>
          </span>
          <span className="havuz-chip">
            <ShieldCheck size={15} color="var(--olive-lo, #5A6838)" />
            <span>Ayrı Çocuk Havuzu</span>
          </span>
          <span className="havuz-chip">
            <MapPin size={15} color="var(--olive-lo, #5A6838)" />
            <span>Çekmeköy · Taşdelen</span>
          </span>
        </div>
      </header>

      {/* ─── 2. GÖRSEL VİTRİNİ (4'lü 16:9 grid) ─── */}
      <section className="havuz-foto-grid" aria-label="Havuz ve Yaşam Alanları">
        {gorseller.map((g: any, gi: number) => (
          <article key={gi} className="havuz-foto-card">
            <SafeImg
              src={resolveMediaUrl(g.src) || "/assets/cms/hero-cephe.webp"}
              alt={g.alt || "Petra Havuz & Plaj"}
              fallback={SITE_PHOTOS.facade}
              style={{ objectPosition: g.position || "center" }}
            />
            <div className="havuz-foto-overlay">
              {g.tag && (
                <div className="havuz-foto-badge">
                  <Sparkles size={10} />
                  {cleanRawText(g.tag)}
                </div>
              )}
              <h3 className="havuz-foto-title">{cleanRawText(g.alt || "Petra Pool & Beach")}</h3>
              {g.desc && (
                <p className="havuz-foto-desc">{cleanRawText(g.desc)}</p>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* ─── 3. HIZLI BİLGİ KARTLARI ─── */}
      <section className="havuz-info-grid" aria-label="Havuz hizmet bilgileri">
        <div className="havuz-info-card">
          <div className="havuz-info-icon" style={{ background: "rgba(217, 164, 65, 0.12)" }}>
            <Clock size={20} color="var(--brass-lo, #B8842C)" />
          </div>
          <b className="havuz-info-value">{havuzSaat}</b>
          <span className="havuz-info-label">Havuz Hizmet Saatleri</span>
        </div>
        <div className="havuz-info-card">
          <div className="havuz-info-icon" style={{ background: "rgba(124, 139, 79, 0.12)" }}>
            <Waves size={20} color="var(--olive-lo, #5A6838)" />
          </div>
          <b className="havuz-info-value">{derinlik}</b>
          <span className="havuz-info-label">Kademeli Derinlik</span>
        </div>
        <div className="havuz-info-card">
          <div className="havuz-info-icon" style={{ background: "rgba(217, 164, 65, 0.12)" }}>
            <Sun size={20} color="var(--brass-lo, #B8842C)" />
          </div>
          <b className="havuz-info-value">Şezlong & Şemsiye</b>
          <span className="havuz-info-label">Güneşlenme Alanı Dahil</span>
        </div>
        <div className="havuz-info-card">
          <div className="havuz-info-icon" style={{ background: "rgba(124, 139, 79, 0.12)" }}>
            <ShieldCheck size={20} color="var(--olive-lo, #5A6838)" />
          </div>
          <b className="havuz-info-value">Çocuk Havuzu</b>
          <span className="havuz-info-label">Ayrı Güvenli Alan</span>
        </div>
        <div className="havuz-info-card">
          <div className="havuz-info-icon" style={{ background: "rgba(217, 164, 65, 0.12)" }}>
            <Users size={20} color="var(--brass-lo, #B8842C)" />
          </div>
          <b className="havuz-info-value">Her Yaş</b>
          <span className="havuz-info-label">0–2 Yaş Ücretsiz</span>
        </div>
        <div className="havuz-info-card">
          <div className="havuz-info-icon" style={{ background: "rgba(124, 139, 79, 0.12)" }}>
            <Star size={20} color="var(--olive-lo, #5A6838)" />
          </div>
          <b className="havuz-info-value">VIP Localar</b>
          <span className="havuz-info-label">Hasır Oturma Alanı</span>
        </div>
      </section>

      {/* ─── 4. FİYAT TARİFESİ ─── */}
      <section className="havuz-fiyat-sec" aria-labelledby="havuz-fiyat-heading">
        <div style={{ marginBottom: "6px" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "11.5px",
              fontWeight: 700,
              color: "#B8842C",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            2026 SEZONU GİRİŞ TARİFESİ
          </span>
          <h2
            id="havuz-fiyat-heading"
            style={{
              fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
              fontSize: "clamp(22px, 3vw, 30px)",
              fontWeight: 700,
              color: "var(--ink, #0D0F0A)",
              margin: "4px 0 6px",
            }}
          >
            {cleanRawText(p.fiyatBaslik || "") || "Günlük Havuz Giriş Ücretlerimiz"}
          </h2>
          <p style={{ margin: 0, fontSize: "14.5px", color: "#555A4C", lineHeight: 1.6 }}>
            Yetişkin havuzu, ayrı çocuk havuzu, şezlong ve şemsiye dahil günlük giriş tarifesi.
          </p>
        </div>

        <div className="havuz-fiyat-grid">
          {fiyatlar.map((f: any, fi: number) => {
            const isFree = f.haftaIci === "Ücretsiz" || f.kategori?.includes("0–2") || f.kategori?.includes("0-2");
            return (
              <div key={fi} className={`havuz-fiyat-kart${isFree ? " havuz-fiyat-kart--free" : ""}`}>
                <div>
                  <span
                    className="havuz-fiyat-badge"
                    style={{ background: isFree ? "#7C8B4F" : "#D9A441" }}
                  >
                    {isFree ? "Ücretsiz" : "2026 Sezonu"}
                  </span>
                  <p className="havuz-fiyat-kateg">{cleanRawText(f.kategori || "")}</p>
                  <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#667085", lineHeight: 1.4 }}>
                    Şezlong, şemsiye & havuz kullanımı dahil
                  </p>
                </div>
                <div className="havuz-fiyat-rows">
                  <div className="havuz-fiyat-row">
                    <span style={{ color: "#667085" }}>Hafta İçi:</span>
                    <b
                      className="havuz-fiyat-tutar"
                      style={{ color: isFree ? "#5A6838" : "#B8842C" }}
                    >
                      {cleanRawText(f.haftaIci || "")}
                    </b>
                  </div>
                  <div className="havuz-fiyat-row">
                    <span style={{ color: "#667085" }}>Hafta Sonu:</span>
                    <b
                      className="havuz-fiyat-tutar"
                      style={{ color: isFree ? "#5A6838" : "#B8842C" }}
                    >
                      {cleanRawText(f.haftaSonu || f.haftaIci || "")}
                    </b>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fiyat notu + butonlar */}
        <div className="havuz-fiyat-not">
          <p style={{ margin: 0, fontSize: "13px", color: "#5A4E30", lineHeight: 1.55, flex: "1 1 280px" }}>
            {p.fiyatNot
              ? cleanRawText(p.fiyatNot)
              : (
                <>
                  <b>💡 Bilgi:</b> 0–2 yaş ücretsizdir. Havuz alanı{" "}
                  <b>{havuzSaat}</b> saatleri arasında açıktır. Dışarıdan yiyecek &
                  içecek getirilmez. Mayo ve bone zorunludur.
                </>
              )}
          </p>
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
              style={{ padding: "10px 16px", borderRadius: "12px", fontWeight: 600, fontSize: "13px" }}
            >
              <Phone size={14} />
              {tel}
            </a>
          </div>
        </div>
      </section>

      {/* ─── 5. YÜZME KURSU ─── */}
      <section className="havuz-kurs-sec" aria-labelledby="havuz-kurs-heading">
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 14px",
              borderRadius: "999px",
              background: "rgba(220, 38, 38, 0.1)",
              color: "#DC2626",
              fontSize: "12px",
              fontWeight: 700,
              marginBottom: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              border: "1px solid rgba(220, 38, 38, 0.2)",
            }}
          >
            <span>🔥</span>
            <span>{kursuRozet}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <GraduationCap size={26} color="var(--brass-lo, #B8842C)" />
            <h2
              id="havuz-kurs-heading"
              style={{
                fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
                fontSize: "clamp(22px, 3vw, 32px)",
                fontWeight: 700,
                color: "var(--ink, #0D0F0A)",
                margin: 0,
              }}
            >
              {kursuBaslik}
            </h2>
          </div>
        </div>

        <div className="havuz-kurs-grid">
          {/* Sol: Bilgiler */}
          <div>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#555A4C", margin: "0 0 22px" }}>
              {kursuLead}
            </p>

            {/* Program + Fiyat kartçıkları */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "14px",
                marginBottom: "22px",
              }}
            >
              {/* Program */}
              <div className="havuz-kurs-detail-card">
                <div className="havuz-kurs-detail-card__head">Program</div>
                <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13.5px", color: "#333D29", lineHeight: 1.9 }}>
                  <li><b>{kursuGunler}</b></li>
                  <li>Saat: <b>{kursuSaat}</b></li>
                  {kursuYaslar.map((yas, yi) => (
                    <li key={yi}><b>{cleanRawText(yas)}</b> Grubu</li>
                  ))}
                </ul>
              </div>

              {/* Ücret */}
              <div className="havuz-kurs-detail-card">
                <div className="havuz-kurs-detail-card__head">Ücret Tarifesi</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13.5px", color: "#333D29" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px dashed rgba(0,0,0,0.1)",
                      paddingBottom: "7px",
                    }}
                  >
                    <span>Grup Ders:</span>
                    <b style={{ color: "#B8842C", fontSize: "15px" }}>{kursuGrupFiyat}</b>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Özel Ders:</span>
                    <b style={{ color: "#B8842C", fontSize: "15px" }}>{kursuOzelFiyat}</b>
                  </div>
                  <span style={{ fontSize: "11px", color: "#667085", lineHeight: 1.4 }}>
                    * Uzman lisanslı eğitmenler eşliğinde.
                  </span>
                </div>
              </div>
            </div>

            {/* Kayıt butonları */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
              <a
                href={waKursHref}
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
                }}
              >
                <WhatsAppIcon size={17} />
                WhatsApp ile Kursa Kayıt Ol
              </a>
              <a
                href={`tel:${telHref}`}
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

          {/* Sağ: Avantajlar + Afiş */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {/* Avantajlar kartı */}
            <div className="havuz-kurs-avantajlar">
              <h3
                style={{
                  fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "var(--ink, #0D0F0A)",
                  margin: "0 0 4px",
                }}
              >
                🏊 Neden Petra Yüzme Eğitimi?
              </h3>

              {[
                {
                  baslik: "Uzman & Lisanslı Antrenörler",
                  metin: "Çocuk psikolojisine hakim, suya alıştırma ve teknik konularda deneyimli eğitmenler.",
                },
                {
                  baslik: "Ayrı Çocuk Havuzu Güvenliği",
                  metin: "Miniklerin güvenle, derinlik korkusu yaşamadan çalışabileceği kontrollü çocuk havuzu.",
                },
                {
                  baslik: "Hijyen ve Günlük Su Analizi",
                  metin: "Düzenli filtreleme, klor-pH ölçümü ve her gün kapanış sonrası dezenfeksiyon.",
                },
                {
                  baslik: "Butik Gruplar & Birebir İlgi",
                  metin: "Kalabalık olmayan seanslarla her öğrencinin gelişimini yakından takip etme.",
                },
              ].map((item, idx) => (
                <div key={idx} className="havuz-kurs-avantaj-item">
                  <div className="havuz-kurs-avantaj-ico">✓</div>
                  <div>
                    <b style={{ display: "block", fontSize: "13.5px", color: "var(--ink, #0D0F0A)", marginBottom: 2 }}>
                      {item.baslik}
                    </b>
                    <p style={{ margin: 0, fontSize: "12.5px", color: "#667085", lineHeight: 1.5 }}>
                      {item.metin}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Afiş görsel */}
            <div className="havuz-kurs-afis">
              <SafeImg
                src={resolveMediaUrl(kursuAfis) || "/assets/cms/petra-pool-beach-loca.jpg"}
                alt={kursuBaslik}
                fallback={SITE_PHOTOS.facade}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 14,
                  left: 14,
                  right: 14,
                  padding: "10px 14px",
                  borderRadius: "12px",
                  background: "rgba(10, 15, 9, 0.88)",
                  border: "1px solid rgba(217, 164, 65, 0.4)",
                  color: "#F8F5EE",
                  fontSize: "12px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <CalendarDays size={15} color="#D9A441" />
                <span>{kursuGunler} · {kursuSaat}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. HAVUZ KURALLARI ─── */}
      <section className="havuz-kurallar-sec" aria-labelledby="havuz-kurallar-heading">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <AlertCircle size={20} color="var(--brass-lo, #B8842C)" />
          <h3 id="havuz-kurallar-heading" style={{ margin: 0, fontSize: "17px", fontWeight: 700, color: "var(--ink, #0D0F0A)" }}>
            Havuz Kuralları & Güvenlik Standartları
          </h3>
        </div>
        <div className="havuz-kurallar-grid">
          {kurallar.map((k, ki) => (
            <div key={ki} className="havuz-kural-item">
              <CheckCircle2 size={15} color="var(--olive-lo, #5A6838)" style={{ flexShrink: 0 }} />
              <span>{cleanRawText(k)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 7. CTA BÖLÜMÜ ─── */}
      <section className="about-cta-sec havuz-cta-sec" aria-label="Havuz Rezervasyon">
        <div
          className="about-cta-card"
          style={{ backgroundColor: "#16190F", color: "#F4EEE1" }}
        >
          <p
            className="eyebrow"
            style={{ color: "#D9A441", margin: 0, fontWeight: 700, letterSpacing: "0.15em" }}
          >
            POOL & BEACH
          </p>
          <h2
            style={{
              color: "#FFFFFF",
              fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
              fontSize: "clamp(22px, 3.2vw, 36px)",
              fontWeight: 600,
              margin: 0,
            }}
          >
            Güneşin ve Serinliğin Tadını Çıkarın
          </h2>
          <p
            style={{
              color: "#F4EEE1",
              fontSize: "15px",
              lineHeight: 1.6,
              maxWidth: "54ch",
              margin: 0,
              opacity: 0.9,
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
              <WhatsAppIcon size={17} />
              WhatsApp Havuz Rezervasyonu
            </a>
            <Link
              href="/menu"
              className="btn btn--ghost"
              style={{
                background: "rgba(244, 238, 225, 0.1)",
                color: "#FFFFFF",
                border: "1.5px solid rgba(244, 238, 225, 0.35)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Havuz Başı Menüsü
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
