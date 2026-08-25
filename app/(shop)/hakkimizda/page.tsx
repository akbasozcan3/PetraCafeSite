import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/db/content";
import { phoneToTelHref, buildWhatsappUrl } from "@/lib/content/contact-utils";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import SafeImg from "@/components/site/SafeImg";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import {
  cleanRawText,
  formatInlineText,
  parseArticleContent,
  renderSemanticBlocks,
} from "@/lib/content/markdown-parser";
import {
  UtensilsCrossed,
  Waves,
  Coffee,
  PartyPopper,
  CheckCircle2,
  CalendarCheck,
  Phone,
  MessageCircle,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent().catch(() => null);
  const h = content?.hakkimizda;
  const brand =
    content?.brand?.displayName ||
    content?.seo?.siteName ||
    "Petra Cafe Restaurant";
  // SEO: Marka adını çiftleme — sadece bir kez kullan
  const pageTitle = cleanRawText(h?.baslik || "Hakkımızda");
  const title = `${pageTitle} | ${brand}`;
  const description =
    cleanRawText(h?.lead || "")
      .split(/[\n\r]/)
      .filter(Boolean)[0] ||
    "Petra Cafe Restaurant & Petra Yaşam Merkezi — Çekmeköy Taşdelen'de dünya mutfağı, serpme kahvaltı, açık havuz & plaj ve organizasyon.";
  const canonicalUrl = "https://petra-cafe-site.vercel.app/hakkimizda";
  const ogImg = resolveMediaUrl(
    liveMedia(
      content?.images?.aboutInterior || content?.images?.icMekan,
      SITE_PHOTOS.interior
    )
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
      images: [
        {
          url: ogImg || "/assets/cms/hero-ic.webp",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImg || "/assets/cms/hero-ic.webp"],
    },
  };
}

