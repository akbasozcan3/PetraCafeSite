import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/db/content";
import { phoneToTelHref, buildWhatsappUrl } from "@/lib/content/contact-utils";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import { displayHours } from "@/lib/content/hours";
import SafeImg from "@/components/site/SafeImg";
import { parseArticleContent, formatInlineText, cleanRawText } from "@/lib/content/markdown-parser";
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
  Coffee,
  ShieldCheck,
  Star,
  ArrowRight,
  HeartHandshake
} from "lucide-react";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent();
  const h = content.hakkimizda;
  const title = h?.baslik ? `${cleanRawText(h.baslik)} | Petra Cafe Restaurant` : "Hakkımızda | Petra Cafe Restaurant";
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
    eyebrow: "HAKKIMIZDA & YAŞAM ALANIMIZ",
    baslik: "Petra Yaşam Merkezi'nde Cafe & Restaurant Deneyimi",
    answerBaslik: "Kısaca Petra",
    answerMetin: "Petra Cafe Restaurant; Çekmeköy Taşdelen'de Petra Yaşam Merkezi bünyesinde zengin dünya mutfağı, serpme kahvaltı, taş fırın lezzetleri, İtalyan tatlı ve kokteylleri, açık yüzme havuzu ve VIP localarıyla günün her saati kesintisiz hizmet veren ayrıcalıklı bir yaşam kompleksidir.",
    lead: "Keyif, lezzet ve konforun buluştuğu nokta — sabahtan geceye leziz sofralar, havuz kenarında serin anlar ve unutulmaz anılar.",
    body: [
      "Petra Cafe Restaurant; İstanbul Anadolu Yakası'nın yükselen değeri Çekmeköy Taşdelen'de, Megakent Sitesi içerisinde yer alan Petra Yaşam Merkezi'nde konuklarını ağırlamaktadır. Şehrin gürültüsünden uzak, ferah ve huzurlu bir ortamda; gastronomi ile sosyal yaşamı aynı çatı altında buluşturuyoruz.",
      "Günün ilk ışıklarında zengin serpme kahvaltımız, sıcak pişilerimiz ve taze demlenmiş çay eşliğinde başlayan lezzet yolculuğumuz; öğle ve akşam saatlerinde usta şeflerimizin hazırladığı dana antrikot, taş fırın pizzalar, el yapımı burgerler ve taze makarnalarla devam eder.",
      "Yaz sezonunda 09:00 - 18:00 saatleri arasında hizmet veren açık yüzme havuzumuz, çocuk havuzumuz ve güneşlenme alanlarımızla Petra; aileniz ve sevdiklerinizle tatil konseptini şehre taşıyor. Havuz başında serinlerken özel kokteyllerimiz, İtalyan tatlılarımız ve zengin nargile seçeneklerimiz gününüze eşlik eder.",
      "Doğum günleri, evlilik teklifleri, kurumsal yemekler, mezuniyet ve özel kutlamalarınız için profesyonel ekibimizle özel masa düzenlemeleri ve menü planlamaları sunuyoruz."
    ],
    badgeBaslik: "Petra Yaşam Merkezi",
    badgeAlt: "Cafe · Restaurant · Pool & Beach"
  };

  const img = resolveMediaUrl(
    liveMedia(
      content.images?.aboutInterior || content.images?.icMekan,
      SITE_PHOTOS.interior
    )
  );

  const poolImg = resolveMediaUrl(
    liveMedia(
      content.images?.heroCephe || content.images?.ogImage,
      SITE_PHOTOS.gallery
    )
  );

  const telCafe = content.iletisim?.telefon || "0530 608 90 51";
  const telTesis = content.iletisim?.telefon2 || "0532 449 45 99";
  const telCafeHref = phoneToTelHref(telCafe);
  const telTesisHref = phoneToTelHref(telTesis);
  const waHref = buildWhatsappUrl(content.iletisim?.whatsapp || telCafe, "Merhaba, Petra Cafe & Restaurant hakkında bilgi ve rezervasyon için yazıyorum.");

  const features = [
    {
      icon: Coffee,
      title: "Zengin Serpme Kahvaltı",
      desc: "Taş fırından taze çıkan pişiler, köy peynirleri, sahanda sucuklu yumurta, taze reçeller ve sınırsız demlik çay eşliğinde güne harika bir başlangıç.",
      tag: "08:00 – 14:00"
    },
    {
      icon: UtensilsCrossed,
      title: "Seçkin Dünya Mutfağı & Izgaralar",
      desc: "Usta şeflerimizden marine dana antrikot, el yapımı gurme burgerler, odun ateşinde İtalyan pizzalar, kremsi makarnalar ve taze salatalar.",
      tag: "Öğle & Akşam"
    },
    {
      icon: Waves,
      title: "Pool & Beach Kulübü",
      desc: "09:00 – 18:00 saatleri arasında tertemiz yetişkin ve çocuk havuzu, konforlu şezlonglar, VIP localar ve cankurtaran güvencesiyle tatil keyfi.",
      tag: "Yaz Sezonu"
    },
    {
      icon: Flame,
      title: "İtalyan Tatlıları & Nargile",
      desc: "Hakiki İtalyan mascarpone ile hazırlanan tiramisu, cannoli, imza kokteyller ve birinci sınıf premium tütünlerle zengin nargile menüsü.",
      tag: "Tüm Gün"
    },
  ];

  const parsedBlocks = parseArticleContent(h.body || []);

  return (
    <main className="min-h-screen bg-[#FBF8F1] text-[#0D0F0A] pt-24 pb-24 selection:bg-[#D9A441]/30">
      
      {/* 1. ÜST HERO & BREADCRUMB */}
      <section className="wrap max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-10">
        <nav className="flex items-center gap-2 text-xs font-bold text-[#8A9BB0] uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-[#D9A441] transition">Ana Sayfa</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#B8842C]">Hakkımızda</span>
        </nav>

        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-[#D9A441]/15 text-[#9E6E1A] border border-[#D9A441]/35 tracking-wide">
            <Sparkles className="h-3.5 w-3.5 text-[#D9A441]" />
            {cleanRawText(h.eyebrow || "HAKKIMIZDA & YAŞAM ALANIMIZ")}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0D0F0A] leading-[1.18] font-serif">
            {cleanRawText(h.baslik || "Petra Yaşam Merkezi'nde Cafe & Restaurant Deneyimi")}
          </h1>
          {h.lead && (
            <p className="text-base sm:text-lg text-[#524D41] leading-relaxed font-medium pt-1">
              {formatInlineText(h.lead)}
            </p>
          )}
        </div>
      </section>

      {/* 2. ANA HİKAYE VE VİTRİN KARTI */}
      <section className="wrap max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Sol Kolon: Biçimlendirilmiş Hikaye Metni */}
          <div className="lg:col-span-7 space-y-5 text-[#2D2A24]">
            
            {h.answerMetin && (
              <div className="rounded-2xl border border-[#D9A441]/35 bg-[#F5EFE3] p-5 shadow-sm space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-[#B8842C]" />
                  <b className="text-xs font-extrabold text-[#9E6E1A] uppercase tracking-wider">
                    {cleanRawText(h.answerBaslik || "Kısaca Petra")}
                  </b>
                </div>
                <p className="text-sm text-[#3E3A32] leading-relaxed font-medium">
                  {formatInlineText(h.answerMetin)}
                </p>
              </div>
            )}

            {/* Hikaye Paragrafları */}
            <div className="space-y-4 pt-1">
              {parsedBlocks.map((block, idx) => {
                if (block.type === "h1") {
                  return (
                    <h2
                      key={idx}
                      className="text-2xl sm:text-3xl font-black text-[#0D0F0A] font-serif pt-4 pb-1 border-b border-[#0D0F0A]/10"
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
                      className="border-l-4 border-[#D9A441] pl-4 py-2.5 my-3 italic text-[#5A554A] bg-[#F4EEE1]/60 rounded-r-xl"
                    >
                      {formatInlineText(block.text || "")}
                    </blockquote>
                  );
                }
                return (
                  <p key={idx} className="text-base leading-relaxed text-[#38342C]">
                    {formatInlineText(block.text || "")}
                  </p>
                );
              })}
            </div>

            {/* İstatistik & Güven Rozetleri */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-6 border-t border-[#0D0F0A]/10">
              <div className="p-4 rounded-2xl bg-white border border-[#0D0F0A]/08 shadow-sm">
                <span className="text-xl sm:text-2xl font-black text-[#B8842C] block">08:00 – 02:00</span>
                <span className="text-xs font-bold text-[#6E6A5C] mt-1 block">Cafe & Restoran Açık</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#0D0F0A]/08 shadow-sm">
                <span className="text-xl sm:text-2xl font-black text-[#B8842C] block">09:00 – 18:00</span>
                <span className="text-xs font-bold text-[#6E6A5C] mt-1 block">Havuz & Beach Kulübü</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#0D0F0A]/08 shadow-sm col-span-2 sm:col-span-1">
                <span className="text-xl sm:text-2xl font-black text-[#B8842C] block">240+ Çeşit</span>
                <span className="text-xs font-bold text-[#6E6A5C] mt-1 block">Zengin Dünya Menüsü</span>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Görsel & Hızlı İletişim Kartı */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <SafeImg
                src={img}
                alt="Petra Yaşam Merkezi Cafe Restaurant"
                fallback={SITE_PHOTOS.interior}
                width={900}
                height={675}
                className="w-full h-[360px] sm:h-[420px] object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#D9A441]/40 shadow-xl flex items-center justify-between">
                <div>
                  <b className="text-base font-extrabold text-[#0D0F0A] block">{cleanRawText(h.badgeBaslik || "Petra")}</b>
                  <span className="text-xs font-bold text-[#B8842C]">{cleanRawText(h.badgeAlt || "Cafe · Restaurant · Pool")}</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg block mb-0.5">
                    <Star className="h-3 w-3 fill-emerald-700 text-emerald-700" />
                    4.6 ★ (94+ Yorum)
                  </span>
                  <span className="text-[11px] text-[#6E6A5C] font-semibold">Çekmeköy Taşdelen</span>
                </div>
              </div>
            </div>

            {/* İletişim & Hat Bilgileri */}
            <div className="p-5 rounded-2xl bg-white border border-[#0D0F0A]/10 shadow-sm space-y-3.5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0D0F0A] flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#D9A441]" />
                Adres ve İletişim Hatları
              </h4>
              <p className="text-xs text-[#5A554A] leading-relaxed font-medium">
                Megakent Sitesi, Turgut Özal Cad, Selen Sk. No:1/O, Petra Yaşam Merkezi, Taşdelen, Çekmeköy / İstanbul
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <a
                  href={`tel:${telCafeHref}`}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0D0F0A] text-white text-xs font-bold hover:bg-[#2A2820] transition"
                >
                  <Phone className="h-3.5 w-3.5 text-[#D9A441]" />
                  <span>Kafe: {telCafe}</span>
                </a>
                <a
                  href={`tel:${telTesisHref}`}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#141E2E] text-white text-xs font-bold hover:bg-[#1E2E44] transition"
                >
                  <Phone className="h-3.5 w-3.5 text-[#D9A441]" />
                  <span>Tesis: {telTesis}</span>
                </a>
              </div>

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#25D366] text-white text-xs font-extrabold hover:bg-[#1EBE5D] transition shadow-sm"
              >
                WhatsApp'tan Doğrudan Yazın
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 3. DÖRT ANA DENEYİM SÜTUNU */}
      <section className="wrap max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#B8842C] block">
            AYRICALIKLI YAŞAM
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D0F0A] font-serif">
            Petra'da Sizi Neler Bekliyor?
          </h2>
          <p className="text-sm text-[#6E6A5C]">
            Günün her anına özel lezzetler ve huzurlu sosyal alanlar.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-[#0D0F0A]/08 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#D9A441]/15 text-[#9E6E1A] flex items-center justify-center group-hover:bg-[#D9A441] group-hover:text-[#0D0F0A] transition">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-extrabold text-[#9E6E1A] bg-[#F5EFE3] px-3 py-1 rounded-full border border-[#D9A441]/25">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0D0F0A] mb-2 font-serif">{item.title}</h3>
                  <p className="text-sm text-[#5A554A] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. REZERVASYON & ÖZEL GÜNLER CTA */}
      <section className="wrap max-w-5xl mx-auto px-4 sm:px-6 pt-4">
        <div className="rounded-3xl bg-[#141E2E] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-8 border border-white/10">
          <div className="max-w-xl space-y-3 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#D9A441] uppercase tracking-wider">
              <CalendarCheck className="h-4 w-4" />
              REZERVASYON & ÖZEL DAVETLER
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              Masanızı veya Locanızı Hemen Ayırtın
            </h3>
            <p className="text-sm text-white/75 leading-relaxed">
              Hafta sonu serpme kahvaltı, akşam yemeği veya havuz başı VIP localarımız için yerinizi ayırtın. Doğum günü ve özel kutlamalarınız için bizi arayabilirsiniz.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/#rezervasyon"
              className="px-7 py-3.5 rounded-xl bg-[#D9A441] text-[#0D0F0A] font-extrabold text-sm hover:bg-[#E5B555] transition shadow-lg w-full sm:w-auto text-center"
            >
              Online Rezervasyon Yap
            </Link>
            <Link
              href="/menu"
              className="px-6 py-3.5 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition border border-white/15 w-full sm:w-auto text-center"
            >
              Menüyü İncele
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
