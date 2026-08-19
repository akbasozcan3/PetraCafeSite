export default function AdminSplash({
  label = "Yükleniyor",
  compact = false,
}: {
  label?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "flex min-h-[42vh] flex-col items-center justify-center gap-5 px-6"
          : "flex min-h-screen flex-col items-center justify-center gap-6 bg-[#080D15] px-6"
      }
      aria-busy="true"
      aria-label={label}
    >
      <div className="relative flex h-24 w-24 items-center justify-center">
        <span className="absolute inset-0 animate-spin rounded-full border-[2px] border-[#C8703A]/25 border-t-[#C8703A]" />
        <span className="absolute inset-2 rounded-full border border-white/10" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/cms/logo.png"
          alt=""
          className="h-14 w-14 rounded-full object-contain"
        />
      </div>
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C8703A]">
          Petra Cafe
        </p>
        <p className="mt-2 text-sm text-[#8A9BB0]">{label}</p>
      </div>
    </div>
  );
}