export default async function HakkimizdaPage() {
  const content = await getPublicContent();
  const h = content.hakkimizda || ({} as any);

  /* ─── Görseller ─── */
  const img = resolveMediaUrl(
    liveMedia(
      content.images?.aboutInterior || content.images?.icMekan,
      SITE_PHOTOS.interior
    )
  );
  const imgEvents = resolveMediaUrl(
    liveMedia(
      content.images?.events || content.images?.galeri?.[0] || "/assets/cms/petra-restoran-salon-organizasyon.jpg",
      "/assets/cms/petra-restoran-salon-organizasyon.jpg"
    )
  );

  /* ─── İletişim & Konum ─── */
  const brandName = content.brand?.displayName || "Petra Cafe Restaurant";
  const tel = content.iletisim?.telefon || "0530 608 90 51";
  const telHref = phoneToTelHref(tel);
  const adres =
    [content.iletisim?.adresSatir1, content.iletisim?.adresSatir2]
      .filter(Boolean)
      .join(", ") || "Taşdelen, Çekmeköy / İstanbul";
  const waHref = buildWhatsappUrl(
    content.iletisim?.whatsapp || tel,
    "Merhaba, Petra Cafe Restaurant hakkında bilgi ve rezervasyon için yazıyorum."
  );

  /* ─── Giriş / Lead — Sadece İLK SATIR göster ─── */
  const rawLead = h.lead || "";
  const formattedLead =
    cleanRawText(rawLead.split(/\r?\n/).filter(Boolean)[0] || "") ||
    "İstanbul Çekmeköy Taşdelen'de gastronomi, açık yüzme havuzu ve sosyal yaşamı kusursuz bir uyumla buluşturan seçkin bir merkez.";

  /* ─── Makale Blokları (Markdown / Semantic HTML) ─── */
  const rawBody = h.body || [];
  const articleBlocks = parseArticleContent(
    rawBody.length > 0
      ? rawBody
      : [
          "Petra Cafe Restaurant; İstanbul Çekmeköy Taşdelen'de lezzet, keyif ve konforu bir araya getiren özel bir yaşam alanıdır. Zengin menümüz, sıcak atmosferimiz ve ferah açık havuz alanımızla misafirlerimize sadece bir restoran değil, unutulmaz anlar sunan bir buluşma noktası vadediyoruz.",
          "Günün her saatine uygun lezzetlerimizle hizmetinizdeyiz. Sabahları zengin serpme kahvaltımızla güne enerjik bir başlangıç yapabilir; öğle ve akşam saatlerinde usta şeflerimizin hazırladığı dünya mutfağından seçkin lezzetlerin, marine ızgaraların ve taş fırın çıtır pizzaların tadını çıkarabilirsiniz.",
          "Yaz aylarında açık yüzme havuzumuz ve pool & beach kulübümüzle serinliğin ve güneşin tadını çıkarabilirsiniz. Doğum günleri, evlilik teklifleri, özel kutlamalar ve kurumsal davetler için sunduğumuz özel organizasyon masaları ve menü seçenekleriyle en değerli anlarınızı kusursuz kılıyoruz.",
        ]
  );

  /* ─── 4'lü Sayaç / İstatistikler ─── */
  const rawStats = (h.stats || h.ozet || []) as any[];
  const statsList: any[] =
    rawStats.length > 0
      ? rawStats
      : [
          { b: "08:00 – 02:00", span: "Hizmet Saatleri", sub: "Her gün kesintisiz açık" },
          { b: "240+", span: "Menü Çeşidi", sub: "Dünya mutfağı ve lezzetler" },
          { b: "1000+ m²", span: "Sosyal Yaşam Alanı", sub: "Açık havuz ve restoran" },
          { b: "09:00 – 18:00", span: "Pool & Beach", sub: "Yaz sezonu boyunca" },
        ];

  /* ─── 4 Ana Deneyim Kartı ─── */
  const experiences: any[] =
    (h.experiences as any[])?.length > 0
      ? (h.experiences as any[])
      : [
          {
            n: "01",
            title: "Dünya Mutfağı & Izgaralar",
            desc: "Marine dana antrikot, taş fırında çıtır pizzalar, el yapımı makarnalar ve taze Akdeniz salataları.",
            tag: "Usta Şeflerden",
            hours: "11:30 – 01:30",
            features: ["Taş Fırın Pizza", "Marine Izgara Etler", "El Yapımı Makarnalar"],
          },
          {
            n: "02",
            title: "Zengin Serpme Kahvaltı",
            desc: "Taş fırından sıcak pişiler, köy peynirleri, sucuklu yumurta, bal-kaymak ve sınırsız demlik çay.",
            tag: "Her Sabah Taze",
            hours: "08:00 – 14:00",
            features: ["Sınırsız Demlik Çay", "Taş Fırın Pişi", "Doğal Köy Ürünleri"],
          },
          {
            n: "03",
            title: "Pool & Beach Kulübü",
            desc: "Tertemiz yetişkin ve çocuk havuzu, konforlu şezlonglar, VIP localar ve cankurtaran desteği.",
            tag: "Yaz Sezonu Boyunca",
            hours: "09:00 – 18:00",
            features: ["Yetişkin & Çocuk Havuzu", "VIP Loca & Şezlong", "Hijyenik Su Analizi"],
          },
          {
            n: "04",
            title: "Özel Gün & Organizasyon",
            desc: "Doğum günleri, evlilik teklifleri, mezuniyet ve kurumsal davetler için özel masa ve menü planlaması.",
            tag: "Unutulmaz Anlar",
            hours: "Tüm Gün Rezervasyonlu",
            features: ["Özel Masa Süslemesi", "Kişiye Özel Menü", "Pasta Servisi"],
          },
        ];

  const expIcons = [UtensilsCrossed, Coffee, Waves, PartyPopper];

  /* ─── Zaman Çizelgesi (Timeline / Bir Günün Akışı) ─── */
  const timeline: any[] = (h.timeline as any[])?.length > 0 ? (h.timeline as any[]) : [];

  /* ─── Temel Değerler (Values) ─── */
  const values: any[] = (h.values as any[])?.length > 0 ? (h.values as any[]) : [];
  const valIcons = [ShieldCheck, Sparkles, Coffee, UtensilsCrossed];

  /* ─── Tesis İmkânları / Amenities ─── */
  const rawAmenities: any = h.amenities;
  const amenitiesList: string[] = Array.isArray(rawAmenities)
    ? (rawAmenities as string[])
    : typeof rawAmenities === "string" && rawAmenities.trim()
    ? rawAmenities.split(",").map((s: string) => s.trim()).filter(Boolean)
    : [
        "Açık Yüzme & Çocuk Havuzu",
        "Açık Teras & Klimalı Salonlar",
        "Geniş Otopark İmkânı",
        "Ücretsiz Yüksek Hızlı Wi-Fi",
        "Nargile & Lounge Alanı",
        "Özel Organizasyon & Davet Masaları",
      ];

  /* ─── SSS / Sıkça Sorulan Sorular ─── */
  const faqs: any[] = (h.faqs as any[])?.length > 0 ? (h.faqs as any[]) : [];

  /* ─── Özel Günler Bölümü Metinleri ─── */
  const eventsTitle = cleanRawText(h.eventsTitle || "Unutulmaz Anlar İçin Özel Organizasyon Masaları");
  const eventsLead = cleanRawText(
    h.eventsLead ||
      "Doğum günleri, evlilik teklifleri, mezuniyet ve kurumsal davetlerinizde; havuz başı terasımız veya klimalı şık salonlarımızda profesyonel masa düzeni, özel menü planlaması ve pasta servisi sunuyoruz."
  );
  const eventsTags: string[] =
    (h.eventsTags as string[])?.length > 0
      ? (h.eventsTags as string[])
      : ["Doğum Günü Kutlamaları", "Evlilik Teklifi & Yıldönümü", "Kurumsal Şirket Yemekleri"];

  /* ─── CTA Bölümü Metinleri ─── */
  const ctaTitle = cleanRawText(h.ctaTitle || "Petra'da kendi hikayenizi yazın.");
  const ctaLead = cleanRawText(
    h.ctaLead || "Sevdiklerinizle lezzet, konfor ve keyif dolu anlar için hemen yerinizi ayırtın."
  );
  const ctaBtn1 = cleanRawText(h.ctaBtn1 || "Masa Rezervasyonu Yap");
  const ctaBtn2 = cleanRawText(h.ctaBtn2 || "Menüyü İncele");

  /* ─── JSON-LD Structured Data (@graph: Restaurant + BreadcrumbList + FAQPage) ─── */
  const jsonLdGraph: any[] = [
    {
      "@type": "Restaurant",
      "@id": "https://petra-cafe-site.vercel.app/#restaurant",
      name: brandName,
      image: img,
      telephone: tel,
      url: "https://petra-cafe-site.vercel.app/hakkimizda",
      address: {
        "@type": "PostalAddress",
        streetAddress: adres,
        addressLocality: "Çekmeköy",
        addressRegion: "İstanbul",
        addressCountry: "TR",
      },
      servesCuisine: [
        "Dünya Mutfağı",
        "Serpme Kahvaltı",
        "Pizza",
        "Izgara",
        "Tatlı",
        "Kahve",
      ],
      priceRange: "₺₺",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "08:00",
          closes: "02:00",
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Ana Sayfa",
          item: "https://petra-cafe-site.vercel.app/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Hakkımızda",
          item: "https://petra-cafe-site.vercel.app/hakkimizda",
        },
      ],
    },
  ];

  if (faqs.length > 0) {
    jsonLdGraph.push({
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: cleanRawText(faq.q || faq.soru),
        acceptedAnswer: {
          "@type": "Answer",
          text: cleanRawText(faq.a || faq.cevap),
        },
      })),
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": jsonLdGraph,
  };

  /* ─── Koyu Bölüm için Ortak Stil Sabitleri ─── */
  const DARK_BG = "#16190F";
  const DARK_COLOR = "#F4EEE1";
  const WHITE = "#FFFFFF";
  const GOLD = "#D9A441";

  return (
    <article className="page-hakkimizda">
      {/* Schema.org JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══════════════════════════════════════════════════════
          1. EDİTORYAL BAŞLIK (Tek H1 — SEO Standartlarına Uygun)
          ═══════════════════════════════════════════════════════ */}
      <header className="about-head-sec" style={{ borderBottom: "none" }}>
        <div style={{ marginBottom: "14px" }}>
          <Breadcrumbs items={[{ label: "Hakkımızda" }]} />
        </div>

        <h1 className="about-head-sec__title">
          {cleanRawText(h.baslik) || "Petra Yaşam Merkezi'nde cafe & restaurant"}
        </h1>

        <p className="about-head-sec__lead">
          {formatInlineText(formattedLead)}
        </p>

        <div className="about-head-sec__actions">
          <Link href="/#rezervasyon" className="btn btn--light">
            <CalendarCheck size={16} />
            Masa Rezervasyonu
          </Link>
          <Link href="/menu" className="btn">
            Menüyü İncele
          </Link>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════
          2. HİKAYE & FOTOĞRAF KARTI (Semantic Article Blocks)
          ═══════════════════════════════════════════════════════ */}
      <section className="about-story-sec" aria-labelledby="about-story-heading">
        <div className="about-story-grid">
          {/* Sol: Makale İçeriği */}
          <div className="about-story-text">
            <p className="eyebrow">BİZİ TANIYIN</p>
            <h2 id="about-story-heading">
              {cleanRawText(
                h.answerBaslik && h.answerBaslik.trim().toLocaleLowerCase("tr-TR") !== "kısaca"
                  ? h.answerBaslik
                  : "Sadece bir restoran değil, özel bir yaşam alanı."
              )}
            </h2>

            {h.answerMetin && (
              <div className="answer" style={{ margin: "4px 0 10px" }}>
                <b>Kısaca</b>
                <p>{cleanRawText(h.answerMetin)}</p>
              </div>
            )}

            {/* Dinamik Semantik HTML Blokları — Makalenin Tamamı */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {renderSemanticBlocks(articleBlocks)}
            </div>

            {/* Hap Etiketler / Internal Links */}
            <div className="about-story-pills" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24 }}>
              <style>{`
                .about-story-pills a,
                .about-story-pills span,
                .about-story-pill-btn {
                  color: #000000 !important;
                  -webkit-text-fill-color: #000000 !important;
                  background-color: #FFFFFF !important;
                  border: 1.5px solid rgba(0, 0, 0, 0.18) !important;
                  font-weight: 700 !important;
                  font-size: 13.5px !important;
                  display: inline-flex !important;
                  align-items: center !important;
                  padding: 8px 18px !important;
                  border-radius: 999px !important;
                  text-decoration: none !important;
                  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
                }
                .about-story-pills a:hover,
                .about-story-pill-btn:hover {
                  background-color: #F4EEE1 !important;
                  color: #B8842C !important;
                  -webkit-text-fill-color: #B8842C !important;
                  border-color: #B8842C !important;
                }
              `}</style>
              {[
                { href: "/menu", label: "Dünya Mutfağı" },
                { href: "/menu#kat-kahvalti", label: "Serpme Kahvaltı" },
                { href: "/havuz-plaj", label: "Pool & Beach" },
                { href: "/#rezervasyon", label: "Özel Davetler" },
                { href: "/menu#kat-sicak-icecekler", label: "Artisan Kahve" },
              ].map((pill, pIdx) => (
                <Link
                  key={pIdx}
                  href={pill.href}
                  className="about-story-pill-btn"
                  style={{
                    color: "#000000",
                    WebkitTextFillColor: "#000000",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  {pill.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Sağ: Mekân Fotoğraf Kartı */}
          <div>
            <div className="about-photo-card" style={{ maxHeight: "380px", aspectRatio: "16 / 10", overflow: "hidden", position: "relative" }}>
              <SafeImg
                src={img}
                alt={`${brandName} Taşdelen İç Mekân ve Restoran Alanı`}
                fallback={SITE_PHOTOS.interior}
                width={1200}
                height={900}
                className="w-full h-full object-cover object-center block"
                loading="eager"
              />
              <div className="about-photo-card__badge">
                <b>{cleanRawText(h.badgeBaslik) || brandName}</b>
                <span>
                  <MapPin size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
                  {adres}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. RAKAMLARLA PETRA (İstatistikler)
          ═══════════════════════════════════════════════════════ */}
      <section
        className="about-stats-sec"
        aria-label="Rakamlarla Petra"
        style={{
          padding: "clamp(24px, 3.5vw, 36px)",
          background: "var(--cream-2, #F3EDE0)",
          borderRadius: "24px",
          border: "1px solid rgba(13, 15, 10, 0.08)",
        }}
      >
        <div
          className="about-stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          {statsList.map((st: any, i: number) => (
            <div
              className="about-stat-item"
              key={i}
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(13, 15, 10, 0.08)",
                borderRadius: "16px",
                padding: "24px 18px",
                textAlign: "center",
                boxShadow: "0 4px 14px -6px rgba(13, 15, 10, 0.06)",
              }}
            >
              <b
                style={{
                  display: "block",
                  fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
                  fontSize: "clamp(22px, 2.6vw, 32px)",
                  fontWeight: 700,
                  color: "var(--ink, #0D0F0A)",
                  letterSpacing: "-0.02em",
                  marginBottom: "4px",
                }}
              >
                {cleanRawText(st.b)}
              </b>
              <span
                style={{
                  fontSize: "13.5px",
                  fontWeight: 600,
                  color: "var(--muted, #6E6A5C)",
                  display: "block",
                  lineHeight: 1.4,
                }}
              >
                {cleanRawText(st.span)}
              </span>
              {st.sub ? (
                <small
                  style={{
                    display: "block",
                    fontSize: "11.5px",
                    color: "var(--brass-lo, #B8842C)",
                    marginTop: "6px",
                    fontWeight: 600,
                  }}
                >
                  {cleanRawText(st.sub)}
                </small>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. 4 ANA DENEYİM KARTI (Ayrıcalıklar)
          ═══════════════════════════════════════════════════════ */}
      <section className="about-exp-sec" aria-labelledby="about-exp-heading">
        <div className="section__head" style={{ marginBottom: 0 }}>
          <p className="eyebrow">AYRICALIKLAR</p>
          <h2 id="about-exp-heading" className="h2">Petra'da Sizi Neler Bekliyor?</h2>
          <p className="lead">
            Günün ilk ışıklarından gecenin keyifli anlarına kadar her anınıza eşlik eden lezzet ve konfor.
          </p>
        </div>

        <div
          className="about-exp-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginTop: "32px",
          }}
        >
          {experiences.map((item: any, i: number) => {
            const IconComp = expIcons[i % expIcons.length];
            return (
              <article
                className="about-exp-card"
                key={i}
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid rgba(13, 15, 10, 0.1)",
                  borderRadius: "22px",
                  padding: "26px 22px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 24px -12px rgba(13, 15, 10, 0.08)",
                }}
              >
                <div>
                  <div className="about-exp-card__top" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <span className="about-exp-card__n" style={{ fontFamily: "var(--f-head, serif)", fontSize: "20px", fontWeight: 700, color: "rgba(13, 15, 10, 0.25)" }}>
                      {item.n || `0${i + 1}`}
                    </span>
                    <div
                      className="about-exp-card__ico"
                      aria-hidden="true"
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
                  </div>
                  {item.tag && (
                    <span
                      className="about-exp-card__tag"
                      style={{
                        display: "inline-block",
                        background: "rgba(124, 139, 79, 0.12)",
                        color: "var(--olive-lo, #5A6838)",
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: "999px",
                        marginBottom: "10px",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {cleanRawText(item.tag)}
                    </span>
                  )}
                  <h3
                    style={{
                      fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
                      fontSize: "19px",
                      fontWeight: 600,
                      color: "var(--ink, #0D0F0A)",
                      margin: "0 0 8px",
                      lineHeight: 1.3,
                    }}
                  >
                    {cleanRawText(item.title)}
                  </h3>
                  {item.hours ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "var(--brass-lo, #B8842C)", fontWeight: 700, marginBottom: "10px" }}>
                      <Clock size={13} />
                      <span>{cleanRawText(item.hours)}</span>
                    </div>
                  ) : null}
                  <p style={{ fontSize: "14px", lineHeight: 1.65, color: "#555A4C", margin: "0 0 16px" }}>
                    {cleanRawText(item.desc)}
                  </p>
                </div>
                {Array.isArray(item.features) && item.features.length > 0 && (
                  <ul className="about-exp-card__feats" style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid rgba(13, 15, 10, 0.08)", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    {item.features.map((feat: string, fi: number) => (
                      <li key={fi} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12.5px", color: "var(--ink, #0D0F0A)", fontWeight: 500 }}>
                        <CheckCircle2 size={14} color="var(--olive-lo, #5A6838)" style={{ flexShrink: 0 }} />
                        <span>{cleanRawText(feat)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4.5. BİR GÜNÜN AKIŞI (24 Saat Zaman Çizelgesi - Timeline)
          ═══════════════════════════════════════════════════════ */}
      {timeline.length > 0 && (
        <section
          className="about-timeline-sec"
          aria-labelledby="about-timeline-heading"
          style={{
            padding: "clamp(28px, 4vw, 44px)",
            background: "var(--cream-2, #F3EDE0)",
            borderRadius: "24px",
            border: "1px solid rgba(13, 15, 10, 0.08)",
          }}
        >
          <div className="section__head" style={{ marginBottom: 0 }}>
            <p className="eyebrow">ZAMAN ÇİZELGESİ</p>
            <h2 id="about-timeline-heading" className="h2">Bir Günün Petra'daki Akışı</h2>
            <p className="lead">
              Sabahın ilk ışıklarından gece yarısına kadar Petra Yaşam Merkezi'nde gününüzü nasıl geçirebileceğinizi keşfedin.
            </p>
          </div>
          <div
            className="about-timeline-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "18px",
              marginTop: "28px",
            }}
          >
            {timeline.map((step: any, sIdx: number) => (
              <div
                className="about-timeline-card"
                key={sIdx}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "18px",
                  border: "1px solid rgba(13, 15, 10, 0.08)",
                  padding: "22px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  boxShadow: "0 4px 16px -6px rgba(13, 15, 10, 0.06)",
                }}
              >
                <div
                  className="about-timeline-card__time"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(217, 164, 65, 0.12)",
                    color: "var(--brass-lo, #B8842C)",
                    border: "1px solid rgba(217, 164, 65, 0.3)",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    fontSize: "11.5px",
                    fontWeight: 700,
                    width: "fit-content",
                  }}
                >
                  <Clock size={12} />
                  <span>{cleanRawText(step.time)}</span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
                    fontSize: "17px",
                    fontWeight: 600,
                    lineHeight: 1.3,
                    color: "var(--ink, #0D0F0A)",
                    margin: 0,
                  }}
                >
                  {cleanRawText(step.title)}
                </h3>
                <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "#555A4C", margin: 0 }}>
                  {cleanRawText(step.desc)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          4.6. TEMEL DEĞERLERİMİZ & STANDARTLARIMIZ (Values)
          ═══════════════════════════════════════════════════════ */}
      {values.length > 0 && (
        <section className="about-values-sec" aria-labelledby="about-values-heading">
          <div className="section__head" style={{ marginBottom: 0 }}>
            <p className="eyebrow">STANDARTLARIMIZ</p>
            <h2 id="about-values-heading" className="h2">Temel Değerlerimiz</h2>
            <p className="lead">
              Misafirlerimize her zaman en yüksek kalite, hijyen ve kusursuz misafirperverlik sunma taahhüdümüz.
            </p>
          </div>
          <div
            className="about-values-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
              marginTop: "28px",
            }}
          >
            {values.map((val: any, vIdx: number) => {
              const ValIcon = valIcons[vIdx % valIcons.length];
              return (
                <div
                  className="about-values-card"
                  key={vIdx}
                  style={{
                    background: "#FFFFFF",
                    border: "1.5px solid rgba(13, 15, 10, 0.08)",
                    borderRadius: "20px",
                    padding: "24px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    boxShadow: "0 4px 16px -6px rgba(13, 15, 10, 0.05)",
                  }}
                >
                  <div
                    className="about-values-card__icon"
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "12px",
                      background: "rgba(124, 139, 79, 0.12)",
                      color: "var(--olive-lo, #5A6838)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ValIcon size={20} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "var(--ink, #0D0F0A)",
                      margin: 0,
                    }}
                  >
                    {cleanRawText(val.title)}
                  </h3>
                  <p style={{ fontSize: "13.5px", lineHeight: 1.65, color: "#555A4C", margin: 0 }}>
                    {cleanRawText(val.desc)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          5. TESİS İMKÂNLARI & AYRICALIKLAR
          ═══════════════════════════════════════════════════════ */}
      {amenitiesList.length > 0 && (
        <section
          style={{
            padding: "24px 28px",
            background: "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid var(--line, rgba(13, 15, 10, 0.1))",
            boxShadow: "0 4px 16px -6px rgba(13, 15, 10, 0.05)",
          }}
          aria-label="Tesis İmkânları"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <ShieldCheck size={18} color="var(--brass-lo, #B8842C)" />
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink, #0D0F0A)" }}>
              Tesis Olanakları & Hizmet Standartları
            </h3>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {amenitiesList.map((amenity, idx) => (
              <span
                key={idx}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "7px 16px",
                  borderRadius: "999px",
                  background: "rgba(124, 139, 79, 0.1)",
                  border: "1px solid rgba(124, 139, 79, 0.25)",
                  color: "var(--ink, #0D0F0A)",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <CheckCircle2 size={13} color="var(--olive-lo, #5A6838)" />
                {cleanRawText(amenity)}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          6. ÖZEL GÜNLER & KUTLAMALAR — BEYAZ YAZI ZORUNLU
          ═══════════════════════════════════════════════════════ */}
      <section className="section--dark about-events-sec" aria-labelledby="about-events-heading">
        <div
          className="about-events-box"
          style={{
            backgroundColor: DARK_BG,
            color: DARK_COLOR,
          }}
        >
          {/* Sol: Metin */}
          <div>
            <p
              className="eyebrow"
              style={{
                color: GOLD,
                margin: "0 0 10px",
                fontWeight: 700,
                letterSpacing: "0.15em",
              }}
            >
              ÖZEL GÜNLER & ETKİNLİKLER
            </p>
            {/* H2 — beyaz zorunlu */}
            <h2
              id="about-events-heading"
              style={{
                color: WHITE,
                fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
                fontSize: "clamp(24px, 3.2vw, 36px)",
                fontWeight: 600,
                lineHeight: 1.18,
                margin: "0 0 14px",
                letterSpacing: "-0.01em",
              }}
            >
              {eventsTitle}
            </h2>
            <p
              style={{
                color: DARK_COLOR,
                fontSize: "15px",
                lineHeight: 1.7,
                margin: "0 0 20px",
                opacity: 0.95,
              }}
            >
              {eventsLead}
            </p>

            <div className="about-events-tags" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
              {eventsTags.map((tag: string, ti: number) => (
                <span
                  key={ti}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "8px 18px",
                    borderRadius: "999px",
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    color: "#FFFFFF",
                    border: "1.5px solid rgba(217, 164, 65, 0.5)",
                    fontSize: "13.5px",
                    fontWeight: 700,
                    textShadow: "0 1px 3px rgba(0, 0, 0, 0.6)",
                  }}
                >
                  {cleanRawText(tag)}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ background: "#25D366", color: "#0B140C", fontWeight: 700 }}
              >
                <MessageCircle size={16} />
                WhatsApp Rezervasyon
              </a>
              <a
                href={`tel:${telHref}`}
                className="btn btn--ghost"
                style={{
                  border: "1.5px solid rgba(244, 238, 225, 0.35)",
                  color: WHITE,
                  fontWeight: 600,
                  background: "transparent",
                }}
              >
                <Phone size={15} />
                {tel}
              </a>
            </div>
          </div>

          {/* Sağ: Fotoğraf */}
          <div>
            <div className="about-photo-card" style={{ aspectRatio: "4/3" }}>
              <SafeImg
                src={imgEvents}
                alt="Petra Özel Gün ve Organizasyon Masaları"
                fallback={SITE_PHOTOS.interior}
                width={900}
                height={675}
                loading="lazy"
              />
              <div className="about-photo-card__badge">
                <b>Özel Gün & Organizasyon Masaları</b>
                <span>Kutlama · Davet · Romantik Masalar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. SSS / SIKÇA SORULAN SORULAR (Ana Sayfayla Birebir Aynı Lüks Tasarım)
          ═══════════════════════════════════════════════════════ */}
      {faqs.length > 0 && (
        <section className="about-faq-sec" id="sss" style={{ padding: "0" }} aria-labelledby="about-faq-heading">
          <div className="section__head" style={{ marginBottom: 24 }}>
            <p className="eyebrow">MERAK EDİLENLER</p>
            <h2 id="about-faq-heading" className="h2" style={{ margin: 0 }}>Sıkça Sorulan Sorular</h2>
          </div>
          <div className="faq" id="sss-liste">
            {faqs.map((faq: any, i: number) => (
              <details className="faq__item" key={i} open={i === 0}>
                <summary>
                  <span>{cleanRawText(faq.q || faq.soru)}</span>
                  <svg className="faq__chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div className="faq__a">
                  <p>{cleanRawText(faq.a || faq.cevap)}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          8. SON CTA — BEYAZ YAZI ZORUNLU, DARK BG
          ═══════════════════════════════════════════════════════ */}
      <section className="section--dark about-cta-sec" aria-label="Rezervasyon & İletişim">
        <div
          className="about-cta-card"
          style={{
            backgroundColor: DARK_BG,
            color: DARK_COLOR,
          }}
        >
          <p
            className="eyebrow"
            style={{
              color: GOLD,
              margin: 0,
              fontWeight: 700,
              letterSpacing: "0.15em",
            }}
          >
            REZERVASYON & İLETİŞİM
          </p>
          {/* H2 — beyaz zorunlu */}
          <h2
            style={{
              color: WHITE,
              fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
              fontSize: "clamp(24px, 3.4vw, 38px)",
              fontWeight: 600,
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            {ctaTitle}
          </h2>
          <p
            style={{
              color: DARK_COLOR,
              fontSize: "15.5px",
              lineHeight: 1.6,
              maxWidth: "54ch",
              margin: 0,
              opacity: 0.95,
            }}
          >
            {ctaLead}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <Link href="/#rezervasyon" className="btn btn--light">
              <CalendarCheck size={16} />
              {ctaBtn1}
            </Link>
            <Link
              href="/menu"
              className="btn btn--ghost"
              style={{
                background: "rgba(244, 238, 225, 0.12)",
                color: WHITE,
                border: "1.5px solid rgba(244, 238, 225, 0.4)",
              }}
            >
              {ctaBtn2}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
