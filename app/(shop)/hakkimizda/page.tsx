import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/db/content";
import { phoneToTelHref, buildWhatsappUrl } from "@/lib/content/contact-utils";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import SafeImg from "@/components/site/SafeImg";
import {
  cleanRawText,
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
} from "lucide-react";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent().catch(() => null);
  const h = content?.hakkimizda;
  const brand =
    content?.brand?.displayName ||
    content?.seo?.siteName ||
    "Petra Cafe Restaurant";
  const title = h?.baslik
    ? `${cleanRawText(h.baslik)} — ${brand}`
    : `Hakkımızda — ${brand}`;
  const description =
    cleanRawText(h?.lead || "") ||
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
      content.images?.galeri?.[0] || content.images?.icMekan || content.images?.aboutInterior,
      SITE_PHOTOS.interior
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
  const statsList: any[] =
    (h.stats as any[])?.length > 0
      ? (h.stats as any[])
      : (h.ozet as any[])?.length > 0
      ? (h.ozet as any[])
      : [
          { b: "08:00 – 02:00", span: "Hizmet Saatleri" },
          { b: "240+", span: "Menü Çeşidi" },
          { b: "1000+ m²", span: "Sosyal Yaşam Alanı" },
          { b: "09:00 – 18:00", span: "Pool & Beach" },
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
            features: ["Taş Fırın Pizza", "Marine Izgara Etler", "El Yapımı Makarnalar"],
          },
          {
            n: "02",
            title: "Zengin Serpme Kahvaltı",
            desc: "Taş fırından sıcak pişiler, köy peynirleri, sucuklu yumurta, bal-kaymak ve sınırsız demlik çay.",
            tag: "Her Sabah Taze",
            features: ["Sınırsız Demlik Çay", "Taş Fırın Pişi", "Doğal Köy Ürünleri"],
          },
          {
            n: "03",
            title: "Pool & Beach Kulübü",
            desc: "Tertemiz yetişkin ve çocuk havuzu, konforlu şezlonglar, VIP localar ve cankurtaran desteği.",
            tag: "Yaz Sezonu Boyunca",
            features: ["Yetişkin & Çocuk Havuzu", "VIP Loca & Şezlong", "Hijyenik Su Analizi"],
          },
          {
            n: "04",
            title: "Özel Gün & Organizasyon",
            desc: "Doğum günleri, evlilik teklifleri, mezuniyet ve kurumsal davetler için özel masa ve menü planlaması.",
            tag: "Unutulmaz Anlar",
            features: ["Özel Masa Süslemesi", "Kişiye Özel Menü", "Pasta Servisi"],
          },
        ];

  const expIcons = [UtensilsCrossed, Coffee, Waves, PartyPopper];

  /* ─── SSS / Sıkça Sorulan Sorular ─── */
  const faqs: any[] = (h.faqs as any[])?.length > 0 ? (h.faqs as any[]) : [];

  /* ─── JSON-LD Structured Data (Restaurant & LocalBusiness Schema) ─── */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
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
  };

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
      <header className="about-head-sec">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Ana Sayfa</Link>
          <span>/</span>
          <span aria-current="page">Hakkımızda</span>
        </nav>

        <div className="about-head-sec__badge">
          <Sparkles size={14} />
          <span>{cleanRawText(h.eyebrow) || "PETRA YAŞAM MERKEZİ"}</span>
        </div>

        <h1 className="about-head-sec__title">
          {cleanRawText(h.baslik) || "Petra Yaşam Merkezi'nde cafe & restaurant"}
        </h1>

        <p className="about-head-sec__lead">
          {cleanRawText(h.lead) ||
            "İstanbul Çekmeköy Taşdelen'de gastronomi, açık yüzme havuzu ve sosyal yaşamı kusursuz bir uyumla buluşturan seçkin bir merkez."}
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
          {/* Sol: Makale İçeriği (Admin Markdown'ı Semantic HTML olarak render edilir) */}
          <div className="about-story-text">
            <p className="eyebrow">BİZİ TANIYIN</p>
            <h2 id="about-story-heading">
              {cleanRawText(h.answerBaslik) || "Sadece bir restoran değil, bir yaşam alanı."}
            </h2>

            {h.answerMetin && (
              <div className="answer" style={{ margin: "4px 0" }}>
                <b>Kısaca</b>
                <p>{cleanRawText(h.answerMetin)}</p>
              </div>
            )}

            {/* Dinamik Semantik HTML Blokları (H2, H3, P, Blockquote, List) */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {renderSemanticBlocks(articleBlocks)}
            </div>

            {/* Hap Etiketler / Internal Links */}
            <div className="about-story-pills">
              <Link href="/menu">Dünya Mutfağı</Link>
              <Link href="/menu#kat-kahvalti">Serpme Kahvaltı</Link>
              <Link href="/havuz-plaj">Pool & Beach</Link>
              <Link href="/#rezervasyon">Özel Davetler</Link>
              <Link href="/menu#kat-sicak-icecekler">Artisan Kahve</Link>
            </div>
          </div>

          {/* Sağ: Mekân Fotoğraf Kartı */}
          <div>
            <div className="about-photo-card">
              <SafeImg
                src={img}
                alt={`${brandName} Taşdelen İç Mekân ve Restoran Alanı`}
                fallback={SITE_PHOTOS.interior}
                width={1200}
                height={900}
                loading="eager"
              />
              <div className="about-photo-card__status">
                <span className="about-photo-card__dot" />
                <span>08:00 – 02:00 AÇIK</span>
              </div>
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
      <section className="about-stats-sec" aria-label="Rakamlarla Petra">
        <div className="about-stats-grid">
          {statsList.map((st: any, i: number) => (
            <div className="about-stat-item" key={i}>
              <b>{cleanRawText(st.b)}</b>
              <span>{cleanRawText(st.span)}</span>
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

        <div className="about-exp-grid">
          {experiences.map((item: any, i: number) => {
            const IconComp = expIcons[i % expIcons.length];
            return (
              <article className="about-exp-card" key={i}>
                <div>
                  <div className="about-exp-card__top">
                    <span className="about-exp-card__n">{item.n || `0${i + 1}`}</span>
                    <div className="about-exp-card__ico" aria-hidden="true">
                      <IconComp size={22} />
                    </div>
                  </div>
                  {item.tag && (
                    <span className="about-exp-card__tag">{cleanRawText(item.tag)}</span>
                  )}
                  <h3>{cleanRawText(item.title)}</h3>
                  <p>{cleanRawText(item.desc)}</p>
                </div>
                {Array.isArray(item.features) && item.features.length > 0 && (
                  <ul className="about-exp-card__feats">
                    {item.features.map((feat: string, fi: number) => (
                      <li key={fi}>
                        <CheckCircle2 size={14} color="var(--olive-lo, #5A6838)" />
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
          5. ÖZEL GÜNLER & KUTLAMALAR (%100 Beyaz Yazı & Kontrast)
          ═══════════════════════════════════════════════════════ */}
      <section className="about-events-sec" aria-labelledby="about-events-heading">
        <div className="about-events-box" style={{ background: "#16190F", color: "#F4EEE1" }}>
          {/* Sol: Metin */}
          <div>
            <p className="eyebrow" style={{ color: "var(--brass, #D9A441)", margin: "0 0 10px" }}>
              ÖZEL GÜNLER & ETKİNLİKLER
            </p>
            <h2
              id="about-events-heading"
              style={{
                color: "#FFFFFF",
                fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
                fontSize: "clamp(24px, 3.2vw, 36px)",
                fontWeight: 600,
                lineHeight: 1.18,
                margin: "0 0 14px",
              }}
            >
              {cleanRawText(h.eventsTitle || "Unutulmaz Anlar İçin Özel Organizasyon Masaları")}
            </h2>
            <p
              style={{
                color: "rgba(244, 238, 225, 0.92)",
                fontSize: "15px",
                lineHeight: 1.7,
                margin: "0 0 20px",
              }}
            >
              {cleanRawText(
                h.eventsLead ||
                  "Doğum günleri, evlilik teklifleri, mezuniyet ve kurumsal davetlerinizde; havuz başı terasımız veya klimalı şık salonlarımızda profesyonel masa düzeni, özel menü planlaması ve pasta servisi sunuyoruz."
              )}
            </p>

            <div className="about-story-pills" style={{ marginBottom: 28 }}>
              {(
                ((h.eventsTags as string[])?.length > 0
                  ? (h.eventsTags as string[])
                  : ["Doğum Günü Kutlamaları", "Evlilik Teklifi & Yıldönümü", "Kurumsal Şirket Yemekleri"])
              ).map((tag: string, ti: number) => (
                <span
                  key={ti}
                  style={{
                    background: "rgba(244, 238, 225, 0.12)",
                    color: "#FFFFFF",
                    borderColor: "rgba(244, 238, 225, 0.25)",
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
                  color: "#FFFFFF",
                  fontWeight: 600,
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
          6. SSS / SIKÇA SORULAN SORULAR (Varsa)
          ═══════════════════════════════════════════════════════ */}
      {faqs.length > 0 && (
        <section className="section" id="sss" style={{ padding: 0 }} aria-labelledby="about-faq-heading">
          <div className="section__head">
            <p className="eyebrow">MERAK EDİLENLER</p>
            <h2 id="about-faq-heading" className="h2">Sıkça Sorulan Sorular</h2>
          </div>
          <div className="faq">
            {faqs.map((faq: any, i: number) => (
              <details className="faq__item" key={i}>
                <summary>{cleanRawText(faq.q || faq.soru)}</summary>
                <p>{cleanRawText(faq.a || faq.cevap)}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          7. SON CTA (%100 Beyaz Yazı & Yüksek Kontrast)
          ═══════════════════════════════════════════════════════ */}
      <section className="about-cta-sec" aria-label="Rezervasyon & İletişim">
        <div className="about-cta-card" style={{ background: "#16190F", color: "#F4EEE1" }}>
          <p className="eyebrow" style={{ color: "var(--brass, #D9A441)", margin: 0 }}>
            REZERVASYON & İLETİŞİM
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
            Petra'da kendi hikayenizi yazın.
          </h2>
          <p
            style={{
              color: "rgba(244, 238, 225, 0.9)",
              fontSize: "15.5px",
              lineHeight: 1.6,
              maxWidth: "54ch",
              margin: 0,
            }}
          >
            Sevdiklerinizle lezzet, konfor ve keyif dolu anlar için hemen yerinizi ayırtın.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <Link href="/#rezervasyon" className="btn btn--light">
              <CalendarCheck size={16} />
              Masa Rezervasyonu Yap
            </Link>
            <Link
              href="/menu"
              className="btn"
              style={{
                background: "rgba(244, 238, 225, 0.15)",
                color: "#FFFFFF",
                border: "1px solid rgba(244, 238, 225, 0.3)",
              }}
            >
              Menüyü İncele
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
