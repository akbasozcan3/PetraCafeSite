import Link from "next/link";
import SiteIcon from "@/components/site/SiteIcon";

export interface LegalPageProps {
  currentSlug: "gizlilik-politikasi" | "rezervasyon-kosullari" | "kullanim-kosullari" | "cerez-politikasi" | "ticari-bilgiler";
  title: string;
  lead?: string;
  body: string;
}

const LEGAL_NAV = [
  { slug: "gizlilik-politikasi", label: "Gizlilik & KVKK", icon: "shield" },
  { slug: "rezervasyon-kosullari", label: "Rezervasyon / İptal Koşulları", icon: "check" },
  { slug: "kullanim-kosullari", label: "Kullanım Koşulları", icon: "file" },
  { slug: "cerez-politikasi", label: "Çerez Politikası", icon: "globe" },
  { slug: "ticari-bilgiler", label: "İşletme & Ticari Bilgiler", icon: "map" },
];

export default function LegalPageTemplate({
  currentSlug,
  title,
  lead,
  body,
}: LegalPageProps) {
  return (
    <main className="page legal-page bg-[#0D0F0A] text-[#F4EEE1] min-h-screen pt-28 pb-20">
      <div className="wrap max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="crumbs mb-6 text-xs text-white/50 flex items-center gap-2">
          <Link href="/" className="hover:text-[#D9A441] transition">
            Ana Sayfa
          </Link>
          <span>/</span>
          <span className="text-[#D9A441] font-medium">{title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Sol Yan Menü: Yasal Sayfalar Arası Hızlı Geçiş */}
          <aside className="lg:col-span-4 bg-[#16190F]/80 border border-white/10 rounded-2xl p-5 backdrop-blur-md sticky top-28">
            <p className="text-xs font-bold uppercase tracking-widest text-[#D9A441] mb-4">
              Yasal & Kurumsal
            </p>
            <ul className="space-y-1.5 text-sm">
              {LEGAL_NAV.map((item) => {
                const isActive = item.slug === currentSlug;
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/${item.slug}`}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${
                        isActive
                          ? "bg-[#D9A441] text-[#0D0F0A] font-bold shadow-md"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="text-xs">➔</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 pt-5 border-t border-white/10 text-xs text-white/60">
              <p className="font-semibold text-white/80 mb-1">Sorularınız mı var?</p>
              <p className="mb-3">Her türlü bilgi ve destek için bize ulaşabilirsiniz.</p>
              <a
                href="tel:05306089051"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-[#D9A441] hover:bg-white/20 transition font-medium"
              >
                <SiteIcon name="phone" size={14} />
                <span>0530 608 90 51</span>
              </a>
            </div>
          </aside>

          {/* Sağ İçerik Alanı */}
          <article className="lg:col-span-8 bg-[#16190F]/50 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
            <div className="border-b border-white/10 pb-6 mb-8">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#D9A441]/15 text-[#D9A441] border border-[#D9A441]/30 mb-3">
                RESMİ BİLDİRİM
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#F4EEE1] tracking-tight leading-tight">
                {title}
              </h1>
              {lead ? (
                <p className="mt-3 text-base sm:text-lg text-white/80 leading-relaxed">
                  {lead}
                </p>
              ) : null}
            </div>

            {/* Metin Gövdesi */}
            <div className="legal-body text-sm sm:text-base text-[#D0C8B8] leading-relaxed space-y-4 whitespace-pre-line font-light">
              {body}
            </div>

            <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/40">
              <span>Son Güncelleme: {new Date().getFullYear()} · Petra Cafe Restaurant</span>
              <Link href="/" className="text-[#D9A441] hover:underline font-semibold">
                ← Ana Sayfaya Dön
              </Link>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}