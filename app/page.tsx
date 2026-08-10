import type { Metadata, Viewport } from "next";
import { getPublicContent } from "@/lib/db/content";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import HomeShell from "@/components/home/HomeShell";
import HomeDuyuru from "@/components/home/HomeDuyuru";
import HomeHero from "@/components/home/HomeHero";
import HomeMarquee from "@/components/home/HomeMarquee";
import HomeAbout from "@/components/home/HomeAbout";
import HomeMenuPreview from "@/components/home/HomeMenuPreview";
import HomePasta from "@/components/home/HomePasta";
import HomeGallery from "@/components/home/HomeGallery";
import HomeReviews from "@/components/home/HomeReviews";
import HomeFaq from "@/components/home/HomeFaq";
import HomeContact from "@/components/home/HomeContact";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent();
  const seo = content.seo || ({} as typeof content.seo);
  const title = seo.title || "Taşdelen Fırıncı";
  const description =
    seo.description ||
    "Çekmeköy Taşdelen'de taze ekmek, pasta ve özel tasarım pasta siparişi.";
  const ogImage = resolveMediaUrl(
    content.images?.ogImage || content.images?.heroCephe || content.images?.logo
  );
  const canonical = seo.canonicalUrl || "https://www.firincitasdelen.com.tr/";

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      siteName: seo.siteName || "Taşdelen Fırıncı",
      url: canonical,
      type: "website",
      locale: "tr_TR",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      images: ogImage ? [ogImage] : undefined,
    },
    icons: content.images?.favicon
      ? { icon: resolveMediaUrl(content.images.favicon) }
      : undefined,
  };
}

export async function generateViewport(): Promise<Viewport> {
  const content = await getPublicContent();
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: content.seo?.themeColor || "#12140E",
  };
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function HomePage() {
  const content = await getPublicContent();
  const faqItems = content.sss?.items || [];
  const brand =
    content.brand?.displayName || content.seo?.siteName || "Taşdelen Fırıncı";
  const tel = content.iletisim?.telefonHam || content.iletisim?.telefon || "";
  const canonical =
    content.seo?.canonicalUrl || "https://www.firincitasdelen.com.tr/";
  const logo = resolveMediaUrl(content.images?.logo) || undefined;
  const adres = [
    content.iletisim?.adresSatir1,
    content.iletisim?.adresSatir2,
    content.iletisim?.adresSatir3,
  ]
    .filter(Boolean)
    .join(", ");

  const bakeryLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "@id": `${canonical.replace(/\/$/, "")}/#bakery`,
    name: brand,
    url: canonical,
    image: logo,
    telephone: tel || undefined,
    address: adres
      ? {
          "@type": "PostalAddress",
          streetAddress: content.iletisim?.adresSatir1 || adres,
          addressLocality: "Çekmeköy",
          addressRegion: "İstanbul",
          addressCountry: "TR",
        }
      : undefined,
    openingHoursSpecification: content.iletisim?.saatler
      ? {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          description: content.iletisim.saatler,
        }
      : undefined,
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand,
    url: canonical,
  };

  const faqLd =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.soru,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.cevap,
            },
          })),
        }
      : null;

  const poster = resolveMediaUrl(
    content.images?.heroPoster ||
      content.images?.heroCephe ||
      "/assets/img/hero-cephe.webp"
  );
  const mobile = resolveMediaUrl(
    content.images?.heroMobile || "/assets/img/hero-mobile.webp"
  );

  return (
    <HomeShell content={content} heroPoster={poster} heroMobile={mobile}>
      <JsonLd data={bakeryLd} />
      <JsonLd data={websiteLd} />
      {faqLd ? <JsonLd data={faqLd} /> : null}

      <HomeDuyuru aktif={content.duyuru?.aktif} metin={content.duyuru?.metin} />
      <HomeHero content={content} />
      <HomeMarquee items={content.marquee || []} />
      <HomeAbout content={content} />
      <HomeMenuPreview content={content} />
      <HomePasta pasta={content.pasta} />
      <HomeGallery bolum={content.bolumlar?.galeri} items={content.galeri || []} />
      <HomeReviews
        items={content.yorumlar || []}
        bolum={content.bolumlar?.yorumlar}
        meta={content.yorumlarMeta}
      />
      <HomeFaq bolum={content.bolumlar?.sss} items={faqItems} />
      <HomeContact content={content} />
    </HomeShell>
  );
}
