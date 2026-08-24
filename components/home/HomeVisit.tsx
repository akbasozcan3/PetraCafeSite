import type { SiteContent } from "@/lib/content/types";
import { iconFromLabel } from "@/lib/content/site-icons";
import SiteIcon from "@/components/site/SiteIcon";
import { displayHours } from "@/lib/content/hours";

export default function HomeVisit({ content }: { content: SiteContent }) {
  const c = content.iletisim;
  const hours = displayHours(c);
  const custom = (content.ziyaret || []).filter((item) => item.k?.trim());
  
  const defaultItems = [
    { k: "Saatler", v: hours || "Cafe 08:00–24:00 · havuz 09:00–18:00", n: "Cafe her gün açık · havuz sezonluk" },
    { k: "Rezervasyon", v: c?.telefon || "0530 608 90 51", n: "Masa, havuz, yüzme dersi" },
    { k: "Havuz & Plaj", v: "09:00–18:00", n: "Derinlik 1.45–1.95 m" },
    { k: "Konum", v: "Petra Yaşam Merkezi", n: "Taşdelen · Çekmeköy" },
  ];

  const items =
    custom.length > 0
      ? custom.map((item, i) => ({
          k: item.k,
          v:
            item.v?.trim() ||
            (i === 0 ? hours : i === 1 ? c?.telefon || "" : item.v || item.k),
          n: item.n,
        }))
      : defaultItems;

  if (!items.length) return null;

  return (
    <section className="visit" id="ziyaret" aria-label="Ziyaret bilgisi">
      <div className="wrap visit__grid" data-stagger="">
        {items.map((item, idx) => (
          <div className="visit__item" key={idx}>
            <span className="visit__ico">
              <SiteIcon name={iconFromLabel(item.k)} size={20} />
            </span>
            <b>{item.k}</b>
            <strong>{item.v}</strong>
            <span>{item.n}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
