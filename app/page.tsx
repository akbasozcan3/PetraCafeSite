import type { Metadata, Viewport } from "next";
import { getPublicContent } from "@/lib/db/content";
import { resolveMediaUrl, withHeroCacheBust } from "@/lib/admin/media-url";
import HomeShell from "@/components/home/HomeShell";
import HomeDuyuru from "@/components/home/HomeDuyuru";
import HomeHero from "@/components/home/HomeHero";
import HomeMarquee from "@/components/home/HomeMarquee";
import HomeAbout from "@/components/home/HomeAbout";
import HomeServices from "@/components/home/HomeServices";
import HomeVisit from "@/components/home/HomeVisit";
import HomeMenuPreview from "@/components/home/HomeMenuPreview";
import HomePasta from "@/components/home/HomePasta";
import HomeGallery from "@/components/home/HomeGallery";
import HomeReviews from "@/components/home/HomeReviews";
import HomeFaq from "@/components/home/HomeFaq";
import HomeReservation from "@/components/home/HomeReservation";
import HomeContact from "@/components/home/HomeContact";
import { publicOrigin, parseGeo } from "@/lib/site/canonical";
import { siteFaviconHref } from "@/lib/content/favicon";
import { buildInstagramUrl } from "@/lib/content/contact-utils";
import { formatHoursFaq, isHoursQuestion, openingHoursJsonLd } from "@/lib/content/hours";
import { isHomeSectionOn } from "@/lib/content/sections";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent();
  const seo = content.seo || ({} as typeof content.seo);
  const title = seo.title || "Petra Cafe Restaurant";
  const description =
    seo.description ||
    "Çekmeköy Taşdelen'de dünya mutfağı, serpme kahvaltı, İtalyan tatlı ve kokteyl, kahve, nargile ve havuz.";
  const ogImage = resolveMediaUrl(
    content.images?.ogImage || content.images?.heroCephe || content.images?.logo
  );
  const canonical = publicOrigin(content) + "/";

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      siteName: seo.siteName || "Petra Cafe Restaurant",
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
    icons: { icon: [{ url: siteFaviconHref(content) }] },
  };
}

export async function generateViewport(): Promise<Viewport> {
  const content = await getPublicContent();
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: content.theme?.char || content.seo?.themeColor || "#12140E",
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
  const hoursAnswer = formatHoursFaq(content.iletisim);
  const faqItems = (content.sss?.items || [])
    .filter(
      (item) => String(item.soru || "").trim() && String(item.cevap || "").trim()
    )
    .map((item) =>
      isHoursQuestion(item.soru) ? { ...item, cevap: hoursAnswer } : item
    );
  const brand =
    content.brand?.displayName || content.seo?.siteName || "Petra Cafe Restaurant";
  const tel = content.iletisim?.telefonHam || content.iletisim?.telefon || "";
  const canonical = `${publicOrigin(content)}/`;
  const logo = resolveMediaUrl(content.images?.logo) || undefined;
  const adres = [
    content.iletisim?.adresSatir1,
    content.iletisim?.adresSatir2,
    content.iletisim?.adresSatir3,
  ]
    .filter(Boolean)
    .join(", ");
  const hoursJsonLd = openingHoursJsonLd(content.iletisim);
  const geo = parseGeo(content.iletisim?.koordinat);
  const cuisineList = (content.seo?.servesCuisine || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const ig =
    content.iletisim?.instagramUrl ||
    (content.iletisim?.instagram
      ? buildInstagramUrl(content.iletisim.instagram)
      : "");

  const restaurantLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${canonical.replace(/\/$/, "")}/#restaurant`,
    servesCuisine: cuisineList.length ? cuisineList : undefined,
    priceRange: content.seo?.priceRange || undefined,
    acceptsReservations: content.seo?.acceptsReservations !== false,
    name: brand,
    url: canonical,
    image: logo,
    telephone: tel || undefined,
    sameAs: ig ? [ig] : undefined,
    address: adres
      ? {
          "@type": "PostalAddress",
          streetAddress: content.iletisim?.adresSatir1 || adres,
          addressLocality: content.seo?.addressLocality || undefined,
          addressRegion: content.seo?.addressRegion || undefined,
          addressCountry: content.seo?.addressCountry || "TR",
        }
      : undefined,
    geo: geo
      ? {
          "@type": "GeoCoordinates",
          latitude: geo.latitude,
          longitude: geo.longitude,
        }
      : undefined,
    hasMenu: `${canonical.replace(/\/$/, "")}/menu`,
    openingHoursSpecification: hoursJsonLd.length
      ? hoursJsonLd
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

  const poster = withHeroCacheBust(
    content.images?.heroPoster ||
      content.images?.heroCephe ||
      "/assets/img/hero-cephe.webp"
  );
  const mobile = withHeroCacheBust(
    content.images?.heroMobile ||
      content.images?.heroPoster ||
      content.images?.heroCephe ||
      "/assets/img/hero-mobile.webp"
  );

  return (
    <HomeShell
      content={content}
      heroPoster={poster}
      heroMobile={mobile}
      enableHero={isHomeSectionOn(content, "hero")}
    >
      <JsonLd data={restaurantLd} />
      <JsonLd data={websiteLd} />
      {faqLd ? <JsonLd data={faqLd} /> : null}

      {isHomeSectionOn(content, "duyuru") ? (
        <HomeDuyuru aktif={content.duyuru?.aktif} metin={content.duyuru?.metin} />
      ) : null}
      {isHomeSectionOn(content, "hero") ? <HomeHero content={content} /> : null}
      {isHomeSectionOn(content, "marquee") ? (
        <HomeMarquee items={content.marquee || []} />
      ) : null}
      {isHomeSectionOn(content, "hizmetler") ? (
        <HomeServices content={content} />
      ) : null}
      {isHomeSectionOn(content, "hakkimizda") ? (
        <HomeAbout content={content} />
      ) : null}
      {isHomeSectionOn(content, "ziyaret") ? (
        <HomeVisit content={content} />
      ) : null}
      {isHomeSectionOn(content, "menu") ? (
        <HomeMenuPreview content={content} />
      ) : null}
      {isHomeSectionOn(content, "pasta") ? (
        <HomePasta pasta={content.pasta} />
      ) : null}
      {isHomeSectionOn(content, "galeri") ? (
        <HomeGallery bolum={content.bolumlar?.galeri} items={content.galeri || []} />
      ) : null}
      {isHomeSectionOn(content, "yorumlar") ? (
        <HomeReviews
          items={content.yorumlar || []}
          bolum={content.bolumlar?.yorumlar}
          meta={content.yorumlarMeta}
        />
      ) : null}
      {isHomeSectionOn(content, "sss") ? (
        <HomeFaq
          bolum={content.bolumlar?.sss}
          items={faqItems}
          image={content.images?.faq || content.images?.aboutInterior}
        />
      ) : null}
      {isHomeSectionOn(content, "rezervasyon") ? (
        <HomeReservation
          contactPhone={content.iletisim?.telefon || tel}
          iletisim={content.iletisim}
          bolum={content.bolumlar?.rezervasyon}
          copy={content.rezervasyon}
          image={content.images?.reservation || content.images?.aboutInterior}
        />
      ) : null}
      {isHomeSectionOn(content, "iletisim") ? (
        <HomeContact content={content} />
      ) : null}
    </HomeShell>
  );
}
