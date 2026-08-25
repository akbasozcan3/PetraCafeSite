"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Palette, Sparkles, Sliders, Eye, Sun, Moon, Check } from "lucide-react";
import { api } from "@/lib/api/client";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";
import SaveBar from "@/components/admin/ui/SaveBar";
import ColorField from "@/components/admin/ui/ColorField";
import Button from "@/components/admin/ui/Button";
import Input from "@/components/admin/ui/Input";
import LuxuryLoader from "@/components/site/LuxuryLoader";
import { DEFAULT_THEME, THEME_PRESETS, resolveTheme } from "@/lib/content/theme";
import type { ThemeContent, LoaderContent } from "@/lib/content/types";

const THEME_KEYS = Object.keys(DEFAULT_THEME) as (keyof ThemeContent)[];

function themesEqual(a: ThemeContent, b: ThemeContent) {
  return THEME_KEYS.every(
    (k) => String(a[k] || "").toLowerCase() === String(b[k] || "").toLowerCase()
  );
}

const defaultLoaderConfig: LoaderContent = {
  aktif: true,
  tema: "light",
  baslik: "",
  sublabel: "",
  logoBoyut: 108,
  arkaplanRenk: "#FFFFFF",
  halkaRenk: "#D9A441",
  yaziRenk: "#0D0F0A",
  koseSusleri: true,
};

