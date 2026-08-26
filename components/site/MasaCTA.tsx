import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/SiteIcon";

interface MasaCTAProps {
  tel?: string;
  telHref?: string;
  waHref?: string;
  baslik?: string;
  metin?: string;
  /** Buton 1 etiketi */
  btnLabel?: string;
  /** Buton 1 href — varsayılan: /#rezervasyon */
  btnHref?: string;
  style?: React.CSSProperties;
}

/**
 * "Masa ayırtmak ister misiniz?" CTA banner — tüm sayfalarda kullanılır.
 */
export default function MasaCTA({
  tel = "0530 608 90 51",
  telHref = "05306089051",
  waHref,
  baslik = "Masa ayırtmak ister misiniz?",
  metin = "Rezervasyon ve sorularınız için bizi arayın veya formdan yazın.",
  btnLabel = "Masa Rezervasyonu Yap",
  btnHref = "/#rezervasyon",
  style,
}: MasaCTAProps) {
  return (
    <section
      aria-label="Rezervasyon"
      style={{
        marginTop: "clamp(36px, 5vw, 56px)",
        marginBottom: "clamp(20px, 3vw, 32px)",
        background: "var(--cream-2, #F3EDE0)",
        borderRadius: "24px",
        border: "1.5px solid rgba(13, 15, 10, 0.08)",
        padding: "clamp(28px, 4vw, 44px) clamp(20px, 4vw, 40px)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
        textAlign: "center",
        ...style,
      }}
    >
      <h2
        style={{
          fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
          fontSize: "clamp(22px, 3vw, 30px)",
          fontWeight: 600,
          color: "var(--ink, #0D0F0A)",
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {baslik}
      </h2>

      <p
        style={{
          fontSize: "14.5px",
          color: "#555A4C",
          maxWidth: "56ch",
          margin: 0,
          lineHeight: 1.65,
        }}
      >
        {metin}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          marginTop: "6px",
          justifyContent: "center",
        }}
      >
        {waHref ? (
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--light"
            style={{ fontWeight: 700 }}
          >
            <WhatsAppIcon size={17} />
            {btnLabel}
          </a>
        ) : (
          <Link href={btnHref} className="btn btn--light" style={{ fontWeight: 700 }}>
            <CalendarCheck size={16} />
            {btnLabel}
          </Link>
        )}

        <a
          href={`tel:${telHref}`}
          className="btn"
          style={{
            background: "#0D0F0A",
            color: "#FFFFFF",
            fontWeight: 600,
          }}
        >
          <Phone size={15} />
          {tel}
        </a>
      </div>
    </section>
  );
}
