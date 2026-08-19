"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  GripVertical,
  ExternalLink,
  Phone,
  Hash,
  Globe,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import { api } from "@/lib/api/client";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import BrandLogo from "@/components/site/BrandLogo";
import Input from "@/components/admin/ui/Input";
import ColorField from "@/components/admin/ui/ColorField";
import Button from "@/components/admin/ui/Button";
import Upload from "@/components/admin/ui/Upload";
import SaveBar from "@/components/admin/ui/SaveBar";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";
import { resolveTheme } from "@/lib/content/theme";

type LinkType = "anchor" | "page" | "external" | "tel";

function detectLinkType(href: string): LinkType {
  if (href.startsWith("tel:")) return "tel";
  if (href.startsWith("http")) return "external";
  if (href.startsWith("#")) return "anchor";
  return "page";
}

const LINK_TYPE_ICONS = {
  anchor: Hash,
  page: Globe,
  external: ExternalLink,
  tel: Phone,
};

const LINK_TYPE_LABELS = {
  anchor: "Sayfa İçi (#)",
  page: "Site Sayfası",
  external: "Dış Bağlantı",
  tel: "Telefon",
};

const PRESET_LINKS = [
  { label: "Hakkımızda", href: "#hakkimizda" },
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Menü", href: "/menu" },
  { label: "Kahve", href: "/menu/kahve" },
  { label: "Nargile", href: "/menu/nargile" },
  { label: "Kokteyller", href: "/menu/kokteyller" },
  { label: "Havuz & Plaj", href: "#pasta" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "#iletisim" },
];