export default function ThemePanel() {
  const { content, setContent, loading } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  const theme = resolveTheme(content?.theme);
  const loaderConfig: LoaderContent = {
    ...defaultLoaderConfig,
    ...(content?.loader || {}),
  };

  const activePreset = useMemo(
    () => THEME_PRESETS.find((p) => themesEqual(theme, p.theme))?.id || "",
    [theme]
  );

  if (loading || !content) return <AdminLoading />;

  const patchTheme = (next: Partial<ThemeContent>) => {
    setContent({ ...content, theme: { ...theme, ...next } });
  };

  const patchLoader = (next: Partial<LoaderContent>) => {
    setContent({
      ...content,
      loader: {
        ...loaderConfig,
        ...next,
      },
    });
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await api.updateContent({
        theme: resolveTheme(content.theme),
        loader: content.loader || loaderConfig,
      });
      setContent(res.data);
      setMessage("Tema ve Loading (Yükleme Ekranı) ayarları başarıyla kaydedildi.");
      setMessageType("success");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Kayıt başarısız");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Tema & Yükleme Ekranı"
        description="Site renkleri, hazır paletler ve Açılış / Geçiş Yükleme Ekranı (Loading) ayarlarını buradan düzenleyebilir, anlık canlı önizleme yapabilirsiniz."
        actions={
          <Button onClick={save} disabled={saving} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-4 py-2.5 rounded-xl shadow-md">
            <span>{saving ? "Kaydediliyor…" : "💾 Tüm Ayarları Kaydet"}</span>
          </Button>
        }
      />
      <AdminAlert message={message} type={messageType} />

      {/* ========================================================================= */}
      {/* 1. YÜKLEME EKRANI (LOADING SCREEN) YÖNETİMİ & CANLI ÖNİZLEME             */}
      {/* ========================================================================= */}
      <section className="mb-8 rounded-3xl border border-[#D9A441]/30 bg-[#141E2E]/90 p-6 md:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#EEE9E0] flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D9A441]/20 text-[#D9A441] shadow-inner">
                <Sparkles className="h-4 w-4" />
              </span>
              Yükleme Ekranı (Loading Screen) Canlı Yönetimi
            </h2>
            <p className="text-xs text-[#8A9BB0] mt-1">
              Sayfa açılırken ve sayfalar arası geçişlerde beliren lüks altın halkalı yükleme animasyonunun logosunu, metinlerini ve renklerini buradan anlık yönetin.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Canlı Önizleme Aktif
          </span>
        </div>

        {/* 2 Kolonlu Düzen: Sol Kontroller, Sağ Canlı Önizleme Kutusu */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sol Kolon: Ayar Kontrolleri */}
          <div className="lg:col-span-6 space-y-5">
            {/* Tema Seçimi (Açık Krem vs Koyu Gece) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#D9A441] mb-2">
                1. Yükleme Zemin Teması
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    patchLoader({
                      tema: "light",
                      arkaplanRenk: "#FAF7F0",
                      yaziRenk: "#1A1D16",
                    })
                  }
                  className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition ${
                    loaderConfig.tema === "light"
                      ? "border-[#D9A441] bg-[#FAF7F0] text-[#1A1D16] shadow-md ring-2 ring-[#D9A441]/40"
                      : "border-white/10 bg-[#0D1117] text-[#EEE9E0] hover:border-white/20"
                  }`}
                >
                  <Sun className="h-5 w-5 text-[#D9A441] shrink-0" />
                  <div>
                    <b className="block text-sm font-semibold">Açık Krem (Lüks)</b>
                    <span className="text-[11px] opacity-75">Ferah fildişi zemin</span>
                  </div>
                  {loaderConfig.tema === "light" && <Check className="h-4 w-4 ml-auto text-[#D9A441]" />}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    patchLoader({
                      tema: "dark",
                      arkaplanRenk: "#090C08",
                      yaziRenk: "#FFFFFF",
                    })
                  }
                  className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition ${
                    loaderConfig.tema === "dark"
                      ? "border-[#D9A441] bg-[#090C08] text-[#FFFFFF] shadow-md ring-2 ring-[#D9A441]/40"
                      : "border-white/10 bg-[#0D1117] text-[#EEE9E0] hover:border-white/20"
                  }`}
                >
                  <Moon className="h-5 w-5 text-[#D9A441] shrink-0" />
                  <div>
                    <b className="block text-sm font-semibold">Koyu Gece (Lüks)</b>
                    <span className="text-[11px] opacity-75">Derin siyah zemin</span>
                  </div>
                  {loaderConfig.tema === "dark" && <Check className="h-4 w-4 ml-auto text-[#D9A441]" />}
                </button>
              </div>
            </div>

            {/* Logo Boyutu Slider */}
            <div className="bg-[#0D1117] p-4 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#D9A441]">
                  2. Logo Büyüklüğü
                </label>
                <span className="text-xs font-mono font-bold text-[#EEE9E0] bg-white/10 px-2 py-0.5 rounded">
                  {loaderConfig.logoBoyut || 84}px
                </span>
              </div>
              <input
                type="range"
                min={60}
                max={130}
                step={2}
                value={loaderConfig.logoBoyut || 84}
                onChange={(e) => patchLoader({ logoBoyut: Number(e.target.value) })}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D9A441]"
              />
              <div className="flex justify-between text-[11px] text-[#8A9BB0] mt-1.5 font-mono">
                <span>60px (Kibar)</span>
                <span>84px (Varsayılan Lüks)</span>
                <span>130px (Büyük Vurucu)</span>
              </div>
            </div>

            {/* Metin Düzenlemeleri */}
            <div className="space-y-3">
              <Input
                label="Ana Marka / Başlık Yazısı"
                value={loaderConfig.baslik || "PETRA YAŞAM MERKEZİ"}
                onChange={(e) => patchLoader({ baslik: e.target.value })}
                placeholder="PETRA YAŞAM MERKEZİ"
              />
              <Input
                label="Alt Açıklama / Slogan Yazısı"
                value={loaderConfig.sublabel || "Cafe · Restaurant · Pool & Beach · Spor Salonu"}
                onChange={(e) => patchLoader({ sublabel: e.target.value })}
                placeholder="Cafe · Restaurant · Pool & Beach · Spor Salonu"
              />
            </div>

            {/* Renk İnce Ayarları */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <ColorField
                label="Dönen Halka Rengi"
                value={loaderConfig.halkaRenk || "#D9A441"}
                onChange={(halkaRenk) => patchLoader({ halkaRenk })}
              />
              <ColorField
                label="Arka Plan Rengi"
                value={loaderConfig.arkaplanRenk || (loaderConfig.tema === "dark" ? "#090C08" : "#FAF7F0")}
                onChange={(arkaplanRenk) => patchLoader({ arkaplanRenk })}
              />
            </div>
          </div>

          {/* Sağ Kolon: CANLI ANLIK ÖNİZLEME KUTUSU */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A9BB0] flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-[#D9A441]" />
                Anlık Canlı Önizleme (Live Canvas)
              </span>
              <span className="text-[11px] text-[#6B7A94]">Yaptığınız değişiklikler anında yansır</span>
            </div>

            {/* Önizleme Çerçevesi */}
            <div className="w-full rounded-3xl border-2 border-[#D9A441]/40 overflow-hidden shadow-2xl bg-black/40 min-h-[420px] flex items-center justify-center p-2 relative">
              <LuxuryLoader
                fullScreen={false}
                config={loaderConfig}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. GENEL TEMA RENKLERİ & PALETLER                                         */}
      {/* ========================================================================= */}
      <section className="mb-6 rounded-2xl border border-[#C8703A]/25 bg-[#141E2E]/80 p-6">
        <h3 className="mb-1 font-semibold text-[#F8F8F8]">Hazır Renk Paletleri</h3>
        <p className="mb-4 text-xs text-[#6B7A94]">Bir palet seçin, gerekirse rengi ince ayarlayın, kaydedin.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {THEME_PRESETS.map((p) => {
            const on = activePreset === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setContent({ ...content, theme: { ...p.theme } })}
                className={
                  on
                    ? "rounded-2xl border-2 border-[#C8703A] bg-[#0D1117] p-4 text-left"
                    : "rounded-2xl border border-white/[0.08] bg-[#0D1117] p-4 text-left transition hover:border-[#C8703A]/40"
                }
              >
                <span className="mb-3 flex h-10 overflow-hidden rounded-xl">
                  <i className="flex-1" style={{ background: p.theme.paper }} />
                  <i className="flex-1" style={{ background: p.theme.brass }} />
                  <i className="flex-1" style={{ background: p.theme.char }} />
                  <i className="flex-1" style={{ background: p.theme.ctaBg }} />
                </span>
                <b className="block text-sm text-[#EEE9E0]">{p.label}</b>
                <span className="text-xs text-[#6B7A94]">{p.hint}</span>
              </button>
            );
          })}
        </div>
        <Button className="mt-4" variant="ghost" onClick={() => setContent({ ...content, theme: { ...DEFAULT_THEME } })}>
          Petra Gold’a dön
        </Button>
      </section>

      <section className="mb-6 overflow-hidden rounded-2xl border border-white/[0.08]">
        <div
          className="flex h-14 items-center justify-between gap-4 px-5"
          style={{ background: theme.navSolidBg, color: theme.navSolidText }}
        >
          <span className="text-sm font-bold tracking-widest">PETRA</span>
          <span className="hidden text-xs font-semibold sm:inline">Menü · Havuz · İletişim</span>
          <span
            className="rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider"
            style={{ background: theme.ctaBg, color: theme.ctaText }}
          >
            Rezervasyon
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4" style={{ background: theme.paper, color: theme.ink }}>
          <div className="p-4 text-sm">
            <p className="text-[10px] uppercase tracking-widest" style={{ color: theme.brass }}>
              Hakkımızda
            </p>
            <p className="font-serif text-lg">Zemin & yazı</p>
            <p className="text-xs" style={{ color: theme.muted }}>
              İkincil metin
            </p>
          </div>
          <div className="p-4 text-sm" style={{ background: theme.cream }}>
            Bölüm krem
          </div>
          <div className="p-4 text-sm" style={{ background: theme.char, color: theme.cream }}>
            Koyu bölüm
          </div>
          <div className="p-4 text-sm" style={{ background: theme.footerBg, color: theme.footerText }}>
            Footer
          </div>
        </div>
      </section>

      <section className="mb-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="flex items-center gap-2 font-semibold text-[#F8F8F8]">
          <Palette className="h-4 w-4 text-[#C8703A]" /> Navbar
        </h3>
        <p className="text-xs text-[#6B7A94]">
          Kaydırılmış çubuk ve Rezervasyon butonu. Hero üstündeki yazı kapı sahnesinde okunur kalsın.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <ColorField
            label="Navbar zemin (solid)"
            value={theme.navSolidBg}
            onChange={(navSolidBg) => patchTheme({ navSolidBg })}
          />
          <ColorField
            label="Navbar yazı (solid)"
            value={theme.navSolidText}
            onChange={(navSolidText) => patchTheme({ navSolidText })}
          />
          <ColorField
            label="Navbar yazı (hero üstü)"
            value={theme.navHeroText}
            onChange={(navHeroText) => patchTheme({ navHeroText })}
            hint="Kapı sahnesinin üzerinde — açık renk önerilir."
          />
          <ColorField
            label="Rezervasyon butonu zemin"
            value={theme.ctaBg}
            onChange={(ctaBg) => patchTheme({ ctaBg })}
          />
          <ColorField
            label="Rezervasyon butonu yazı"
            value={theme.ctaText}
            onChange={(ctaText) => patchTheme({ ctaText })}
          />
        </div>
      </section>

      <section className="mb-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="font-semibold text-[#F8F8F8]">Sayfa & yazı</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <ColorField label="Sayfa zemini" value={theme.paper} onChange={(paper) => patchTheme({ paper })} />
          <ColorField label="Ana yazı" value={theme.ink} onChange={(ink) => patchTheme({ ink })} />
          <ColorField label="Krem / kart" value={theme.cream} onChange={(cream) => patchTheme({ cream })} />
          <ColorField label="Krem 2" value={theme.cream2} onChange={(cream2) => patchTheme({ cream2 })} />
          <ColorField label="İkincil yazı" value={theme.muted} onChange={(muted) => patchTheme({ muted })} />
          <ColorField
            label="Vurgu (pirinç / accent)"
            value={theme.brass}
            onChange={(brass) => patchTheme({ brass })}
            hint="Eyebrow, fiyat, aktif link"
          />
          <ColorField label="Vurgu koyu" value={theme.brassLo} onChange={(brassLo) => patchTheme({ brassLo })} />
          <ColorField label="Zeytin" value={theme.olive} onChange={(olive) => patchTheme({ olive })} />
        </div>
      </section>

      <section className="mb-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="font-semibold text-[#F8F8F8]">Koyu bölümler & footer</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <ColorField label="Koyu zemin" value={theme.char} onChange={(char) => patchTheme({ char })} />
          <ColorField label="Koyu 2" value={theme.char2} onChange={(char2) => patchTheme({ char2 })} />
          <ColorField label="Footer zemin" value={theme.footerBg} onChange={(footerBg) => patchTheme({ footerBg })} />
          <ColorField label="Footer yazı" value={theme.footerText} onChange={(footerText) => patchTheme({ footerText })} />
        </div>
      </section>
    </>
  );
}
