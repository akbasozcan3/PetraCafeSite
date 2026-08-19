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
                >
                  <span className={`contact-lines__ico${row.icon === "whatsapp" ? " is-wa" : ""}`}>
                    <SiteIcon name={row.icon} size={20} />
                  </span>
                  <span>
                    <b>{row.title}</b>
                    <span>{row.sub}</span>
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
            <div className="contact-map__card">
              <p>
                <SiteIcon name="map" size={16} />
                <span>{c.etiketAdres || "Adres"}</span>
              </p>
              <strong>
                {adresLines.map((line, i) => (
                  <span key={i}>
                    {i > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </strong>
              {hoursText ? (
                <em>
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
