import type { Metadata } from "next";
import Link from "next/link";
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

export default async function SporSalonuPage() {
  const content = await getPublicContent();
  const s = content.sporSalonu || ({} as any);

  const tel = s.telefon || content.iletisim?.telefon || "0530 608 90 51";
  const tel2 = s.telefon2 || content.iletisim?.telefon2 || "+90 216 706 80 51";
  const telHref = phoneToTelHref(tel);
  const waHref = buildWhatsappUrl(
    content.iletisim?.whatsapp || tel,
    "Merhaba, Petra Yaşam Merkezi web siteniz üzerinden iletişime geçiyorum. Bilgi almak istiyorum."
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
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 4vw, 48px);
          align-items: center;
          margin-bottom: clamp(32px, 4vw, 48px);
        }
        @media (max-width: 960px) {
          .spor-hero-grid {
            grid-template-columns: 1fr;
          }
        }
        .spor-poster-clean {
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(13, 15, 10, 0.12);
          background: #000;
          width: 100%;
          max-width: 100%;
        }
        .spor-poster-clean img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }
      `}</style>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. EDİTORYAL HERO & SAF AFİŞ GÖRSELİ */}
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
              padding: "5px 14px",
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
              fontSize: "clamp(30px, 4vw, 46px)",
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
              fontSize: "clamp(15px, 1.6vw, 16.5px)",
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
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "26px" }}>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--light"
              style={{
                background: "#D9A441",
                color: "#0D0F0A",
                fontWeight: 700,
                padding: "12px 22px",
                borderRadius: "12px",
                boxShadow: "none",
              }}
            >
              <WhatsAppIcon size={17} />
              Ön Kayıt & Bilgi Al
            </a>

            <a
              href={`tel:${telHref}`}
              className="btn"
              style={{
                background: "#0D0F0A",
                color: "#FFFFFF",
                fontWeight: 600,
                padding: "12px 20px",
                borderRadius: "12px",
                boxShadow: "none",
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
                borderRadius: "12px",
                boxShadow: "none",
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

        {/* Sağ Kolon: SAF RESMİ AFİŞ (ÜZERİNDE HİÇBİR YAZI / ROZET YOK) */}
        <div>
          <div className="spor-poster-clean">
            <SafeImg
              src={posterImg}
              alt="Petra Spor Salonu"
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
      <section style={{ marginBottom: "44px" }}>
        <div className="section__head" style={{ marginBottom: "26px" }}>
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
            gap: "18px",
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
        borderRadius: "18px",
        border: "1px solid rgba(13, 15, 10, 0.08)",
        padding: "24px 20px",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {a.gorsel && (
        <img
          src={resolveMediaUrl(a.gorsel) || a.gorsel}
          alt={a.baslik || "Antrenman alanı"}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "14px",
            display: "block",
          }}
        />
      )}
      <span
        style={{
          fontSize: "12px",
          fontWeight: 700,
          color: "var(--brass-lo, #B8842C)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {cleanRawText(a.kicker)}
      </span>

      <h3
        style={{
          fontFamily: "var(--f-head, serif)",
          fontSize: "19px",
          fontWeight: 600,
          color: "var(--ink, #0D0F0A)",
          margin: 0,
        }}
      >
        {cleanRawText(a.baslik)}
      </h3>

      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.65,
          color: "#555A4C",
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

      {/* 3. EKİPMAN VE İMKANLAR (Checklist) */}
      <section
        style={{
          background: "#FFFFFF",
          borderRadius: "22px",
          border: "1px solid rgba(13, 15, 10, 0.08)",
          padding: "clamp(26px, 3.5vw, 40px)",
          boxShadow: "none",
          marginBottom: "44px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <Sparkles size={22} color="var(--brass-lo, #B8842C)" />
          <h2 style={{ fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)", fontSize: "clamp(22px, 2.8vw, 28px)", fontWeight: 600, color: "var(--ink, #0D0F0A)", margin: 0 }}>
            Ekipman ve Tesis İmkanları
          </h2>
        </div>
        <p style={{ fontSize: "14.5px", lineHeight: 1.7, color: "#555A4C", maxWidth: "68ch", margin: "0 0 22px" }}>
          Petra Spor Salonu, antrenman konforunuz ve güvenliğiniz için eksiksiz donatılmıştır.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "12px" }}>
          {imkanlar.map((imkan, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "13px 16px",
                borderRadius: "12px",
                background: "var(--cream-2, #F3EDE0)",
                border: "1px solid rgba(13, 15, 10, 0.06)",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--ink, #0D0F0A)",
              }}
            >
              <CheckCircle2 size={17} color="var(--olive-lo, #5A6838)" style={{ flexShrink: 0 }} />
              <span>{cleanRawText(imkan)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SOSYAL MEDYA & CTA */}
      <section
        className="section--dark spor-dark-cta"
        style={{
          background: "#111610",
          color: "#F4EEE1",
          borderRadius: "24px",
          padding: "clamp(30px, 4.5vw, 50px)",
          border: "1px solid rgba(217, 164, 65, 0.3)",
          boxShadow: "none",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px", alignItems: "center" }}>
          <div>
            <p className="eyebrow" style={{ color: "#D9A441", margin: "0 0 10px", fontWeight: 700, letterSpacing: "0.15em" }}>
              PETRA YAŞAM KÜLTÜRÜ
            </p>
            <h2
              className="spor-cta-title"
              style={{
                color: "#FFFFFF !important" as any,
                WebkitTextFillColor: "#FFFFFF !important" as any,
                fontFamily: "var(--f-head, serif)",
                fontSize: "clamp(24px, 3vw, 34px)",
                fontWeight: 700,
                margin: "0 0 14px",
                lineHeight: 1.2,
              }}
            >
              {cleanRawText(s.ctaTitle) || "Hedeflerinize Petra ile Ulaşın"}
            </h2>
            <p style={{ color: "#DDD6C8", fontSize: "14.5px", lineHeight: 1.7, opacity: 0.9, margin: "0 0 22px" }}>
              {cleanRawText(s.ctaLead) ||
                "Petra Spor Salonu; antrenmanlarınızı açık yüzme havuzu ve Petra Cafe'nin leziz kahve & sağlıklı menü seçenekleriyle birleştiren benzersiz bir yaşam alanı sunar."}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ background: "#25D366", color: "#0B140C", fontWeight: 700, padding: "11px 20px", borderRadius: "12px", boxShadow: "none" }}
              >
                <WhatsAppIcon size={16} />
                WhatsApp'tan Yazın
              </a>
              <a
                href={`tel:${telHref}`}
                className="btn btn--ghost"
                style={{ border: "1px solid rgba(244, 238, 225, 0.35)", color: "#FFFFFF", background: "transparent", padding: "11px 18px", borderRadius: "12px", boxShadow: "none" }}
              >
                <Phone size={15} />
                {tel}
              </a>
            </div>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
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
            <p style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: "13.5px", margin: "0 0 16px", lineHeight: 1.6 }}>
              Güncel antrenman anları, duyurular ve açılış içerikleri için resmi hesabımızı ziyaret edin.
            </p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--light"
              style={{ width: "100%", justifyContent: "center", padding: "11px", borderRadius: "10px", fontWeight: 700, boxShadow: "none" }}
            >
              {instagramTag} →
            </a>
          </div>
        </div>
      </section>

      {/* 5. ÜYELİK PAKETLERİ */}
      <section style={{ marginBottom: "44px", marginTop: "44px" }}>
        <div className="section__head" style={{ marginBottom: "26px" }}>
          <p className="eyebrow">FİYATLANDIRMA</p>
          <h2 className="h2">Üyelik Paketleri</h2>
          <p className="lead">
            Hedeflerinize ve programınıza göre esnek üyelik seçenekleri.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
          }}
        >
          {(s.paketler || []).map((paket: any, pi: number) => {
            const isPopuler = !!paket.populer;
            return (
              <div
                key={pi}
                style={{
                  background: isPopuler ? "#111610" : "#FFFFFF",
                  borderRadius: "20px",
                  border: isPopuler
                    ? "1.5px solid rgba(217,164,65,0.5)"
                    : "1.5px solid rgba(13,15,10,0.09)",
                  padding: "28px 22px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {isPopuler && (
                  <div style={{ position: "absolute", top: 18, right: 18, padding: "4px 10px", borderRadius: "6px", background: "#D9A441", color: "#0D0F0A", fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Popüler
                  </div>
                )}
                <div>
                  <span style={{
                    display: "inline-block",
                    padding: "3px 10px",
                    borderRadius: "6px",
                    background: isPopuler ? "rgba(217,164,65,0.2)" : "rgba(13,15,10,0.07)",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.05em",
                    color: isPopuler ? "#D9A441" : "#555A4C",
                  }}>
                    {cleanRawText(paket.ad || "")}
                  </span>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: "13px", color: isPopuler ? "rgba(255,255,255,0.6)" : "#667085", lineHeight: 1.4 }}>
                    {cleanRawText(paket.sure || "")}
                  </p>
                  <p style={{ margin: "6px 0 0", fontFamily: "var(--f-head,serif)", fontSize: "32px", fontWeight: 700, color: isPopuler ? "#FFFFFF" : "var(--ink,#0D0F0A)", lineHeight: 1 }}>
                    {cleanRawText(paket.fiyat || "")}
                  </p>
                </div>
                {(paket.ozellikler || []).length > 0 && (
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {(paket.ozellikler || []).map((f: string, fi: number) => (
                      <li key={fi} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "13.5px", color: isPopuler ? "rgba(255,255,255,0.85)" : "#383C30" }}>
                        <CheckCircle2 size={15} color={isPopuler ? "#D9A441" : "var(--olive-lo,#5A6838)"} style={{ flexShrink: 0 }} />
                        {cleanRawText(f)}
                      </li>
                    ))}
                  </ul>
                )}
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={isPopuler ? "btn btn--light" : "btn btn--ghost"}
                  style={{ borderRadius: "12px", fontWeight: 700, marginTop: "auto", justifyContent: "center", ...(isPopuler ? {} : { background: "#0D0F0A", color: "#fff", border: "none" }) }}
                >
                  <WhatsAppIcon size={15} />
                  {isPopuler ? "Ön Kayıt Yap" : "Bilgi Al"}
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. İSTATİSTİKLER */}
      <section
        style={{
          background: "var(--cream-2, #F3EDE0)",
          borderRadius: "22px",
          border: "1px solid rgba(13,15,10,0.07)",
          padding: "clamp(26px, 3.5vw, 40px)",
          marginBottom: "44px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "24px",
            textAlign: "center",
          }}
        >
          {[
            { ikon: <Dumbbell size={26} color="var(--brass-lo,#B8842C)" />, deger: "50+", etiket: "Ekipman & Alet" },
            { ikon: <Users size={26} color="var(--olive-lo,#5A6838)" />, deger: "200+", etiket: "Aktif Üye" },
            { ikon: <Clock size={26} color="var(--brass-lo,#B8842C)" />, deger: "16 Saat", etiket: "Günlük Açık" },
            { ikon: <Trophy size={26} color="var(--olive-lo,#5A6838)" />, deger: "5 Yıl", etiket: "Deneyim" },
            { ikon: <Zap size={26} color="var(--brass-lo,#B8842C)" />, deger: "PT Desteği", etiket: "Kişisel Antrenör" },
            { ikon: <Star size={26} color="var(--olive-lo,#5A6838)" />, deger: "4.9 ★", etiket: "Kullanıcı Puanı" },
          ].map((stat, si) => (
            <div key={si} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <div style={{ padding: "12px", borderRadius: "14px", background: "#FFFFFF", border: "1px solid rgba(13,15,10,0.07)" }}>
                {stat.ikon}
              </div>
              <b style={{ fontSize: "22px", fontWeight: 800, color: "var(--ink,#0D0F0A)", fontFamily: "var(--f-head,serif)" }}>
                {stat.deger}
              </b>
              <span style={{ fontSize: "12px", color: "#667085", fontWeight: 600 }}>{stat.etiket}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. MASA / REZERVASYON CTA */}
      <MasaCTA
        tel={tel}
        telHref={telHref}
        waHref={waHref}
        baslik="Spor salonumuza katılmak ister misiniz?"
        metin="Üyelik ve detaylı bilgi için WhatsApp'tan yazın veya arayın."
        btnLabel="WhatsApp ile Bilgi Al"
      />
    </article>
  );
}
