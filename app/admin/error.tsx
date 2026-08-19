"use client";

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C8703A]">Yönetim</p>
      <h1 className="text-2xl font-semibold text-[#F8F8F8]">Panel yüklenemedi</h1>
      <p className="max-w-sm text-sm text-[#8A9BB0]">
        Sayfa yenilendi veya oturum koptu. Tekrar deneyin.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-xl bg-[#C8703A] px-4 py-2.5 text-sm font-semibold text-[#080D15]"
        >
          Yenile
        </button>
        <a
          href="/admin"
          className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-[#EEE9E0]"
        >
          Panele dön
        </a>
      </div>
    </div>
  );
}
