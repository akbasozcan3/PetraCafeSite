import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/db/content";
import { phoneToTelHref, buildWhatsappUrl } from "@/lib/content/contact-utils";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import SafeImg from "@/components/site/SafeImg";
import { cleanRawText, formatInlineText } from "@/lib/content/markdown-parser";
import { iconFromLabel } from "@/lib/content/site-icons";
import SiteIcon from "@/components/site/SiteIcon";
import { displayHours, looksLikeHours } from "@/lib/content/hours";

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
    openGraph: { title, description, type: "website" },
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
  const bannerImg = resolveMediaUrl(
    liveMedia(
      content.images?.havuzPlaj || content.images?.icMekan || content.images?.aboutInterior,
      SITE_PHOTOS.gallery
    )
  );
  const img2 = resolveMediaUrl(
    liveMedia(content.images?.galeri?.[0] || content.images?.icMekan, SITE_PHOTOS.interior)
  );

  /* ─── İletişim ─── */
  const tel = content.iletisim?.telefon || "0530 608 90 51";
  const telHref = phoneToTelHref(tel);
  const waHref = buildWhatsappUrl(
    content.iletisim?.whatsapp || tel,
    "Merhaba, Petra Cafe Restaurant hakkında bilgi almak istiyorum."
  );

  /* ─── Body paragrafları (HomeAbout ile aynı mantık) ─── */
  const rawParagraphs: string[] = Array.isArray(h.body)
    ? (h.body as string[]).map((p) => cleanRawText(p)).filter(Boolean)
    : [cleanRawText(String(h.body || ""))].filter(Boolean);

  const fallbackParagraphs = [
    "Petra Cafe Restaurant; İstanbul Çekmeköy Taşdelen'de lezzet, keyif ve konforu bir araya getiren özel bir yaşam alanıdır. Zengin menümüz, sıcak atmosferimiz ve ferah açık havuz alanımızla misafirlerimize sadece bir restoran değil, unutulmaz anlar sunan bir buluşma noktası vadediyoruz.",
    "Günün her saatine uygun lezzetlerimizle hizmetinizdeyiz. Sabahları zengin serpme kahvaltımızla güne enerjik bir başlangıç yapabilir, öğle ve akşam saatlerinde usta şeflerimizin hazırladığı dünya mutfağından seçkin lezzetlerin, ızgaraların ve çıtır taş fırın pizzaların tadını çıkarabilirsiniz.",
    "Yaz aylarında açık yüzme havuzumuz ve pool & beach alanımızla şehir hayatının stresinden uzaklaşıp serinliğin ve güneşin tadını çıkarabilirsiniz. Doğum günleri, evlilik teklifleri, özel kutlamalar ve kurumsal etkinlikler için sunduğumuz özel organizasyon masaları ve menü seçenekleriyle en değerli anlarınızı kusursuz kılıyoruz.",
  ];
  const bodyParagraphs = rawParagraphs.length > 0 ? rawParagraphs : fallbackParagraphs;

  /* ─── Özet (stats) ─── */
  const ozetList: any[] =
    (h.ozet as any[])?.length > 0
      ? (h.ozet as any[])
      : [
          { b: "08:00 – 02:00", span: "Günlük Hizmet" },
          { b: "240+", span: "Menü Çeşidi" },
          { b: "1000 m²", span: "Yaşam Alanı" },
          { b: "9 Yıl", span: "Mutfak Tecrübesi" },
        ];

  /* ─── Hizmetler ─── */
  const hizmetler = (content.hizmetler as any[])?.length
    ? (content.hizmetler as any[]).slice(0, 6)
    : [
        { label: "Restoran & Izgara" },
        { label: "Serpme Kahvaltı" },
        { label: "Pool & Beach" },
        { label: "Özel Organizasyon" },
        { label: "Nargile Lounge" },
        { label: "Artisan Kahve" },
      ];

  /* ─── Deneyimler (Steps — ana sayfadan steps sınıfı) ─── */
  const experiences: any[] =
    (h.experiences as any[])?.length > 0
      ? (h.experiences as any[])
      : [
          {
            n: "01",
            title: "Dünya Mutfağı",
            desc: "Marine etler, taş fırın pizzalar, el yapımı makarnalar ve taze Akdeniz salataları.",
          },
          {
            n: "02",
            title: "Serpme Kahvaltı",
            desc: "Taş fırından sıcak pişiler, köy peynirleri, sucuklu yumurta, bal-kaymak ve demlik çay.",
          },
          {
            n: "03",
            title: "Pool & Beach",
            desc: "Yetişkin & çocuk havuzu, VIP şezlonglar, cankurtaran ve yaz sezonunun keyfini çıkar.",
          },
          {
            n: "04",
            title: "Özel Günler",
            desc: "Doğum günü, evlilik teklifi, mezuniyet ve kurumsal davetler için özel masa ve menü.",
          },
        ];

  /* ─── Soru-Cevap (FAQ varsa göster) ─── */
  const faqList: any[] =
    (h.faqs as any[])?.length > 0
      ? (h.faqs as any[]).slice(0, 4)
      : [];

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          BREADCRUMB + SAYFA BAŞLIĞI  (style.css .crumbs + .page)
          ═══════════════════════════════════════════════════════ */}
      <div className="wrap" style={{ paddingTop: "clamp(28px, 4vw, 44px)" }}>
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Ana Sayfa</Link>
          <span>/</span>
          <span aria-current="page">Hakkımızda</span>
        </nav>
      </div>

      {/* ═══════════════════════════════════════════════════════
          1. HERO — About Hero (tam-genişlik banner)
          ═══════════════════════════════════════════════════════ */}
      <div className="about-hero">
        <img
          className="about-hero__bg"
          src={img}
          alt=""
          aria-hidden="true"
          loading="eager"
          fetchPriority="high"
          width={1800}
          height={900}
        />
        <div className="about-hero__overlay" aria-hidden="true" />
        <div className="wrap about-hero__inner">
          <p className="about-hero__eyebrow" data-fade="">
            <span>Petra Yaşam Merkezi</span>
          </p>
          <h1 className="about-hero__title" data-split="">
            {cleanRawText(h.baslik) || "Sadece bir restoran değil, bir yaşam alanı."}
          </h1>
          <p className="about-hero__lead" data-fade="">
            {cleanRawText(h.lead) ||
              "İstanbul Çekmeköy Taşdelen'de gastronomi, açık havuz ve sosyal yaşamı kusursuz buluşturan seçkin bir merkez."}
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          2. HAKKIMIZDA DETAY  (HomeAbout ile aynı layout: grid-2)
          ═══════════════════════════════════════════════════════ */}
      <section className="section" id="hakkimizda-detay">
        <div className="wrap grid-2">

          {/* Sol: Metin İçeriği */}
          <div>
            <p className="eyebrow" data-fade="">
              {cleanRawText(h.eyebrow) || "Hakkımızda"}
            </p>
            <h2 className="h2" data-split="">
              {cleanRawText(h.answerBaslik) || "Petra'yı farklı kılan ne?"}
            </h2>

            {h.answerMetin && (
              <div className="answer" data-fade="">
                <b>Kısaca</b>
                <p>{cleanRawText(h.answerMetin)}</p>
              </div>
            )}

            <div data-fade="" style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: "1.5rem" }}>
              {bodyParagraphs.map((paragraph, pIdx) => (
                <p
                  key={pIdx}
                  className="body"
                  style={{ margin: 0, lineHeight: 1.85, fontSize: "0.95rem", color: "#383C30" }}
                >
                  {formatInlineText(paragraph)}
                </p>
              ))}
            </div>

            {/* Özet Kartları (HomeAbout .ozet sınıfı) */}
            {ozetList.length > 0 && (
              <div className="ozet" data-stagger="">
                {ozetList.map((item: any, i: number) => (
                  <div className="ozet__i" key={i}>
                    <span className="ozet__ico" aria-hidden="true">
                      <SiteIcon name={iconFromLabel(`${item.b} ${item.span}`)} size={20} />
                    </span>
                    <b>
                      {looksLikeHours(item.b)
                        ? displayHours(content.iletisim)
                        : cleanRawText(item.b)}
                    </b>
                    <span>{cleanRawText(item.span)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sağ: Tilt Card Fotoğraf (HomeAbout ile birebir aynı) */}
          <div data-fade="">
            <div className="tilt-card">
              <div className="tilt-card__inner">
                <SafeImg
                  src={img}
                  alt={cleanRawText(h.badgeBaslik) ? `${cleanRawText(h.badgeBaslik)} — iç mekân` : "Petra Restaurant iç mekân"}
                  fallback={SITE_PHOTOS.interior}
                  loading="eager"
                  width={1800}
                  height={1350}
                />
                <div
                  className="tilt-card__badge"
                  style={{
                    background: "var(--card-bg, #ffffff)",
                    border: "1.5px solid var(--card-border, rgba(217, 164, 65, 0.4))",
                    backdropFilter: "blur(14px)",
                    borderRadius: 14,
                    padding: "12px 18px",
                    boxShadow: "0 14px 34px -12px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <b style={{ color: "var(--card-text, #0d0f0a)", display: "block", fontSize: "1.18rem", fontWeight: 800 }}>
                    {cleanRawText(h.badgeBaslik) || "Petra"}
                  </b>
                  <span style={{ color: "var(--brass-lo, #b8842c)", display: "block", fontSize: "0.85rem", fontWeight: 800, marginTop: 3, letterSpacing: "0.02em" }}>
                    {cleanRawText(h.badgeAlt) || "Cafe · Restaurant · Pool"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. HİZMET KARTLARİ — (.section--warm .hizmet__grid gibi)
             Ancak burada .cards (dark cards style) kullanalım
          ═══════════════════════════════════════════════════════ */}
      <section className="section section--dark" id="hizmetlerimiz">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow" data-fade="">Sunduklarımız</p>
            <h2 className="h2" data-split="">Petra'da Sizi Neler Bekliyor?</h2>
            <p className="lead" data-fade="">
              Sabah kahvaltısından gece lezzetlerine, havuz kenarından özel organizasyona kadar.
            </p>
          </div>
          <div className="cards" data-stagger="">
            {experiences.map((item: any, i: number) => (
              <div className="card" key={i}>
                <span className="card__n">{item.n || `0${i + 1}`}</span>
                <h3>{cleanRawText(item.title)}</h3>
                <p>{cleanRawText(item.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. GÖRSEL BANNER — (about-banner CSS zaten home-next.css'te var)
          ═══════════════════════════════════════════════════════ */}
      <div className="about-banner">
        <img
          className="about-banner__bg"
          src={bannerImg}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={1800}
          height={900}
        />
        <div className="about-banner__overlay" aria-hidden="true" />
        <div className="about-banner__inner">
          <p className="about-hero__eyebrow" data-fade="" style={{ justifyContent: "center" }}>
            Petra Yaşam Merkezi
          </p>
          <h2 className="about-banner__title" data-split="">
            Günün her anının tadını çıkar.
          </h2>
          <p className="about-banner__lead" data-fade="">
            Sevdiklerinizle kahvaltıdan geceye, havuz kenarında serinlikten özel kutlamalara.
          </p>
          <Link href="/#rezervasyon" className="btn btn--light" data-fade="">
            Rezervasyon Yap
          </Link>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          5. GRİD-2: İkinci Görsel + Metin (Özel Günler)
          ═══════════════════════════════════════════════════════ */}
      <section className="section section--warm">
        <div className="wrap grid-2">

          {/* Sol: Metin */}
          <div>
            <p className="eyebrow" data-fade="">Özel Anlar</p>
            <h2 className="h2" data-split="">
              Özel günleriniz Petra'da daha anlamlı.
            </h2>
            <p className="body" data-fade="">
              {cleanRawText(h.eventsLead || "Doğum günleri, evlilik teklifleri, mezuniyet kutlamaları ve kurumsal davetler için özel masa düzeni, kişiye özel menü ve pasta servisi sunuyoruz.")}
            </p>

            {/* Hap Etiketler */}
            <div className="pills" data-fade="">
              {(
                (h.eventsTags as string[])?.length > 0
                  ? (h.eventsTags as string[])
                  : [
                      "Doğum Günü",
                      "Evlilik Teklifi",
                      "Yıldönümü",
                      "Kurumsal Davet",
                      "Mezuniyet",
                    ]
              ).map((tag: string, i: number) => (
                <span key={i}>{cleanRawText(tag)}</span>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8 }} data-fade="">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ background: "#25D366", color: "#0B140C" }}
              >
                WhatsApp Rezervasyon
              </a>
              <a href={`tel:${telHref}`} className="btn btn--light">
                {tel}
              </a>
            </div>
          </div>

          {/* Sağ: İkinci Tilt-Card */}
          <div data-fade="">
            <div className="tilt-card">
              <div className="tilt-card__inner">
                <SafeImg
                  src={img2}
                  alt="Petra Özel Gün ve Organizasyon"
                  fallback={SITE_PHOTOS.interior}
                  loading="lazy"
                  width={1800}
                  height={1350}
                />
                <div
                  className="tilt-card__badge"
                  style={{
                    background: "rgba(13,15,10,0.84)",
                    border: "1.5px solid rgba(217,164,65,0.4)",
                    backdropFilter: "blur(12px)",
                    borderRadius: 14,
                    padding: "12px 18px",
                  }}
                >
                  <b style={{ color: "#FFFFFF", display: "block", fontSize: "1.05rem", fontWeight: 800 }}>
                    Özel Gün Masaları
                  </b>
                  <span style={{ color: "var(--brass, #D9A441)", display: "block", fontSize: "0.82rem", fontWeight: 700, marginTop: 3 }}>
                    Kutlama · Davet · Organizasyon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. STATS / İSTATİSTİK (style.css .stats .stat)
          ═══════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="wrap">
          <div className="section__head" style={{ maxWidth: 540 }}>
            <p className="eyebrow" data-fade="">Rakamlarla Petra</p>
            <h2 className="h2" data-split="">Güven ve Kalitenin Kanıtı</h2>
          </div>
          <div className="stats" data-stagger="">
            {ozetList.map((st: any, i: number) => (
              <div className="stat" key={i}>
                <b>
                  {looksLikeHours(st.b)
                    ? displayHours(content.iletisim)
                    : cleanRawText(st.b)}
                </b>
                <span>{cleanRawText(st.span)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. SSS / FAQ (style.css .faq — varsa göster)
          ═══════════════════════════════════════════════════════ */}
      {faqList.length > 0 && (
        <section className="section section--warm" id="sss">
          <div className="wrap">
            <div className="section__head">
              <p className="eyebrow" data-fade="">Sık Sorulan Sorular</p>
              <h2 className="h2" data-split="">Merak ettikleriniz</h2>
            </div>
            <div className="faq" data-fade="">
              {faqList.map((faq: any, i: number) => (
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
          8. CTA KUTUSU (style.css .cta-box)
          ═══════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="wrap">
          <div className="cta-box" data-fade="">
            <h2>Petra'da kendi hikayenizi yazın.</h2>
            <p>
              Sevdiklerinizle lezzet, konfor ve keyif dolu anlar için hemen yerinizi ayırtın.
              Her zaman özel, her zaman kusursuz.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link href="/#rezervasyon" className="btn btn--light">
                Rezervasyon Yap
              </Link>
              <Link href="/menu" className="btn">
                Menüyü İncele
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
