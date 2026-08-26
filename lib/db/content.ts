/**
 * İçerik katmanı — PostgreSQL veya JSON dosya
 *
 * DATABASE_URL tanımlıysa → PostgreSQL kullanır
 * Tanımlı değilse         → JSON dosya sistemine geri döner (sıfır hata)
 */

import { cache } from "react";
import fs from "fs";
import path from "path";
import { DEFAULT_CONTENT, mergeContent } from "@/lib/content/defaults";
import type { SiteContent } from "@/lib/content/types";
import { formatHoursSummary, resolveHoursProgram } from "@/lib/content/hours";
import { cascadeBrandFields, syncStaticBrand } from "@/lib/content/sync-static-brand";
import { syncStaticContact } from "@/lib/content/sync-static-contact";
import { applyIletisimCascade } from "@/lib/content/contact-utils";
import { syncBlogPages } from "@/lib/content/sync-blog-pages";
import { ensureProductSlugs } from "@/lib/content/ensure-product-slugs";
import { resolveProductionMediaPath } from "@/lib/admin/media-url";
import { isDeadLocalMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { toPublicSiteContent } from "@/lib/content/public-content";
import { resolveTheme } from "@/lib/content/theme";
import { getPool, isPostgresEnabled } from "./postgres";
import { ensureDatabase } from "./ensure-schema";
import { execFileSync } from "child_process";

function runPostSaveHooks(partial: Partial<SiteContent>, next: SiteContent): void {
  try {
    syncStaticBrand(next);
  } catch (err) {
    console.warn("[DB] Static brand sync:", (err as Error).message);
  }
  if (partial.iletisim || partial.brand) {
    try {
      syncStaticContact(next);
    } catch (err) {
      console.warn("[DB] Static contact sync:", (err as Error).message);
    }
  }
  if (partial.makaleler) {
    try {
      syncBlogPages(next);
    } catch (err) {
      console.warn("[DB] Blog page sync:", (err as Error).message);
    }
  }
  if (partial.menu) {
    try {
      execFileSync(process.execPath, [path.join(process.cwd(), "scripts", "sync-product-pages.mjs")], {
        cwd: process.cwd(),
        stdio: "pipe",
        timeout: 120_000,
      });
    } catch (err) {
      console.warn("[DB] Product page sync:", (err as Error).message);
    }
  }
}

function applyBrandCascade(partial: Partial<SiteContent>, next: SiteContent): SiteContent {
  const brandTouched =
    Boolean(partial.brand) ||
    typeof partial.seo?.siteName === "string" ||
    typeof partial.footer?.markaAdi === "string";

  if (!brandTouched) {
    return next;
  }

  let merged = next;
  if (!partial.brand?.displayName) {
    const promoted =
      partial.seo?.siteName || partial.footer?.markaAdi || next.brand?.displayName;
    if (promoted) {
      merged = {
        ...next,
        brand: {
          displayName: promoted,
          shortName: next.brand?.shortName || next.navbar?.logoText || promoted,
        },
      };
    }
  }

  return cascadeBrandFields(merged);
}

function applySaveCascades(partial: Partial<SiteContent>, next: SiteContent): SiteContent {
  let out = applyBrandCascade(partial, next);
  if (partial.iletisim) {
    out = applyIletisimCascade(out);
  }
  if (partial.menu) {
    out = ensureProductSlugs(out);
  }
  return out;
}

// ────────────────────────────────────────────────────────────────
// Dosya yolları (JSON fallback için)
// ────────────────────────────────────────────────────────────────
const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");
const AUTH_FILE = path.join(DATA_DIR, "auth.json");

// ────────────────────────────────────────────────────────────────
// JSON yardımcıları
// ────────────────────────────────────────────────────────────────
function readJson<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

function writeJson(file: string, data: unknown) {
  try {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    // Vercel serverless: filesystem is read-only — Postgres is required for persistence
    if (process.env.VERCEL === "1") {
      console.warn("[DB] JSON yazılamadı (Vercel):", (err as Error).message);
      return;
    }
    throw err;
  }
}

// ────────────────────────────────────────────────────────────────
// İçerik normalleştirme
// ────────────────────────────────────────────────────────────────
function normalizeImages(images: Record<string, string>) {
  const defaults = DEFAULT_CONTENT.images;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(images || {})) {
    if (!v) continue;
    if (k === "smtpLogoHeight" || k === "smtpLogoSize" || k.startsWith("smtp")) {
      out[k] = String(v);
      continue;
    }
    const fb = defaults[k as keyof typeof defaults];
    out[k] = resolveProductionMediaPath(v, fb);
  }
  return out;
}

