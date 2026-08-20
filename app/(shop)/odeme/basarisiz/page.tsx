import Link from "next/link";

export default function OdemeBasarisizPage() {
  return (
    <main className="min-h-screen bg-[#0D0F0A] text-[#F4EEE1] flex items-center justify-center px-4 py-24">
      <div className="max-w-md w-full rounded-3xl border border-red-500/30 bg-[#16190F] p-8 text-center shadow-2xl backdrop-blur-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-red-400 border border-red-500/40 mb-5 text-2xl font-bold">
          ✕
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F4EEE1] mb-2">Ödeme Tamamlanamadı</h1>
        <p className="text-sm text-white/70 mb-6">
          Ödeme işlemi bankanız veya kartınız tarafından onaylanmadı ya da iptal edildi. Lütfen kart bilgilerinizi kontrol edip tekrar deneyin.
        </p>
        <div className="space-y-3">
          <Link href="/" className="block w-full py-3 rounded-xl bg-[#D9A441] text-[#0D0F0A] font-bold hover:bg-[#E5B555] transition text-sm shadow-md">
            Tekrar Dene / Ana Sayfa
          </Link>
          <a href="tel:05306089051" className="block w-full py-3 rounded-xl border border-white/10 text-white/80 hover:bg-white/5 transition text-sm">
            Destek Alın: 0530 608 90 51
          </a>
        </div>
      </div>
    </main>
  );
}