export default function HomeMarquee({ items }: { items: string[] }) {
  const list =
    items?.length > 0
      ? items
      : [
          "TAZE EKMEK",
          "GÜNLÜK ÜRETİM",
          "ÖZEL TASARIM PASTA",
          "SİMİT & POĞAÇA",
          "ÇEKMEKÖY TAŞDELEN",
          "DOĞAL MALZEME",
        ];
  const seps = ["✦", "◆"];

  function Seg({ ariaHidden }: { ariaHidden?: boolean }) {
    return (
      <div className="mq-seg" aria-hidden={ariaHidden || undefined}>
        {list.map((word, i) => (
          <span key={`${word}-${i}`}>
            <span className="mq-word">{word}</span>
            <span className="mq-sep">{seps[i % 2]}</span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div id="mqBand" className="mq-band" aria-hidden="true">
      <div className="mq-fade mq-fade--l" />
      <div className="mq-fade mq-fade--r" />
      <div id="mqTrack" className="mq-track is-on">
        <Seg />
        <Seg ariaHidden />
      </div>
    </div>
  );
}
