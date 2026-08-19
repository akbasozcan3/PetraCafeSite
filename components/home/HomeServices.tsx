import Link from "next/link";
import type { SiteContent } from "@/lib/content/types";
import { resolveHref } from "@/lib/site/resolveHref";
import { iconFromLabel, type SiteIconId } from "@/lib/content/site-icons";
import SiteIcon from "@/components/site/SiteIcon";

export default function HomeServices({ content }: { content: SiteContent }) {
  const bolum = content.bolumlar?.hizmetler;
  const list = (content.hizmetler || []).filter((item) => item.label?.trim());
  if (!list.length) return null;

  return (
    <section className="section section--warm hizmet" id="hizmetler" aria-label="Hizmetler">
      <div className="wrap">
        <div className="section__head">
          <p className="eyebrow" data-fade="">
            {bolum?.eyebrow || "Petra"}
          </p>
          <h2 className="h2" data-split="">
            {bolum?.baslik || "Cafe · Restaurant · Pool & Beach"}
          </h2>
          <p className="lead" data-fade="">
            {bolum?.lead ||
              "Dünya mutfağı, serpme kahvaltı, İtalyan tatlı ve kokteyl, kahve ve nargile — havuz kenarında veya salonda."}
          </p>
        </div>
        <div className="hizmet__grid" data-stagger="">
          {list.map((item) => {
            const href = item.href?.trim() ? resolveHref(item.href) : "";
            const icon = (item.icon || iconFromLabel(item.label)) as SiteIconId;
            const inner = (
              <>
                <span className="hizmet__ico" aria-hidden="true">
                  <SiteIcon name={icon} size={26} />
                </span>
                <strong>{item.label}</strong>
                {item.aciklama ? <span className="hizmet__note">{item.aciklama}</span> : null}
              </>
            );
            return href ? (
              <Link key={item.label} href={href} className="hizmet__card">
                {inner}
              </Link>
            ) : (
              <div key={item.label} className="hizmet__card hizmet__card--static">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
