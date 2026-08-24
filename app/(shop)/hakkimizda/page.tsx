import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/db/content";
import { phoneToTelHref, buildWhatsappUrl } from "@/lib/content/contact-utils";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import { parseArticleContent, formatInlineText, cleanRawText } from "@/lib/content/markdown-parser";
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  UtensilsCrossed, 
  Waves, 
  Flame, 
  Coffee, 
  Clock, 
  ShieldCheck, 
  PartyPopper, 
  Car, 
  Wifi, 
  Sun, 
  CheckCircle2, 
  MessageCircle, 
  HelpCircle, 
  Cake, 
  Heart, 
  Briefcase,
  ChevronRight
} from "lucide-react";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent().catch(() => null);
  const h = content?.hakkimizda;
  const title = h?.baslik ? `${cleanRawText(h.baslik)} — Petra Cafe Restaurant` : "Hakkımızda & Yaşam Felsefemiz — Petra Cafe Restaurant";
  const description =
    h?.lead ||
    "Petra Cafe Restaurant & Petra Yaşam Merkezi — Çekmeköy Taşdelen'de serpme kahvaltı, dünya mutfağı, açık havuz & plaj ve organizasyon.";

  return {
    title,
    description,
    alternates: { canonical: "/hakkimizda" },
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: "/assets/cms/hero-ic.webp",
          width: 1200,
          height: 630,
          alt: "Petra Cafe Restaurant Hakkımızda",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function HakkimizdaPage() {
  const content = await getPublicContent();
  const h = content.hakkimizda || {
    eyebrow: "HAKKIMIZDA",
    baslik: "Petra Yaşam Merkezi'nde cafe & restaurant",
    answerBaslik: "Kısaca",
    answerMetin: "Petra Cafe Restaurant, Çekmeköy Taşdelen’de Petra Yaşam Merkezi içinde dünya mutfağı, serpme kahvaltı, İtalyan tatlı ve kokteyl, kahve, nargile ve havuz–plaj sunar.",
    lead: "Keyif, konfor ve kalite — kahvaltıdan akşam yemeğine, havuz kenarından organizasyona.",
    body: [
      "# Petra Cafe Restaurant",
      "## Gastronomi, Konfor ve Sosyal Yaşam",
      "Petra Cafe Restaurant; İstanbul Çekmeköy Taşdelen'de, Petra Yaşam Merkezi içerisinde lezzet, keyif ve konforu bir araya getiren özel bir yaşam alanıdır. Günün her saatine eşlik eden zengin menüsü, ferah atmosferi ve havuz başı deneyimiyle Petra; yalnızca yemek yemek için değil, sevdiklerinizle unutulmaz anlar biriktirmek için tasarlandı.",
      "Günün ilk ışıklarında zengin serpme kahvaltımız ve çıtır lezzetlerimizle güne harika bir başlangıç yapabilir; öğle ve akşam saatlerinde dünya mutfağının seçkin lezzetlerini, taş fırın pizzalarımızı ve ızgaralarımızı tadabilirsiniz.",
      "Yaz aylarında açık yüzme havuzumuz ve pool & beach alanımızla şehir hayatının stresinden uzaklaşıp serinliğin tadını çıkarabilirsiniz. Doğum günleri, evlilik teklifleri ve kurumsal davetleriniz için sunduğumuz özel organizasyon masalarıyla en değerli anlarınızı kusursuz kılıyoruz."
    ],
    badgeBaslik: "Petra Yaşam Merkezi",
    badgeAlt: "Cafe · Restaurant · Pool"
  };

  const img = resolveMediaUrl(
    liveMedia(
      content.images?.aboutInterior || content.images?.icMekan,
      SITE_PHOTOS.interior
    )
  );

  const telCafe = content.iletisim?.telefon || "0530 608 90 51";
  const telCafeHref = phoneToTelHref(telCafe);
  const waHref = buildWhatsappUrl(
    content.iletisim?.whatsapp || telCafe, 
    "Merhaba, Petra Cafe Restaurant & Yaşam Merkezi hakkında bilgi ve rezervasyon için yazıyorum."
  );

  // Hero Lead Yönetimi: Hero başlığı altında kısa, temiz 1-2 cümlelik özet
  const heroLead = h.lead && h.lead.trim().length <= 150 
    ? cleanRawText(h.lead) 
    : "Sade, temiz ve profesyonel hizmet anlayışımızla tanışın.";

  // Gövde Metni Hazırlığı: h.body veya uzun h.lead varsa paragraflara ayrıştır
  let bodySource: string | string[] = h.body;
  if (!bodySource || (Array.isArray(bodySource) && bodySource.length === 0)) {
    bodySource = h.lead || "";
  } else if (h.lead && h.lead.trim().length > 150 && Array.isArray(bodySource) && !bodySource.includes(h.lead)) {
    bodySource = [h.lead, ...bodySource];
  }

  const parsedBlocks = parseArticleContent(bodySource);

  // İstatistikler (The Barber 4'lü Stat Grid)
  const statsList = (h.stats && h.stats.length > 0) ? h.stats : (h.ozet && h.ozet.length > 0 ? h.ozet : [
    { b: "08:00 – 02:00", span: "Cafe & Restoran Açık", sub: "Haftanın 7 günü kesintisiz lezzet ve keyif" },
    { b: "240+ Çeşit", span: "Zengin Dünya Menüsü", sub: "Kahvaltı, ızgara, taş fırın pizza ve tatlılar" },
    { b: "09:00 – 18:00", span: "Açık Havuz & Beach Kulübü", sub: "Yetişkin & çocuk havuzu, şezlonglar ve VIP localar" },
    { b: "1000+ m²", span: "Sosyal Yaşam & Teras Alanı", sub: "Doğum günü, özel kutlama ve kurumsal davetler" }
  ]);
  const statIcons = [Clock, UtensilsCrossed, Waves, Sparkles];

  // 4 Temel Deneyim Alanı (The Barber 4'lü Kart Grid)
  const defaultExperiences = [
    {
      title: "Zengin Serpme Kahvaltı",
      desc: "Taş fırından yeni çıkmış sıcacık çıtır pişiler, seçkin köy peynirleri, sahanda sucuklu yumurta, bal-kaymak ve sınırsız demlik çay eşliğinde doyumsuz sabahlar.",
      hours: "08:00 – 14:00",
      tag: "Her Sabah Taze",
      features: ["Sınırsız Demlik Çay", "Taş Fırın Çıtır Pişi", "Yöresel Doğal Lezzetler"]
    },
    {
      title: "Dünya Mutfağı & Izgaralar",
      desc: "Marine edilmiş dana antrikot, odun ateşinde çıtır pizzalar, el yapımı gurme burgerler, taze İtalyan makarnaları ve taptaze Akdeniz salataları.",
      hours: "11:30 – 23:30",
      tag: "Usta Şeflerden",
      features: ["Taş Fırın Pizza", "Marine Izgara Etler", "El Yapımı Makarnalar"]
    },
    {
      title: "Pool & Beach Kulübü",
      desc: "09:00 – 18:00 saatleri arasında tertemiz yetişkin ve çocuk havuzu, konforlu şezlonglar, VIP localar, cankurtaran desteği ve serinletici kokteyller.",
      hours: "09:00 – 18:00",
      tag: "Yaz Sezonu Boyunca",
      features: ["Yetişkin & Çocuk Havuzu", "VIP Loca & Şezlong", "Sürekli Su Hijyen Analizi"]
    },
    {
      title: "İtalyan Tatlıları & Nargile",
      desc: "Hakiki İtalyan mascarpone ile hazırlanan tiramisu, cannoli, imza kahveler, ferahlatıcı kokteyller ve açık havada birinci sınıf nargile deneyimi.",
      hours: "08:00 – 02:00",
      tag: "Geceye Kadar Keyif",
      features: ["Orijinal Mascarpone Tiramisu", "3. Nesil Özel Kahveler", "Seçkin Premium Tütünler"]
    },
  ];
  const experiencesList = (h.experiences && h.experiences.length > 0) ? h.experiences : defaultExperiences;
  const expIcons = [Coffee, UtensilsCrossed, Waves, Flame];

  // Bir Günün Petra'daki Akışı (24 Saat Timeline)
  const defaultTimeline = [
    {
      time: "08:00 – 12:00",
      title: "Güne Enerjik ve Taze Başlangıç",
      desc: "Kuş sesleri ve temiz hava eşliğinde taş fırından yeni çıkan pişiler, köy peynirleri ve demlik çay ile zengin serpme kahvaltı."
    },
    {
      time: "12:00 – 17:00",
      title: "Güneş, Havuz ve Serinlik",
      desc: "Yaz günlerinde açık yüzme havuzunda yüzme, şezlongda güneşlenme ve buz gibi imza kokteyller eşliğinde serinletici anlar."
    },
    {
      time: "17:00 – 21:00",
      title: "Şefin İmzasıyla Dünya Mutfağı",
      desc: "Akşamın ilk ışıklarıyla marine ızgaralar, taş fırın pizzalar ve gurme makarna tabakları ile damak çatlatan lezzet şöleni."
    },
    {
      time: "21:00 – 02:00",
      title: "Tatlı Sohbetler & Nargile Keyfi",
      desc: "İtalyan tatlıları, artisan kahveler ve açık-kapalı ferah lounge alanlarında gecenin tadını çıkaran keyifli buluşmalar."
    },
  ];
  const timelineList = (h.timeline && h.timeline.length > 0) ? h.timeline : defaultTimeline;
  const timelineIcons = [Sun, Waves, UtensilsCrossed, Flame];

  // Tesis İmkânları (6'lı Kartlar)
  const defaultAmenities = [
    "Açık Yüzme & Çocuk Havuzu",
    "Açık Teras & Klimalı Salonlar",
    "Özel Gün & Organizasyon Masaları",
    "Geniş Otopark İmkânı",
    "Yüksek Hızlı Ücretsiz Wi-Fi",
    "Profesyonel Cankurtaran & Güvenlik"
  ];
  const amenitiesList = (h.amenities && h.amenities.length > 0) ? h.amenities : defaultAmenities;
  const amenityIcons = [Waves, UtensilsCrossed, PartyPopper, Car, Wifi, ShieldCheck];

  // Sıkça Sorulan Sorular
  const defaultFaqs = [
    {
      q: "Serpme kahvaltı ve restoran için rezervasyon gerekli mi?",
      a: "Hafta içi günlerde rezervasyonsuz katılım mümkündür. Ancak cuma, cumartesi ve pazar günleri yoğunluk yaşandığından, masa ve havuz başı yerinizi önceden ayırtmanızı tavsiye ederiz."
    },
    {
      q: "Açık yüzme havuzu kullanım saatleri ve şartları nelerdir?",
      a: "Havuzumuz yaz sezonu boyunca her gün 09:00 – 18:00 saatleri arasında açıktır. Yetişkin ve çocuk havuzlarımız cankurtaran gözetiminde olup şezlong ve şemsiye kullanımı fiyata dahildir."
    },
    {
      q: "Doğum günü, evlilik teklifi veya özel davet düzenleyebilir miyiz?",
      a: "Evet! Doğum günleri, evlilik teklifleri, mezuniyet ve kurumsal yemekler için özel masa süslemesi, pasta servisi ve kişiye özel menü seçenekleri sunuyoruz. 0530 608 90 51 veya WhatsApp hattımızdan rezervasyon oluşturabilirsiniz."
    },
    {
      q: "Petra Yaşam Merkezi'ne ulaşım ve otopark durumu nasıldır?",
      a: "Tesisimiz Çekmeköy Taşdelen Megakent Sitesi içerisinde yer almaktadır. Araçla gelen misafirlerimiz için geniş otopark alanı mevcuttur."
    }
  ];
  const faqsList = (h.faqs && h.faqs.length > 0) ? h.faqs : defaultFaqs;

  // Özel Günler / Organizasyonlar
  const eventsTitle = h.eventsTitle || "Unutulmaz Anlar İçin Özel Organizasyon Masaları";
  const eventsLead = h.eventsLead || "Doğum günleri, evlilik teklifleri, mezuniyet ve kurumsal davetlerinizde; havuz başı terasımız veya klimalı şık salonlarımızda profesyonel masa düzeni, özel menü planlaması ve pasta servisi sunuyoruz.";
  const eventsTags = (h.eventsTags && h.eventsTags.length > 0) ? h.eventsTags : [
    "Doğum Günü Kutlamaları",
    "Evlilik Teklifi & Yıldönümü",
    "Kurumsal Şirket Yemekleri"
  ];

  // Etkinlik rozetleri için SVG Lucide ikon seçimi
  const getEventTagIcon = (tag: string) => {
    const t = cleanRawText(tag).toLowerCase();
    if (t.includes("doğum") || t.includes("pasta") || t.includes("kutlama") || t.includes("birthday")) return Cake;
    if (t.includes("evlilik") || t.includes("teklif") || t.includes("yıldönüm") || t.includes("düğün") || t.includes("nişan") || t.includes("sevgi")) return Heart;
    if (t.includes("kurumsal") || t.includes("şirket") || t.includes("toplantı") || t.includes("iş") || t.includes("yemek")) return Briefcase;
    if (t.includes("özel") || t.includes("parti") || t.includes("davet")) return PartyPopper;
    return Sparkles;
  };

  return (
    <div id="hakkimizda-page" className="barber-about" style={{ backgroundColor: "#050505", color: "#FFFFFF" }}>
      
      {/* 1. HERO VİTRİN BÖLÜMÜ (THE BARBER YASIN STİLİ) */}
      <div className="barber-hero">
        <div 
          className="barber-hero__bg"
          style={{ backgroundImage: `url('${img || "/assets/cms/hero-ic.webp"}')` }}
        />
        <div className="barber-hero__overlay" />
        
        <div className="barber-container barber-hero__content">
          <nav className="barber-hero__nav">
            <Link href="/" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
              Ana Sayfa
            </Link>
            <ChevronRight size={10} style={{ opacity: 0.4 }} />
            <span style={{ color: "#FFFFFF" }}>Hakkımızda</span>
          </nav>

          <h1 className="barber-hero__title" style={{ color: "#FFFFFF" }}>
            {cleanRawText(h.baslik || "Hakkımızda")}
          </h1>

          <p className="barber-hero__lead" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
            {heroLead}
          </p>

          <div className="barber-hero__divider">
            <span />
            <span />
          </div>
        </div>

        <div className="barber-hero__line" />
      </div>

      {/* 2. ANA HİKAYE BÖLÜMÜ (2 SÜTUN: SOL STICKY KART, SAĞ EDİTORYAL METİN) */}
      <section className="barber-story-sec">
        <div className="barber-container">
          <div className="barber-story-grid">
            
            {/* Sol Sütun: Sticky Lüks Fotoğraf Kartı */}
            <div className="barber-sticky-card">
              <div 
                className="barber-sticky-card__bg"
                style={{ backgroundImage: `url('${img}')` }}
              />
              <div className="barber-sticky-card__gradient" />
              
              <div className="barber-sticky-card__info">
                <div className="barber-status-badge">
                  <span className="barber-status-dot" />
                  <span className="barber-status-text">
                    ŞU AN AÇIK · 08:00 – 02:00
                  </span>
                </div>
                <p className="barber-sticky-title" style={{ color: "#FFFFFF" }}>
                  {cleanRawText(h.badgeBaslik || "Petra Yaşam Merkezi")}
                </p>
                <p className="barber-sticky-loc" style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                  <MapPin size={12} color="#D4AF37" />
                  <span>Taşdelen, Çekmeköy / İstanbul</span>
                </p>

                <div className="barber-sticky-actions">
                  <a
                    href={`tel:${telCafeHref}`}
                    className="barber-action-btn barber-action-btn--phone"
                  >
                    <Phone size={13} color="#D4AF37" />
                    <span>{telCafe}</span>
                  </a>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="barber-action-btn barber-action-btn--wa"
                  >
                    <MessageCircle size={13} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Sağ Sütun: Başlık, Kısaca & Editoryal Metin (BEYAZ/ALTIN KONTRASTLI) */}
            <div>
              <div className="barber-eyebrow-box">
                <span className="barber-eyebrow-line" />
                <p className="barber-eyebrow-text" style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                  {cleanRawText(h.eyebrow || "HAKKIMIZDA & YAŞAM FELSEFEMİZ")}
                </p>
              </div>

              <h2 className="barber-story-title" style={{ color: "#FFFFFF" }}>
                {cleanRawText(h.baslik || "Petra Cafe Restaurant")}
              </h2>

              {/* Kısaca Kutusu */}
              {h.answerMetin && (
                <div className="barber-answer-box">
                  <div className="barber-answer-head">
                    <Sparkles size={14} color="#D4AF37" />
                    <span style={{ color: "#D4AF37" }}>
                      {cleanRawText(h.answerBaslik || "Kısaca")}
                    </span>
                  </div>
                  <p className="barber-answer-p" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                    {formatInlineText(h.answerMetin, "#FFFFFF")}
                  </p>
                </div>
              )}

              {/* Makale Paragrafları ve Dinamik Başlıklar (#, ##, ###, **, *) */}
              <div className="barber-prose">
                {parsedBlocks.map((block, idx) => {
                  if (block.type === "h1") {
                    return (
                      <h2 key={idx} className="barber-h2" style={{ color: "#FFFFFF" }}>
                        {cleanRawText(block.text || "")}
                      </h2>
                    );
                  }
                  if (block.type === "h2") {
                    return (
                      <h3 key={idx} className="barber-h3" style={{ color: "#D4AF37" }}>
                        {cleanRawText(block.text || "")}
                      </h3>
                    );
                  }
                  if (block.type === "h3") {
                    return (
                      <h4 key={idx} className="barber-h4" style={{ color: "#FFFFFF" }}>
                        {cleanRawText(block.text || "")}
                      </h4>
                    );
                  }
                  if (block.type === "quote") {
                    return (
                      <blockquote key={idx} style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                        {formatInlineText(block.text || "", "#FFFFFF")}
                      </blockquote>
                    );
                  }
                  if (block.type === "list" && block.items) {
                    return (
                      <ul key={idx} style={{ paddingLeft: "20px", margin: "10px 0", display: "flex", flexDirection: "column", gap: "6px" }}>
                        {block.items.map((item, lidx) => (
                          <li key={lidx} style={{ color: "rgba(255, 255, 255, 0.78)" }}>
                            {formatInlineText(item, "#FFFFFF")}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={idx} style={{ color: "rgba(255, 255, 255, 0.75)" }}>
                      {formatInlineText(block.text || "", "#FFFFFF")}
                    </p>
                  );
                })}
              </div>

              {/* 3 Ana Değer Sütunu (The Barber 3'lü Stat Grid Stili) */}
              <div className="barber-pillars-grid">
                <div className="barber-pillar-item">
                  <span className="barber-pillar-title" style={{ color: "#FFFFFF" }}>
                    Gastronomi
                  </span>
                  <span className="barber-pillar-sub">
                    Seçkin Dünya Mutfağı
                  </span>
                </div>
                <div className="barber-pillar-item">
                  <span className="barber-pillar-title" style={{ color: "#FFFFFF" }}>
                    Pool & Beach
                  </span>
                  <span className="barber-pillar-sub">
                    Açık Havuz & Teras
                  </span>
                </div>
                <div className="barber-pillar-item">
                  <span className="barber-pillar-title" style={{ color: "#FFFFFF" }}>
                    Konfor
                  </span>
                  <span className="barber-pillar-sub">
                    Seçkin Yaşam Alanı
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. RAKAMLARLA PETRA (4'LÜ ŞERİT) */}
      <section className="barber-stats-sec">
        <div className="barber-container">
          <div className="barber-stats-grid">
            {statsList.map((st: any, i: number) => {
              const StatIcon = statIcons[i % statIcons.length] || Sparkles;
              return (
                <div key={i} className="barber-stat-card">
                  <div className="barber-stat-card__top">
                    <span className="barber-stat-num" style={{ color: "#FFFFFF" }}>
                      {cleanRawText(st.b || "")}
                    </span>
                    <div className="barber-stat-icon">
                      <StatIcon size={16} />
                    </div>
                  </div>
                  <div>
                    <span className="barber-stat-label" style={{ color: "#FFFFFF" }}>
                      {cleanRawText(st.span || "")}
                    </span>
                    {st.sub && (
                      <span className="barber-stat-desc">
                        {cleanRawText(st.sub)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. 4 ANA YAŞAM DENEYİMİ */}
      <section className="barber-exp-sec">
        <div className="barber-container">
          <div className="barber-section-head">
            <div className="barber-eyebrow-box">
              <span className="barber-eyebrow-line" />
              <p className="barber-eyebrow-text" style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                AYRICALIKLI YAŞAM KONSEPTİ
              </p>
            </div>
            <h2 className="barber-section-title" style={{ color: "#FFFFFF" }}>
              Petra'da Sizi Neler Bekliyor?
            </h2>
          </div>

          <div className="barber-exp-grid">
            {experiencesList.map((item: any, i: number) => {
              const Icon = expIcons[i % expIcons.length] || UtensilsCrossed;
              const feats: string[] = Array.isArray(item.features) ? item.features : [];
              return (
                <div key={i} className="barber-exp-card">
                  <div>
                    <div className="barber-exp-card__top">
                      <div className="barber-exp-icon">
                        <Icon size={22} />
                      </div>
                      {item.hours && (
                        <span className="barber-exp-hours">
                          {item.hours}
                        </span>
                      )}
                    </div>

                    {item.tag && (
                      <span className="barber-exp-tag">
                        {item.tag}
                      </span>
                    )}

                    <h3 className="barber-exp-title" style={{ color: "#FFFFFF" }}>
                      {cleanRawText(item.title || "")}
                    </h3>

                    <p className="barber-exp-desc">
                      {cleanRawText(item.desc || "")}
                    </p>
                  </div>

                  {feats.length > 0 && (
                    <div className="barber-exp-feats">
                      {feats.map((feat, fidx) => (
                        <div key={fidx} className="barber-exp-feat">
                          <CheckCircle2 size={13} color="#D4AF37" style={{ flexShrink: 0 }} />
                          <span>{cleanRawText(feat)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. BİR GÜNÜN PETRA'DAKİ AKIŞI (TIMELINE) */}
      <section className="barber-time-sec">
        <div className="barber-container">
          <div className="barber-time-head">
            <span className="barber-time-eyebrow">
              24 SAAT YAŞAM DOLU
            </span>
            <h2 className="barber-time-title" style={{ color: "#FFFFFF" }}>
              Bir Günün Petra'daki Akışı
            </h2>
            <p className="barber-time-sub">
              Sabahın ilk ışıklarından gecenin keyifli sohbetlerine uzanan gün boyu lezzet ve dinlenme.
            </p>
          </div>

          <div className="barber-time-grid">
            {timelineList.map((step: any, idx: number) => {
              const StepIcon = timelineIcons[idx % timelineIcons.length] || Sun;
              return (
                <div key={idx} className="barber-time-card">
                  <div>
                    <div className="barber-time-card__top">
                      <span className="barber-time-badge">
                        {cleanRawText(step.time || "")}
                      </span>
                      <div className="barber-stat-icon" style={{ width: 32, height: 32 }}>
                        <StepIcon size={16} />
                      </div>
                    </div>

                    <h3 className="barber-time-card-title" style={{ color: "#FFFFFF" }}>
                      {cleanRawText(step.title || "")}
                    </h3>

                    <p className="barber-time-card-desc">
                      {cleanRawText(step.desc || "")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. ÖZEL GÜNLER & ORGANİZASYON KUTUSU */}
      <section className="barber-events-sec">
        <div className="barber-container">
          <div className="barber-events-box">
            
            {/* Sol Alan: Başlık, Açıklama ve SVG İkonlu Rozetler */}
            <div>
              <div className="barber-eyebrow-box" style={{ marginBottom: 16 }}>
                <PartyPopper size={16} color="#D4AF37" />
                <span className="barber-eyebrow-text" style={{ color: "#D4AF37" }}>
                  ÖZEL GÜNLER & KUTLAMALAR
                </span>
              </div>

              <h3 className="barber-events-title" style={{ color: "#FFFFFF" }}>
                {cleanRawText(eventsTitle)}
              </h3>

              <p className="barber-events-lead">
                {cleanRawText(eventsLead)}
              </p>

              <div className="barber-events-tags">
                {eventsTags.map((tag: string, tidx: number) => {
                  const TagIcon = getEventTagIcon(tag);
                  return (
                    <div key={tidx} className="barber-event-tag">
                      <TagIcon size={14} color="#D4AF37" />
                      <span>{cleanRawText(tag)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sağ Alan: Rezervasyon & Teklif Kartı */}
            <div className="barber-events-form-box">
              <div>
                <h4 className="barber-events-form-title" style={{ color: "#FFFFFF" }}>
                  Etkinlik Detayları & Rezervasyon
                </h4>
                <p className="barber-events-form-desc">
                  Kişi sayısı ve etkinlik tarihinizi ileterek organizasyon ekibimizden hızlıca özel menü ve süsleme teklifi alabilirsiniz.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 6 }}>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="barber-events-btn-wa"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp ile Teklif Alın</span>
                </a>

                <a
                  href={`tel:${telCafeHref}`}
                  className="barber-events-btn-phone"
                  style={{ color: "#FFFFFF" }}
                >
                  <Phone size={15} color="#D4AF37" />
                  <span>Telefon: {telCafe}</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. TESİS İMKÂNLARI */}
      <section className="barber-amenities-sec">
        <div className="barber-container">
          <div className="barber-time-head" style={{ marginBottom: 40 }}>
            <span className="barber-time-eyebrow">
              KONFOR VE OLANAKLAR
            </span>
            <h2 className="barber-time-title" style={{ fontSize: "clamp(24px, 3vw, 36px)", color: "#FFFFFF" }}>
              Tesis İmkânlarımız
            </h2>
          </div>

          <div className="barber-amenities-grid">
            {amenitiesList.map((label: string, idx: number) => {
              const AmenityIcon = amenityIcons[idx % amenityIcons.length] || ShieldCheck;
              return (
                <div key={idx} className="barber-amenity-card">
                  <div className="barber-amenity-icon">
                    <AmenityIcon size={18} />
                  </div>
                  <span className="barber-amenity-text" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                    {cleanRawText(label)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. SIKÇA SORULAN SORULAR */}
      <section className="barber-faq-sec">
        <div className="barber-container">
          <div className="barber-time-head" style={{ marginBottom: 48 }}>
            <span className="barber-time-eyebrow">
              MERAK EDİLENLER
            </span>
            <h2 className="barber-time-title" style={{ color: "#FFFFFF" }}>
              Sıkça Sorulan Sorular
            </h2>
            <p className="barber-time-sub">
              Rezervasyon, havuz ve çalışma saatleri hakkında en çok sorulanlar.
            </p>
          </div>

          <div className="barber-faq-grid">
            {faqsList.map((faq: any, idx: number) => (
              <div key={idx} className="barber-faq-card">
                <div className="barber-faq-q">
                  <HelpCircle size={18} color="#D4AF37" style={{ flexShrink: 0, marginTop: 2 }} />
                  <h3 style={{ color: "#FFFFFF" }}>
                    {cleanRawText(faq.q || "")}
                  </h3>
                </div>
                <p className="barber-faq-a">
                  {cleanRawText(faq.a || "")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. ALT ÇAĞRI & REZERVASYON (THE BARBER CTA) */}
      <section className="barber-cta-sec">
        <div className="barber-container">
          <div className="barber-cta-content">
            <span className="barber-time-eyebrow" style={{ color: "#D4AF37" }}>
              REZERVASYON & İLETİŞİM
            </span>

            <h2 className="barber-cta-title" style={{ color: "#FFFFFF" }}>
              Masanızı veya Locanızı Hemen Ayırtın
            </h2>

            <p className="barber-cta-desc">
              Hafta sonu zengin serpme kahvaltı, şefin spesiyalleriyle akşam yemeği veya açık havuzda VIP localarımız için yerinizi ayırtın.
            </p>

            <div className="barber-cta-btns">
              <Link
                href="/#rezervasyon"
                className="barber-cta-btn--primary"
                style={{ color: "#FFFFFF" }}
              >
                Online Masa Ayırtın
              </Link>
              <Link
                href="/menu"
                className="barber-cta-btn--secondary"
                style={{ color: "rgba(255, 255, 255, 0.75)" }}
              >
                Tüm Menüyü İncele
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
