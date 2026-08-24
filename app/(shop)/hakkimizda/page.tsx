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
  CalendarCheck, 
  Flame, 
  Coffee, 
  Clock, 
  ShieldCheck, 
  Award, 
  Users, 
  PartyPopper, 
  Car, 
  Wifi, 
  Sun, 
  CheckCircle2, 
  MessageCircle, 
  HelpCircle, 
  HeartHandshake, 
  Cake, 
  Heart, 
  Briefcase,
  ChevronRight,
  ArrowUpRight
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
    eyebrow: "HAKKIMIZDA & YAŞAM MERKEZİ",
    baslik: "Petra Yaşam Merkezi'nde Cafe & Restaurant",
    answerBaslik: "Kısaca Petra",
    answerMetin: "Petra Cafe Restaurant, Çekmeköy Taşdelen’de Petra Yaşam Merkezi içinde dünya mutfağı, serpme kahvaltı, İtalyan tatlı ve kokteyl, kahve, nargile ve açık havuz–plaj kulübü sunar.",
    lead: "Keyif, konfor ve kalite — sabahın ilk ışıklarındaki kahvaltıdan akşam yemeğine, havuz başı serinliğinden en özel kutlamalara.",
    body: [
      "Petra Cafe Restaurant; İstanbul Çekmeköy Taşdelen'de, Petra Yaşam Merkezi içerisinde gastronomi, dinlenme ve sosyal yaşamı kusursuz bir uyumla buluşturan ayrıcalıklı bir mekândır. Ferah iç salonları, havuz başı açık terası ve zengin menüsüyle Petra; yalnızca bir yeme-içme alanı değil, sevdiklerinizle paylaştığınız anları unutulmaz kılan seçkin bir yaşam merkezidir.",
      "Günün ilk saatlerinde fırından yeni çıkmış sıcak pişiler, yöresel peynirler ve sahanda sıcacık lezzetlerle hazırlanan zengin serpme kahvaltımız güne eşsiz bir başlangıç sunar. Öğle ve akşam saatlerinde ise usta şeflerimizin elinden çıkan marine dana antrikotlar, taş fırında pişen çıtır pizzalar, taze el yapımı makarnalar ve gurme burgerler menümüzün baş tacıdır.",
      "Yaz aylarında 09:00 – 18:00 saatleri arasında hizmet veren açık yüzme havuzumuz, çocuk havuzumuz, konforlu şezlonglarımız ve VIP localarımızla şehir hayatının stresinden uzak, tatil konseptinde bir serinlik vadediyoruz.",
      "Doğum günleri, evlilik teklifleri, mezuniyet kutlamaları ve kurumsal yemekler için profesyonel ekibimizle özel masa süslemeleri ve kişiye özel menü planlamaları sunuyoruz."
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
  const telTesis = content.iletisim?.telefon2 || "0532 449 45 99";
  const telCafeHref = phoneToTelHref(telCafe);
  const telTesisHref = phoneToTelHref(telTesis);
  const waHref = buildWhatsappUrl(
    content.iletisim?.whatsapp || telCafe, 
    "Merhaba, Petra Cafe Restaurant & Yaşam Merkezi hakkında bilgi ve rezervasyon için yazıyorum."
  );

  // İstatistikler (Admin dinamik + fallback)
  const statsList = (h.stats && h.stats.length > 0) ? h.stats : (h.ozet && h.ozet.length > 0 ? h.ozet : [
    { b: "08:00 – 02:00", span: "Cafe & Restoran Açık", sub: "Haftanın 7 günü kesintisiz lezzet" },
    { b: "240+ Çeşit", span: "Zengin Dünya Menüsü", sub: "Kahvaltı, ızgara, pizza ve tatlılar" },
    { b: "09:00 – 18:00", span: "Açık Havuz & Beach", sub: "Yetişkin & çocuk havuzu, localar" },
    { b: "1000+ m²", span: "Sosyal Yaşam Alanı", sub: "Özel davet ve kutlama terasları" }
  ]);
  const statIcons = [Clock, UtensilsCrossed, Waves, Sparkles];

  // 4 Temel Deneyim Alanı (Admin dinamik + fallback)
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

  // Bir Günün Petra'daki Akışı (Admin dinamik + fallback)
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

  // Temel Değerler / Standartlar (Admin dinamik + fallback)
  const defaultValues = [
    {
      title: "Tavizsiz Hijyen & Kalite",
      desc: "Mutfaktan havuza kadar her alanda düzenli denetimler, laboratuvar onaylı su analizleri ve en taze güvenilir gıda hammaddeleri."
    },
    {
      title: "Usta Şefler & Zengin Menü",
      desc: "Her biri kendi alanında uzman mutfak ve bar ekibimizin reçeteleriyle hazırlanan 240'ı aşkın özgün lezzet alternatifi."
    },
    {
      title: "Güler Yüzlü Misafirperverlik",
      desc: "Sizi ve ailenizi her gelişinizde evinizde hissettiren samimi, hızlı ve özenli hizmet anlayışı."
    },
    {
      title: "Her Yaşa Uygun Yaşam Alanı",
      desc: "Çocuk havuzundan sakin çalışma alanlarına, arkadaş buluşmalarından özel kutlama masalarına kadar herkese açık ferah atmosfer."
    }
  ];
  const valuesList = (h.values && h.values.length > 0) ? h.values : defaultValues;
  const valueIcons = [ShieldCheck, Award, HeartHandshake, Users];

  // Tesis İmkânları (Admin dinamik + fallback)
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

  // Sıkça Sorulan Sorular (Admin dinamik + fallback)
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

  // Özel Günler / Organizasyonlar (Admin dinamik + fallback)
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

  const parsedBlocks = parseArticleContent(h.body || []);

  return (
    <div id="hakkimizda-page" className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black font-sans pb-20 w-full">
      
      {/* 1. HERO ÜST VİTRİN VE BREADCRUMB (THE BARBER YASIN STİLİ) */}
      <div className="relative pt-[120px] bg-[#0A0A0A] overflow-hidden group">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 grayscale transition-transform duration-[4s] ease-out group-hover:scale-105"
          style={{ backgroundImage: `url('${img || "/assets/cms/hero-ic.webp"}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#0A0A0A]/70 to-[#0A0A0A]/40 z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 py-14 md:py-20">
          <nav className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-5">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Ana Sayfa
            </Link>
            <ChevronRight size={10} className="text-white/30" />
            <span className="text-white/80">Hakkımızda</span>
          </nav>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white tracking-tight leading-[1.1] mb-4">
            {cleanRawText(h.baslik || "Hakkımızda")}
          </h1>

          <p className="text-white/55 text-base md:text-xl font-light max-w-2xl leading-relaxed">
            {cleanRawText(h.lead || "Sade, temiz ve profesyonel hizmet anlayışımızla tanışın.")}
          </p>

          <div className="flex items-center gap-3 mt-8">
            <span className="w-12 h-px bg-white/50" />
            <span className="w-3 h-px bg-white/20" />
          </div>
        </div>

        <div className="relative z-10 h-px bg-white/[0.08]" />
      </div>

      {/* 2. ANA HİKAYE VE VİTRİN BÖLÜMÜ (2 SÜTUN: SOL STICKY GÖRSEL, SAĞ PROSE HİKAYE) */}
      <section className="relative py-20 md:py-28 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Sol Sütun: Sticky Lüks Fotoğraf Kartı */}
            <div className="relative h-[560px] lg:h-[640px] rounded-2xl overflow-hidden border border-white/10 group lg:sticky lg:top-32 shadow-2xl">
              <div 
                className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-[1.5s] group-hover:scale-105"
                style={{ backgroundImage: `url('${img}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8 z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#22C55E]">
                    ŞU AN AÇIK · 08:00 – 02:00
                  </span>
                </div>
                <p className="text-2xl md:text-3xl font-serif font-light text-white">
                  {cleanRawText(h.badgeBaslik || "Petra Yaşam Merkezi")}
                </p>
                <p className="text-white/60 font-bold tracking-[0.25em] uppercase text-[10px] mt-1.5 flex items-center gap-2">
                  <MapPin size={12} className="text-[#D4AF37]" />
                  <span>Taşdelen, Çekmeköy / İstanbul</span>
                </p>

                {/* Hızlı İletişim Butonları */}
                <div className="flex flex-wrap items-center gap-2.5 mt-5 pt-5 border-t border-white/10">
                  <a
                    href={`tel:${telCafeHref}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold tracking-wide transition-all"
                  >
                    <Phone size={13} className="text-[#D4AF37]" />
                    <span>{telCafe}</span>
                  </a>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#4ADE80] text-xs font-semibold tracking-wide transition-all"
                  >
                    <MessageCircle size={13} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Sağ Sütun: Başlık, Kısaca & Editoryal Metin */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-[1px] bg-white/60" />
                <p className="text-[10px] font-bold tracking-[0.35em] text-white/60 uppercase">
                  {cleanRawText(h.eyebrow || "HAKKIMIZDA & YAŞAM FELSEFEMİZ")}
                </p>
              </div>

              <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-white mb-8 leading-[1.12]">
                {cleanRawText(h.baslik || "Petra Cafe Restaurant")}
              </h2>

              {/* Kısaca Kutusu (Öne Çıkan Bilgi) */}
              {h.answerMetin && (
                <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/10 mb-8 backdrop-blur-md">
                  <div className="flex items-center gap-2 mb-2 text-[#D4AF37]">
                    <Sparkles size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                      {cleanRawText(h.answerBaslik || "Kısaca")}
                    </span>
                  </div>
                  <p className="text-white/80 font-light text-base leading-relaxed m-0">
                    {formatInlineText(h.answerMetin)}
                  </p>
                </div>
              )}

              {/* Paragraflar */}
              <div className="prose prose-invert max-w-none text-white/60 font-light leading-relaxed space-y-5 text-base md:text-lg">
                {parsedBlocks.map((block, idx) => {
                  if (block.type === "h1" || block.type === "h2") {
                    return (
                      <h3
                        key={idx}
                        className="text-2xl md:text-3xl font-serif font-light text-white mt-10 mb-4 pt-6 border-t border-white/10"
                      >
                        {cleanRawText(block.text || "")}
                      </h3>
                    );
                  }
                  if (block.type === "h3") {
                    return (
                      <h4
                        key={idx}
                        className="text-xl font-serif text-[#D4AF37] mt-6 mb-2"
                      >
                        {cleanRawText(block.text || "")}
                      </h4>
                    );
                  }
                  if (block.type === "quote") {
                    return (
                      <blockquote
                        key={idx}
                        className="border-l-2 border-[#D4AF37] pl-5 py-2 my-6 italic text-white/80 bg-white/[0.02] rounded-r-xl"
                      >
                        {formatInlineText(block.text || "")}
                      </blockquote>
                    );
                  }
                  return (
                    <p key={idx} className="m-0 text-white/65 font-light leading-relaxed">
                      {formatInlineText(block.text || "")}
                    </p>
                  );
                })}
              </div>

              {/* 3 Ana Değer Sütunu (The Barber 3'lü Stat Grid Stili) */}
              <div className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-white/[0.08]">
                <div className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-serif font-medium text-white mb-1.5">
                    Gastronomi
                  </span>
                  <span className="text-[9px] text-white/40 font-bold uppercase tracking-[0.2em]">
                    Seçkin Dünya Mutfağı
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-serif font-medium text-white mb-1.5">
                    Pool & Beach
                  </span>
                  <span className="text-[9px] text-white/40 font-bold uppercase tracking-[0.2em]">
                    Açık Havuz & Teras
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-serif font-medium text-white mb-1.5">
                    Konfor
                  </span>
                  <span className="text-[9px] text-white/40 font-bold uppercase tracking-[0.2em]">
                    Seçkin Yaşam Alanı
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. RAKAMLARLA PETRA (4'LÜ MİNİMALİST KARTLAR) */}
      <section className="py-16 bg-[#080808] border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsList.map((st: any, i: number) => {
              const StatIcon = statIcons[i % statIcons.length] || Sparkles;
              return (
                <div 
                  key={i} 
                  className="p-7 rounded-2xl bg-[#0C0C0C] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl md:text-3xl font-serif font-light text-white tracking-tight">
                      {cleanRawText(st.b || "")}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#D4AF37]">
                      <StatIcon size={16} />
                    </div>
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-white/90 mb-1">
                      {cleanRawText(st.span || "")}
                    </span>
                    {st.sub && (
                      <span className="text-xs text-white/45 leading-relaxed block">
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

      {/* 4. 4 ANA YAŞAM DENEYİMİ (LÜKS MİNİMALİST KARTLAR) */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="max-w-xl mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-white/60" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
                AYRICALIKLI YAŞAM KONSEPTİ
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight leading-[1.15]">
              Petra'da Sizi Neler Bekliyor?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiencesList.map((item: any, i: number) => {
              const Icon = expIcons[i % expIcons.length] || UtensilsCrossed;
              const feats: string[] = Array.isArray(item.features) ? item.features : [];
              return (
                <div
                  key={i}
                  className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                        <Icon size={22} />
                      </div>
                      {item.hours && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 bg-white/[0.06] px-3 py-1.5 rounded-full border border-white/10">
                          {item.hours}
                        </span>
                      )}
                    </div>

                    {item.tag && (
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] block mb-2">
                        {item.tag}
                      </span>
                    )}

                    <h3 className="text-xl font-serif font-medium text-white mb-3">
                      {cleanRawText(item.title || "")}
                    </h3>

                    <p className="text-sm text-white/50 leading-relaxed font-light mb-6">
                      {cleanRawText(item.desc || "")}
                    </p>
                  </div>

                  {feats.length > 0 && (
                    <div className="pt-5 border-t border-white/[0.08] space-y-2">
                      {feats.map((feat, fidx) => (
                        <div key={fidx} className="flex items-center gap-2 text-xs text-white/70 font-light">
                          <CheckCircle2 size={13} className="text-[#D4AF37] shrink-0" />
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
      <section className="py-20 bg-[#080808] border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 block mb-3">
              24 SAAT YAŞAM DOLU
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight mb-3">
              Bir Günün Petra'daki Akışı
            </h2>
            <p className="text-white/45 text-sm md:text-base font-light">
              Sabahın ilk ışıklarından gecenin keyifli sohbetlerine uzanan gün boyu lezzet ve dinlenme.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineList.map((step: any, idx: number) => {
              const StepIcon = timelineIcons[idx % timelineIcons.length] || Sun;
              return (
                <div 
                  key={idx}
                  className="p-7 rounded-2xl bg-[#0C0C0C] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 bg-white/10 px-3 py-1 rounded-md">
                        {cleanRawText(step.time || "")}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-[#D4AF37]">
                        <StepIcon size={16} />
                      </div>
                    </div>

                    <h3 className="text-lg font-serif font-medium text-white mb-2">
                      {cleanRawText(step.title || "")}
                    </h3>

                    <p className="text-xs text-white/50 leading-relaxed font-light m-0">
                      {cleanRawText(step.desc || "")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. ÖZEL GÜNLER & ORGANİZASYON KUTUSU (LÜKS THE BARBER STİLİ) */}
      <section className="py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="rounded-3xl bg-[#0A0A0A] border border-white/10 p-8 md:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative overflow-hidden">
            
            {/* Sol Alan: Başlık, Açıklama ve SVG İkonlu Rozetler */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <PartyPopper size={16} className="text-[#D4AF37]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                  ÖZEL GÜNLER & KUTLAMALAR
                </span>
              </div>

              <h3 className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight leading-[1.15] mb-5">
                {cleanRawText(eventsTitle)}
              </h3>

              <p className="text-white/60 font-light text-base leading-relaxed mb-8 max-w-xl">
                {cleanRawText(eventsLead)}
              </p>

              {/* EMOJİSİZ, LÜKS SVG İKONLU ROZETLER */}
              <div className="flex flex-wrap gap-3">
                {eventsTags.map((tag: string, tidx: number) => {
                  const TagIcon = getEventTagIcon(tag);
                  return (
                    <div 
                      key={tidx} 
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/15 text-white/85 text-xs font-medium tracking-wide hover:border-white/30 transition-colors"
                    >
                      <TagIcon size={14} className="text-[#D4AF37]" />
                      <span>{cleanRawText(tag)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sağ Alan: Rezervasyon & Teklif Kartı */}
            <div className="bg-[#050505] p-8 md:p-10 rounded-2xl border border-white/10 space-y-6">
              <div>
                <h4 className="text-xl md:text-2xl font-serif font-light text-white mb-2">
                  Etkinlik Detayları & Rezervasyon
                </h4>
                <p className="text-white/50 text-sm font-light leading-relaxed m-0">
                  Kişi sayısı ve etkinlik tarihinizi ileterek organizasyon ekibimizden hızlıca özel menü ve süsleme teklifi alabilirsiniz.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#25D366] text-[#0B140C] font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#20BD5A] transition-all shadow-lg"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp ile Teklif Alın</span>
                </a>

                <a
                  href={`tel:${telCafeHref}`}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] transition-all"
                >
                  <Phone size={15} className="text-[#D4AF37]" />
                  <span>Telefon: {telCafe}</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. TESİS İMKÂNLARI (6'LI MİNİMALİST KARTLAR) */}
      <section className="py-16 bg-[#080808] border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 block mb-2">
              KONFOR VE OLANAKLAR
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-light text-white">
              Tesis İmkânlarımız
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {amenitiesList.map((label: string, idx: number) => {
              const AmenityIcon = amenityIcons[idx % amenityIcons.length] || ShieldCheck;
              return (
                <div 
                  key={idx}
                  className="p-5 rounded-xl bg-[#0C0C0C] border border-white/[0.08] flex items-center gap-4 hover:border-white/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <AmenityIcon size={18} />
                  </div>
                  <span className="text-sm font-medium text-white/85">
                    {cleanRawText(label)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. SIKÇA SORULAN SORULAR */}
      <section className="py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 block mb-2">
              MERAK EDİLENLER
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white mb-2">
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-white/45 text-sm font-light">
              Rezervasyon, havuz ve çalışma saatleri hakkında en çok sorulanlar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqsList.map((faq: any, idx: number) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-[#0A0A0A] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col gap-3"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <h3 className="text-base font-serif font-medium text-white m-0">
                    {cleanRawText(faq.q || "")}
                  </h3>
                </div>
                <p className="text-sm text-white/50 font-light leading-relaxed m-0 pl-7">
                  {cleanRawText(faq.a || "")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. ALT ÇAĞRI & REZERVASYON CTA (THE BARBER YASIN STİLİ) */}
      <section className="py-20 bg-[#080808] border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#D4AF37] block">
              REZERVASYON & İLETİŞİM
            </span>

            <h2 className="text-3xl md:text-6xl font-serif font-light text-white tracking-tight leading-[1.1]">
              Masanızı veya Locanızı Hemen Ayırtın
            </h2>

            <p className="text-white/50 text-sm md:text-base font-light leading-relaxed max-w-lg mx-auto">
              Hafta sonu zengin serpme kahvaltı, şefin spesiyalleriyle akşam yemeği veya açık havuzda VIP localarımız için yerinizi ayırtın.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/#rezervasyon"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-white/40 text-white hover:bg-white hover:text-black rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-xl"
              >
                Online Masa Ayırtın
              </Link>
              <Link
                href="/menu"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-white/20 text-white/70 hover:text-white hover:border-white/40 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300"
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
