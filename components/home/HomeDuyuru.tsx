/** Sets html.duyuru-acik when banner is present (nav offset). */
export default function HomeDuyuru({
  aktif,
  metin,
}: {
  aktif?: boolean;
  metin?: string;
}) {
  const show = Boolean(aktif && metin);
  if (!show) return null;
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.classList.add("duyuru-acik")`,
        }}
      />
      <div className="duyuru" id="duyuru" role="status">
        {metin}
      </div>
    </>
  );
}
