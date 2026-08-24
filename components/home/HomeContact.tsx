import HomeContactForm from "@/components/home/HomeContactForm";
import type { SiteContent } from "@/lib/content/types";
import { buildWhatsappUrl, phoneToTelHref } from "@/lib/content/contact-utils";
import SiteIcon from "@/components/site/SiteIcon";
import { displayHours } from "@/lib/content/hours";

export default function HomeContact({ content }: { content: SiteContent }) {
  const c = content.iletisim;
  if (!c) return null;

  const hoursText = displayHours(c);
  const tel = c.telefon || "";
  const telHref = phoneToTelHref(c.telefonHam || c.telefon || "");
  const waHref = buildWhatsappUrl(
    c.whatsapp || c.telefonHam || c.telefon || "",
    content.waFloat?.onYazi || "Merhaba, masa ayırtmak istiyorum."
  );
  const mapDest =
    c.koordinat ||
    c.haritaSorgu ||
    [c.adresSatir1, c.adresSatir2, c.adresSatir3].filter(Boolean).join(", ");
  const mapHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapDest)}`;
  const adresLines = [c.adresSatir1, c.adresSatir2, c.adresSatir3].filter(Boolean);

  const lines = [
    telHref
      ? {
          href: `tel:${telHref}`,
          icon: "phone" as const,
          title: tel || telHref,
          sub: c.telefonAlt || "Rezervasyon & İletişim",
          external: false,
        }
      : null,
    waHref
      ? {
          href: waHref,
          icon: "whatsapp" as const,
          title: c.whatsappBaslik || "WhatsApp'tan yazın",
          sub: c.whatsappAlt || "Hızlı rezervasyon ve bilgi",
          external: true,
        }
      : null,
    c.instagramUrl
      ? {
          href: c.instagramUrl,
          icon: "instagram" as const,
          title: c.instagram || "Instagram",
          sub: c.instagramAlt || "Günün fotoğrafları Instagram'da",
          external: true,
        }
      : null,
    c.tiktokUrl
      ? {
          href: c.tiktokUrl,
          icon: "tiktok" as const,
          title: "TikTok",
          sub: "@petrayasammerkezi",
          external: true,
        }
      : null,
    c.facebookUrl
      ? {
          href: c.facebookUrl,
          icon: "facebook" as const,
          title: "Facebook",
          sub: "Petra Cafe Restaurant",
          external: true,
        }
      : null,
    c.eposta
      ? {
          href: `mailto:${c.eposta}`,
          icon: "mail" as const,
          title: c.eposta,
          sub: c.epostaAlt || "E-posta",
          external: false,
        }
      : null,
  ].filter(Boolean);

  return (
    <section className="section contact-sec" id="iletisim">
      <div className="wrap contact-stage">
        <div className="contact-stage__copy">
          <p className="eyebrow" data-fade="">
            {c.eyebrow || "İletişim"}
          </p>
          <h2 className="h2" data-split="">
            {c.baslik || "Masa, menü ve özel davet"}
          </h2>
          {c.giris ? (
            <p className="lead" data-fade="">
              {c.giris}
            </p>
          ) : null}
          {c.metin ? (
            <p className="body" data-fade="">
              {c.metin}
            </p>
          ) : null}
          {c.ozelPastaNot ? (
            <p className="body" data-fade="">
              {c.ozelPastaNot}
            </p>
          ) : null}
          <div className="contact-lines" data-stagger="">
            {lines.map((row) =>
              row ? (
                <a
                  key={row.title}
                  href={row.href}
                  target={row.external ? "_blank" : undefined}
                  rel={row.external ? "noopener noreferrer" : undefined}
                  style={{
                    background: "var(--card-bg, #ffffff)",
                    border: "1px solid var(--card-border, rgba(13, 15, 10, 0.12))",
                    color: "var(--card-text, #0d0f0a)",
                  }}
                >
                  <span
                    className={`contact-lines__ico${row.icon === "whatsapp" ? " is-wa" : ""}`}
                    style={
                      row.icon === "whatsapp"
                        ? { background: "#25D366", color: "#FFFFFF" }
                        : { background: "rgba(184, 132, 44, 0.14)", color: "var(--brass, #d9a441)" }
                    }
                  >
                    <SiteIcon name={row.icon} size={20} />
                  </span>
                  <span>
                    <b style={{ color: "var(--card-text, #0d0f0a)" }}>{row.title}</b>
                    <span style={{ color: "var(--card-muted, #6e6a5c)" }}>{row.sub}</span>
                  </span>
                </a>
              ) : null
            )}
          </div>
          <HomeContactForm copy={content.mesajForm} />
        </div>

        <div className="contact-stage__map" data-fade="">
          <div className="contact-map">
            {mapDest ? (
              <iframe
                title={c.haritaIframeBaslik || c.baslik || "Konum"}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(mapDest)}&z=16&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : null}
            <div
              className="contact-map__card"
              style={{
                background: "var(--card-bg, #141810)",
                border: "1px solid var(--card-border, rgba(217, 164, 65, 0.35))",
                color: "var(--card-text, #F4EEE1)",
                backdropFilter: "blur(14px)",
                borderRadius: 18,
                padding: "16px 18px",
                boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
              }}
            >
              <p style={{ color: "var(--brass, #d9a441)", margin: "0 0 6px", display: "flex", alignItems: "center", gap: 8 }}>
                <SiteIcon name="map" size={16} />
                <span style={{ color: "var(--brass, #d9a441)", fontWeight: 700 }}>{c.etiketAdres || "Adres"}</span>
              </p>
              <strong style={{ color: "var(--card-text, #ffffff)", fontSize: "0.98rem", lineHeight: 1.45, fontWeight: 600, display: "block" }}>
                {adresLines.map((line, i) => (
                  <span key={i} style={{ color: "inherit" }}>
                    {i > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </strong>
              {hoursText ? (
                <em style={{ color: "var(--card-muted, #A8A294)", display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10, fontStyle: "normal", fontSize: "0.86rem" }}>
                  <SiteIcon name="clock" size={14} />
                  {hoursText}
                </em>
              ) : null}
            </div>
            {mapDest ? (
            <a
              className="btn btn--lg contact-map__cta"
              href={mapHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "var(--brass, #d9a441) !important",
                color: "#0d0f0a !important",
                fontWeight: 700,
                border: "none",
                boxShadow: "0 6px 18px rgba(217, 164, 65, 0.35)",
              }}
            >
              <SiteIcon name="map" size={18} />
              <span>{c.haritaButonMetin || "Yol Tarifi Al"}</span>
            </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
