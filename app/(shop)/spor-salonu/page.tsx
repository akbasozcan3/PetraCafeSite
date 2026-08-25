import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/db/content";
import { phoneToTelHref, buildWhatsappUrl } from "@/lib/content/contact-utils";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import { cleanRawText, formatInlineText } from "@/lib/content/markdown-parser";
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
} from "lucide-react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent().catch(() => null);
  const s = content?.sporSalonu;
  const brand = content?.brand?.displayName || "Petra Cafe Restaurant";
  const title = `Petra Spor Salonu | Fitness, Kardiyo & Sağlıklı Yaşam | ${brand}`;
  const description =
    cleanRawText(s?.lead || "") ||
    "Çekmeköy Taşdelen Megakent Sitesi içerisinde yer alan Petra Spor Salonu; modern fitness ve kardiyo ekipmanları, ferah egzersiz alanları ve sağlıklı yaşam kültürü sunar.";
  const canonicalUrl = "https://petra-cafe-site.vercel.app/spor-salonu";
  const ogImg = resolveMediaUrl(
    liveMedia(content?.images?.heroCephe, SITE_PHOTOS.facade)
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

export default async function SporSalonuPage() {
  const content = await getPublicContent();
  const s = content.sporSalonu || ({} as any);

  const tel = s.telefon || content.iletisim?.telefon || "0530 608 90 51";
  const tel2 = s.telefon2 || content.iletisim?.telefon2 || "+90 216 706 80 51";
  const telHref = phoneToTelHref(tel);
  const tel2Href = phoneToTelHref(tel2);
  const waHref = buildWhatsappUrl(
    content.iletisim?.whatsapp || tel,
    "Merhaba, Petra Spor Salonu üyelik ve antrenman imkanları hakkında bilgi almak istiyorum."
  );

  const instagramUrl = s.instagramUrl || "https://www.instagram.com/petrasporsalonu";
  const instagramTag = s.instagram || "@petrasporsalonu";
  const saatler = s.saatler || "Haftanın 7 Günü: 07:00 – 23:00";
  const adres = [content.iletisim?.adresSatir1, content.iletisim?.adresSatir2, content.iletisim?.adresSatir3]
    .filter(Boolean)
    .join(", ") || "Taşdelen, Çekmeköy / İstanbul";

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
    "Modern Kardiyo ve Fitness Ekipmanları",
    "Havalandırmalı & Ferah Antrenman Salonu",
    "Hijyenik Soyunma Odaları ve Duşlar",
    "Açık Havuz & Pool Kulübü Entegrasyonu",
    "Petra Cafe Sağlıklı İçecekler & Protein",
    "Geniş Ücretsiz Otopark Alanı",
  ];

  const bodyParagraphs = (s.body as string[]) || [
    "## Çekmeköy'ün Dinamik Spor ve Yaşam Alanı\nPetra Spor Salonu; Petra Yaşam Merkezi bünyesinde modern antrenman standartlarını, hijyenik ve havalandırmalı salon konseptiyle buluşturuyor. Günün her saati zinde kalmak, formunuzu korumak veya hedeflerinize ulaşmak için tasarlanan geniş egzersiz alanlarımızda sağlıklı bir spor deneyimi sunuyoruz.",
    "### Antrenman Alanlarımız\nKardiyo istasyonları, serbest ağırlık dambıl ve barbell alanları, çok fonksiyonlu istasyon makineleri ve esneme / mobilite bölümleriyle tüm vücut kas gruplarınızı dengeli ve güvenli şekilde çalıştırabilirsiniz.",
    "### Ekipman ve İmkanlar\nDüzenli bakımları yapılan profesyonel fitness makineleri, hijyenik soyunma odaları, duşlar, kilitli dolaplar ve Petra Cafe & Restaurant'ın sağlıklı içecek ve protein takviyesi seçenekleriyle spor keyfini eksiksiz yaşayın.",
    "### Petra'da Spor Deneyimi\nYalnızca bir spor salonu değil; antrenman sonrası açık yüzme havuzunda serinleyebileceğiniz veya havuz başı kafede dinlenebileceğiniz çok yönlü bir yaşam merkezi ayrıcalığı.",
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
    <article className="page-hakkimizda page-spor">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. EDİTORYAL BAŞLIK */}
      <header className="about-head-sec" style={{ borderBottom: "none" }}>
        <div style={{ marginBottom: "14px" }}>
          <Breadcrumbs items={[{ label: "Spor Salonu" }]} />
        </div>

        <div className="about-head-sec__badge" style={{ display: "inline-flex", width: "fit-content" }}>
          <Dumbbell size={14} />
          <span>{cleanRawText(s.eyebrow) || "PETRA YAŞAM MERKEZİ"}</span>
        </div>

        <h1 className="about-head-sec__title">
          {cleanRawText(s.baslik) || "Petra Spor Salonu"}
        </h1>

        <p className="about-head-sec__lead">
          {cleanRawText(s.lead) ||
            "Çekmeköy Taşdelen Megakent Sitesi içerisinde; modern kardiyo ve serbest ağırlık ekipmanları, ferah antrenman alanları ve sağlıklı yaşam kültürüyle formunuzu zirveye taşıyın."}
        </p>

        <div className="about-head-sec__actions">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--light"
          >
            <MessageCircle size={16} />
            Üyelik & Bilgi Al
          </a>
          <a href={`tel:${telHref}`} className="btn">
            <Phone size={15} />
            {tel}
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
            style={{ border: "1.5px solid rgba(13, 15, 10, 0.15)" }}
          >
            <SiteIcon name="instagram" size={15} />
            {instagramTag}
          </a>
        </div>
      </header>

      {/* 2. ÖNE ÇIKAN BİLGİ KARTLARI (Saatler, Ekipman, Hijyen, Yaşam Merkezi) */}
      <section
        style={{
          padding: "clamp(24px, 3.5vw, 36px)",
          background: "var(--cream-2, #F3EDE0)",
          borderRadius: "24px",
          border: "1px solid rgba(13, 15, 10, 0.08)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "22px 18px",
              textAlign: "center",
              border: "1px solid rgba(13, 15, 10, 0.08)",
              boxShadow: "0 4px 14px -6px rgba(13, 15, 10, 0.06)",
            }}
          >
            <div style={{ display: "inline-flex", padding: 8, borderRadius: 10, background: "rgba(217, 164, 65, 0.12)", color: "var(--brass-lo, #B8842C)", marginBottom: 8 }}>
              <Clock size={20} />
            </div>
            <b style={{ display: "block", fontSize: "16px", color: "var(--ink, #0D0F0A)", marginBottom: 4 }}>
              07:00 – 23:00
            </b>
            <span style={{ fontSize: "13px", color: "var(--muted, #6E6A5C)", fontWeight: 600 }}>
              Haftanın 7 Günü Açık
            </span>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "22px 18px",
              textAlign: "center",
              border: "1px solid rgba(13, 15, 10, 0.08)",
              boxShadow: "0 4px 14px -6px rgba(13, 15, 10, 0.06)",
            }}
          >
            <div style={{ display: "inline-flex", padding: 8, borderRadius: 10, background: "rgba(124, 139, 79, 0.12)", color: "var(--olive-lo, #5A6838)", marginBottom: 8 }}>
              <Dumbbell size={20} />
            </div>
            <b style={{ display: "block", fontSize: "16px", color: "var(--ink, #0D0F0A)", marginBottom: 4 }}>
              Kardiyo & Ağırlık
            </b>
            <span style={{ fontSize: "13px", color: "var(--muted, #6E6A5C)", fontWeight: 600 }}>
              Geniş Ekipman Parkuru
            </span>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "22px 18px",
              textAlign: "center",
              border: "1px solid rgba(13, 15, 10, 0.08)",
              boxShadow: "0 4px 14px -6px rgba(13, 15, 10, 0.06)",
            }}
          >
            <div style={{ display: "inline-flex", padding: 8, borderRadius: 10, background: "rgba(217, 164, 65, 0.12)", color: "var(--brass-lo, #B8842C)", marginBottom: 8 }}>
              <Waves size={20} />
            </div>
            <b style={{ display: "block", fontSize: "16px", color: "var(--ink, #0D0F0A)", marginBottom: 4 }}>
              Havuz & Yaşam
            </b>
            <span style={{ fontSize: "13px", color: "var(--muted, #6E6A5C)", fontWeight: 600 }}>
              Tüm Tesis İmkanları
            </span>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "22px 18px",
              textAlign: "center",
              border: "1px solid rgba(13, 15, 10, 0.08)",
              boxShadow: "0 4px 14px -6px rgba(13, 15, 10, 0.06)",
            }}
          >
            <div style={{ display: "inline-flex", padding: 8, borderRadius: 10, background: "rgba(124, 139, 79, 0.12)", color: "var(--olive-lo, #5A6838)", marginBottom: 8 }}>
              <ShieldCheck size={20} />
            </div>
            <b style={{ display: "block", fontSize: "16px", color: "var(--ink, #0D0F0A)", marginBottom: 4 }}>
              Temiz & Havalandırmalı
            </b>
            <span style={{ fontSize: "13px", color: "var(--muted, #6E6A5C)", fontWeight: 600 }}>
              Hijyenik Spor Ortamı
            </span>
          </div>
        </div>
      </section>

      {/* 3. ANTRENMAN ALANLARIMIZ */}
      <section className="about-exp-sec" aria-labelledby="spor-alanlar-heading">
        <div className="section__head" style={{ marginBottom: 0 }}>
          <p className="eyebrow">EGZERSİZ ALANLARI</p>
          <h2 id="spor-alanlar-heading" className="h2">Antrenman Alanlarımız</h2>
          <p className="lead">
            Hedeflerinize yönelik tasarlanmış kardiyo, serbest ağırlık ve fonksiyonel fitness istasyonları.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginTop: "28px",
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
                  padding: "24px 22px",
                  boxShadow: "0 6px 20px -8px rgba(13, 15, 10, 0.06)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
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
                <h3 style={{ fontFamily: "var(--f-head, serif)", fontSize: "19px", fontWeight: 600, color: "var(--ink, #0D0F0A)", margin: 0 }}>
                  {cleanRawText(a.baslik)}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#555A4C", margin: 0 }}>
                  {cleanRawText(a.metin)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. EKİPMAN VE İMKANLAR (Checklist) */}
      <section
        style={{
          background: "#FFFFFF",
          borderRadius: "24px",
          border: "1.5px solid rgba(13, 15, 10, 0.08)",
          padding: "clamp(28px, 4vw, 44px)",
          boxShadow: "0 10px 30px -10px rgba(13, 15, 10, 0.06)",
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
                padding: "12px 18px",
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

      {/* 5. PETRA'DA SPOR DENEYİMİ & SOSYAL MEDYA VİTRİNİ */}
      <section
        style={{
          background: "#16190F",
          color: "#F4EEE1",
          borderRadius: "24px",
          padding: "clamp(32px, 5vw, 56px)",
          border: "1.5px solid rgba(217, 164, 65, 0.3)",
          boxShadow: "0 16px 40px -12px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "36px", alignItems: "center" }}>
          <div>
            <p className="eyebrow" style={{ color: "#D9A441", margin: "0 0 10px", fontWeight: 700, letterSpacing: "0.15em" }}>
              PETRA YAŞAM KÜLTÜRÜ
            </p>
            <h2 style={{ color: "#FFFFFF", fontFamily: "var(--f-head, serif)", fontSize: "clamp(24px, 3.2vw, 36px)", fontWeight: 600, margin: "0 0 16px", lineHeight: 1.2 }}>
              {cleanRawText(s.ctaTitle) || "Hedeflerinize Petra ile Ulaşın"}
            </h2>
            <p style={{ color: "#F4EEE1", fontSize: "15px", lineHeight: 1.75, opacity: 0.9, margin: "0 0 24px" }}>
              {cleanRawText(s.ctaLead) ||
                "Petra Spor Salonu; antrenmanlarınızı açık yüzme havuzu ve Petra Cafe'nin leziz kahve & sağlıklı menü seçenekleriyle birleştiren benzersiz bir yaşam alanı sunar."}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ background: "#25D366", color: "#0B140C", fontWeight: 700 }}
              >
                <MessageCircle size={16} />
                WhatsApp'tan Yazın
              </a>
              <a
                href={`tel:${telHref}`}
                className="btn btn--ghost"
                style={{ border: "1.5px solid rgba(244, 238, 225, 0.35)", color: "#FFFFFF", background: "transparent" }}
              >
                <Phone size={15} />
                {tel}
              </a>
            </div>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "20px",
              padding: "24px 20px",
              textAlign: "center",
            }}
          >
            <div style={{ display: "inline-flex", padding: 12, borderRadius: "50%", background: "rgba(217, 164, 65, 0.2)", color: "#E8B84B", marginBottom: 12 }}>
              <SiteIcon name="instagram" size={28} />
            </div>
            <h3 style={{ color: "#FFFFFF", fontSize: "18px", fontWeight: 700, margin: "0 0 8px" }}>
              Instagram'da Takip Edin
            </h3>
            <p style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: "13.5px", margin: "0 0 16px" }}>
              Güncel antrenman anları, duyurular ve özel içerikler için resmi hesabımızı ziyaret edin.
            </p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--light"
              style={{ width: "100%", justifyContent: "center" }}
            >
              {instagramTag} →
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