function rewriteLocalUploadsInContent(content: SiteContent): SiteContent {
  return content;
}

function normalizeContent(raw: Partial<SiteContent>): SiteContent {
  const merged = mergeContent(raw, DEFAULT_CONTENT);
  merged.images = { ...DEFAULT_CONTENT.images, ...normalizeImages(merged.images) };
  if (isDeadLocalMedia(merged.images?.favicon)) {
    merged.images.favicon = SITE_PHOTOS.favicon;
  }
  if (merged.seo && /firinci/i.test(merged.seo.canonicalUrl || "")) {
    merged.seo.canonicalUrl = "";
  }
  merged.theme = resolveTheme(merged.theme);
  // Empty arrays are intentional (admin cleared the section) — do not restore defaults.
  if (!Array.isArray(merged.galeri)) merged.galeri = DEFAULT_CONTENT.galeri;
  if (!Array.isArray(merged.yorumlar)) merged.yorumlar = DEFAULT_CONTENT.yorumlar;
  if (!merged.sss || !Array.isArray(merged.sss.items)) merged.sss = DEFAULT_CONTENT.sss;
  if (!Array.isArray(merged.makaleler)) merged.makaleler = DEFAULT_CONTENT.makaleler;
  if (!Array.isArray(merged.hizmetler) || merged.hizmetler.length === 0) {
    merged.hizmetler = DEFAULT_CONTENT.hizmetler;
  }
  if (merged.iletisim) {
    const program = resolveHoursProgram(merged.iletisim);
    const allDayCafe =
      program.length === 7 &&
      program.every(
        (d) => !d.kapali && d.acilis === "08:00" && (d.kapanis === "22:00" || d.kapanis === "24:00")
      );
    const nextProgram = allDayCafe
      ? program.map((d) => ({ ...d, kapanis: "24:00" }))
      : program;
    const saatlerRaw = merged.iletisim.saatler?.trim() || "";
    const saatler =
      !saatlerRaw || /22:00/.test(saatlerRaw) || !/havuz/i.test(saatlerRaw)
        ? DEFAULT_CONTENT.iletisim.saatler
        : saatlerRaw;
    merged.iletisim = {
      ...merged.iletisim,
      eposta: /firinci/i.test(merged.iletisim.eposta || "")
        ? ""
        : merged.iletisim.eposta,
      saatProgrami: nextProgram,
      saatler,
    };
  }
  const pastaDef = DEFAULT_CONTENT.pasta;
  merged.pasta = {
    ...pastaDef,
    ...merged.pasta,
    maddeler: merged.pasta?.maddeler?.length ? merged.pasta.maddeler : pastaDef.maddeler,
    gorseller: merged.pasta?.gorseller?.length ? merged.pasta.gorseller : pastaDef.gorseller,
    fiyatlar: merged.pasta?.fiyatlar?.length ? merged.pasta.fiyatlar : pastaDef.fiyatlar,
    dersler: merged.pasta?.dersler?.length ? merged.pasta.dersler : pastaDef.dersler,
    kurallar: merged.pasta?.kurallar?.length ? merged.pasta.kurallar : pastaDef.kurallar,
    yuzmeKursu: merged.pasta?.yuzmeKursu
      ? { ...pastaDef.yuzmeKursu, ...merged.pasta.yuzmeKursu }
      : pastaDef.yuzmeKursu,
  };

  const gymDef = DEFAULT_CONTENT.sporSalonu!;
  merged.sporSalonu = {
    ...gymDef,
    ...(merged.sporSalonu || {}),
    body: merged.sporSalonu?.body?.length ? merged.sporSalonu.body : gymDef.body,
    ozellikler: merged.sporSalonu?.ozellikler?.length ? merged.sporSalonu.ozellikler : gymDef.ozellikler,
    alanlar: merged.sporSalonu?.alanlar?.length ? merged.sporSalonu.alanlar : gymDef.alanlar,
    imkanlar: merged.sporSalonu?.imkanlar?.length ? merged.sporSalonu.imkanlar : gymDef.imkanlar,
    bentoGorseller: merged.sporSalonu?.bentoGorseller?.length ? merged.sporSalonu.bentoGorseller : gymDef.bentoGorseller,
  };

  merged.loader = {
    ...DEFAULT_CONTENT.loader,
    ...(merged.loader || {}),
  };

  merged.sayfalar = {
    ...DEFAULT_CONTENT.sayfalar!,
    ...(merged.sayfalar || {}),
    notFound: {
      ...DEFAULT_CONTENT.sayfalar!.notFound,
      ...(merged.sayfalar?.notFound || {}),
    },
  };

  merged.bolumGoster = {
    ...DEFAULT_CONTENT.bolumGoster,
    ...(merged.bolumGoster || {}),
    sporSalonu: merged.bolumGoster?.sporSalonu !== false,
  };

  if (!merged.bolumlar?.hizmetler) {
    merged.bolumlar = {
      ...merged.bolumlar,
      hizmetler: DEFAULT_CONTENT.bolumlar.hizmetler,
    };
  }

  // Hizmetler eyebrow'u yanlış kaydedilmişse (ör. "02 · PETRA") düzelt
  {
    const hEyebrow = merged.bolumlar?.hizmetler?.eyebrow || "";
    const m = hEyebrow.match(/^(\d{1,2})\s*[·.\-]\s*(.+)$/);
    if (m && /^petra(\s+yaşam(\s+merkezi)?)?$/i.test(m[2].trim())) {
      const def = DEFAULT_CONTENT.bolumlar.hizmetler!;
      merged.bolumlar = {
        ...merged.bolumlar,
        hizmetler: {
          baslik: def.baslik,
          lead: def.lead,
          ...merged.bolumlar.hizmetler,
          eyebrow: `${m[1].padStart(2, "0")} · HİZMETLER`,
        },
      };
    }
  }

  // Legacy section name → generic Blog (multi-store ready)
  const rename = (label?: string) =>
    label && /^fırın\s*günlüğü$/i.test(label.trim()) ? "Blog" : label;

  if (merged.navbar) {
    const ctaIsTel =
      /^tel:/i.test(merged.navbar.ctaHref || "") ||
      /wa\.me/i.test(merged.navbar.ctaHref || "") ||
      /^\+?\d[\d\s]{8,}$/.test((merged.navbar.ctaLabel || "").trim());
    if (ctaIsTel) {
      merged.navbar = {
        ...merged.navbar,
        ctaLabel: "Rezervasyon",
        ctaHref: "#rezervasyon",
        showPhone: merged.navbar.showPhone !== false,
      };
    }
    if (merged.navbar.links) {
      let currentLinks = merged.navbar.links
        .map((l) => ({ ...l, label: rename(l.label) || l.label }))
        .filter((l) => !/^(rezervasyon|randevu)$/i.test((l.label || "").trim()));

      const hasGym = currentLinks.some(
        (l) => /spor/i.test(l.label || "") || /spor-salonu/i.test(l.href || "")
      );
      if (!hasGym) {
        const poolIdx = currentLinks.findIndex((l) => /havuz|plaj/i.test(l.label || ""));
        if (poolIdx !== -1) {
          currentLinks.splice(poolIdx + 1, 0, { label: "Spor Salonu", href: "/spor-salonu" });
        } else {
          currentLinks.push({ label: "Spor Salonu", href: "/spor-salonu" });
        }
      }
      merged.navbar = {
        ...merged.navbar,
        links: currentLinks,
      };
    }
  }
  if (merged.footer?.kolonlar) {
    merged.footer = {
      ...merged.footer,
      kolonlar: merged.footer.kolonlar.map((col) => ({
        ...col,
        links: (col.links || []).map((l) => ({ ...l, label: rename(l.label) || l.label })),
      })),
    };
  }
  if (merged.sayfalar?.blog?.eyebrow && rename(merged.sayfalar.blog.eyebrow) === "Blog") {
    merged.sayfalar = {
      ...merged.sayfalar,
      blog: { ...merged.sayfalar.blog, eyebrow: "Blog" },
    };
  }
  if (Array.isArray(merged.makaleler)) {
    merged.makaleler = merged.makaleler.map((m) =>
      m.kategori && /^fırın\s*günlüğü$/i.test(m.kategori.trim())
        ? { ...m, kategori: "Blog" }
        : m
    );
  }

  return rewriteLocalUploadsInContent(merged);
}

