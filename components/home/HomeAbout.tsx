import Link from "next/link";
import type { SiteContent } from "@/lib/content/types";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { iconFromLabel } from "@/lib/content/site-icons";
import SafeImg from "@/components/site/SafeImg";
import SiteIcon from "@/components/site/SiteIcon";
import { displayHours, looksLikeHours } from "@/lib/content/hours";
import { formatInlineText, cleanRawText } from "@/lib/content/markdown-parser";

export default function HomeAbout({ content }: { content: SiteContent }) {
  const h = content.hakkimizda;
  const img = resolveMediaUrl(
    liveMedia(
      content.images?.aboutInterior || content.images?.icMekan,
      SITE_PHOTOS.interior
    )
  );

  if (!h) return null;

  // Admin'den belirlenen kelime limiti (varsayılan 100 kelime, 503 veya üzeri)
  const wordLimit = typeof h.homeWordLimit === "number" && h.homeWordLimit > 0 ? h.homeWordLimit : 100;
  
  const rawParagraphs: string[] = Array.isArray(h.body) 
    ? h.body.map((p) => cleanRawText(p)).filter(Boolean)
    : [cleanRawText(String(h.body || ""))].filter(Boolean);

  const fallbackParagraphs = [
    "Petra Cafe Restaurant; İstanbul Çekmeköy Taşdelen'de, lezzet, keyif ve konforu bir araya getiren özel bir yaşam alanıdır. Zengin menümüz, sıcak atmosferimiz ve ferah açık havuz alanımızla misafirlerimize sadece bir restoran değil, unutulmaz anlar sunan bir buluşma noktası vadediyoruz.",
    "Günün her saatine uygun lezzetlerimizle hizmetinizdeyiz. Sabahları zengin serpme kahvaltımızla güne enerjik bir başlangıç yapabilir, öğle ve akşam saatlerinde usta şeflerimizin hazırladığı dünya mutfağından seçkin lezzetlerin, ızgaraların ve çıtır taş fırın pizzaların tadını çıkarabilirsiniz."
  ];

  const sourceParagraphs = rawParagraphs.length > 0 ? rawParagraphs : fallbackParagraphs;
  const allWords = sourceParagraphs.join(" ").split(/\s+/).filter(Boolean);
  const isTruncated = allWords.length > wordLimit;

  // Kelime sınırına göre paragrafları oluştur
  let wordsCount = 0;
  const displayParagraphs: string[] = [];

  for (const p of sourceParagraphs) {
    const pWords = p.split(/\s+/).filter(Boolean);
    if (wordsCount + pWords.length <= wordLimit) {
      displayParagraphs.push(p);
      wordsCount += pWords.length;
    } else {
      const remaining = wordLimit - wordsCount;
      if (remaining > 0) {
        displayParagraphs.push(pWords.slice(0, remaining).join(" ") + "...");
      }
      break;
    }
  }

  if (displayParagraphs.length === 0 && sourceParagraphs.length > 0) {
    displayParagraphs.push(allWords.slice(0, wordLimit).join(" ") + "...");
  }

  // Lead metni kısa ve ana metinden farklıysa göster
  const showShortLead = h.lead && h.lead.trim().length <= 140 && !sourceParagraphs[0]?.includes(h.lead.trim());

  return (
    <section className="section" id="hakkimizda">
      <div className="wrap grid-2">
        <div>
          <p className="eyebrow" data-fade="">
            {cleanRawText(h.eyebrow || "Hakkımızda")}
          </p>
          <h1 className="h2" data-split="">
            {cleanRawText(h.baslik || "Petra Yaşam Merkezi'nde cafe & restaurant")}
          </h1>
          
          {(h.answerBaslik || h.answerMetin) && (
            <div className="answer" data-fade="">
              <b>{cleanRawText(h.answerBaslik || "Kısaca")}</b>
              <p>{cleanRawText(h.answerMetin)}</p>
            </div>
          )}
          
          {showShortLead ? (
            <p className="lead" data-fade="">
              {formatInlineText(h.lead)}
            </p>
          ) : null}

          {/* ADMİNDEN BELİRLENEN KELİME LİMİTİNE GÖRE DİNAMİK PARAGRAFLAR */}
          <div data-fade="" style={{ marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "14px" }}>
            {displayParagraphs.map((paragraph, pIdx) => (
              <p 
                key={pIdx} 
                className="body" 
                style={{ 
                  margin: 0, 
                  lineHeight: 1.85, 
                  fontSize: "0.95rem",
                  color: "#383C30" 
                }}
              >
                {formatInlineText(paragraph)}
              </p>
            ))}
          </div>

          {/* DOĞRUDAN /hakkimizda ROUTE NAVIGATION BUTONU */}
          <div data-fade="" style={{ marginBottom: "1.75rem" }}>
            <Link
              href="/hakkimizda"
              className="btn btn--brass"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 22px",
                borderRadius: "12px",
                fontWeight: 800,
                fontSize: "0.92rem",
                textDecoration: "none",
                background: "var(--brass, #D9A441)",
                color: "#0D0F0A",
                boxShadow: "0 6px 18px rgba(217, 164, 65, 0.35)",
              }}
            >
              <span>{isTruncated ? "Devamını Oku & Tüm Detaylar" : "Hakkımızda Sayfasını İncele"}</span>
              <span>→</span>
            </Link>
          </div>

          {/* ÖZET KARTLARI */}
          {h.ozet?.length ? (
            <div className="ozet" data-stagger="">
              {h.ozet.map((item) => (
                <div className="ozet__i" key={`${item.b}-${item.span}`}>
                  <span className="ozet__ico">
                    <SiteIcon name={iconFromLabel(`${item.b} ${item.span}`)} size={20} />
                  </span>
                  <b>{looksLikeHours(item.b) ? displayHours(content.iletisim) : cleanRawText(item.b)}</b>
                  <span>{cleanRawText(item.span)}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* SAĞ: TİLT-CARD FOTOĞRAF VE ROZET */}
        <div data-fade="">
          <div className="tilt-card">
            <div className="tilt-card__inner">
              <SafeImg
                src={img}
                alt={h.badgeBaslik ? `${h.badgeBaslik} — iç mekân` : "Restoran iç mekân"}
                fallback={SITE_PHOTOS.interior}
                loading="eager"
                width={1800}
                height={1350}
              />
              <div
                className="tilt-card__badge"
                style={{
                  background: "var(--card-bg, #ffffff)",
                  border: "1.5px solid var(--card-border, rgba(217, 164, 65, 0.4))",
                  backdropFilter: "blur(14px)",
                  borderRadius: 14,
                  padding: "12px 18px",
                  boxShadow: "0 14px 34px -12px rgba(0, 0, 0, 0.5)",
                }}
              >
                <b style={{ color: "var(--card-text, #0d0f0a)", display: "block", fontSize: "1.18rem", fontWeight: 800 }}>
                  {cleanRawText(h.badgeBaslik || "Petra")}
                </b>
                <span style={{ color: "var(--brass-lo, #b8842c)", display: "block", fontSize: "0.85rem", fontWeight: 800, marginTop: 3, letterSpacing: "0.02em" }}>
                  {cleanRawText(h.badgeAlt || "Cafe · Restaurant · Pool")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
