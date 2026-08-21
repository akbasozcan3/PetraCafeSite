import type { PastaContent } from "@/lib/content/types";
import { resolveHref } from "@/lib/site/resolveHref";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import { DEFAULT_PASTA_PHOTOS, liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import SafeImg from "@/components/site/SafeImg";
import SiteIcon from "@/components/site/SiteIcon";

const IG = "https://www.instagram.com/petracaferestaurant/";

export default function HomePasta({ pasta }: { pasta: PastaContent | null | undefined }) {
  if (!pasta) return null;
  const photos = (pasta.gorseller || [])
    .map((g, i) => ({
      ...g,
      src: liveMedia(g.src, DEFAULT_PASTA_PHOTOS[i % DEFAULT_PASTA_PHOTOS.length].src),
    }))
    .filter((g) => g.src);
  const unique: typeof photos = [];
  const seen = new Set<string>();
  for (const p of photos.length ? photos : DEFAULT_PASTA_PHOTOS) {
    if (seen.has(p.src)) continue;
    seen.add(p.src);
    unique.push(p);
    if (unique.length === 3) break;
  }
  const shots = unique.length ? unique : DEFAULT_PASTA_PHOTOS.slice(0, 3);
  const ig = pasta.instagramHref || IG;
  const igLabel = pasta.instagramEtiket || "@petracaferestaurant";
  const fiyatlar = pasta.fiyatlar?.filter((r) => r.kategori?.trim()) || [];
  const dersler = pasta.dersler?.filter((d) => d.baslik?.trim()) || [];
  const kurallar = pasta.kurallar?.filter((k) => k.trim()) || [];
  const facts = [
    pasta.cafeSaat ? { k: "Cafe", v: pasta.cafeSaat } : null,
    pasta.havuzSaat ? { k: "Havuz", v: pasta.havuzSaat } : null,
    pasta.derinlik ? { k: "Derinlik", v: pasta.derinlik } : null,
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <section className="section pasta-sec" id="pasta">
      <div className="wrap pasta-layout">
        <div className="pasta-grid" data-stagger="">
          {shots.map((g, i) => {
            const src = resolveMediaUrl(g.src) || SITE_PHOTOS.interior;
            return (
              <figure key={`${src}-${i}`}>
                <SafeImg
                  src={src}
                  alt={g.alt || "Havuz ve mekân"}
                  fallback={SITE_PHOTOS.interior}
                  loading={i < 2 ? "eager" : "lazy"}
                />
              </figure>
            );
          })}
        </div>

        <div className="pasta-copy">
          <p className="eyebrow" data-fade="">
            {pasta.eyebrow || "Havuz & Plaj"}
          </p>
          <h2 className="h2" data-split="">
            {pasta.baslik}
          </h2>
          {pasta.slogan ? (
            <p className="pasta-slogan" data-fade="">
              {pasta.slogan}
            </p>
          ) : null}
          {pasta.lead ? (
            <p className="lead" data-fade="">
              {pasta.lead}
            </p>
          ) : null}

          {facts.length ? (
            <div className="pasta-hours" data-fade="">
              {facts.map((f) => (
                <div key={f.k}>
                  <span>{f.k}</span>
                  <strong>{f.v}</strong>
                </div>
              ))}
            </div>
          ) : null}

          {pasta.maddeler?.length ? (
            <ul className="ticks pasta-ticks" data-fade="">
              {pasta.maddeler.filter(Boolean).map((m) => (
                <li key={m}>
                  <span className="tick-ico">
                    <SiteIcon name="check" size={16} />
                  </span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {fiyatlar.length ? (
            <div className="pasta-price" data-fade="">
              <h3>{pasta.fiyatBaslik || "Fiyat listesi"}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Kategori</th>
                    <th>Hafta içi</th>
                    <th>Hafta sonu</th>
                  </tr>
                </thead>
                <tbody>
                  {fiyatlar.map((row) => (
                    <tr key={row.kategori}>
                      <td>{row.kategori}</td>
                      <td>{row.haftaIci}</td>
                      <td>{row.haftaSonu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {pasta.fiyatNot ? <p className="pasta-note">{pasta.fiyatNot}</p> : null}
            </div>
          ) : null}

          {dersler.length ? (
            <div className="pasta-ders" id="yuzme" data-fade="">
              <h3>{pasta.dersBaslik || "Yüzme dersleri"}</h3>
              {pasta.dersLead ? <p className="pasta-ders__lead">{pasta.dersLead}</p> : null}
              <div className="pasta-ders__grid">
                {dersler.map((d) => (
                  <article key={d.baslik}>
                    <h4>{d.baslik}</h4>
                    {d.kicker ? <b>{d.kicker}</b> : null}
                    {d.metin ? <p>{d.metin}</p> : null}
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          {pasta.body ? (
            <p className="body pasta-body" data-fade="">
              {pasta.body}
            </p>
          ) : null}

          {kurallar.length ? (
            <ul className="pasta-rules" data-fade="">
              {kurallar.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          ) : null}

          <div className="pasta-cta" data-fade="">
            {pasta.ctaLabel ? (
              <a className="btn btn--lg" href={resolveHref(pasta.ctaHref || "#rezervasyon")}>
                {pasta.ctaLabel}
              </a>
            ) : null}
            <a
              className="btn btn--lg pasta-ig"
              href={ig}
              target="_blank"
              rel="noopener noreferrer"
            >
              {igLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