export default function NavbarPanel() {
  const { content, setContent, loading } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [previewOpen, setPreviewOpen] = useState(false);

  const save = async () => {
    if (!content) return;
    setSaving(true);
    try {
      const res = await api.updateContent({
        navbar: {
          ...content.navbar,
          links: (content.navbar.links || []).map((l) =>
            /^menü$/i.test((l.label || "").trim()) || l.href === "#menu" || l.href === "/#menu"
              ? { ...l, href: "/menu" }
              : l
          ),
        },
        theme: content.theme,
      });
      setContent(res.data);
      setMessage("Menü başarıyla kaydedildi.");
      setMessageType("success");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Kayıt başarısız");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) return <AdminLoading />;

  const nav = content.navbar;
  const logoSrc = liveMedia(content.images?.logo, SITE_PHOTOS.mark);
  const logoIsSvg = /\.svg(\?|$)/i.test(logoSrc);

  const moveLink = (i: number, dir: "up" | "down") => {
    const links = [...nav.links];
    const target = dir === "up" ? i - 1 : i + 1;
    if (target < 0 || target >= links.length) return;
    [links[i], links[target]] = [links[target], links[i]];
    setContent({ ...content, navbar: { ...nav, links } });
  };

  const addPresetLinks = () => {
    const existing = new Set(nav.links.map((l) => l.href));
    const toAdd = PRESET_LINKS.filter((p) => !existing.has(p.href));
    if (!toAdd.length) return;
    setContent({
      ...content,
      navbar: { ...nav, links: [...nav.links, ...toAdd] },
    });
  };

  return (
    <>
      <AdminPageHeader
        title="Navbar ve Menü Yönetimi"
        description="Üst çubuk: logo, menü linkleri ve en sağdaki Rezervasyon butonu."
      />
      <AdminAlert message={message} type={messageType} />

      {/* Logo — navbar + footer · SVG / raster */}
      <section className="mb-6 rounded-2xl border border-[#C8703A]/30 bg-[#141E2E] p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-[#F8F8F8]">Marka logosu</h3>
            <p className="mt-1 text-xs text-[#8A9BB0]">
              Navbar ve footer’da yayınlanır. <span className="text-[#E8B84B]">SVG önerilir</span>
              {" "}(keskin, ölçeklenebilir). PNG / WebP de kabul edilir.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={
                logoIsSvg
                  ? "rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300"
                  : "rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8A9BB0]"
              }
            >
              {logoIsSvg ? "SVG vektör" : "Raster görsel"}
            </span>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#C8703A] hover:underline"
            >
              Siteyi aç →
            </a>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-[220px_1fr]">
          <div className="flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border border-white/[0.08] bg-[radial-gradient(circle_at_40%_30%,rgba(200,112,58,0.12),transparent_55%),#0D1117] p-5">
            <BrandLogo
              src={logoSrc}
              alt="Logo önizleme"
              height={72}
              className="max-h-[140px] drop-shadow-md"
            />
          </div>
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-white">
              <div className="flex h-[72px] items-center gap-3 px-4">
                <BrandLogo
                  src={logoSrc}
                  alt=""
                  height={Math.min(56, nav.logoSize || 64)}
                  className="max-w-[200px]"
                />
                <span className="ml-auto rounded-full bg-[#D9A441] px-3 py-1 text-[11px] font-bold text-[#16190F]">
                  {nav.ctaLabel || "Rezervasyon"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label className="text-[#8A9BB0]">Logo yüksekliği</label>
                <span className="font-semibold text-[#EEE9E0]">{nav.logoSize ?? 64}px</span>
              </div>
              <input
                type="range"
                min={40}
                max={96}
                step={2}
                value={nav.logoSize ?? 64}
                onChange={(e) =>
                  setContent({
                    ...content,
                    navbar: { ...nav, logoSize: Number(e.target.value) },
                  })
                }
                className="w-full accent-[#C8703A]"
              />
              <p className="text-[11px] text-[#6B7A94]">
                40–96 px · Geniş SVG’ler orantılı ölçeklenir · Kaydet ile yayınlanır
              </p>
            </div>

            <label className="flex cursor-pointer items-center gap-3 text-sm text-[#EEE9E0]">
              <input
                type="checkbox"
                checked={nav.logoTextGizle !== false}
                onChange={(e) =>
                  setContent({
                    ...content,
                    navbar: { ...nav, logoTextGizle: e.target.checked },
                  })
                }
                className="h-4 w-4 accent-[#C8703A]"
              />
              Navbar’da yedek yazıyı gizle (sadece logo)
            </label>

            <Input
              label="Mobil menü başlığı"
              value={nav.mobileLabel || "Menü"}
              onChange={(e) =>
                setContent({
                  ...content,
                  navbar: { ...nav, mobileLabel: e.target.value },
                })
              }
              placeholder="Menü"
            />
            <p className="text-[11px] leading-relaxed text-[#6B7A94]">
              Mobil menü bu başlık, aşağıdaki linkler ve en alttaki Rezervasyon butonundan oluşur. Çalışma saati İletişim panelinden gelir.
            </p>

            <Upload
              accept="image/svg+xml,.svg,image/png,image/webp,image/jpeg,image/gif"
              uploadKey="logo"
              enableCrop={false}
              webp={false}
              label="Logo yükle — SVG (önerilen) veya PNG / WebP"
              onComplete={async () => {
                try {
                  const res = await api.getAdminContent();
                  const nextNav = {
                    ...res.data.navbar,
                    logoTextGizle: true,
                    logoSize: res.data.navbar?.logoSize ?? nav.logoSize ?? 64,
                  };
                  setContent({ ...res.data, navbar: nextNav });
                  // Boyutu da kaydet — logo hemen production’a yansısın
                  await api.updateContent({ navbar: nextNav });
                  setMessage(
                    /\.svg(\?|$)/i.test(res.data.images?.logo || "")
                      ? "SVG logo yayınlandı. Boyutu ayarlayıp gerekirse Kaydet’e basın."
                      : "Logo yayınlandı. Boyutu ayarlayıp Kaydet’e basın."
                  );
                  setMessageType("success");
                } catch (e) {
                  setMessage(e instanceof Error ? e.message : "Yükleme sonrası okuma başarısız");
                  setMessageType("error");
                }
              }}
              onError={(e) => {
                setMessage(e.message);
                setMessageType("error");
              }}
            />
            <p className="text-[11px] leading-relaxed text-[#6B7A94]">
              İpucu: Şeffaf arka planlı SVG veya PNG kullanın. SVG içindeki script’ler güvenlik için temizlenir.
            </p>
          </div>
        </div>
      </section>

      {/* Temel Ayarlar */}
      <section className="mb-6 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="mb-4 font-semibold text-[#F8F8F8]">Temel Ayarlar</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <Input
            label="Logo Metni (yedek — logo yoksa)"
            value={nav.logoText}
            onChange={(e) =>
              setContent({ ...content, navbar: { ...nav, logoText: e.target.value } })
            }
            placeholder="PETRA"
          />
          <Input
            label="Rezervasyon butonu"
            value={nav.ctaLabel}
            onChange={(e) =>
              setContent({ ...content, navbar: { ...nav, ctaLabel: e.target.value } })
            }
            placeholder="Rezervasyon"
          />
          <Input
            label="Buton linki"
            value={nav.ctaHref}
            onChange={(e) =>
              setContent({ ...content, navbar: { ...nav, ctaHref: e.target.value } })
            }
            placeholder="#rezervasyon"
          />
        </div>
        <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-[#EEE9E0]">
          <input
            type="checkbox"
            checked={nav.showPhone !== false}
            onChange={(e) =>
              setContent({
                ...content,
                navbar: { ...nav, showPhone: e.target.checked },
              })
            }
            className="h-4 w-4 accent-[#C8703A]"
          />
          Rezervasyonun solunda telefonu göster (numara İletişim’den gelir)
        </label>
        <p className="mt-2 text-xs text-[#6B7A94]">
          Sağdaki altın buton rezervasyon formuna gider. Telefonu değiştirmek için İletişim ekranını kullanın.
        </p>
      </section>

      <section className="mb-6 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="mb-1 font-semibold text-[#F8F8F8]">Navbar renkleri</h3>
        <p className="mb-4 text-xs text-[#6B7A94]">
          Tam palet için Admin → Tema & Renkler. Buradaki alanlar aynı temayı günceller.
        </p>
        {(() => {
          const theme = resolveTheme(content.theme);
          const patch = (next: Partial<typeof theme>) =>
            setContent({ ...content, theme: { ...theme, ...next } });
          return (
            <div className="grid gap-4 md:grid-cols-2">
              <ColorField
                label="Çubuk zemin"
                value={theme.navSolidBg}
                onChange={(navSolidBg) => patch({ navSolidBg })}
              />
              <ColorField
                label="Çubuk yazı"
                value={theme.navSolidText}
                onChange={(navSolidText) => patch({ navSolidText })}
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
          );
        })()}
      </section>

      {/* Menü Linkleri */}
      <section className="mb-6 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-[#F8F8F8]">Menü Linkleri</h3>
            <p className="text-xs text-[#8A9BB0]">
              {nav.links.length} link — sıra okları ile yeniden sırala
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewOpen((v) => !v)}
            >
              {previewOpen ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              Önizleme
            </Button>
          </div>
        </div>

        {/* Navbar Önizleme */}
        {previewOpen && (
          <div className="mb-5 overflow-hidden rounded-xl border border-white/[0.06] bg-white">
            <div
              style={{ fontFamily: "Inter, sans-serif" }}
              className="flex h-14 items-center gap-6 px-6"
            >
              <span className="mr-auto">
                <BrandLogo src={logoSrc} alt={nav.logoText || "PETRA"} height={28} />
              </span>
              <nav className="flex gap-1">
                {nav.links.map((l, i) => (
                  <span
                    key={i}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold text-[#1F2416]"
                  >
                    {l.label}
                  </span>
                ))}
              </nav>
              <span className="rounded-full bg-[#16190F] px-4 py-2 text-xs font-bold text-[#F5C862]">
                {nav.ctaLabel || "Rezervasyon"}
              </span>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {nav.links.map((link, i) => {
            const linkType = detectLinkType(link.href);
            const Icon = LINK_TYPE_ICONS[linkType];
            return (
              <div
                key={i}
                className="grid items-end gap-3 rounded-xl border border-white/[0.06] bg-[#0D1117] p-3 md:grid-cols-[24px_1fr_1.5fr_130px_auto]"
              >
                {/* Sıra ikonu */}
                <GripVertical className="h-5 w-5 self-center text-[#4A5568]" />

                <Input
                  label="Menü Etiketi"
                  value={link.label}
                  onChange={(e) => {
                    const links = [...nav.links];
                    links[i] = { ...links[i], label: e.target.value };
                    setContent({ ...content, navbar: { ...nav, links } });
                  }}
                  placeholder="Hakkımızda"
                />

                <Input
                  label="Bağlantı (href)"
                  value={link.href}
                  onChange={(e) => {
                    const links = [...nav.links];
                    links[i] = { ...links[i], href: e.target.value };
                    setContent({ ...content, navbar: { ...nav, links } });
                  }}
                  placeholder="#hakkimizda"
                />

                {/* Link tipi göstergesi */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-[#8A9BB0]">Tip</label>
                  <div className="flex h-11 items-center gap-2 rounded-2xl border border-white/[0.06] bg-[#141E2E] px-3 text-xs text-[#8A9BB0]">
                    <Icon className="h-3.5 w-3.5 text-[#C8703A]" />
                    {LINK_TYPE_LABELS[linkType]}
                  </div>
                </div>

                {/* Aksiyonlar */}
                <div className="flex items-end gap-1 pb-0.5">
                  <button
                    type="button"
                    onClick={() => moveLink(i, "up")}
                    disabled={i === 0}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.04] text-[#6B7A94] transition hover:bg-white/[0.06] disabled:opacity-30"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveLink(i, "down")}
                    disabled={i === nav.links.length - 1}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.04] text-[#6B7A94] transition hover:bg-white/[0.06] disabled:opacity-30"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setContent({
                        ...content,
                        navbar: {
                          ...nav,
                          links: nav.links.filter((_, j) => j !== i),
                        },
                      })
                    }
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-500/20 text-red-400 transition hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ekle Butonları */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setContent({
                ...content,
                navbar: {
                  ...nav,
                  links: [
                    ...nav.links,
                    { label: "Yeni Link", href: "#" },
                  ],
                },
              })
            }
          >
            <Plus className="h-4 w-4" /> Boş Link Ekle
          </Button>
          <Button variant="ghost" size="sm" onClick={addPresetLinks}>
            <Plus className="h-4 w-4" /> Standart Linkleri Ekle
          </Button>
        </div>
      </section>

      {/* Hazır Link Şablonları */}
      <section className="mb-6 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="mb-3 font-semibold text-[#F8F8F8]">Hızlı Ekle — Standart Sayfalar</h3>
        <p className="mb-4 text-xs text-[#8A9BB0]">
          Tıklayarak menüye tek bir link ekleyin
        </p>
        <div className="flex flex-wrap gap-2">
          {PRESET_LINKS.map((p) => {
            const exists = nav.links.some((l) => l.href === p.href);
            return (
              <button
                key={p.href}
                type="button"
                disabled={exists}
                onClick={() =>
                  setContent({
                    ...content,
                    navbar: {
                      ...nav,
                      links: [...nav.links, { label: p.label, href: p.href }],
                    },
                  })
                }
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  exists
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 cursor-default"
                    : "border-white/[0.06] bg-white/[0.03] text-[#EEE9E0] hover:border-[#C8703A]/30 hover:bg-[#C8703A]/10 hover:text-[#C8703A]"
                }`}
              >
                {exists ? "✓ " : "+ "}
                {p.label}
              </button>
            );
          })}
        </div>
      </section>

      <SaveBar onSave={save} saving={saving} />
    </>
  );
}
