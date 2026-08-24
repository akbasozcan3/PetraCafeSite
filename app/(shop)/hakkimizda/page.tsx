import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/db/content";
import { phoneToTelHref, buildWhatsappUrl } from "@/lib/content/contact-utils";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import { displayHours } from "@/lib/content/hours";
import SafeImg from "@/components/site/SafeImg";
import SiteIcon from "@/components/site/SiteIcon";
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Clock, 
  ChevronRight, 
  UtensilsCrossed, 
  Waves, 
  Cake, 
  CalendarCheck, 
  Users, 
  Award,
  Flame,
  Coffee
} from "lucide-react";
import { parseArticleContent, formatInlineText, cleanRawText } from "@/lib/content/markdown-parser";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent();
  const h = content.hakkimizda;
  const title = h?.baslik ? `${h.baslik} | Petra Cafe Restaurant` : "Hakkımızda | Petra Cafe Restaurant";
  const description =
    h?.lead ||
    "Petra Cafe Restaurant & Petra Yaşam Merkezi — Çekmeköy Taşdelen'de serpme kahvaltı, dünya mutfağı, havuz & plaj ve organizasyon.";

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
    body: [
      "Petra Cafe Restaurant; İstanbul Çekmeköy Taşdelen'de, Petra Yaşam Merkezi içerisinde lezzet, keyif ve konforu bir araya getiren özel bir yaşam alanıdır. Günün her saatine eşlik eden zengin menüsü, ferah atmosferi ve havuz başı deneyimiyle Petra; yalnızca yemek yemek için değil, sevdiklerinizle unutulmaz anlar biriktirmek için tasarlandı.",
      "Günün ilk ışıklarında zengin serpme kahvaltımız ve çıtır lezzetlerimizle güne harika bir başlangıç yapabilir; öğle ve akşam saatlerinde dünya mutfağının seçkin lezzetlerini, taş fırın pizzalarımızı ve ızgaralarımızı tadabilirsiniz.",
      "Yaz sezonunda Pool & Beach alanımızda şezlongunuzda güneşlenirken buz gibi imza kokteyllerimizin, İtalyan tatlılarımızın ve özel nargile karışımlarımızın keyfini çıkarabilirsiniz.",
      "Doğum günü, kurumsal etkinlik, evlilik teklifi ve özel davetleriniz için profesyonel ekibimizle yanınızdayız."
    ],
    badgeBaslik: "Petra",
    badgeAlt: "Cafe · Restaurant · Pool",
  };

  const img = resolveMediaUrl(
    liveMedia(
      content.images?.aboutInterior || content.images?.icMekan,
      SITE_PHOTOS.interior
    )
  );

  const telHref = phoneToTelHref(content.iletisim?.telefon || "05306089051");
  const waHref = buildWhatsappUrl(content.iletisim?.whatsapp || content.iletisim?.telefon || "05306089051", "Merhaba, hakkınızda sayfasından bilgi ve rezervasyon için yazıyorum.");
  const hours = displayHours(content.iletisim);

  const features = [
    {
      icon: UtensilsCrossed,
      title: "Seçkin Dünya Mutfağı",
      desc: "Dana antrikot, el yapımı burgerler, fırın makarnalar, taze başlangıçlar ve çocuk menüsü.",
    },
    {
      icon: Waves,
      title: "Havuz & Beach Kulübü",
      desc: "09:00 – 18:00 saatleri arasında tertemiz yetişkin ve çocuk havuzu, şezlonglar ve VIP localar.",
    },
    {
      icon: Coffee,
      title: "Geleneksel Serpme Kahvaltı",
      desc: "Taze pişi, börek, sahanda yumurta, peynir çeşitleri ve sınırsız demlik çay eşliğinde eşsiz sabahlar.",
    },
    {
      icon: Flame,
      title: "Nargile & İtalyan Kokteylleri",
      desc: "Aperol Spritz, frozen, mojito çeşitleri, tiramisu ve premium tütünlerle zengin nargile menüsü.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FBF8F1] text-[#0D0F0A] pt-24 pb-20">
      {/* 1. ÜST BREADCRUMB & BAŞLIK HERO */}
      <section className="wrap max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        <nav className="flex items-center gap-2 text-xs font-semibold text-[#8A9BB0] uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-[#D9A441] transition">Ana Sayfa</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#D9A441]">Hakkımızda</span>
        </nav>

        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#D9A441]/15 text-[#B8842C] border border-[#D9A441]/30 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            {h.eyebrow || "HİKAYEMİZ & YAŞAM ALANIMIZ"}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0D0F0A] leading-tight font-serif">
            {h.baslik || "Petra Yaşam Merkezi'nde Cafe & Restaurant"}
          </h1>
          {h.lead && (
            <p className="mt-4 text-base sm:text-lg text-[#5A554A] leading-relaxed">
              {h.lead}
            </p>
          )}
        </div>
      </section>

      {/* 2. ANA HİKAYE & 2-KOLONLU VİTRİN */}
      <section className="wrap max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Sol Kolon: Detaylı Makale / Hikaye */}
          <div className="lg:col-span-7 space-y-6 text-[#2D2A24] leading-relaxed">
            {h.answerMetin && (
              <div className="rounded-2xl border border-[#D9A441]/30 bg-[#F4EEE1]/80 p-5 shadow-sm">
                <b className="text-sm font-bold text-[#B8842C] uppercase tracking-wide block mb-1.5">
                  ✦ {h.answerBaslik || "Kısaca Petra"}
                </b>
                <p className="text-sm text-[#3E3A32] leading-relaxed">
                  {h.answerMetin}
                </p>
              </div>
            )}

            {/* Ayrıştırılmış Makale / Hikaye Blokları */}
            <div className="space-y-4">
              {parseArticleContent(h.body || []).map((block, idx) => {
                if (block.type === "h1") {
                  return (
                    <h2
                      key={idx}
                      className="text-2xl sm:text-3xl font-extrabold text-[#0D0F0A] font-serif pt-4 pb-1 border-b border-[#0D0F0A]/10"
                    >
                      {cleanRawText(block.text || "")}
                    </h2>
                  );
                }
                if (block.type === "h2") {
                  return (
                    <h3
                      key={idx}
                      className="text-xl sm:text-2xl font-bold text-[#0D0F0A] font-serif pt-3 pb-1"
                    >
                      {cleanRawText(block.text || "")}
                    </h3>
                  );
                }
                if (block.type === "h3") {
                  return (
                    <h4
                      key={idx}
                      className="text-base sm:text-lg font-bold text-[#B8842C] pt-2"
                    >
                      {cleanRawText(block.text || "")}
                    </h4>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={idx}
                      className="border-l-4 border-[#D9A441] pl-4 py-2 my-3 italic text-[#5A554A] bg-[#F4EEE1]/50 rounded-r-xl"
                    >
                      {formatInlineText(block.text || "")}
                    </blockquote>
                  );
                }
                if (block.type === "list" && block.items) {
                  return (
                    <ul key={idx} className="space-y-2 pl-5 list-disc text-sm text-[#3E3A32]">
                      {block.items.map((item, i) => (
                        <li key={i}>{formatInlineText(item)}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={idx} className="text-base leading-relaxed text-[#3E3A32]">
                    {formatInlineText(block.text || "")}
                  </p>
                );
              })}
            </div>

            {/* İstatistikler */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#0D0F0A]/10">
              <div className="p-4 rounded-xl bg-white border border-[#0D0F0A]/08 shadow-sm">
                <span className="text-2xl font-black text-[#D9A441] block">08:00 – 02:00</span>
                <span className="text-xs font-semibold text-[#6E6A5C] mt-1 block">Cafe & Restoran Açık</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#0D0F0A]/08 shadow-sm">
                <span className="text-2xl font-black text-[#D9A441] block">09:00 – 18:00</span>
                <span className="text-xs font-semibold text-[#6E6A5C] mt-1 block">Havuz & Beach Sezonu</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#0D0F0A]/08 shadow-sm col-span-2 sm:col-span-1">
                <span className="text-2xl font-black text-[#D9A441] block">240+</span>
                <span className="text-xs font-semibold text-[#6E6A5C] mt-1 block">Zengin Menü Çeşidi</span>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Görsel & Rozet */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <SafeImg
                src={img}
                alt="Petra Yaşam Merkezi Cafe Restaurant"
                fallback={SITE_PHOTOS.interior}
                width={800}
                height={600}
                className="w-full h-[360px] sm:h-[420px] object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#D9A441]/40 shadow-lg flex items-center justify-between">
                <div>
                  <b className="text-base font-extrabold text-[#0D0F0A] block">{h.badgeBaslik || "Petra"}</b>
                  <span className="text-xs font-bold text-[#B8842C]">{h.badgeAlt || "Cafe · Restaurant · Pool"}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md block mb-0.5">
                    ★ 4.6 (94+ Yorum)
                  </span>
                  <span className="text-[10px] text-[#6E6A5C]">Çekmeköy Taşdelen</span>
                </div>
              </div>
            </div>

            {/* Hızlı İletişim Kartı */}
            <div className="p-5 rounded-2xl bg-white border border-[#0D0F0A]/10 shadow-sm space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#0D0F0A] flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#D9A441]" />
                Konum ve Ulaşım
              </h4>
              <p className="text-xs text-[#5A554A] leading-relaxed">
                Megakent Sitesi, Turgut Özal Cad, Selen Sk. No:1/O, Petra Yaşam Merkezi, Taşdelen, Çekmeköy / İstanbul
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href={`tel:${telHref}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0D0F0A] text-white text-xs font-bold hover:bg-[#2A2820] transition"
                >
                  <Phone className="h-3.5 w-3.5" />
                  0530 608 90 51
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#1EBE5D] transition"
                >
                  WhatsApp'tan Yazın
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. ÖNE ÇIKAN HİZMETLERİMİZ (4 KART) */}
      <section className="wrap max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B8842C] block mb-2">
            DENEYİM & İMKANLAR
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D0F0A] font-serif">
            Petra'da Sizi Neler Bekliyor?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-[#0D0F0A]/08 shadow-sm hover:shadow-md transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D9A441]/15 text-[#B8842C] flex items-center justify-center mb-4 group-hover:bg-[#D9A441] group-hover:text-[#0D0F0A] transition">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0D0F0A] mb-2">{item.title}</h3>
                <p className="text-sm text-[#5A554A] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. REZERVASYON & DAVET CTA */}
      <section className="wrap max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <div className="rounded-3xl bg-[#141E2E] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 border border-white/10">
          <div className="max-w-xl space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D9A441] uppercase tracking-wider">
              <CalendarCheck className="h-4 w-4" />
              REZERVASYON & ÖZEL GÜNLER
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              Masanızı veya Locanızı Hemen Ayırtın
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Hafta sonu serpme kahvaltı, akşam yemeği veya havuz başı localarımız için yerinizi ayırtın. Özel kutlamalarınız için bizi arayabilirsiniz.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/#rezervasyon"
              className="px-6 py-3.5 rounded-xl bg-[#D9A441] text-[#0D0F0A] font-bold text-sm hover:bg-[#E5B555] transition shadow-lg w-full sm:w-auto text-center"
            >
              Online Rezervasyon Yap
            </Link>
            <Link
              href="/menu"
              className="px-6 py-3.5 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition border border-white/10 w-full sm:w-auto text-center"
            >
              Menüyü İncele
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
