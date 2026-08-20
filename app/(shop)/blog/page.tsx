import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/db/content";
import { phoneToTelHref } from "@/lib/content/contact-utils";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import SafeImg from "@/components/site/SafeImg";
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, Phone, UtensilsCrossed } from "lucide-react";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent();
  const b = content.sayfalar?.blog;
  const title = b?.baslik || "Blog & Rehber";
  const description =
    b?.lead ||
    "Petra Cafe Restaurant — Lezzet, kahvaltı, havuz, etkinlik ve rezervasyon rehberleri.";
  return {
    title,
    description,
    alternates: { canonical: "/blog" },
    openGraph: {
      title: `${title} | Petra Cafe Restaurant`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Petra Cafe Restaurant`,
      description,
    },
  };
}

export default async function BlogIndexPage() {
  const content = await getPublicContent();
  const b = content.sayfalar?.blog;
  const posts = (content.makaleler || []).filter((m) => m.yayinda !== false);
  const tel = content.iletisim?.telefon || "0530 608 90 51";
  const telHref = phoneToTelHref(
    content.iletisim?.telefonHam || content.iletisim?.telefon || "05306089051"
  );

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      {/* Ekmek Kırıntısı (Breadcrumbs) */}
      <nav className="flex items-center gap-2 text-xs font-medium text-[#8A9BB0] mb-8" aria-label="Sayfa yolu">
        <Link href="/" className="hover:text-[#C8703A] transition">
          Ana Sayfa
        </Link>
        <span>/</span>
        <span className="text-[#EEE9E0] font-semibold" aria-current="page">
          Blog
        </span>
      </nav>

      {/* Hero Başlık Bölümü */}
      <header className="mb-14 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D9A441]/30 bg-[#D9A441]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A441] mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          {b?.eyebrow || "PETRA JOURNAL"}
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8F6F0] mb-5 leading-[1.15]">
          {b?.baslik || "Petra Defteri & Haberler"}
        </h1>
        <p className="text-base sm:text-lg text-[#9EABB8] leading-relaxed max-w-2xl mx-auto">
          {b?.lead ||
            "Gastronomi hikâyeleri, mevsimsel lezzetler, havuz keyfi ve rezervasyon rehberleri."}
        </p>
      </header>

      {!posts.length ? (
        <div className="rounded-3xl border border-white/[0.08] bg-[#121824]/60 p-12 text-center text-[#8A9BB0]">
          <BookOpen className="h-10 w-10 text-[#D9A441] mx-auto mb-3 opacity-80" />
          <p className="text-base font-medium">Henüz yayınlanmış yazı bulunmuyor.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Öne Çıkan Yazı (Featured Article) */}
          {featuredPost && (
            <section aria-label="Öne Çıkan Yazı">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group relative block overflow-hidden rounded-3xl border border-white/[0.08] bg-[#121824]/80 transition-all duration-300 hover:border-[#D9A441]/40 hover:shadow-2xl hover:shadow-[#D9A441]/10"
              >
                <div className="grid lg:grid-cols-12 gap-0">
                  {/* Görsel */}
                  <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[320px] overflow-hidden">
                    <SafeImg
                      src={resolveMediaUrl(liveMedia(featuredPost.kapak, SITE_PHOTOS.interior)) || SITE_PHOTOS.interior}
                      alt={featuredPost.baslik}
                      fallback={SITE_PHOTOS.interior}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-transparent to-transparent lg:hidden" />
                  </div>

                  {/* Metin Alanı */}
                  <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="rounded-full bg-[#D9A441]/20 border border-[#D9A441]/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#D9A441]">
                          {featuredPost.kategori || "Öne Çıkan"}
                        </span>
                        {featuredPost.okumaSuresi && (
                          <span className="flex items-center gap-1 text-xs text-[#8A9BB0]">
                            <Clock className="h-3.5 w-3.5 text-[#D9A441]" />
                            {featuredPost.okumaSuresi}
                          </span>
                        )}
                      </div>

                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F6F0] mb-4 group-hover:text-[#D9A441] transition-colors duration-200 leading-snug">
                        {featuredPost.baslik}
                      </h2>

                      {featuredPost.ozet && (
                        <p className="text-sm sm:text-base text-[#9EABB8] line-clamp-3 leading-relaxed mb-6">
                          {featuredPost.ozet}
                        </p>
                      )}
                    </div>

                    <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
                      {featuredPost.tarih ? (
                        <span className="flex items-center gap-1.5 text-xs text-[#6B7A94]">
                          <Calendar className="h-3.5 w-3.5" />
                          {featuredPost.tarih}
                        </span>
                      ) : <span />}

                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D9A441] group-hover:translate-x-1 transition-transform duration-200">
                        Yazıyı Oku
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Diğer Makaleler Izgarası */}
          {regularPosts.length > 0 && (
            <section aria-label="Tüm Yazılar">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#F8F6F0] mb-6 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#D9A441]" />
                Tüm Yazılar
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {regularPosts.map((m) => {
                  const cover = resolveMediaUrl(liveMedia(m.kapak, SITE_PHOTOS.interior));
                  return (
                    <Link
                      key={m.slug}
                      href={`/blog/${m.slug}`}
                      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121824]/70 transition-all duration-300 hover:border-[#D9A441]/35 hover:bg-[#121824] hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div>
                        {/* Görsel */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A0D14]">
                          <SafeImg
                            src={cover || SITE_PHOTOS.interior}
                            alt={m.baslik}
                            fallback={SITE_PHOTOS.interior}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {m.kategori && (
                            <span className="absolute top-3 left-3 rounded-full bg-[#0A0D14]/80 backdrop-blur-md border border-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#D9A441]">
                              {m.kategori}
                            </span>
                          )}
                        </div>

                        {/* İçerik */}
                        <div className="p-5 sm:p-6">
                          <div className="flex items-center gap-3 text-xs text-[#6B7A94] mb-2.5">
                            {m.tarih && <span>{m.tarih}</span>}
                            {m.tarih && m.okumaSuresi && <span>·</span>}
                            {m.okumaSuresi && <span>{m.okumaSuresi}</span>}
                          </div>

                          <h3 className="font-serif text-lg font-bold text-[#F8F6F0] group-hover:text-[#D9A441] transition-colors duration-200 line-clamp-2 leading-snug mb-2">
                            {m.baslik}
                          </h3>

                          {m.ozet && (
                            <p className="text-xs sm:text-sm text-[#8A9BB0] line-clamp-2 leading-relaxed">
                              {m.ozet}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="px-5 sm:px-6 pb-5 pt-2 flex items-center justify-end">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#D9A441] group-hover:translate-x-1 transition-transform">
                          Okumaya devam et
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Lüks Rezervasyon & İletişim CTA Bandı */}
      <section className="mt-16 rounded-3xl border border-[#D9A441]/25 bg-gradient-to-br from-[#1A2333] via-[#121824] to-[#0A0D14] p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 bg-[radial-gradient(ellipse_at_center,rgba(217,164,65,0.15),transparent_70%)] blur-2xl"
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-[#D9A441]/10 text-[#D9A441] border border-[#D9A441]/20 mb-4">
            <UtensilsCrossed className="h-6 w-6" />
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#F8F6F0] mb-3">
            {b?.ctaBaslik || "Keyifli Bir Akşam İçin Yerinizi Ayırtın"}
          </h2>
          <p className="text-sm sm:text-base text-[#9EABB8] leading-relaxed mb-8">
            {b?.ctaMetin ||
              "Taşdelen'in huzurlu atmosferinde serpme kahvaltı, dünya mutfağı ve havuz keyfi için hemen masa rezervasyonu oluşturun."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#rezervasyon"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D9A441] hover:bg-[#E5B558] text-[#0A0D14] px-7 py-3.5 text-sm font-semibold transition-all duration-200 shadow-lg shadow-[#D9A441]/20 hover:scale-[1.02]"
            >
              Masa Rezervasyonu Yap
              <ArrowRight className="h-4 w-4" />
            </Link>

            {telHref && (
              <a
                href={`tel:${telHref}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-[#EEE9E0] px-6 py-3.5 text-sm font-semibold transition"
              >
                <Phone className="h-4 w-4 text-[#D9A441]" />
                {tel}
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
