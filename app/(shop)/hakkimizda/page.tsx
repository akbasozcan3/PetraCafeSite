import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/db/content";
import { phoneToTelHref, buildWhatsappUrl } from "@/lib/content/contact-utils";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import SafeImg from "@/components/site/SafeImg";
import SiteIcon from "@/components/site/SiteIcon";
import { iconFromLabel } from "@/lib/content/site-icons";
import { cleanRawText } from "@/lib/content/markdown-parser";
import { 
  UtensilsCrossed, 
  Waves, 
  Flame, 
  Coffee, 
  CheckCircle2, 
  PartyPopper,
  Sparkles,
  CalendarCheck,
  Phone,
  MessageCircle
} from "lucide-react";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent().catch(() => null);
  const h = content?.hakkimizda;
  const title = h?.baslik ? `${cleanRawText(h.baslik)} — Petra Cafe Restaurant` : "Hakkımızda — Petra Cafe Restaurant";
  const description =
    h?.lead ||
    "Petra Cafe Restaurant & Petra Yaşam Merkezi — Çekmeköy Taşdelen'de dünya mutfağı, serpme kahvaltı, açık havuz & plaj ve organizasyon.";

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
    eyebrow: "Hakkımızda",
    baslik: "Petra Yaşam Merkezi'nde cafe & restaurant",
    answerBaslik: "Kısaca",
    answerMetin: "Petra Cafe Restaurant, Çekmeköy Taşdelen’de Petra Yaşam Merkezi içinde dünya mutfağı, serpme kahvaltı, İtalyan tatlı ve kokteyl, kahve, nargile ve havuz–plaj sunar.",
    lead: "Keyif, konfor ve kalite — kahvaltıdan akşam yemeğine, havuz kenarından organizasyona.",
    badgeBaslik: "Petra Yaşam Merkezi",
    badgeAlt: "Cafe · Restaurant · Pool & Beach"
  };

  const images = content.images || {};
  const heroImg = resolveMediaUrl(
    liveMedia(images.heroPoster || images.heroCephe, SITE_PHOTOS.interior)
  );
  const aboutImg = resolveMediaUrl(
    liveMedia(images.aboutInterior || images.icMekan, SITE_PHOTOS.interior)
  );
  const poolImg = resolveMediaUrl(
    liveMedia(images.havuzPlaj || images.heroCephe, SITE_PHOTOS.gallery)
  );

  const telCafe = content.iletisim?.telefon || "0530 608 90 51";
  const telCafeHref = phoneToTelHref(telCafe);
  const waHref = buildWhatsappUrl(
    content.iletisim?.whatsapp || telCafe, 
    "Merhaba, Petra Cafe Restaurant hakkında bilgi ve rezervasyon için yazıyorum."
  );

  // 1. Rakamlarla İstatistikler
  const statsList = (h.stats && h.stats.length > 0) ? h.stats : (h.ozet && h.ozet.length > 0 ? h.ozet : [
    { b: "08:00 – 02:00", span: "Hizmet Saatleri" },
    { b: "240+", span: "Zengin Menü Çeşidi" },
    { b: "1000+ m²", span: "Sosyal Yaşam Alanı" },
    { b: "09:00 – 18:00", span: "Pool & Beach Kulübü" }
  ]);

  // 2. Dört Ana Deneyim Alanı
  const defaultExperiences = [
    {
      n: "01",
      title: "Dünya Mutfağı & Izgaralar",
      desc: "Marine edilmiş dana antrikot, taş fırında pişen çıtır pizzalar, el yapımı gurme burgerler ve taze İtalyan makarnaları.",
      tag: "Usta Şeflerden",
      icon: UtensilsCrossed,
      features: ["Taş Fırın Pizza", "Marine Izgara Etler", "El Yapımı Makarnalar"]
    },
    {
      n: "02",
      title: "Zengin Serpme Kahvaltı",
      desc: "Taş fırından yeni çıkan sıcak pişiler, seçkin köy peynirleri, sahanda sucuklu yumurta ve sınırsız demlik çay eşliğinde doyumsuz sabahlar.",
      tag: "Her Sabah Taze",
      icon: Coffee,
      features: ["Sınırsız Demlik Çay", "Taş Fırın Çıtır Pişi", "Doğal Yöresel Ürünler"]
    },
    {
      n: "03",
      title: "Açık Havuz & Teras",
      desc: "09:00 – 18:00 saatleri arasında tertemiz yetişkin ve çocuk havuzu, konforlu şezlonglar, VIP localar ve serinletici kokteyller.",
      tag: "Yaz Sezonu Boyunca",
      icon: Waves,
      features: ["Yetişkin & Çocuk Havuzu", "VIP Loca & Şezlong", "Düzenli Su Hijyen Analizi"]
    },
    {
      n: "04",
      title: "Özel Davet & Kutlama Masaları",
      desc: "Doğum günleri, evlilik teklifleri, mezuniyet ve kurumsal yemekler için profesyonel masa süslemeleri ve kişiye özel menü planlaması.",
      tag: "Unutulmaz Anlar",
      icon: PartyPopper,
      features: ["Özel Masa Süslemesi", "Özel Menü & Pasta Servisi", "Fotoğraf & Etkinlik Alanı"]
    },
  ];
  const experiencesList = (h.experiences && h.experiences.length > 0) ? h.experiences : defaultExperiences;

  // 3. Bir Gün Petra'da (Timeline)
  const defaultTimeline = [
    {
      n: "01",
      time: "08:00",
      title: "Kahvaltı & Enerjik Başlangıç",
      desc: "Kuş sesleri ve temiz hava eşliğinde taş fırından yeni çıkan pişiler, köy peynirleri ve demlik çay ile zengin serpme kahvaltı."
    },
    {
      n: "02",
      time: "12:00",
      title: "Havuz & Beach Serinliği",
      desc: "Yaz günlerinde açık yüzme havuzunda serinleme, şezlongda güneşlenme ve buz gibi imza kokteyller eşliğinde keyifli anlar."
    },
    {
      n: "03",
      time: "17:00",
      title: "Akşam Lezzetleri & Dünya Mutfağı",
      desc: "Usta şeflerimizin hazırladığı marine ızgaralar, taş fırın çıtır pizzalar ve gurme makarna tabakları ile lezzet şöleni."
    },
    {
      n: "04",
      time: "21:00",
      title: "Keyif, Tatlı & Nargile Sohbetleri",
      desc: "Orijinal İtalyan tiramisu, 3. nesil demlenmiş kahveler ve açık-kapalı ferah lounge alanında geceye uzanan sohbetler."
    },
  ];
  const timelineList = (h.timeline && h.timeline.length > 0) ? h.timeline : defaultTimeline;

  return (
    <div className="page-hakkimizda site-home">
      
      {/* 1. PREMIUM HAKKIMIZDA HERO */}
      <section className="about-hero" id="top" aria-label="Hakkımızda Başlık">
        <picture>
          <img
            className="about-hero__bg"
            src={heroImg}
            alt="Petra Cafe Restaurant Mekan Görseli"
            fetchPriority="high"
            loading="eager"
            width={1800}
            height={1000}
          />
        </picture>
        <div className="about-hero__overlay" aria-hidden="true" />
        
        <div className="wrap about-hero__inner">
          <p className="about-hero__eyebrow" data-fade="">
            <Sparkles size={14} color="var(--brass)" />
            <span>{cleanRawText(h.eyebrow || "HAKKIMIZDA")}</span>
          </p>

          <h1 className="about-hero__title" data-split="">
            Petra'da her an, güzel bir anıya dönüşür.
          </h1>

          <p className="about-hero__lead" data-fade="">
            {cleanRawText(h.lead || "İstanbul Çekmeköy Taşdelen'de gastronomi, açık havuz ve sosyal yaşamı kusursuz bir uyumla buluşturan seçkin bir yaşam merkezi.")}
          </p>
        </div>

        <div className="gate__scroll" aria-hidden="true">
          <div className="gate__mouse" aria-hidden="true"><i /></div>
          <span className="gate__scroll-text">KEŞFET</span>
        </div>
      </section>

      {/* 2. PETRA'YI TANIMLAYAN SECTION (SOL BÜYÜK FOTOĞRAF, SAĞ EDİTORYAL METİN) */}
      <section className="section" id="hakkinda" aria-label="Petra Hakkında">
        <div className="wrap grid-2">
          
          {/* Sol Kolon: Kaliteli Mekân Fotoğrafı ve Tilt Rozet */}
          <div data-fade="">
            <div className="tilt-card">
              <div className="tilt-card__inner">
                <SafeImg
                  src={aboutImg}
                  alt={h.badgeBaslik ? `${h.badgeBaslik} — İç Mekân` : "Petra Cafe Restaurant İç Mekân"}
                  fallback={SITE_PHOTOS.interior}
                  width={1800}
                  height={1350}
                  loading="lazy"
                />
                <div className="tilt-card__badge">
                  <b>{cleanRawText(h.badgeBaslik || "Petra Yaşam Merkezi")}</b>
                  <span>{cleanRawText(h.badgeAlt || "Cafe · Restaurant · Pool & Beach")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Eyebrow, Başlık, 2 Kısa Paragraf ve Rozetler */}
          <div>
            <p className="eyebrow" data-fade="">
              PETRA HAKKINDA
            </p>
            <h2 className="h2" data-split="">
              Sadece bir restoran değil.
            </h2>
            
            <p className="lead" data-fade="">
              Petra Cafe Restaurant; İstanbul Çekmeköy Taşdelen'de, Petra Yaşam Merkezi içerisinde gastronomi, dinlenme ve sosyal yaşamı kusursuz bir uyumla buluşturan ayrıcalıklı bir yaşam alanıdır.
            </p>

            <p className="body" data-fade="">
              Günün ilk saatlerinde fırından yeni çıkmış sıcak pişilerle hazırlanan zengin serpme kahvaltımızdan usta şeflerimizin hazırladığı dünya mutfağı ve marine ızgara lezzetlerine; yaz aylarında açık yüzme havuzu serinliğinden doğum günü ve kurumsal davet masalarına kadar tüm deneyimleri tek bir çatı altında sunuyoruz.
            </p>

            <div className="pills" data-fade="">
              <span>Restoran</span>
              <span>Serpme Kahvaltı</span>
              <span>Havuz & Plaj</span>
              <span>Sosyal Alan</span>
              <span>Özel Organizasyon</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. PETRA'NIN DENEYİMİ (4 EDİTORYAL KART) */}
      <section className="section section--warm" id="deneyimler" aria-label="Petra'nın Yaşam Deneyimi">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow" data-fade="">
              AYRICALIKLI DENEYİMLER
            </p>
            <h2 className="h2" data-split="">
              Petra'nın Yaşam Deneyimi
            </h2>
            <p className="lead" data-fade="">
              Günün her anında lezzet, serinlik ve sosyal keyfi bir arada yaşayın.
            </p>
          </div>

          <div className="exp-cards" data-stagger="">
            {experiencesList.map((item: any, i: number) => {
              const IconComp = item.icon || (i === 0 ? UtensilsCrossed : i === 1 ? Coffee : i === 2 ? Waves : PartyPopper);
              const feats: string[] = Array.isArray(item.features) ? item.features : [];
              return (
                <div className="exp-card" key={i}>
                  <div>
                    <div className="exp-card__head">
                      <span className="exp-card__n">{item.n || `0${i + 1}`}</span>
                      <div className="exp-card__ico" aria-hidden="true">
                        <IconComp size={22} />
                      </div>
                    </div>

                    {item.tag && (
                      <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--brass-lo)", display: "block", marginBottom: "6px" }}>
                        {cleanRawText(item.tag)}
                      </span>
                    )}

                    <h3>{cleanRawText(item.title || "")}</h3>
                    <p>{cleanRawText(item.desc || "")}</p>
                  </div>

                  {feats.length > 0 && (
                    <ul>
                      {feats.map((feat, fidx) => (
                        <li key={fidx}>
                          <CheckCircle2 size={14} color="var(--olive-lo)" style={{ flexShrink: 0 }} />
                          <span>{cleanRawText(feat)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. BÜYÜK GÖRSEL SECTION (CİNEMATİC FULL-WIDTH SHOWCASE) */}
      <section className="about-banner" id="atmosfer" aria-label="Petra Görsel Vitrini">
        <picture>
          <img
            className="about-banner__bg"
            src={poolImg}
            alt="Petra Yaşam Merkezi Havuz & Teras"
            loading="lazy"
            width={1800}
            height={900}
          />
        </picture>
        <div className="about-banner__overlay" aria-hidden="true" />

        <div className="wrap about-banner__inner">
          <p className="eyebrow" data-fade="" style={{ color: "var(--brass)", marginBottom: 4 }}>
            PETRA YAŞAM MERKEZİ
          </p>

          <h2 className="about-banner__title" data-split="">
            Petra'da günün her anının tadını çıkar.
          </h2>

          <p className="about-banner__lead" data-fade="">
            Sabah kahvaltısından akşamın huzurlu saatlerine, havuz kenarında serinlikten yıldızların altında keyifli sohbetlere.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", marginTop: "12px" }} data-fade="">
            <Link href="/#rezervasyon" className="btn btn--light">
              Masa & Havuz Rezervasyonu
            </Link>
            <Link href="/menu" className="btn">
              Tüm Menüyü İncele
            </Link>
          </div>
        </div>
      </section>

      {/* 5. "BİR GÜN PETRA'DA" (TIMELINE SECTION) */}
      <section className="section" id="bir-gun" aria-label="Bir Gün Petra'da">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow" data-fade="">
              24 SAAT YAŞAM DOLU
            </p>
            <h2 className="h2" data-split="">
              Bir Gün Petra'da Nasıl Geçer?
            </h2>
            <p className="lead" data-fade="">
              Sabahın taze enerjisinden gecenin tatlı sohbetlerine uzanan gün boyu ritim.
            </p>
          </div>

          <ol className="steps" data-stagger="">
            {timelineList.map((step: any, idx: number) => (
              <li className="step" key={idx}>
                <span className="step__n">{step.time || `0${idx + 1}:00`}</span>
                <h3>{cleanRawText(step.title || "")}</h3>
                <p>{cleanRawText(step.desc || "")}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. RAKAMLARLA PETRA (MINIMALIST STATS BAR) */}
      <section className="section section--brass" id="rakamlar" aria-label="Rakamlarla Petra">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow" data-fade="">
              RAKAMLARLA PETRA
            </p>
            <h2 className="h2" data-split="">
              Güven ve Kalitenin Sayılarla Kanıtı
            </h2>
          </div>

          <div className="stats" data-stagger="">
            {statsList.map((st: any, i: number) => (
              <div className="stat" key={i}>
                <b>{cleanRawText(st.b || "")}</b>
                <span>{cleanRawText(st.span || "")}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ÖZEL ANLAR & KUTLAMALAR */}
      <section className="section section--dark" id="ozel-anlar" aria-label="Özel Günler ve Kutlamalar">
        <div className="wrap grid-2">
          
          {/* Sol Kolon: Metin ve Aksiyon */}
          <div>
            <p className="eyebrow" data-fade="" style={{ color: "var(--brass)" }}>
              ÖZEL GÜNLER & KUTLAMALAR
            </p>
            <h2 className="h2" data-split="" style={{ color: "var(--cream)" }}>
              Özel anlarınız için özel bir atmosfer.
            </h2>
            
            <p className="lead" data-fade="" style={{ color: "rgba(244, 238, 225, 0.88)" }}>
              Doğum günleri, evlilik teklifleri, mezuniyet ve kurumsal davetlerinizde; havuz başı terasımız veya klimalı şık salonlarımızda profesyonel masa düzeni, özel menü planlaması ve pasta servisi sunuyoruz.
            </p>

            <div className="pills" data-fade="" style={{ margin: "20px 0 28px" }}>
              <span>Doğum Günü Kutlamaları</span>
              <span>Evlilik Teklifi & Yıldönümü</span>
              <span>Kurumsal Davetler</span>
            </div>

            <div data-fade="" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--light"
              >
                Organizasyonu Keşfet →
              </a>
              <a
                href={`tel:${telCafeHref}`}
                className="btn"
                style={{ background: "transparent", border: "1px solid rgba(244, 238, 225, 0.3)" }}
              >
                Telefon: {telCafe}
              </a>
            </div>
          </div>

          {/* Sağ Kolon: Özel Gün Masası Fotoğrafı */}
          <div data-fade="">
            <div className="tilt-card">
              <div className="tilt-card__inner">
                <SafeImg
                  src={aboutImg}
                  alt="Petra Özel Gün ve Kutlama Masaları"
                  fallback={SITE_PHOTOS.interior}
                  width={1800}
                  height={1350}
                  loading="lazy"
                />
                <div 
                  className="tilt-card__badge"
                  style={{
                    background: "var(--char, #16190F)",
                    color: "var(--cream, #F4EEE1)",
                    border: "1px solid rgba(217, 164, 65, 0.4)"
                  }}
                >
                  <b style={{ color: "var(--cream, #F4EEE1)" }}>Özel Gün Masaları</b>
                  <span style={{ color: "var(--brass, #D9A441)" }}>Kutlama · Davet · Organizasyon</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. SON CTA (KENDİ HİKAYENİZİ YAZIN) */}
      <section className="section section--warm" id="cta" aria-label="Rezervasyon Çağrısı">
        <div className="wrap">
          <div className="cta-box" data-fade="">
            <h2 className="h2" style={{ color: "var(--cream)", marginBottom: 12 }}>
              Petra'da kendi hikayenizi yazın.
            </h2>
            <p style={{ color: "rgba(244, 238, 225, 0.85)", fontSize: 17, marginBottom: 28, maxWidth: "54ch" }}>
              Sevdiklerinizle birlikte lezzet, konfor ve keyif dolu anlar yaşamak için hemen yerinizi ayırtın.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
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

    </div>
  );
}
