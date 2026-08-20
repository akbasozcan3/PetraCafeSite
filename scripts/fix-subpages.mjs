/**
 * 1) Masaüstünde hamburger: inline !important stillerini temizle
 * 2) Tüm ürün/blog sayfalarına ana sayfa footer (foot__grid) koy
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function depthFromPublic(file) {
  const rel = path.relative(path.join(root, "public"), file);
  // public/urunler/urunler → depth 1; public/urunler/x/x → depth 2
  return Math.max(0, rel.split(path.sep).length - 1);
}

function prefixFor(depth) {
  if (depth <= 0) return "";
  return "../".repeat(depth);
}

function fullFooter(file, depth) {
  const p = prefixFor(depth);
  const home = `${p}index.htm`;
  const logo = `${p}assets/img/logo.webp`;
  const norm = file.replace(/\\/g, "/");
  const isUrunler = norm.includes("/urunler/");
  const urunlerHref = isUrunler
    ? depth >= 2
      ? "../urunler"
      : "urunler"
    : `${p}urunler/urunler`;
  const blogHref = `${p}blog/blog`;
  return `<footer class="foot">
  <div class="wrap">
    <div class="foot__grid">
      <div>
        <img class="foot__mark" data-site="logo" src="${logo}" alt="Logo" width="160" height="160" loading="lazy" decoding="async">
      </div>
      <div><h4>Fırın</h4><a href="${home}#hakkimizda">Hakkımızda</a><a href="${urunlerHref}">Ürünler</a><a href="${home}#pasta">Özel Pastalar</a><a href="${home}#galeri">Galeri</a><a href="${blogHref}">Blog</a></div>
      <div><h4>Adres</h4><a href="${home}#iletisim">Turgut Özal Cad. No:108/C</a><a href="${home}#iletisim">Bulvar Rezidans A Blok</a><a href="${home}#iletisim">Çekmeköy / İstanbul</a><a href="${home}#iletisim">7/24 açık</a></div>
      <div><h4>İletişim</h4><a href="tel:+905523400202">0552 340 02 02</a><a href="https://wa.me/905523400202" target="_blank" rel="noopener noreferrer">WhatsApp</a><a href="https://www.instagram.com/firincitasdelenn/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="mailto:info@firincitasdelen.com.tr">info@firincitasdelen.com.tr</a></div>
    </div>
  </div>
  <div class="wrap foot__bar"><span>© <span id="yil">2026</span> Taşdelen Fırıncı</span><span>Tüm hakları saklıdır.</span></div>
</footer>`;
}

function stripBurgerInline(html) {
  return html
    .replace(
      /(<button[^>]*class="[^"]*nav__burger[^"]*"[^>]*)\s+style="[^"]*"/gi,
      "$1"
    )
    .replace(
      /(<button[^>]*id="burger"[^>]*)\s+style="[^"]*"/gi,
      "$1"
    )
    .replace(
      /(class="nav__burger"[^>]*?)\s+style="[^"]*display:\s*flex\s*!important[^"]*"/gi,
      "$1"
    );
}

function replaceFooter(html, file, depth) {
  if (!/<footer[\s>]/i.test(html)) {
    // insert before last scripts / </body>
    if (/<\/body>/i.test(html)) {
      return html.replace(/<\/body>/i, `${fullFooter(file, depth)}\n</body>`);
    }
    return html;
  }
  return html.replace(/<footer[\s\S]*?<\/footer>/i, fullFooter(file, depth));
}

const targets = [
  ...walk(path.join(root, "public", "urunler")),
  ...walk(path.join(root, "public", "blog")),
  ...walk(path.join(root, "urunler")),
  ...walk(path.join(root, "blog")),
].filter((f) => {
  const base = path.basename(f);
  return !/\.(css|js|jpg|jpeg|png|webp|svg|ico|map|json)$/i.test(base);
});

let n = 0;
for (const file of [...new Set(targets)]) {
  let html = fs.readFileSync(file, "utf8");
  if (!/<html/i.test(html)) continue;
  const before = html;
  const inPublic = file.includes(`${path.sep}public${path.sep}`);
  const depth = inPublic
    ? depthFromPublic(file)
    : Math.max(0, path.relative(root, file).split(path.sep).length - 1);
  html = stripBurgerInline(html);
  html = replaceFooter(html, file, depth);
  if (html !== before) {
    fs.writeFileSync(file, html, "utf8");
    n += 1;
    console.log("fixed", path.relative(root, file), "depth=", depth);
  }
}

// CSS: desktop'ta burger kesinlikle kapalı
const cssPath = path.join(root, "assets", "css", "style.css");
let css = fs.readFileSync(cssPath, "utf8");
const guard = `
/* Desktop: hamburger asla görünmesin (inline style override) */
@media (min-width: 861px) {
  .nav__burger {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
}
`;
if (!css.includes("Desktop: hamburger asla görünmesin")) {
  css += guard;
  fs.writeFileSync(cssPath, css, "utf8");
  fs.copyFileSync(cssPath, path.join(root, "public", "assets", "css", "style.css"));
  console.log("css guard added");
}

console.log("done, files=", n);

// PayTR Info API Route Oluştur
const paytrInfoDir = path.join(root, "app", "api", "v1", "payment", "paytr", "info");
if (!fs.existsSync(paytrInfoDir)) fs.mkdirSync(paytrInfoDir, { recursive: true });

const paytrInfoCode = `import { NextResponse } from "next/server";
import { getPayTrConfig } from "@/lib/integrations/paytr/paytr";

export const runtime = "nodejs";

export async function GET() {
  try {
    const config = await getPayTrConfig();
    return NextResponse.json({
      depositAmount: config.depositAmount || 250,
      depositEnabled: config.depositEnabled !== false,
      depositNote: config.depositNote || "kapora ile masanızı anında garantileyin.",
      isConfigured: Boolean(config.merchantId && config.merchantKey && config.merchantSalt),
    });
  } catch {
    return NextResponse.json({
      depositAmount: 250,
      depositEnabled: true,
      depositNote: "kapora ile masanızı anında garantileyin.",
      isConfigured: false,
    });
  }
}
`;

fs.writeFileSync(path.join(paytrInfoDir, "route.ts"), paytrInfoCode, "utf8");
console.log("PayTR info API route created!");


// Admin Sozlesmeler Sayfasını Oluştur
const sozlesmelerDir = path.join(root, "app", "admin", "sozlesmeler");
if (!fs.existsSync(sozlesmelerDir)) fs.mkdirSync(sozlesmelerDir, { recursive: true });

const sozlesmelerCode = `"use client";


import { useState } from "react";
import { Loader2, Save, FileText, Shield, Check, Globe, Building, ArrowRight } from "lucide-react";
import { api } from "@/lib/api/client";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

const TABS = [
  { id: "gizlilikPolitikasi", label: "Gizlilik & KVKK", icon: Shield, color: "#10B981" },
  { id: "rezervasyonKosullari", label: "Rezervasyon & İptal Koşulları", icon: Check, color: "#D9A441" },
  { id: "kullanimKosullari", label: "Kullanım Koşulları", icon: FileText, color: "#3B82F6" },
  { id: "cerezPolitikasi", label: "Çerez Politikası", icon: Globe, color: "#8B5CF6" },
  { id: "ticariBilgiler", label: "İşletme & Ticari Bilgiler", icon: Building, color: "#EC4899" },
];

export default function AdminSozlesmelerPage() {
  const { content, loading, setContent } = useAdminContent();
  const [activeTab, setActiveTab] = useState("gizlilikPolitikasi");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const legal = (content?.legal as any) || (DEFAULT_CONTENT.legal as any);
  const currentDoc = legal?.[activeTab] || (DEFAULT_CONTENT.legal as any)?.[activeTab] || { title: "", lead: "", body: "" };

  const handleUpdate = (field: string, value: string) => {
    if (!content) return;
    const updatedLegal = {
      ...legal,
      [activeTab]: {
        ...currentDoc,
        [field]: value,
      },
    };
    setContent({
      ...content,
      legal: updatedLegal,
    });
  };

  const save = async () => {
    if (!content) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await api.updateContent({ legal: content.legal });
      setContent(res.data);
      setMessage({ type: "ok", text: "✅ Yasal metinler ve sözleşmeler başarıyla kaydedildi!" });
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      setMessage({ type: "err", text: \`Hata: \${err?.message || "Kayıt başarısız"}\` });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20 text-white/50 text-sm">
        <Loader2 className="h-5 w-5 animate-spin mr-2" /> Sözleşmeler yükleniyor...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      <AdminPageHeader
        title="Sözleşmeler, KVKK & Hukuki Metinler"
        description="Web sitenizde yer alan Gizlilik, KVKK, Rezervasyon/İptal Koşulları, Çerez Politikası ve Ticari Bilgileri yönetin."
      />

      {message && (
        <div
          className={\`p-4 rounded-xl text-sm font-semibold border \${
            message.type === "ok"
              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
              : "bg-red-500/15 border-red-500/30 text-red-300"
          }\`}
        >
          {message.text}
        </div>
      )}

      {/* Üst Sekmeler */}
      <div className="flex flex-wrap gap-2 border-b border-white/[0.08] pb-3">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={\`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition \${
                isActive
                  ? "bg-[#D9A441] text-[#0D0F0A] shadow-lg shadow-[#D9A441]/20 scale-[1.02]"
                  : "bg-[#141E2E] text-[#8A9BB0] hover:text-white hover:bg-[#1A2638] border border-white/[0.06]"
              }\`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Alanı */}
      <section className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D9A441]">Düzenlenen Sözleşme</span>
            <h2 className="text-lg font-extrabold text-white">
              {TABS.find((t) => t.id === activeTab)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={
                activeTab === "gizlilikPolitikasi"
                  ? "/gizlilik-politikasi"
                  : activeTab === "rezervasyonKosullari"
                  ? "/rezervasyon-kosullari"
                  : activeTab === "kullanimKosullari"
                  ? "/kullanim-kosullari"
                  : activeTab === "cerezPolitikasi"
                  ? "/cerez-politikasi"
                  : "/ticari-bilgiler"
              }
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white/70 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition"
            >
              <span>Canlıda Gör</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>

            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#D9A441] text-[#0D0F0A] text-xs font-extrabold shadow-md hover:bg-[#c99534] transition disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Değişiklikleri Kaydet
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#8A9BB0] mb-1.5">
            Sayfa Başlığı *
          </label>
          <input
            type="text"
            value={currentDoc.title || ""}
            onChange={(e) => handleUpdate("title", e.target.value)}
            className="w-full rounded-xl border border-white/[0.1] bg-[#0D1117] px-4 py-2.5 text-sm text-white focus:border-[#D9A441] focus:outline-none"
            placeholder="Sözleşme başlığı"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#8A9BB0] mb-1.5">
            Özet / Giriş Metni (Lead)
          </label>
          <input
            type="text"
            value={currentDoc.lead || ""}
            onChange={(e) => handleUpdate("lead", e.target.value)}
            className="w-full rounded-xl border border-white/[0.1] bg-[#0D1117] px-4 py-2.5 text-sm text-white focus:border-[#D9A441] focus:outline-none"
            placeholder="Kısa bilgilendirme özeti"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#8A9BB0] mb-1.5">
            Sözleşme / Metin Gövdesi *
          </label>
          <textarea
            rows={14}
            value={currentDoc.body || ""}
            onChange={(e) => handleUpdate("body", e.target.value)}
            className="w-full rounded-xl border border-white/[0.1] bg-[#0D1117] p-4 text-xs font-mono leading-relaxed text-[#EEE9E0] focus:border-[#D9A441] focus:outline-none"
            placeholder="Maddeleri buraya yazın..."
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#D9A441] text-[#0D0F0A] text-xs font-extrabold shadow-md hover:bg-[#c99534] transition disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Metinleri Kaydet
          </button>
        </div>
      </section>
    </div>
  );
}
`;

fs.writeFileSync(path.join(sozlesmelerDir, "page.tsx"), sozlesmelerCode, "utf8");
console.log("Admin sozlesmeler page successfully generated!");

