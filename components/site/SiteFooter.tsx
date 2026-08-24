import Link from "next/link";
import type { ReactNode } from "react";
import type { SiteContent } from "@/lib/content/types";
import { resolveHref } from "@/lib/site/resolveHref";
import {
  buildInstagramUrl,
  buildWhatsappUrl,
  phoneToTelHref,
} from "@/lib/content/contact-utils";
import SiteIcon from "@/components/site/SiteIcon";
import BrandLogo from "@/components/site/BrandLogo";
import { displayHours, looksLikeHours } from "@/lib/content/hours";
import { isDarkHex } from "@/lib/content/color";

function FooterLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const resolved = resolveHref(href);
  const external = /^(https?:|tel:|mailto:)/i.test(resolved);
  if (!external && resolved.startsWith("/") && !resolved.startsWith("/#") && !resolved.includes("#")) {
    return (
      <Link className={className} href={resolved}>
        {children}
      </Link>
    );
  }
  return (
    <a
      className={className}
      href={resolved}
      {...(external && !resolved.startsWith("tel:") && !resolved.startsWith("mailto:")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}

export default function SiteFooter({
  content,
}: {
  content: Pick<
    SiteContent,
    "footer" | "images" | "brand" | "waFloat" | "iletisim" | "legal" | "theme"
  >;
}) {
  const footer = content.footer;
  const footerBg = content.theme?.footerBg || "#FBF8F1";
  const isDark = isDarkHex(footerBg);
  const footerText = content.theme?.footerText || (isDark ? "#FFFFFF" : "#0D0F0A");
  const nameColor = isDark ? "#FFFFFF" : "#0D0F0A";
  const sloganColor = isDark ? "#FFFFFF" : "#5C5749";
  const headingColor = isDark ? "#D9A441" : "#B8842C";
  const hoursBg = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(184, 132, 44, 0.12)";
  const hoursBorder = isDark ? "1px solid rgba(217, 164, 65, 0.4)" : "1px solid rgba(184, 132, 44, 0.35)";
  const hoursTextColor = isDark ? "#FFFFFF" : "#0D0F0A";
  const reachColor = isDark ? "rgba(255, 255, 255, 0.9)" : "#0D0F0A";
  const barBorder = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(13, 15, 10, 0.1)";
  const barTextColor = isDark ? "rgba(255, 255, 255, 0.7)" : "#5C5749";
  const legalTextColor = isDark ? "rgba(244, 238, 225, 0.45)" : "#8E8A7E";
  const year = new Date().getFullYear();
  const brand =
    content.brand?.displayName || footer?.markaAdi || "Petra Cafe Restaurant";
  const wa = content.waFloat;
  const iletisim = content.iletisim;
  const tel = iletisim?.telefon || "";
  const telHref = phoneToTelHref(iletisim?.telefonHam || iletisim?.telefon || "");
  const adres = [iletisim?.adresSatir1, iletisim?.adresSatir2, iletisim?.adresSatir3]
    .filter(Boolean)
    .join(" · ");
  const mapDest =
    iletisim?.koordinat ||
    iletisim?.haritaSorgu ||
    adres;
  const mapHref = mapDest
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapDest)}`
    : "";
  const igHref =
    iletisim?.instagramUrl ||
    (iletisim?.instagram ? buildInstagramUrl(iletisim.instagram) : "");

  const kolonlar = (footer?.kolonlar || []).filter((col) => {
    const t = (col.baslik || "").toLocaleLowerCase("tr-TR");
    return !/adres|iletişim|iletisim|contact/.test(t);
  });

  const waHref = buildWhatsappUrl(
    iletisim?.whatsapp || iletisim?.telefonHam || iletisim?.telefon || "",
    wa?.onYazi || ""
  );
  const barLinks = footer?.barLinks?.filter((l) => l.label?.trim() && l.href?.trim()) || [];

  return (
    <>
      <footer
        className="foot"
        data-fade=""
        style={{
          background: footerBg,
          backgroundColor: footerBg,
          color: footerText,
          ["--footer-bg" as string]: footerBg,
          ["--footer-text" as string]: footerText,
        }}
      >
        <div className="wrap">
          <div className="foot__grid" data-stagger="">
            <div className="foot__brand">
              <BrandLogo
                className="foot__mark"
                src={content.images?.logo}
                alt={`${brand} logosu`}
                height={52}
              />
              <p className="foot__name" style={{ color: nameColor }}>{brand}</p>
              {footer?.slogan ? (
                <p className="foot__slogan" style={{ color: sloganColor, opacity: isDark ? 0.95 : 1 }}>{footer.slogan}</p>
              ) : null}
              {displayHours(iletisim) ? (
                <p className="foot__hours" style={{ background: hoursBg, border: hoursBorder, color: hoursTextColor }}>
                  <SiteIcon name="clock" size={16} />
                  <span style={{ color: hoursTextColor }}>{displayHours(iletisim)}</span>
                </p>
              ) : null}
            </div>

            {kolonlar.map((col) => (
              <div key={col.baslik} className="foot__col">
                <h4 style={{ color: headingColor }}>{col.baslik}</h4>
                {(col.links || []).filter((link) => {
                  const href = resolveHref(link.href || "");
                  if (/^\/(sepet|favoriler|checkout|hesabim)(\/|$)/i.test(href)) return false;
                  if (/hesab|sepet|profil|favori|kayit|kayıt|giriş|uye|üye/i.test(link.label || "")) {
                    return false;
                  }
                  return Boolean(link.label?.trim() && link.href?.trim());
                }).map((link) => {
                  const hours = displayHours(iletisim);
                  const label =
                    looksLikeHours(link.label) && hours ? hours : link.label;
                  return (
                    <FooterLink key={`${col.baslik}-${link.label}`} href={link.href}>
                      {label}
                    </FooterLink>
                  );
                })}
              </div>
            ))}

            <div className="foot__col foot__reach">
              <h4 style={{ color: headingColor }}>{footer?.iletisimBaslik || iletisim?.etiketAdres || "İletişim"}</h4>
              {telHref ? (
                <a className="foot__reach-a" href={`tel:${telHref}`}>
                  <SiteIcon name="phone" size={16} />
                  <span>{tel || telHref}</span>
                </a>
              ) : null}
              {waHref ? (
                <a
                  className="foot__reach-a"
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiteIcon name="whatsapp" size={16} />
                  <span>{footer?.whatsappEtiket || iletisim?.etiketWhatsapp || "WhatsApp"}</span>
                </a>
              ) : null}
              {igHref ? (
                <a
                  className="foot__reach-a"
                  href={igHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiteIcon name="instagram" size={16} />
                  <span>{iletisim?.instagram || "Instagram"}</span>
                </a>
              ) : null}
              {iletisim?.eposta ? (
                <a className="foot__reach-a" href={`mailto:${iletisim.eposta}`}>
                  <SiteIcon name="mail" size={16} />
                  <span>{iletisim.eposta}</span>
                </a>
              ) : null}
              {mapHref ? (
              <a
                className="foot__reach-a"
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiteIcon name="map" size={16} />
                <span>{adres || iletisim?.haritaButonMetin || ""}</span>
              </a>
              ) : null}

              {/* Dinamik Sosyal Medya İkonları (Admin Yönetimli & WhatsApp Uyumlu) */}
              {Array.isArray(iletisim?.socials) && iletisim.socials.filter((s) => s.active !== false && s.url).length > 0 ? (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginTop: "14px", paddingTop: "12px", borderTop: `1px solid ${barBorder}` }}>
                  {iletisim.socials
                    .filter((s) => s.active !== false && s.url)
                    .map((s) => {
                      const iconName =
                        s.platform === "whatsapp"
                          ? "whatsapp"
                          : s.platform === "instagram"
                          ? "instagram"
                          : s.platform === "tiktok"
                          ? "tiktok"
                          : s.platform === "facebook"
                          ? "facebook"
                          : s.platform === "maps"
                          ? "map"
                          : "globe";
                      return (
                        <a
                          key={s.id || s.url}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={s.label}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(184, 132, 44, 0.12)",
                            border: `1px solid ${isDark ? "rgba(217, 164, 65, 0.35)" : "rgba(184, 132, 44, 0.35)"}`,
                            color: isDark ? "#D9A441" : "#B8842C",
                            textDecoration: "none",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <SiteIcon name={iconName} size={17} />
                        </a>
                      );
                    })}
                </div>
              ) : null}
            </div>

          </div>
        </div>
        <div className="wrap foot__bar" style={{ borderTop: `1px solid ${barBorder}`, color: barTextColor }}>
          <span>
            © {year} {brand}
          </span>
          <span className="foot__bar-links">
            <Link href="/gizlilik-politikasi">Gizlilik & KVKK</Link>
            <Link href="/rezervasyon-kosullari">Rezervasyon & İptal Koşulları</Link>
            <Link href="/kullanim-kosullari">Kullanım Koşulları</Link>
            <Link href="/cerez-politikasi">Çerez Politikası</Link>
            <Link href="/ticari-bilgiler">Ticari Bilgiler</Link>
            {barLinks
              .filter((l) => !["/gizlilik-politikasi", "/rezervasyon-kosullari", "/kullanim-kosullari", "/cerez-politikasi", "/ticari-bilgiler"].includes(l.href))
              .map((link) => (
                <FooterLink key={`${link.label}-${link.href}`} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            {footer?.yasalMetin ? <span>{footer.yasalMetin}</span> : null}
          </span>
        </div>


        {content.legal?.kvkk || content.legal?.gizlilik || content.legal?.cerez ? (
          <div className="wrap foot__legal" id="legalNote" style={{ color: legalTextColor }}>
            {content.legal.kvkk ? (
              <p className="foot__legal-line" style={{ color: legalTextColor }}>{content.legal.kvkk}</p>
            ) : null}
            {content.legal.gizlilik ? (
              <p className="foot__legal-line" style={{ color: legalTextColor }}>{content.legal.gizlilik}</p>
            ) : null}
            {content.legal.cerez ? (
              <p className="foot__legal-line" style={{ color: legalTextColor }}>{content.legal.cerez}</p>
            ) : null}
          </div>
        ) : null}
      </footer>

      {waHref ? (
      <a
        className="wa-float"
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={wa?.ariaLabel || wa?.baslik || "WhatsApp"}
      >
        <div className="wa-float__icon" aria-hidden="true">
          <SiteIcon name="whatsapp" size={22} />
        </div>
        <div className="wa-float__content">
          <b className="wa-float__title">{wa?.baslik || ""}</b>
          <span className="wa-float__sub">
            <i className="wa-dot" aria-hidden="true" />{" "}
            {wa?.alt || ""}
          </span>
        </div>
      </a>
      ) : null}
    </>
  );
}
