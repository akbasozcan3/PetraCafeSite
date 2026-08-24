import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/db/content";
import { phoneToTelHref, buildWhatsappUrl } from "@/lib/content/contact-utils";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import SafeImg from "@/components/site/SafeImg";
import { cleanRawText, formatInlineText } from "@/lib/content/markdown-parser";
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
  const title = h?.baslik
    ? `${cleanRawText(h.baslik)} — Petra Cafe Restaurant`
    : "Hakkımızda — Petra Cafe Restaurant";
  const description =
    cleanRawText(h?.lead || "") ||
    "Petra Cafe Restaurant & Petra Yaşam Merkezi — Çekmeköy Taşdelen'de dünya mutfağı, serpme kahvaltı, açık havuz & plaj ve organizasyon.";
  return {
    title,
    description,
    alternates: { canonical: "/hakkimizda" },
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: "/assets/cms/hero-ic.webp", width: 1200, height: 630 }],
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

  /* ─── İletişim ─── */
  const tel = content.iletisim?.telefon || "0530 608 90 51";
  const telHref = phoneToTelHref(tel);
  const waHref = buildWhatsappUrl(
    content.iletisim?.whatsapp || tel,
    "Merhaba, Petra Cafe Restaurant hakkında bilgi ve rezervasyon için yazıyorum."
  );

  /* ─── Body Paragrafları ─── */
  const rawParagraphs: string[] = Array.isArray(h.body)
    ? (h.body as string[]).map((p) => cleanRawText(p)).filter(Boolean)
    : [cleanRawText(String(h.body || ""))].filter(Boolean);

  const fallbackParagraphs = [
    "Petra Cafe Restaurant; İstanbul Çekmeköy Taşdelen'de lezzet, keyif ve konforu bir araya getiren özel bir yaşam alanıdır. Zengin menümüz, sıcak atmosferimiz ve ferah açık havuz alanımızla misafirlerimize sadece bir restoran değil, unutulmaz anlar sunan bir buluşma noktası vadediyoruz.",
    "Günün her saatine uygun lezzetlerimizle hizmetinizdeyiz. Sabahları zengin serpme kahvaltımızla güne enerjik bir başlangıç yapabilir; öğle ve akşam saatlerinde usta şeflerimizin hazırladığı dünya mutfağından seçkin lezzetlerin, marine ızgaraların ve taş fırın çıtır pizzaların tadını çıkarabilirsiniz.",
    "Yaz aylarında açık yüzme havuzumuz ve pool & beach kulübümüzle serinliğin ve güneşin tadını çıkarabilirsiniz. Doğum günleri, evlilik teklifleri, özel kutlamalar ve kurumsal davetler için sunduğumuz özel organizasyon masaları ve menü seçenekleriyle en değerli anlarınızı kusursuz kılıyoruz.",
  ];
  const bodyParagraphs = rawParagraphs.length > 0 ? rawParagraphs : fallbackParagraphs;

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

  return (
    <div className="page-hakkimizda">
      {/* ═══════════════════════════════════════════════════════
          1. EDİTORYAL BAŞLIK (Temiz, Hero/Banner Olmayan Başlık)
          ═══════════════════════════════════════════════════════ */}
      <section className="about-head-sec">
        <div className="wrap">
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
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. HİKAYE & FOTOĞRAF KARTI (2 Kolon Editoryal Grid)
          ═══════════════════════════════════════════════════════ */}
      <section className="about-story-sec">
        <div className="wrap">
          <div className="about-story-grid">
            {/* Sol: Metinler */}
            <div className="about-story-text">
              <p className="eyebrow">BİZİ TANIYIN</p>
              <h2>
                {cleanRawText(h.answerBaslik) || "Sadece bir restoran değil, bir yaşam alanı."}
              </h2>

              {h.answerMetin && (
                <div className="answer" style={{ margin: "4px 0" }}>
                  <b>Kısaca</b>
                  <p>{cleanRawText(h.answerMetin)}</p>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {bodyParagraphs.map((paragraph, pIdx) => (
                  <p key={pIdx}>
                    {formatInlineText(paragraph)}
                  </p>
                ))}
              </div>

              {/* Hap Etiketler */}
              <div className="about-story-pills">
                {["Dünya Mutfağı", "Serpme Kahvaltı", "Pool & Beach", "Özel Davetler", "Nargile Lounge"].map(
                  (tag) => (
                    <span key={tag}>{tag}</span>
                  )
                )}
              </div>
            </div>

            {/* Sağ: Fotoğraf Kartı */}
            <div>
              <div className="about-photo-card">
                <SafeImg
                  src={img}
                  alt="Petra Cafe Restaurant İç Mekan"
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
                  <b>{cleanRawText(h.badgeBaslik) || "Petra Cafe & Restaurant"}</b>
                  <span>
                    <MapPin size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
                    Taşdelen, Çekmeköy · İstanbul
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. RAKAMLARLA PETRA (4'lü Sayaç / İstatistikler)
          ═══════════════════════════════════════════════════════ */}
      <section className="about-stats-sec">
        <div className="wrap">
          <div className="about-stats-grid">
            {statsList.map((st: any, i: number) => (
              <div className="about-stat-item" key={i}>
                <b>{cleanRawText(st.b)}</b>
                <span>{cleanRawText(st.span)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. 4 ANA DENEYİM KARTI (Ayrıcalıklı Deneyimler)
          ═══════════════════════════════════════════════════════ */}
      <section className="about-exp-sec">
        <div className="wrap">
          <div className="section__head" style={{ marginBottom: 0 }}>
            <p className="eyebrow">AYRICALIKLAR</p>
            <h2 className="h2">Petra'da Sizi Neler Bekliyor?</h2>
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
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. ÖZEL GÜNLER & KUTLAMALAR (Zarif Koyu Kutu)
          ═══════════════════════════════════════════════════════ */}
      <section className="about-events-sec">
        <div className="wrap">
          <div className="about-events-box">
            {/* Sol: Metin */}
            <div>
              <p className="eyebrow" style={{ color: "var(--brass, #D9A441)" }}>
                ÖZEL GÜNLER & ETKİNLİKLER
              </p>
              <h2>
                {cleanRawText(h.eventsTitle || "Özel anlarınız için özel bir atmosfer.")}
              </h2>
              <p>
                {cleanRawText(
                  h.eventsLead ||
                    "Doğum günleri, evlilik teklifleri, mezuniyet ve kurumsal davetlerinizde profesyonel masa düzeni, kişiye özel menü planlaması ve pasta servisi sunuyoruz."
                )}
              </p>

              <div className="about-story-pills" style={{ marginBottom: 28 }}>
                {(
                  ((h.eventsTags as string[])?.length > 0
                    ? (h.eventsTags as string[])
                    : ["Doğum Günü Kutlamaları", "Evlilik Teklifi & Yıldönümü", "Kurumsal Davetler"])
                ).map((tag: string, ti: number) => (
                  <span
                    key={ti}
                    style={{
                      background: "rgba(244, 238, 225, 0.1)",
                      color: "rgba(244, 238, 225, 0.9)",
                      borderColor: "rgba(244, 238, 225, 0.2)",
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
                  style={{ background: "#25D366", color: "#0B140C" }}
                >
                  <MessageCircle size={16} />
                  WhatsApp Rezervasyon
                </a>
                <a href={`tel:${telHref}`} className="btn btn--ghost" style={{ border: "1px solid rgba(244, 238, 225, 0.3)", color: "#FFFFFF" }}>
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
                  alt="Petra Özel Gün Masaları"
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
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. SSS / SIKÇA SORULAN SORULAR (Varsa)
          ═══════════════════════════════════════════════════════ */}
      {faqs.length > 0 && (
        <section className="section" id="sss">
          <div className="wrap">
            <div className="section__head">
              <p className="eyebrow">MERAK EDİLENLER</p>
              <h2 className="h2">Sıkça Sorulan Sorular</h2>
            </div>
            <div className="faq">
              {faqs.map((faq: any, i: number) => (
                <details className="faq__item" key={i}>
                  <summary>{cleanRawText(faq.q || faq.soru)}</summary>
                  <p>{cleanRawText(faq.a || faq.cevap)}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          7. SON CTA (Rezervasyon & Menü Çağrısı)
          ═══════════════════════════════════════════════════════ */}
      <section className="about-cta-sec">
        <div className="wrap">
          <div className="about-cta-card">
            <p className="eyebrow" style={{ color: "var(--brass, #D9A441)", margin: 0 }}>
              REZERVASYON & İLETİŞİM
            </p>
            <h2>Petra'da kendi hikayenizi yazın.</h2>
            <p>
              Sevdiklerinizle lezzet, konfor ve keyif dolu anlar için hemen yerinizi ayırtın.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              <Link href="/#rezervasyon" className="btn btn--light">
                <CalendarCheck size={16} />
                Masa Rezervasyonu Yap
              </Link>
              <Link href="/menu" className="btn" style={{ background: "rgba(244, 238, 225, 0.12)", color: "#FFFFFF" }}>
                Menüyü İncele
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
