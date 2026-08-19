import type { SiteContent } from "@/lib/content/types";
import { iconFromLabel } from "@/lib/content/site-icons";
import SiteIcon from "@/components/site/SiteIcon";
import { displayHours } from "@/lib/content/hours";

export default function HomeVisit({ content }: { content: SiteContent }) {
  const c = content.iletisim;
  const hours = displayHours(c);
  const custom = (content.ziyaret || []).filter((item) => item.k?.trim());
  const items =
    custom.length > 0
      ? custom.map((item, i) => ({
          k: item.k,
          v:
            item.v?.trim() ||
            (i === 0 ? hours : i === 1 ? c?.telefon || "" : item.v),
          n: item.n,
        }))
      : [];

  if (!items.length) return null;

  return (
    <section className="visit" id="ziyaret" aria-label="Ziyaret bilgisi">
      <div className="wrap visit__grid" data-stagger="">
        {items.map((item) => (
          <div className="visit__item" key={item.k}>
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
