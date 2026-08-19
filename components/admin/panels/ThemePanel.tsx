"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Palette } from "lucide-react";
import { api } from "@/lib/api/client";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";
import SaveBar from "@/components/admin/ui/SaveBar";
import ColorField from "@/components/admin/ui/ColorField";
import Button from "@/components/admin/ui/Button";
import { DEFAULT_THEME, THEME_PRESETS, resolveTheme } from "@/lib/content/theme";
import type { ThemeContent } from "@/lib/content/types";

const THEME_KEYS = Object.keys(DEFAULT_THEME) as (keyof ThemeContent)[];

function themesEqual(a: ThemeContent, b: ThemeContent) {
  return THEME_KEYS.every(
    (k) => String(a[k] || "").toLowerCase() === String(b[k] || "").toLowerCase()
  );
}

export default function ThemePanel() {
  const { content, setContent, loading } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  const theme = resolveTheme(content?.theme);
  const activePreset = useMemo(
    () => THEME_PRESETS.find((p) => themesEqual(theme, p.theme))?.id || "",
    [theme]
  );

  if (loading || !content) return <AdminLoading />;

  const patch = (next: Partial<ThemeContent>) => {
    setContent({ ...content, theme: { ...theme, ...next } });
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await api.updateContent({ theme: resolveTheme(content.theme) });
      setContent(res.data);
      setMessage("Tema kaydedildi. Siteyi Ctrl+F5 ile yenileyin.");
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
        title="Tema & renkler"
        description="Admin → Site → Tema. Palet seçin veya renkleri tek tek değiştirin, kaydedin. Navbar, butonlar, zemin, yazı ve footer güncellenir; 3D kapı fotoğraflarına dokunulmaz."
      />
      <AdminAlert message={message} type={messageType} />

      <p className="mb-6 text-sm text-[#8A9BB0]">
        Kaydetmeden vitrinde görünmez.{" "}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-[#C8703A] hover:underline"
        >
          Siteyi aç <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </p>

      <section className="mb-6 rounded-2xl border border-[#C8703A]/25 bg-[#141E2E]/80 p-6">
        <h3 className="mb-1 font-semibold text-[#F8F8F8]">Hazır paletler</h3>
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
            onChange={(navSolidBg) => patch({ navSolidBg })}
          />
          <ColorField
            label="Navbar yazı (solid)"
            value={theme.navSolidText}
            onChange={(navSolidText) => patch({ navSolidText })}
          />
          <ColorField
            label="Navbar yazı (hero üstü)"
            value={theme.navHeroText}
            onChange={(navHeroText) => patch({ navHeroText })}
            hint="Kapı sahnesinin üzerinde — açık renk önerilir."
          />
          <ColorField
            label="Rezervasyon butonu zemin"
            value={theme.ctaBg}
            onChange={(ctaBg) => patch({ ctaBg })}
          />
          <ColorField
            label="Rezervasyon butonu yazı"
            value={theme.ctaText}
            onChange={(ctaText) => patch({ ctaText })}
          />
        </div>
      </section>

      <section className="mb-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="font-semibold text-[#F8F8F8]">Sayfa & yazı</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <ColorField label="Sayfa zemini" value={theme.paper} onChange={(paper) => patch({ paper })} />
          <ColorField label="Ana yazı" value={theme.ink} onChange={(ink) => patch({ ink })} />
          <ColorField label="Krem / kart" value={theme.cream} onChange={(cream) => patch({ cream })} />
          <ColorField label="Krem 2" value={theme.cream2} onChange={(cream2) => patch({ cream2 })} />
          <ColorField label="İkincil yazı" value={theme.muted} onChange={(muted) => patch({ muted })} />
          <ColorField
            label="Vurgu (pirinç / accent)"
            value={theme.brass}
            onChange={(brass) => patch({ brass })}
            hint="Eyebrow, fiyat, aktif link"
          />
          <ColorField label="Vurgu koyu" value={theme.brassLo} onChange={(brassLo) => patch({ brassLo })} />
          <ColorField label="Zeytin" value={theme.olive} onChange={(olive) => patch({ olive })} />
        </div>
      </section>

      <section className="mb-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="font-semibold text-[#F8F8F8]">Koyu bölümler & footer</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <ColorField label="Koyu zemin" value={theme.char} onChange={(char) => patch({ char })} />
          <ColorField label="Koyu 2" value={theme.char2} onChange={(char2) => patch({ char2 })} />
          <ColorField label="Footer zemin" value={theme.footerBg} onChange={(footerBg) => patch({ footerBg })} />
          <ColorField label="Footer yazı" value={theme.footerText} onChange={(footerText) => patch({ footerText })} />
        </div>
      </section>

      <SaveBar onSave={save} saving={saving} />
    </>
  );
}
