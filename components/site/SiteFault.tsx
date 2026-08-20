"use client";

import Link from "next/link";
import {
  Compass,
  Home,
  UtensilsCrossed,
  CalendarDays,
  BookOpen,
  Phone,
  ArrowRight,
} from "lucide-react";

export default function SiteFault({
  kicker = "404",
  title = "Bu kapı burada açılmıyor",
  lead = "Aradığınız sayfa taşınmış, adı değişmiş veya geçici olarak kullanılamıyor olabilir. Aşağıdaki hızlı bağlantılardan devam edebilirsiniz.",
  primary = { label: "Ana Sayfaya Dön", href: "/" },
  secondary = { label: "Menüyü Keşfet", href: "/menu" },
}: {
  kicker?: string;
  title: string;
  lead: string;
  primary: { label: string; href?: string; onClick?: () => void };
  secondary?: { label: string; href?: string };
}) {
  return (
    <main className="relative min-h-[100dvh] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#0A0D14] text-[#EEE9E0] font-sans overflow-hidden">
      {/* Lüks Arka Plan Işıkları */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(217,164,65,0.18),transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(200,112,58,0.12),transparent_70%)] blur-3xl"
      />

      {/* Köşe Altın Detayları */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#D9A441]/40 pointer-events-none hidden sm:block" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#D9A441]/40 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#D9A441]/40 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#D9A441]/40 pointer-events-none hidden sm:block" />

      <div className="relative z-10 w-full max-w-2xl mx-auto my-auto text-center">
        {/* Ana Kart */}
        <div className="rounded-3xl border border-white/[0.08] bg-[#121824]/85 backdrop-blur-xl p-7 sm:p-10 md:p-12 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.6)]">
          {/* Logo & 404 Rozeti */}
          <div className="flex flex-col items-center gap-3 mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/img/petra-mark.svg"
              alt="Petra Cafe Restaurant"
              width={160}
              height={40}
              className="h-9 w-auto object-contain brightness-0 invert opacity-90"
            />
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D9A441]/30 bg-[#D9A441]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A441]">
              <Compass className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "12s" }} />
              {kicker} · SAYFA BULUNAMADI
            </div>
          </div>

          {/* Başlık & Açıklama */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#F8F6F0] leading-tight mb-4">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-[#9EABB8] leading-relaxed max-w-lg mx-auto mb-8">
            {lead}
          </p>

          {/* Ana Eylem Butonları */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {primary.href ? (
              <Link
                href={primary.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D9A441] hover:bg-[#E5B558] text-[#0A0D14] px-6 py-3.5 text-sm font-semibold transition-all duration-200 shadow-lg shadow-[#D9A441]/20 hover:scale-[1.02]"
              >
                <Home className="h-4 w-4" />
                {primary.label}
              </Link>
            ) : (
              <button
                type="button"
                onClick={primary.onClick}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D9A441] hover:bg-[#E5B558] text-[#0A0D14] px-6 py-3.5 text-sm font-semibold transition-all duration-200 shadow-lg shadow-[#D9A441]/20 hover:scale-[1.02]"
              >
                <Home className="h-4 w-4" />
                {primary.label}
              </button>
            )}

            {secondary?.href && (
              <Link
                href={secondary.href}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/25 text-[#EEE9E0] px-6 py-3.5 text-sm font-semibold transition-all duration-200"
              >
                <UtensilsCrossed className="h-4 w-4 text-[#D9A441]" />
                {secondary.label}
              </Link>
            )}
          </div>

          {/* Hızlı Keşif Izgarası */}
          <div className="pt-6 border-t border-white/[0.08]">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6B7A94] mb-3 text-center">
              Popüler Sayfalar
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-left">
              <Link
                href="/menu"
                className="group flex items-center justify-between p-2.5 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-[#D9A441]/10 hover:border-[#D9A441]/30 transition"
              >
                <div className="flex items-center gap-2">
                  <UtensilsCrossed className="h-3.5 w-3.5 text-[#D9A441]" />
                  <span className="text-xs font-medium text-[#D1D5DB] group-hover:text-white">Menü</span>
                </div>
                <ArrowRight className="h-3 w-3 text-[#6B7A94] group-hover:text-[#D9A441] group-hover:translate-x-0.5 transition" />
              </Link>

              <Link
                href="/#rezervasyon"
                className="group flex items-center justify-between p-2.5 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-[#D9A441]/10 hover:border-[#D9A441]/30 transition"
              >
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5 text-[#D9A441]" />
                  <span className="text-xs font-medium text-[#D1D5DB] group-hover:text-white">Rezervasyon</span>
                </div>
                <ArrowRight className="h-3 w-3 text-[#6B7A94] group-hover:text-[#D9A441] group-hover:translate-x-0.5 transition" />
              </Link>

              <Link
                href="/blog"
                className="group flex items-center justify-between p-2.5 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-[#D9A441]/10 hover:border-[#D9A441]/30 transition col-span-2 sm:col-span-1"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-[#D9A441]" />
                  <span className="text-xs font-medium text-[#D1D5DB] group-hover:text-white">Blog & Yazılar</span>
                </div>
                <ArrowRight className="h-3 w-3 text-[#6B7A94] group-hover:text-[#D9A441] group-hover:translate-x-0.5 transition" />
              </Link>
            </div>
          </div>
        </div>

        {/* Alt İletişim Bilgisi */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-[#8A9BB0]">
          <a
            href="tel:+905306089051"
            className="inline-flex items-center gap-1.5 font-semibold text-[#D9A441] hover:underline"
          >
            <Phone className="h-3.5 w-3.5" />
            0530 608 90 51
          </a>
          <span className="opacity-40">·</span>
          <span>Çekmeköy, Petra Yaşam Merkezi</span>
        </div>
      </div>
    </main>
  );
}

export function isStaleChunkError(error?: { message?: string; name?: string } | null) {
  const text = `${error?.name || ""} ${error?.message || ""}`;
  return /chunk|loading css chunk|failed to fetch dynamically imported/i.test(text);
}
