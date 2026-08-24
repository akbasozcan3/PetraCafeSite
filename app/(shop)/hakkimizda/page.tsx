import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/db/content";
import { phoneToTelHref, buildWhatsappUrl } from "@/lib/content/contact-utils";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import SafeImg from "@/components/site/SafeImg";
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
  MessageCircle,
  Clock,
  MapPin,
  ChevronDown,
} from "lucide-react";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent().catch(() => null);
  const h = content?.hakkimizda;
  const title = h?.baslik
    ? `${cleanRawText(h.baslik)} — Petra Cafe Restaurant`
    : "Hakkımızda — Petra Cafe Restaurant";
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
      images: [{ url: "/assets/cms/hero-ic.webp", width: 1200, height: 630 }],
    },
  };
}

export default async function HakkimizdaPage() {
  const content = await getPublicContent();
  const h = content.hakkimizda || ({} as any);

  const images = content.images || {};
  const heroImg = resolveMediaUrl(
    liveMedia(images.aboutInterior || images.icMekan || images.heroPoster, SITE_PHOTOS.interior)
  );
  const aboutImg = resolveMediaUrl(
    liveMedia(images.aboutInterior || images.icMekan, SITE_PHOTOS.interior)
  );
  const bannerImg = resolveMediaUrl(
    liveMedia(images.havuzPlaj || images.heroPoster || images.heroCephe, SITE_PHOTOS.gallery)
  );

  const tel = content.iletisim?.telefon || "0530 608 90 51";
  const telHref = phoneToTelHref(tel);
  const waHref = buildWhatsappUrl(
    content.iletisim?.whatsapp || tel,
    "Merhaba, Petra Cafe Restaurant hakkında bilgi ve rezervasyon için yazıyorum."
  );

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

  const experiences: any[] =
    (h.experiences as any[])?.length > 0
      ? (h.experiences as any[])
      : [
          {
            n: "01",
            title: "Dünya Mutfağı & Izgaralar",
            desc: "Marine edilmiş dana antrikot, taş fırında çıtır pizzalar, el yapımı makarnalar ve Akdeniz salataları.",
            tag: "Usta Şeflerden",
            features: ["Taş Fırın Pizza", "Marine Izgara Etler", "El Yapımı Makarnalar"],
          },
          {
            n: "02",
            title: "Zengin Serpme Kahvaltı",
            desc: "Taş fırından sıcak pişiler, köy peynirleri, sucuklu yumurta, bal-kaymak ve sınırsız demlik çay.",
            tag: "Her Sabah Taze",
            features: ["Sınırsız Demlik Çay", "Taş Fırın Pişi", "Yöresel Doğal Ürünler"],
          },
          {
            n: "03",
            title: "Pool & Beach Kulübü",
            desc: "Tertemiz yetişkin ve çocuk havuzu, konforlu şezlonglar, VIP localar ve cankurtaran desteği.",
            tag: "Yaz Sezonu Boyunca",
            features: ["Yetişkin & Çocuk Havuzu", "VIP Loca & Şezlong", "Su Hijyen Analizi"],
          },
          {
            n: "04",
            title: "Özel Gün & Organizasyon",
            desc: "Doğum günleri, evlilik teklifleri, mezuniyet ve kurumsal davetler için özel masa ve menü.",
            tag: "Unutulmaz Anlar",
            features: ["Özel Masa Süslemesi", "Kişiye Özel Menü", "Pasta Servisi"],
          },
        ];

  const expIcons = [UtensilsCrossed, Coffee, Waves, PartyPopper];

  const timeline: any[] =
    (h.timeline as any[])?.length > 0
      ? (h.timeline as any[])
      : [
          {
            time: "08:00",
            title: "Kahvaltı & Enerjik Başlangıç",
            desc: "Taş fırından yeni çıkan pişiler, köy peynirleri ve demlik çay ile zengin serpme kahvaltı.",
          },
          {
            time: "12:00",
            title: "Havuz & Beach Serinliği",
            desc: "Açık yüzme havuzunda serinleme, şezlongda güneşlenme ve imza kokteyller.",
          },
          {
            time: "17:00",
            title: "Akşam Lezzetleri",
            desc: "Marine ızgaralar, taş fırın pizzalar ve gurme makarna tabakları ile şef spesiyali.",
          },
          {
            time: "21:00",
            title: "Keyif & Nargile Sohbetleri",
            desc: "İtalyan tiramisu, artisan kahveler ve lounge alanda geceye uzanan keyifli buluşmalar.",
          },
        ];

  return (
    <>
      <style>{`
        /* ─── SAYFA KAPLI LAYOUt ─── */
        .phk {
          width: 100%;
          overflow-x: hidden;
          color: var(--ink, #0D0F0A);
          font-family: var(--f-body, 'Inter', system-ui, sans-serif);
        }

        /* ─── WRAP (ANA SAYFA İLE AYNI) ─── */
        .phk .w {
          width: min(1240px, calc(100% - 40px));
          margin-inline: auto;
        }

        /* ─── SECTION BOŞLUKLARI (ANA SAYFA İLE AYNI) ─── */
        .phk .sec {
          padding-block: clamp(64px, 8vw, 96px);
        }
        .phk .sec--sm {
          padding-block: clamp(40px, 5vw, 60px);
        }
        .phk .sec--warm {
          background: var(--cream-2, #F3EDE0);
        }
        .phk .sec--char {
          background: var(--char, #16190F);
          color: var(--cream, #F4EEE1);
        }
        .phk .sec--ink {
          background: var(--ink, #0D0F0A);
          color: var(--cream, #F4EEE1);
        }

        /* ─── EYEBROW ─── */
        .phk .eyebrow {
          font-size: 11px;
          letter-spacing: 0.25em;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--brass-lo, #B8842C);
          margin: 0 0 12px;
        }

        /* ─── HEADİNGLER ─── */
        .phk h1, .phk .h1 {
          font-family: var(--f-head, 'Playfair Display', Georgia, serif);
          font-size: clamp(36px, 5.5vw, 64px);
          font-weight: 600;
          line-height: 1.07;
          letter-spacing: -0.025em;
          margin: 0 0 20px;
        }
        .phk h2, .phk .h2 {
          font-family: var(--f-head, 'Playfair Display', Georgia, serif);
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 600;
          line-height: 1.12;
          letter-spacing: -0.02em;
          margin: 0 0 16px;
        }
        .phk h3, .phk .h3 {
          font-family: var(--f-head, 'Playfair Display', Georgia, serif);
          font-size: clamp(20px, 2.2vw, 26px);
          font-weight: 600;
          letter-spacing: -0.01em;
          margin: 0 0 10px;
        }
        .phk .lead {
          font-size: clamp(16px, 1.6vw, 18px);
          line-height: 1.68;
          color: var(--muted, #5C584C);
          margin: 0 0 20px;
          max-width: 62ch;
        }
        .phk .body-txt {
          font-size: 15.5px;
          line-height: 1.78;
          color: var(--muted, #6E6A5C);
          margin: 0 0 16px;
          max-width: 60ch;
        }

        /* ─── BUTONLAR (ANA SAYFA İLE AYNI) ─── */
        .phk .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.22s ease, color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
          cursor: pointer;
          border: none;
        }
        .phk .btn--dark {
          background: var(--char, #16190F);
          color: var(--cream, #F4EEE1);
        }
        .phk .btn--dark:hover {
          background: #0a0c09;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px -8px rgba(13,15,10,0.35);
          color: var(--cream, #F4EEE1);
        }
        .phk .btn--brass {
          background: var(--brass, #D9A441);
          color: #0D0F0A;
        }
        .phk .btn--brass:hover {
          background: #c8943a;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px -8px rgba(217,164,65,0.45);
          color: #0D0F0A;
        }
        .phk .btn--ghost {
          background: transparent;
          color: var(--cream, #F4EEE1);
          border: 1.5px solid rgba(244, 238, 225, 0.35);
        }
        .phk .btn--ghost:hover {
          background: rgba(244, 238, 225, 0.1);
          color: var(--cream, #F4EEE1);
          border-color: rgba(244, 238, 225, 0.6);
        }
        .phk .btn-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
        }

        /* ─── HERO ─── */
        .phk-hero {
          position: relative;
          min-height: clamp(540px, 72vh, 720px);
          display: flex;
          align-items: flex-end;
          background: #0D0F0A;
          overflow: hidden;
        }
        .phk-hero__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 60%;
          opacity: 0.48;
          transform: scale(1.04);
          transition: transform 6s ease;
        }
        .phk-hero:hover .phk-hero__img {
          transform: scale(1);
        }
        .phk-hero__veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(13,15,10,0.15) 0%,
            rgba(13,15,10,0.45) 45%,
            rgba(13,15,10,0.94) 100%
          );
        }
        .phk-hero__body {
          position: relative;
          z-index: 2;
          padding-bottom: clamp(52px, 7vw, 84px);
        }
        .phk-hero__crumb {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: rgba(244,238,225,0.55);
          margin-bottom: 24px;
        }
        .phk-hero__crumb a {
          color: rgba(244,238,225,0.55);
          text-decoration: none;
          transition: color 0.2s;
        }
        .phk-hero__crumb a:hover { color: rgba(244,238,225,0.95); }
        .phk-hero__crumb-sep { opacity: 0.35; }
        .phk-hero h1 {
          color: #FFFFFF;
          margin-bottom: 14px;
          max-width: 14ch;
        }
        .phk-hero .lead {
          color: rgba(244,238,225,0.82);
          max-width: 54ch;
          margin-bottom: 32px;
        }
        .phk-hero__scroll {
          position: absolute;
          bottom: 28px;
          right: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: rgba(244,238,225,0.45);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .phk-hero__scroll-line {
          width: 1px;
          height: 40px;
          background: rgba(244,238,225,0.3);
          animation: phkScrollLine 1.8s ease-in-out infinite;
        }
        @keyframes phkScrollLine {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.9; transform: scaleY(0.4); }
        }

        /* ─── 2 KOLON LAYOUT ─── */
        .phk .g2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(36px, 5vw, 72px);
          align-items: center;
        }
        .phk .g2--rev { direction: rtl; }
        .phk .g2--rev > * { direction: ltr; }

        /* ─── GÖRSEL KART (tilt-card benzeri) ─── */
        .phk-img-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 24px 60px -18px rgba(13,15,10,0.32);
          background: #1a1a1a;
          aspect-ratio: 4 / 3;
        }
        .phk-img-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.9s cubic-bezier(0.22, 0.61, 0.36, 1);
          display: block;
        }
        .phk-img-card:hover img {
          transform: scale(1.05);
        }
        .phk-img-card__badge {
          position: absolute;
          bottom: 18px;
          left: 18px;
          background: rgba(13,15,10,0.82);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(217,164,65,0.35);
          border-radius: 14px;
          padding: 10px 16px;
          color: #FFFFFF;
        }
        .phk-img-card__badge b {
          display: block;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 2px;
        }
        .phk-img-card__badge span {
          font-size: 11px;
          font-weight: 600;
          color: var(--brass, #D9A441);
          letter-spacing: 0.04em;
        }
        .phk-img-card__status {
          position: absolute;
          top: 18px;
          left: 18px;
          background: rgba(13,15,10,0.75);
          backdrop-filter: blur(8px);
          border-radius: 999px;
          padding: 5px 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: 0.06em;
        }
        .phk-img-card__dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22C55E;
          flex-shrink: 0;
        }

        /* ─── HAP ETİKETLER ─── */
        .phk .pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 20px;
        }
        .phk .pills span {
          display: inline-flex;
          align-items: center;
          padding: 7px 16px;
          border-radius: 999px;
          border: 1.5px solid rgba(13,15,10,0.12);
          background: #FFFFFF;
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #0D0F0A);
          letter-spacing: 0.02em;
          box-shadow: 0 2px 8px rgba(13,15,10,0.04);
        }
        .phk .sec--char .pills span,
        .phk .sec--ink .pills span {
          background: rgba(244,238,225,0.1);
          color: rgba(244,238,225,0.9);
          border-color: rgba(244,238,225,0.2);
        }

        /* ─── DENEYİM KARTLARI (4'LÜ GRİD) ─── */
        .phk-exp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: 48px;
        }
        .phk-exp-card {
          background: #FFFFFF;
          border: 1.5px solid rgba(13,15,10,0.09);
          border-radius: 22px;
          padding: 28px 22px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 6px 20px -10px rgba(13,15,10,0.1);
          transition: transform 0.28s cubic-bezier(0.22,0.61,0.36,1), border-color 0.28s, box-shadow 0.28s;
        }
        .phk-exp-card:hover {
          transform: translateY(-8px);
          border-color: var(--brass, #D9A441);
          box-shadow: 0 20px 40px -14px rgba(13,15,10,0.18);
        }
        .phk-exp-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .phk-exp-card__n {
          font-family: var(--f-head, 'Playfair Display', Georgia, serif);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--brass, #D9A441);
        }
        .phk-exp-card__ico {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(217,164,65,0.12);
          color: var(--brass-lo, #B8842C);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .phk-exp-card__tag {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--brass-lo, #B8842C);
          display: block;
          margin-bottom: 6px;
        }
        .phk-exp-card h3 {
          font-family: var(--f-head, 'Playfair Display', Georgia, serif);
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 10px;
          letter-spacing: -0.01em;
          color: var(--ink, #0D0F0A);
        }
        .phk-exp-card p {
          font-size: 14px;
          line-height: 1.62;
          color: var(--muted, #6E6A5C);
          margin: 0 0 20px;
          flex: 1;
        }
        .phk-exp-card__feats {
          list-style: none;
          margin: 0;
          padding: 14px 0 0;
          border-top: 1px solid rgba(13,15,10,0.07);
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .phk-exp-card__feats li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink, #0D0F0A);
        }

        /* ─── BÜYÜK BANNER ─── */
        .phk-banner {
          position: relative;
          min-height: clamp(460px, 58vh, 600px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0D0F0A;
          overflow: hidden;
          text-align: center;
        }
        .phk-banner__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.42;
          transition: transform 5s ease;
        }
        .phk-banner:hover .phk-banner__img { transform: scale(1.04); }
        .phk-banner__veil {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 60%, rgba(13,15,10,0.5) 0%, rgba(13,15,10,0.88) 100%);
        }
        .phk-banner__body {
          position: relative;
          z-index: 2;
          max-width: 700px;
          padding: 48px 20px;
        }
        .phk-banner h2 {
          color: #FFFFFF;
          font-size: clamp(30px, 4.5vw, 52px);
          margin-bottom: 14px;
        }
        .phk-banner .lead {
          color: rgba(244,238,225,0.84);
          max-width: 52ch;
          margin-bottom: 28px;
        }

        /* ─── TİMELINE ─── */
        .phk-timeline {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          position: relative;
          margin-top: 48px;
        }
        .phk-timeline::before {
          content: '';
          position: absolute;
          top: 22px;
          left: calc(12.5% + 0px);
          right: calc(12.5% + 0px);
          height: 1px;
          background: var(--brass, #D9A441);
          opacity: 0.35;
        }
        .phk-tl-item {
          padding: 0 16px;
          position: relative;
        }
        .phk-tl-dot {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--char, #16190F);
          border: 2px solid var(--brass, #D9A441);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          position: relative;
          z-index: 1;
          flex-shrink: 0;
        }
        .phk-tl-time {
          font-family: var(--f-head, 'Playfair Display', Georgia, serif);
          font-size: 22px;
          font-weight: 700;
          color: var(--cream, #F4EEE1);
          margin: 0 0 6px;
          letter-spacing: -0.01em;
        }
        .phk-tl-item h3 {
          font-size: 16px;
          font-weight: 700;
          color: var(--cream, #F4EEE1);
          margin: 0 0 8px;
          line-height: 1.3;
          font-family: var(--f-head, 'Playfair Display', Georgia, serif);
        }
        .phk-tl-item p {
          font-size: 13.5px;
          line-height: 1.6;
          color: rgba(244,238,225,0.6);
          margin: 0;
        }

        /* ─── İSTATİSTİK ŞERİDİ ─── */
        .phk-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(13,15,10,0.08);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(13,15,10,0.08);
        }
        .phk-stat {
          background: #FFFFFF;
          padding: clamp(24px, 3.5vw, 40px) clamp(20px, 2.5vw, 32px);
          text-align: center;
          transition: background 0.2s;
        }
        .phk-stat:hover {
          background: var(--cream-2, #F3EDE0);
        }
        .phk-stat b {
          display: block;
          font-family: var(--f-head, 'Playfair Display', Georgia, serif);
          font-size: clamp(22px, 2.8vw, 34px);
          font-weight: 600;
          color: var(--ink, #0D0F0A);
          letter-spacing: -0.02em;
          margin-bottom: 5px;
        }
        .phk-stat span {
          font-size: 13px;
          font-weight: 600;
          color: var(--muted, #6E6A5C);
          text-align: center;
          line-height: 1.4;
        }

        /* ─── SECTION BAŞLIĞI ─── */
        .phk .sec-head {
          max-width: 640px;
          margin-bottom: 0;
        }
        .phk .sec-head--center {
          margin-inline: auto;
          text-align: center;
        }
        .phk .sec-head--center .lead {
          margin-inline: auto;
        }

        /* ─── ÖZEL GÜNLER KOYU KUTU ─── */
        .phk-events-box {
          border-radius: 28px;
          background: linear-gradient(135deg, #1c2010 0%, #0D0F0A 100%);
          border: 1.5px solid rgba(217,164,65,0.3);
          box-shadow: 0 24px 60px -20px rgba(0,0,0,0.5);
          padding: clamp(32px, 5vw, 56px);
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: clamp(32px, 4vw, 56px);
          align-items: center;
        }
        .phk-events-box h2 { color: #FFFFFF; }
        .phk-events-box .lead { color: rgba(244,238,225,0.82); max-width: none; }

        /* ─── SON CTA KUTUSU ─── */
        .phk-cta {
          border-radius: 28px;
          background: var(--char, #16190F);
          padding: clamp(48px, 7vw, 80px) clamp(28px, 5vw, 64px);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
        }
        .phk-cta h2 { color: #FFFFFF; margin: 0; }
        .phk-cta .lead { color: rgba(244,238,225,0.78); margin: 0; }

        /* ─── SCROLL ANİMASYONLARI ─── */
        .phk [data-phk-fade] {
          opacity: 1;
          transform: none;
          transition: opacity 0.6s cubic-bezier(0.22,0.61,0.36,1), transform 0.6s cubic-bezier(0.22,0.61,0.36,1);
        }
        html.home-anim .phk [data-phk-fade]:not(.is-in) {
          opacity: 0;
          transform: translateY(16px);
        }
        html.home-anim .phk [data-phk-fade].is-in {
          opacity: 1;
          transform: none;
        }

        /* ─── RESPONSİF ─── */
        @media (max-width: 1024px) {
          .phk-exp-grid { grid-template-columns: repeat(2, 1fr); }
          .phk-timeline { grid-template-columns: repeat(2, 1fr); }
          .phk-timeline::before { display: none; }
          .phk-tl-item { padding-bottom: 32px; }
          .phk-stats { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
          .phk .g2 { grid-template-columns: 1fr; gap: 32px; }
          .phk .g2--rev { direction: ltr; }
          .phk-events-box { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .phk-exp-grid { grid-template-columns: 1fr; }
          .phk-timeline { grid-template-columns: 1fr; }
          .phk-stats { grid-template-columns: 1fr 1fr; }
          .phk-hero__scroll { display: none; }
          .phk .w { width: calc(100% - 32px); }
        }
        @media (max-width: 400px) {
          .phk-stats { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .phk-hero__img,
          .phk-img-card img,
          .phk-banner__img,
          .phk [data-phk-fade],
          .phk-exp-card {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <div className="phk">

        {/* ──────── 1. HERO ──────── */}
        <section className="phk-hero">
          <img
            className="phk-hero__img"
            src={heroImg}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            loading="eager"
            width={1800}
            height={1000}
          />
          <div className="phk-hero__veil" aria-hidden="true" />

          <div className="w phk-hero__body">
            {/* Breadcrumb */}
            <nav className="phk-hero__crumb" aria-label="Breadcrumb">
              <Link href="/">Ana Sayfa</Link>
              <span className="phk-hero__crumb-sep">/</span>
              <span style={{ color: "var(--brass, #D9A441)" }}>Hakkımızda</span>
            </nav>

            <h1 data-phk-fade="">
              {cleanRawText(h.baslik) || "Sadece bir restoran değil."}
            </h1>

            <p className="lead" data-phk-fade="">
              {cleanRawText(h.lead) ||
                "İstanbul Çekmeköy Taşdelen'de gastronomi, açık havuz ve sosyal yaşamı kusursuz bir uyumla buluşturan seçkin bir yaşam merkezi."}
            </p>

            <div className="btn-row" data-phk-fade="">
              <Link href="/#rezervasyon" className="btn btn--brass">
                <CalendarCheck size={16} />
                Masa Rezervasyonu
              </Link>
              <Link href="/menu" className="btn btn--ghost">
                Menüyü İncele
              </Link>
            </div>
          </div>

          <div className="phk-hero__scroll" aria-hidden="true">
            <span className="phk-hero__scroll-line" />
            <span>KEŞFET</span>
          </div>
        </section>

        {/* ──────── 2. PETRA'YI TANIMLAYAN (Sol Fotoğraf + Sağ Metin) ──────── */}
        <section className="sec">
          <div className="w">
            <div className="g2">
              {/* Sol: Görsel */}
              <div data-phk-fade="">
                <div className="phk-img-card">
                  <SafeImg
                    src={aboutImg}
                    alt="Petra Cafe Restaurant İç Mekân"
                    fallback={SITE_PHOTOS.interior}
                    width={900}
                    height={675}
                    loading="lazy"
                  />
                  <div className="phk-img-card__status">
                    <span className="phk-img-card__dot" />
                    <span>ŞU AN AÇIK · 08:00–02:00</span>
                  </div>
                  <div className="phk-img-card__badge">
                    <b>{cleanRawText(h.badgeBaslik) || "Petra Yaşam Merkezi"}</b>
                    <span>
                      <MapPin size={11} style={{ verticalAlign: "middle", marginRight: 4 }} />
                      Taşdelen, Çekmeköy · İstanbul
                    </span>
                  </div>
                </div>
              </div>

              {/* Sağ: Metin */}
              <div>
                <p className="eyebrow" data-phk-fade="">PETRA HAKKINDA</p>
                <h2 data-phk-fade="">
                  Sadece bir restoran değil, bir yaşam alanı.
                </h2>
                <p className="lead" data-phk-fade="">
                  {cleanRawText(h.answerMetin) ||
                    "Petra Cafe Restaurant; İstanbul Çekmeköy Taşdelen'de gastronomi, dinlenme ve sosyal yaşamı kusursuz bir uyumla buluşturan ayrıcalıklı bir yaşam alanıdır."}
                </p>
                <p className="body-txt" data-phk-fade="">
                  Günün ilk saatlerinden gece yarısına; serpme kahvaltıdan dünya mutfağına, havuz kenarından özel organizasyon masalarına kadar her deneyimi tek çatı altında sunuyoruz.
                </p>
                <div className="pills" data-phk-fade="">
                  {["Restoran", "Serpme Kahvaltı", "Havuz & Plaj", "Sosyal Alan", "Özel Organizasyon"].map(
                    (tag) => (
                      <span key={tag}>{tag}</span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────── 3. 4 ANA DENEYİM KART ──────── */}
        <section className="sec sec--warm">
          <div className="w">
            <div className="sec-head sec-head--center" data-phk-fade="">
              <p className="eyebrow">AYRICALIKLI DENEYİMLER</p>
              <h2>Petra'da Sizi Neler Bekliyor?</h2>
              <p className="lead">
                Günün her anında lezzet, serinlik ve sosyal keyfi bir arada keşfedin.
              </p>
            </div>

            <div className="phk-exp-grid">
              {experiences.map((item: any, i: number) => {
                const IconComp = item.icon || expIcons[i % expIcons.length];
                return (
                  <article className="phk-exp-card" key={i} data-phk-fade="">
                    <div>
                      <div className="phk-exp-card__top">
                        <span className="phk-exp-card__n">{item.n || `0${i + 1}`}</span>
                        <div className="phk-exp-card__ico" aria-hidden="true">
                          <IconComp size={22} />
                        </div>
                      </div>
                      {item.tag && (
                        <span className="phk-exp-card__tag">{cleanRawText(item.tag)}</span>
                      )}
                      <h3>{cleanRawText(item.title)}</h3>
                      <p>{cleanRawText(item.desc)}</p>
                    </div>
                    {Array.isArray(item.features) && item.features.length > 0 && (
                      <ul className="phk-exp-card__feats">
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

        {/* ──────── 4. BÜYÜK GÖRSEL BANNER ──────── */}
        <section className="phk-banner">
          <img
            className="phk-banner__img"
            src={bannerImg}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1800}
            height={900}
          />
          <div className="phk-banner__veil" aria-hidden="true" />
          <div className="phk-banner__body">
            <p className="eyebrow" data-phk-fade="" style={{ color: "var(--brass, #D9A441)" }}>
              PETRA YAŞAM MERKEZİ
            </p>
            <h2 data-phk-fade="">
              Petra'da günün her anının tadını çıkar.
            </h2>
            <p className="lead" data-phk-fade="">
              Sabah kahvaltısından akşamın huzurlu saatlerine, havuz kenarında serinlikten yıldızların altında keyifli sohbetlere.
            </p>
            <div className="btn-row" data-phk-fade="" style={{ justifyContent: "center" }}>
              <Link href="/#rezervasyon" className="btn btn--brass">
                Hemen Rezervasyon Yap
              </Link>
            </div>
          </div>
        </section>

        {/* ──────── 5. BİR GÜN PETRA'DA (TİMELINE) ──────── */}
        <section className="sec sec--char">
          <div className="w">
            <div className="sec-head sec-head--center" data-phk-fade="">
              <p className="eyebrow" style={{ color: "var(--brass, #D9A441)" }}>
                24 SAAT YAŞAM DOLU
              </p>
              <h2 style={{ color: "#FFFFFF" }}>Bir Gün Petra'da Nasıl Geçer?</h2>
              <p className="lead" style={{ color: "rgba(244,238,225,0.75)" }}>
                Sabahın taze enerjisinden gecenin tatlı sohbetlerine uzanan ritim.
              </p>
            </div>

            <div className="phk-timeline">
              {timeline.map((step: any, i: number) => (
                <div className="phk-tl-item" key={i} data-phk-fade="">
                  <div className="phk-tl-dot" aria-hidden="true">
                    <Clock size={18} color="var(--brass, #D9A441)" />
                  </div>
                  <p className="phk-tl-time">{cleanRawText(step.time)}</p>
                  <h3>{cleanRawText(step.title)}</h3>
                  <p>{cleanRawText(step.desc)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────── 6. RAKAMLARLA PETRA ──────── */}
        <section className="sec sec--sm">
          <div className="w">
            <div className="sec-head sec-head--center" style={{ marginBottom: 36 }} data-phk-fade="">
              <p className="eyebrow">RAKAMLARLA PETRA</p>
              <h2>Güven ve Kalitenin Kanıtı</h2>
            </div>

            <div className="phk-stats" data-phk-fade="">
              {statsList.map((st: any, i: number) => (
                <div className="phk-stat" key={i}>
                  <b>{cleanRawText(st.b)}</b>
                  <span>{cleanRawText(st.span)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────── 7. ÖZEL ANLAR (Sağ Fotoğraf + Sol Metin) ──────── */}
        <section className="sec sec--warm">
          <div className="w">
            <div className="phk-events-box" data-phk-fade="">
              {/* Sol: Metin */}
              <div>
                <p className="eyebrow" style={{ color: "var(--brass, #D9A441)" }}>
                  ÖZEL GÜNLER & KUTLAMALAR
                </p>
                <h2>
                  Özel anlarınız için özel bir atmosfer.
                </h2>
                <p className="lead">
                  {cleanRawText(h.eventsLead || "Doğum günleri, evlilik teklifleri, mezuniyet ve kurumsal davetlerinizde profesyonel masa düzeni, özel menü planlaması ve pasta servisi sunuyoruz.")}
                </p>

                <div className="pills" style={{ marginBottom: 28 }}>
                  {((h.eventsTags as string[])?.length > 0
                    ? (h.eventsTags as string[])
                    : ["Doğum Günü Kutlamaları", "Evlilik Teklifi & Yıldönümü", "Kurumsal Davetler"]
                  ).map((tag: string, ti: number) => (
                    <span key={ti}>{cleanRawText(tag)}</span>
                  ))}
                </div>

                <div className="btn-row">
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
                  <a href={`tel:${telHref}`} className="btn btn--ghost">
                    <Phone size={15} />
                    {tel}
                  </a>
                </div>
              </div>

              {/* Sağ: Görsel */}
              <div>
                <div className="phk-img-card">
                  <SafeImg
                    src={aboutImg}
                    alt="Petra Özel Gün ve Organizasyon Masaları"
                    fallback={SITE_PHOTOS.interior}
                    width={900}
                    height={675}
                    loading="lazy"
                  />
                  <div className="phk-img-card__badge">
                    <b>Özel Gün Masaları</b>
                    <span>Kutlama · Davet · Organizasyon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────── 8. SON CTA ──────── */}
        <section className="sec">
          <div className="w">
            <div className="phk-cta" data-phk-fade="">
              <p className="eyebrow" style={{ color: "var(--brass, #D9A441)" }}>
                REZERVASYON & İLETİŞİM
              </p>
              <h2>Petra'da kendi hikayenizi yazın.</h2>
              <p className="lead">
                Sevdiklerinizle lezzet, konfor ve keyif dolu anlar için hemen yerinizi ayırtın.
              </p>
              <div className="btn-row" style={{ justifyContent: "center" }}>
                <Link href="/#rezervasyon" className="btn btn--brass">
                  Rezervasyon Yap
                </Link>
                <Link href="/menu" className="btn btn--ghost">
                  Menüyü İncele
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