function isSafeExternalUrl(url: string): boolean {
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return false;
    const host = u.hostname.toLowerCase();
    if (
      host === "localhost" ||
      host.endsWith(".local") ||
      host === "0.0.0.0" ||
      host === "::1" ||
      host === "metadata.google.internal"
    ) {
      return false;
    }
    if (/^(10\.|127\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host)) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// ────────────────────────────────────────────────────────────────
// Auth tipi
// ────────────────────────────────────────────────────────────────
export interface AuthRecord {
  email: string;
  passwordHash: string;
  name?: string;
}

// ────────────────────────────────────────────────────────────────
// PostgreSQL: içerik oku
// ────────────────────────────────────────────────────────────────
async function pgGetContent(): Promise<SiteContent> {
  await ensureDatabase();
  const pool = getPool()!;
  const res = await pool.query<{ data: SiteContent | null }>(
    "SELECT data FROM site_content WHERE key = 'main' LIMIT 1"
  );
  const raw = (res.rows[0]?.data ?? {}) as Partial<SiteContent>;
  const empty =
    !raw ||
    typeof raw !== "object" ||
    Array.isArray(raw) ||
    !raw.images ||
    !raw.navbar;
  if (empty) {
    const seed = getContent();
    await pool.query(
      `INSERT INTO site_content (key, data)
       VALUES ('main', $1::jsonb)
       ON CONFLICT (key) DO UPDATE
         SET data = EXCLUDED.data
       WHERE coalesce(site_content.data, '{}'::jsonb) = '{}'::jsonb
          OR site_content.data->>'navbar' IS NULL`,
      [JSON.stringify(seed)]
    );
    return seed;
  }
  const file = getContent();
  const fileRev = file.menu?.rev || "";
  const dbRev = (raw.menu as { rev?: string } | undefined)?.rev || "";
  if (fileRev && fileRev !== dbRev && file.menu?.gruplar?.length) {
    const next = normalizeContent({
      ...raw,
      menu: file.menu,
      makaleler: file.makaleler,
      hizmetler: file.hizmetler,
      hakkimizda: {
        ...(file.hakkimizda || {}),
        ...(raw.hakkimizda || {}),
        // Eğer DB'de timeline veya values boşsa dosyadan zengin olanı al
        timeline: (raw.hakkimizda as any)?.timeline?.length ? (raw.hakkimizda as any).timeline : file.hakkimizda?.timeline,
        values: (raw.hakkimizda as any)?.values?.length ? (raw.hakkimizda as any).values : file.hakkimizda?.values,
        stats: (raw.hakkimizda as any)?.stats?.length ? (raw.hakkimizda as any).stats : file.hakkimizda?.stats,
        experiences: (raw.hakkimizda as any)?.experiences?.length ? (raw.hakkimizda as any).experiences : file.hakkimizda?.experiences,
        amenities: (raw.hakkimizda as any)?.amenities?.length ? (raw.hakkimizda as any).amenities : file.hakkimizda?.amenities,
      },
      bolumlar: file.bolumlar ?? raw.bolumlar,
      sayfalar: file.sayfalar ?? raw.sayfalar,
      images: {
        ...(raw.images || {}),
        ...(/\.(mp4|webm)(\?|$)/i.test(String(raw.images?.logo || "")) && file.images?.logo
          ? { logo: file.images.logo }
          : {}),
      },
    });
    await pool.query(
      `UPDATE site_content SET data = $1::jsonb WHERE key = 'main'`,
      [JSON.stringify(next)]
    );
    return next;
  }
  return normalizeContent(raw);
}

// ────────────────────────────────────────────────────────────────
// PostgreSQL: içerik kaydet
// ────────────────────────────────────────────────────────────────
async function pgSaveContent(partial: Partial<SiteContent>): Promise<SiteContent> {
  const pool = getPool()!;
  // Mevcut veriyi oku, üzerine yaz
  const current = await pgGetContent();
  const next = applySaveCascades(partial, mergeContent(partial, current));
  await pool.query(
    `INSERT INTO site_content (key, data) VALUES ('main', $1)
     ON CONFLICT (key) DO UPDATE SET data = $1`,
    [JSON.stringify(next)]
  );
  return next;
}

// ────────────────────────────────────────────────────────────────
// PostgreSQL: auth oku
// ────────────────────────────────────────────────────────────────
async function pgGetAuth(): Promise<AuthRecord | null> {
  const pool = getPool()!;
  const res = await pool.query<{
    email: string;
    password_hash: string;
    name: string;
  }>("SELECT email, password_hash, name FROM admin_users LIMIT 1");
  if (!res.rows[0]) return null;
  const r = res.rows[0];
  return { email: r.email, passwordHash: r.password_hash, name: r.name };
}

// ────────────────────────────────────────────────────────────────
// PostgreSQL: auth kaydet
// ────────────────────────────────────────────────────────────────
async function pgSaveAuth(auth: AuthRecord): Promise<void> {
  await ensureDatabase();
  const pool = getPool()!;
  await pool.query(
    `INSERT INTO admin_users (email, password_hash, name)
     VALUES ($1, $2, $3)
     ON CONFLICT (email) DO UPDATE
       SET password_hash = $2, name = $3`,
    [auth.email, auth.passwordHash, auth.name ?? "Admin"]
  );
}

// ────────────────────────────────────────────────────────────────
// Dışa açık: getContent (sync, JSON veya PG)
// ────────────────────────────────────────────────────────────────
export function getContent(): SiteContent {
  // Sync JSON fallback (API route'ların sync kısmı için)
  const raw = readJson<Partial<SiteContent>>(CONTENT_FILE, {});
  return normalizeContent(raw);
}

// ────────────────────────────────────────────────────────────────
// Dışa açık: getContentAsync
// ────────────────────────────────────────────────────────────────
export async function getContentAsync(): Promise<SiteContent> {
  if (isPostgresEnabled()) {
    try {
      await ensureDatabase();
      return await pgGetContent();
    } catch (err) {
      console.warn("[DB] PostgreSQL okuma hatası, JSON içeriğe dönülüyor:", (err as Error).message);
    }
  }
  return getContent();
}

// ────────────────────────────────────────────────────────────────
// Dışa açık: saveContent
// ────────────────────────────────────────────────────────────────
export async function saveContentAsync(partial: Partial<SiteContent>): Promise<SiteContent> {
  if (isPostgresEnabled()) {
    try {
      await ensureDatabase();
      const next = await pgSaveContent(partial);
      // JSON dosyasını da güncelle (backup)
      try {
        writeJson(CONTENT_FILE, next);
      } catch (err) {
        console.warn("[DB] JSON backup yazılamadı:", (err as Error).message);
      }
      scheduleCleanup(next);
      runPostSaveHooks(partial, next);
      return next;
    } catch (err) {
      console.warn("[DB] PostgreSQL yazma hatası, JSON fallback kullanılıyor:", (err as Error).message);
    }
  }
  // JSON fallback
  const current = getContent();
  const next = applySaveCascades(partial, mergeContent(partial, current));
  writeJson(CONTENT_FILE, next);
  scheduleCleanup(next);
  runPostSaveHooks(partial, next);
  return next;
}

// Geriye uyumluluk için sync wrapper (API route'larda kullanılıyordu)
export function saveContent(partial: Partial<SiteContent>): SiteContent {
  const current = getContent();
  const next = applySaveCascades(partial, mergeContent(partial, current));
  writeJson(CONTENT_FILE, next);
  scheduleCleanup(next);
  runPostSaveHooks(partial, next);
  return next;
}

// ────────────────────────────────────────────────────────────────
// External yorumlar cache
// ────────────────────────────────────────────────────────────────
const externalYorumlarCache: Record<
  string,
  { data: SiteContent["yorumlar"]; expires: number }
> = {};

export const getPublicContent = cache(async (): Promise<SiteContent> => {
  const content = await getContentAsync();

  try {
    const src = (content as any).yorumlarSource as string | undefined;
    const apiUrl = (content as any).yorumlarApi as string | undefined;
    if (src === "external" && apiUrl && typeof apiUrl === "string" && isSafeExternalUrl(apiUrl)) {
      const now = Date.now();
      const cached = externalYorumlarCache[apiUrl];
      if (cached && cached.expires > now) {
        content.yorumlar = cached.data;
        return content;
      }
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      try {
        const res = await fetch(apiUrl, {
          signal: controller.signal,
          redirect: "error",
          headers: { Accept: "application/json" },
        });
        clearTimeout(timeout);
        if (res.ok) {
          const body = await res.json();
          if (Array.isArray(body)) {
            const mapped = body
              .map((it: any) => {
                if (!it) return null;
                const metin =
                  typeof it.metin === "string" ? it.metin : typeof it.text === "string" ? it.text : undefined;
                const ad = typeof it.ad === "string" ? it.ad : typeof it.name === "string" ? it.name : "";
                const unvan = typeof it.unvan === "string" ? it.unvan : typeof it.title === "string" ? it.title : "";
                const yildiz = typeof it.yildiz === "number" ? it.yildiz : undefined;
                if (!metin) return null;
                return { metin, ad, unvan, yildiz } as SiteContent["yorumlar"][number];
              })
              .filter(Boolean) as SiteContent["yorumlar"];
            externalYorumlarCache[apiUrl] = { data: mapped, expires: Date.now() + 5 * 60 * 1000 };
            content.yorumlar = mapped;
          }
        }
      } catch {
        // ignore
      } finally {
        try { clearTimeout(timeout); } catch {}
      }
    }
  } catch {}

  return toPublicSiteContent(content);
});

// ────────────────────────────────────────────────────────────────
// Auth kayıtları
// ────────────────────────────────────────────────────────────────
export function getAuthRecord(): AuthRecord | null {
  return readJson<AuthRecord | null>(AUTH_FILE, null);
}

export async function getAuthRecordAsync(): Promise<AuthRecord | null> {
  if (isPostgresEnabled()) {
    try {
      await ensureDatabase();
      return await pgGetAuth();
    } catch (err) {
      console.warn("[DB] Auth PostgreSQL hatası:", (err as Error).message);
    }
  }
  return getAuthRecord();
}

export function saveAuthRecord(auth: AuthRecord): void {
  writeJson(AUTH_FILE, auth);
}

export async function saveAuthRecordAsync(auth: AuthRecord): Promise<void> {
  if (isPostgresEnabled()) {
    try {
      await pgSaveAuth(auth);
    } catch (err) {
      console.warn("[DB] Auth PostgreSQL yazma hatası:", (err as Error).message);
    }
  }
  // Her zaman JSON'a da yaz (backup)
  writeJson(AUTH_FILE, auth);
}

// ────────────────────────────────────────────────────────────────
// Uploads dizini
// ────────────────────────────────────────────────────────────────
export function getUploadsDir(folder = "site") {
  const dir = path.join(process.cwd(), "data", "uploads", folder);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function collectReferencedFiles(content: SiteContent) {
  const refs = new Set<string>();
  function addIfUpload(v?: string) {
    if (!v) return;
    const m = v.match(/\/(?:uploads|media)\/(?:site|menu)\/(.+)$/);
    if (m) refs.add(m[1]);
  }
  for (const v of Object.values(content.images || {})) addIfUpload(v);
  for (const g of content.galeri || []) addIfUpload(g.src);
  for (const p of content.pasta?.gorseller ?? []) addIfUpload(p.src);
  addIfUpload(content.pasta?.fiyatGorsel);
  addIfUpload(content.pasta?.yuzmeKursu?.afisGorsel);
  for (const grup of content.menu?.gruplar ?? []) {
    addIfUpload(grup.image);
    addIfUpload(grup.banner);
    for (const urun of grup.urunler ?? []) {
      addIfUpload(urun.image);
      for (const img of urun.images ?? []) addIfUpload(img.url);
    }
  }
  return refs;
}

let cleanupScheduled = false;
function scheduleCleanup(knownContent?: SiteContent) {
  if (cleanupScheduled || process.env.VERCEL) return;
  cleanupScheduled = true;
  setTimeout(async () => {
    cleanupScheduled = false;
    try {
      const dirs = [
        path.join(process.cwd(), "data", "uploads", "site"),
        path.join(process.cwd(), "public", "uploads", "site"),
      ];
      const content = knownContent || (await getContentAsync());
      const refs = collectReferencedFiles(content);
      const graceMs = 7 * 24 * 60 * 60 * 1000;
      const now = Date.now();
      for (const uploadDir of dirs) {
        if (!fs.existsSync(uploadDir)) continue;
        for (const f of fs.readdirSync(uploadDir)) {
          if (refs.has(f)) continue;
          const abs = path.join(uploadDir, f);
          try {
            const st = fs.statSync(abs);
            if (!st.isFile()) continue;
            if (now - st.mtimeMs < graceMs) continue;
            fs.unlinkSync(abs);
          } catch {
            /* ignore */
          }
        }
      }
    } catch (err) {
      console.warn("[Upload cleanup] atlandı:", (err as Error).message);
    }
  }, 60_000);
}

export { DATA_DIR, CONTENT_FILE, AUTH_FILE };
export type { SiteContent };
