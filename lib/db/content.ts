/**
 * Taşdelen Fırıncı — Veri Erişim Katmanı
 *
 * DATABASE_URL tanımlıysa → PostgreSQL kullanır
 * Tanımlı değilse         → JSON dosya sistemine geri döner (sıfır hata)
 */

import fs from "fs";
import path from "path";
import { DEFAULT_CONTENT, mergeContent } from "@/lib/content/defaults";
import type { SiteContent } from "@/lib/content/types";
import { cascadeBrandFields, syncStaticBrand } from "@/lib/content/sync-static-brand";
import { syncStaticContact } from "@/lib/content/sync-static-contact";
import { applyIletisimCascade } from "@/lib/content/contact-utils";
import { syncBlogPages } from "@/lib/content/sync-blog-pages";
import { getPool, isPostgresEnabled } from "./postgres";

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
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(images || {})) {
    if (!v) continue;
    out[k] = v.startsWith("/") || v.startsWith("http") ? v : `/${v.replace(/^\//, "")}`;
  }
  return out;
}

function normalizeContent(raw: Partial<SiteContent>): SiteContent {
  const merged = mergeContent(raw, DEFAULT_CONTENT);
  merged.images = { ...DEFAULT_CONTENT.images, ...normalizeImages(merged.images) };
  // Empty arrays are intentional (admin cleared the section) — do not restore defaults.
  if (!Array.isArray(merged.galeri)) merged.galeri = DEFAULT_CONTENT.galeri;
  if (!Array.isArray(merged.yorumlar)) merged.yorumlar = DEFAULT_CONTENT.yorumlar;
  if (!merged.sss || !Array.isArray(merged.sss.items)) merged.sss = DEFAULT_CONTENT.sss;
  if (!Array.isArray(merged.makaleler)) merged.makaleler = DEFAULT_CONTENT.makaleler;
  return merged;
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
  const pool = getPool()!;
  const res = await pool.query<{ data: SiteContent }>(
    "SELECT data FROM site_content WHERE key = 'main' LIMIT 1"
  );
  const raw = res.rows[0]?.data ?? {};
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
      return await pgGetContent();
    } catch (err) {
      console.error("[DB] PostgreSQL okuma hatası:", (err as Error).message);
      if (process.env.NODE_ENV === "production") {
        throw err;
      }
      console.warn("[DB] Geliştirmede JSON'a dönülüyor.");
    }
  }
  return getContent();
}

// ────────────────────────────────────────────────────────────────
// Dışa açık: saveContent
// ────────────────────────────────────────────────────────────────
export async function saveContentAsync(partial: Partial<SiteContent>): Promise<SiteContent> {
  if (process.env.VERCEL === "1" && !isPostgresEnabled()) {
    throw new Error(
      "Vercel'de kalıcı içerik kaydı için DATABASE_URL (Postgres/Neon) gerekli. Site görüntüleme JSON ile çalışır; admin kayıtları için Neon bağlayın."
    );
  }
  if (isPostgresEnabled()) {
    try {
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
      console.error("[DB] PostgreSQL yazma hatası:", (err as Error).message);
      if (process.env.NODE_ENV === "production") {
        throw err;
      }
      console.warn("[DB] Geliştirmede JSON'a dönülüyor.");
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

export async function getPublicContent(): Promise<SiteContent> {
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

  return content;
}

// ────────────────────────────────────────────────────────────────
// Auth kayıtları
// ────────────────────────────────────────────────────────────────
export function getAuthRecord(): AuthRecord | null {
  return readJson<AuthRecord | null>(AUTH_FILE, null);
}

export async function getAuthRecordAsync(): Promise<AuthRecord | null> {
  if (isPostgresEnabled()) {
    try {
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
  const dir = path.join(process.cwd(), "public", "uploads", folder);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

// ────────────────────────────────────────────────────────────────
// Upload temizleme (arka plan)
// ────────────────────────────────────────────────────────────────
function collectReferencedFiles(content: SiteContent) {
  const refs = new Set<string>();
  function addIfUpload(v?: string) {
    if (!v) return;
    const m = v.match(/\/uploads\/site\/(.+)$/);
    if (m) refs.add(m[1]);
  }
  for (const v of Object.values(content.images || {})) addIfUpload(v);
  for (const g of content.galeri || []) addIfUpload(g.src);
  for (const p of content.pasta?.gorseller ?? []) addIfUpload(p.src);
  for (const grup of content.menu?.gruplar ?? []) {
    addIfUpload(grup.image);
    addIfUpload(grup.banner);
    for (const urun of grup.urunler ?? []) addIfUpload(urun.image);
  }
  return refs;
}

let cleanupScheduled = false;
function scheduleCleanup(knownContent?: SiteContent) {
  if (cleanupScheduled || process.env.VERCEL) return;
  cleanupScheduled = true;
  setImmediate(async () => {
    cleanupScheduled = false;
    try {
      const uploadDir = getUploadsDir("site");
      const files = fs.readdirSync(uploadDir);
      // Prefer just-saved content; fall back to async source of truth (PG or JSON)
      const content = knownContent || (await getContentAsync());
      const refs = collectReferencedFiles(content);
      for (const f of files) {
        if (!refs.has(f)) {
          try {
            fs.unlinkSync(path.join(uploadDir, f));
          } catch {}
        }
      }
    } catch (err) {
      console.warn("[Upload cleanup] atlandı:", (err as Error).message);
    }
  });
}

export { DATA_DIR, CONTENT_FILE, AUTH_FILE };
export type { SiteContent };
