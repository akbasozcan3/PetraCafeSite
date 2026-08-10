import Link from "next/link";
import type { SiteContent } from "@/lib/content/types";
import { resolveHref } from "@/lib/site/resolveHref";
import { buildWhatsappUrl } from "@/lib/content/contact-utils";
import { resolveMediaUrl } from "@/lib/admin/media-url";

export default function SiteFooter({
  content,
}: {
  content: Pick<
    SiteContent,
    "footer" | "images" | "brand" | "waFloat" | "iletisim" | "legal"
  >;
}) {
  const footer = content.footer;
  const logo =
    resolveMediaUrl(content.images?.logo) || "/assets/img/logo.webp";
  const year = new Date().getFullYear();
  const brand =
    content.brand?.displayName || footer?.markaAdi || "Taşdelen Fırıncı";
  const wa = content.waFloat;
  const iletisim = content.iletisim;

  const kolonlar = footer?.kolonlar?.length
    ? footer.kolonlar
    : [
        {
          baslik: "Fırın",
          links: [
            { label: "Hakkımızda", href: "#hakkimizda" },
            { label: "Ürünler", href: "/urunler" },
            { label: "Özel Pastalar", href: "#pasta" },
            { label: "Galeri", href: "#galeri" },
            { label: "Blog", href: "/blog" },
          ],
        },
      ];

  const waHref =
    buildWhatsappUrl(
      iletisim?.whatsapp || iletisim?.telefonHam || iletisim?.telefon || "",
      wa?.onYazi || "Merhaba, sipariş vermek istiyorum."
    ) ||
    `https://wa.me/905523400202?text=${encodeURIComponent(
      wa?.onYazi || "Merhaba, sipariş vermek istiyorum."
    )}`;

  return (
    <>
      <footer className="foot">
        <div className="wrap">
          <div className="foot__grid">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="foot__mark"
                src={logo}
                alt={`${brand} logosu`}
                width={160}
                height={160}
                loading="lazy"
                decoding="async"
              />
              {footer?.slogan ? (
                <p className="foot__slogan">{footer.slogan}</p>
              ) : null}
            </div>
            {kolonlar.map((col) => (
              <div key={col.baslik}>
                <h4>{col.baslik}</h4>
                {(col.links || []).map((link) => (
                  <a
                    key={`${col.baslik}-${link.label}`}
                    href={resolveHref(link.href)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="wrap foot__bar">
          <span>
            © {year} {brand}
          </span>
          <span>
            <Link href="/urunler">Ürünler</Link>
            {" · "}
            <Link href="/blog">Blog</Link>
            {" · "}
            {footer?.yasalMetin || "Tüm hakları saklıdır."}
          </span>
        </div>
        {content.legal?.kvkk || content.legal?.gizlilik || content.legal?.cerez ? (
          <div className="wrap foot__legal" id="legalNote">
            {content.legal.kvkk ? (
              <p className="foot__legal-line">{content.legal.kvkk}</p>
            ) : null}
            {content.legal.gizlilik ? (
              <p className="foot__legal-line">{content.legal.gizlilik}</p>
            ) : null}
            {content.legal.cerez ? (
              <p className="foot__legal-line">{content.legal.cerez}</p>
            ) : null}
          </div>
        ) : null}
      </footer>

      <a
        className="wa-float"
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={wa?.ariaLabel || "WhatsApp ile sipariş verin"}
      >
        <div className="wa-float__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.06L2 22l5.08-1.35A9.92 9.92 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.14 13.77c-.22.62-1.27 1.18-1.76 1.25-.47.07-1.07.1-1.73-.11a15.9 15.9 0 0 1-1.56-.58c-2.72-1.18-4.5-3.93-4.63-4.11-.13-.18-1.06-1.41-1.06-2.69 0-1.28.67-1.91 1-2.17.3-.24.66-.3.88-.3h.64c.2 0 .47-.07.72.55.27.65.9 2.18.98 2.34.09.16.14.34.04.56-.1.22-.16.35-.32.54-.16.19-.34.42-.48.56-.15.15-.3.31-.13.6.17.29.77 1.27 1.65 2.05.94.82 1.73 1.08 2.02 1.2.29.12.46.1.63-.06.17-.16.73-.85.92-1.14.19-.29.38-.24.64-.14.26.1 1.64.77 1.92.91.29.14.47.21.54.33.07.12.07.69-.15 1.31z" />
          </svg>
        </div>
        <div className="wa-float__content">
          <b className="wa-float__title">{wa?.baslik || "WhatsApp Sipariş"}</b>
          <span className="wa-float__sub">
            <i className="wa-dot" aria-hidden="true" />{" "}
            {wa?.alt || "7/24 Hızlı Yanıt"}
          </span>
        </div>
      </a>
    </>
  );
}
