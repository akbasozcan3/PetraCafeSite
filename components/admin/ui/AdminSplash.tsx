export default function AdminSplash({
  label = "Admin Hazırlanıyor",
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
        <span className="absolute inset-0 animate-spin rounded-full border-[2px] border-[#D9A441]/25 border-t-[#D9A441] shadow-[0_0_15px_rgba(217,164,65,0.35)]" />
        <span className="absolute inset-2 animate-spin rounded-full border border-[#7C8B4F]/40 border-b-[#7C8B4F] [animation-direction:reverse] [animation-duration:2s]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/cms/logo.png"
          alt="Petra"
          className="h-14 w-14 rounded-full object-contain filter drop-shadow-[0_0_10px_rgba(217,164,65,0.4)]"
        />
      </div>
      <div className="text-center">
        <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#D9A441]">
          Petra Yaşam Merkezi
        </p>
        <p className="mt-1.5 text-xs text-[#8A9BB0] tracking-wide">{label}</p>
      </div>
    </div>
  );
}

