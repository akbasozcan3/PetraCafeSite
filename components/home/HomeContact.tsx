import type { SiteContent } from "@/lib/content/types";
import { buildWhatsappUrl, phoneToTelHref } from "@/lib/content/contact-utils";

export default function HomeContact({ content }: { content: SiteContent }) {
  const c = content.iletisim;
  if (!c) return null;

  const tel = c.telefon || "";
  const telHref = phoneToTelHref(c.telefonHam || c.telefon || "");
  const waHref = buildWhatsappUrl(
    c.whatsapp || c.telefonHam || c.telefon || "",
    content.waFloat?.onYazi || "Merhaba, sipariş vermek istiyorum."
  );
  const mapDest = c.koordinat || c.haritaSorgu || "";
  const mapHref = mapDest
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapDest)}`
    : "https://www.google.com/maps/search/?api=1&query=Ta%C5%9Fdelen+F%C4%B1r%C4%B1nc%C4%B1";

  const adresLines = [c.adresSatir1, c.adresSatir2, c.adresSatir3].filter(Boolean);

  return (
    <section className="section" id="iletisim">
      <div className="wrap grid-2">
        <div>
          <p className="eyebrow" data-fade="">
            {c.eyebrow || "İletişim"}
          </p>
          <h2 className="h2" data-split="">
            {c.baslik || "Her gün taze, sıcak ve lezzetli"}
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
          <div className="contact-lines">
            {telHref ? (
              <a href={`tel:${telHref}`}>
                <b>{tel || telHref}</b>
                <span>{c.telefonAlt || "Sipariş & İletişim"}</span>
              </a>
            ) : null}
            {waHref ? (
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                <b>{c.whatsappBaslik || "WhatsApp'tan yazın"}</b>
                <span>{c.whatsappAlt || "Hızlı Sipariş ve Bilgi"}</span>
              </a>
            ) : null}
            {c.instagramUrl ? (
              <a href={c.instagramUrl} target="_blank" rel="noopener noreferrer">
                <b>{c.instagram || "@firincitasdelenn"}</b>
                <span>{c.instagramAlt || "Günün Fotoğrafları Instagram'da"}</span>
              </a>
            ) : null}
            {c.eposta ? (
              <a href={`mailto:${c.eposta}`}>
                <b>{c.eposta}</b>
                <span>{c.epostaAlt || "E-posta"}</span>
              </a>
            ) : null}
          </div>
        </div>
        <div>
          <div className="corp" data-reveal-mask="">
            <div className="corp__row">
              <b>{c.etiketAdres || "Adres"}</b>
              <span>
                {adresLines.map((line, i) => (
                  <span key={i}>
                    {i > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </span>
            </div>
            <div className="corp__row">
              <b>{c.etiketSaatler || "Çalışma saatleri"}</b>
              <span>{c.saatler}</span>
            </div>
            <div className="corp__row">
              <b>{c.etiketTelefon || "Telefon"}</b>
              <span>
                {telHref ? <a href={`tel:${telHref}`}>{tel}</a> : tel}
              </span>
            </div>
            <div className="corp__row">
              <b>{c.etiketWhatsapp || "WhatsApp"}</b>
              <span>
                {waHref ? (
                  <a href={waHref} target="_blank" rel="noopener noreferrer">
                    {tel || "WhatsApp"}
                  </a>
                ) : null}
              </span>
            </div>
            <div className="corp__row">
              <b>{c.etiketOzelPasta || "Özel pasta"}</b>
              <span>{c.ozelPastaNot}</span>
            </div>
          </div>
          <a
            className="btn btn--lg map-btn"
            href={mapHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{c.haritaButonMetin || "Yol Tarifi Al"}</span>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
