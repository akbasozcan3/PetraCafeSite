import type { BolumBaslik } from "@/lib/content/types";

export default function HomeFaq({
  bolum,
  items,
}: {
  bolum?: BolumBaslik;
  items: { soru: string; cevap: string }[];
}) {
  if (!items?.length) return null;
  return (
    <section className="section" id="sss">
      <div className="wrap">
        <div className="section__head">
          <p className="eyebrow" data-fade="">
            {bolum?.eyebrow || "S.S.S."}
          </p>
          <h2 className="h2" data-split="">
            {bolum?.baslik || "Sıkça sorulan sorular"}
          </h2>
          {bolum?.lead ? (
            <p className="lead" data-fade="">
              {bolum.lead}
            </p>
          ) : null}
        </div>
        <div className="faq" data-fade="">
          {items.map((item, i) => (
            <details className="faq__item" key={`${item.soru}-${i}`} open={i === 0}>
              <summary>{item.soru}</summary>
              <div className="faq__a">
                <p>{item.cevap}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
