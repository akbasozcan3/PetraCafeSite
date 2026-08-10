import type { PastaContent } from "@/lib/content/types";
import { resolveHref } from "@/lib/site/resolveHref";
import { resolveMediaUrl } from "@/lib/admin/media-url";

export default function HomePasta({ pasta }: { pasta: PastaContent | null | undefined }) {
  if (!pasta) return null;
  return (
    <section className="section section--dark" id="pasta">
      <div className="wrap grid-2">
        <div>
          <p className="eyebrow" data-fade="">
            {pasta.eyebrow || "Özel Pastalar"}
          </p>
          <h2 className="h2" data-split="">
            {pasta.baslik}
          </h2>
          {pasta.lead ? (
            <p className="lead" data-fade="">
              {pasta.lead}
            </p>
          ) : null}
          {pasta.maddeler?.length ? (
            <ul className="ticks" data-fade="">
              {pasta.maddeler.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          ) : null}
          {pasta.body ? (
            <p className="body" data-fade="">
              {pasta.body}
            </p>
          ) : null}
          {pasta.ctaLabel ? (
            <a
              className="btn btn--lg"
              href={resolveHref(pasta.ctaHref || "tel:+905523400202")}
            >
              {pasta.ctaLabel}
            </a>
          ) : null}
        </div>
        <div className="pasta-grid">
          {(pasta.gorseller || []).map((g, i) => {
            const src = resolveMediaUrl(g.src);
            if (!src) return null;
            return (
              <figure data-reveal-mask="" key={src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={g.alt || ""}
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
