import fs from "fs";
import path from "path";
import { CONTENT_FILE, DATA_DIR, getContent, saveContentAsync } from "./content";
import type { SiteContent } from "@/lib/content/types";

export interface BackupMeta {
  id: string;
  createdAt: string;
  size: number;
  label?: string;
  createdBy?: string;
}

const BACKUP_DIR = path.join(DATA_DIR, "backups");

function ensureDir() {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

export function listBackups(): BackupMeta[] {
  ensureDir();
  const files = fs
    .readdirSync(BACKUP_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .reverse();

  return files.map((f) => {
    const full = path.join(BACKUP_DIR, f);
    const stat = fs.statSync(full);
    let label = "";
    let createdBy = "";
    try {
      const raw = JSON.parse(fs.readFileSync(full, "utf8"));
      label = raw?.meta?.label || "";
      createdBy = raw?.meta?.createdBy || "";
    } catch {
      /* ignore */
    }
    return {
      id: f.replace(/\.json$/, ""),
      createdAt: stat.mtime.toISOString(),
      size: stat.size,
      label: label || undefined,
      createdBy: createdBy || undefined,
    };
  });
}

export function createBackup(opts?: {
  label?: string;
  createdBy?: string;
}): BackupMeta {
  ensureDir();
  const content = getContent();
  const id = `backup-${new Date().toISOString().replace(/[:.]/g, "-")}`;
  const payload = {
    meta: {
      id,
      label: opts?.label || "Manuel yedek",
      createdBy: opts?.createdBy || "",
      createdAt: new Date().toISOString(),
      version: 1,
    },
    content,
  };
  const file = path.join(BACKUP_DIR, `${id}.json`);
  fs.writeFileSync(file, JSON.stringify(payload, null, 2), "utf8");
  const stat = fs.statSync(file);
  return {
    id,
    createdAt: payload.meta.createdAt,
    size: stat.size,
    label: payload.meta.label,
    createdBy: payload.meta.createdBy || undefined,
  };
}

export function readBackup(id: string): { meta: BackupMeta; content: SiteContent } {
  const safe = id.replace(/[^a-zA-Z0-9._-]/g, "");
  const file = path.join(BACKUP_DIR, `${safe}.json`);
  if (!file.startsWith(BACKUP_DIR) || !fs.existsSync(file)) {
    throw new Error("Yedek bulunamadı.");
  }
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!raw?.content) throw new Error("Geçersiz yedek dosyası.");
  return {
    meta: {
      id: safe,
      createdAt: raw.meta?.createdAt || new Date().toISOString(),
      size: fs.statSync(file).size,
      label: raw.meta?.label,
      createdBy: raw.meta?.createdBy,
    },
    content: raw.content as SiteContent,
  };
}

export async function restoreBackup(id: string): Promise<SiteContent> {
  const { content } = readBackup(id);
  fs.mkdirSync(path.dirname(CONTENT_FILE), { recursive: true });
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), "utf8");
  return saveContentAsync(content);
}

export function deleteBackup(id: string): void {
  const safe = id.replace(/[^a-zA-Z0-9._-]/g, "");
  const file = path.join(BACKUP_DIR, `${safe}.json`);
  if (!file.startsWith(BACKUP_DIR) || !fs.existsSync(file)) {
    throw new Error("Yedek bulunamadı.");
  }
  fs.unlinkSync(file);
}

/** Auto-backup before destructive restore; keep last 20 autos */
export function createAutoBackup(createdBy?: string) {
  const meta = createBackup({
    label: "Otomatik (geri yükleme öncesi)",
    createdBy,
  });
  const all = listBackups().filter((b) => b.label?.includes("Otomatik"));
  for (const b of all.slice(20)) {
    try {
      deleteBackup(b.id);
    } catch {
      /* ignore */
    }
  }
  return meta;
}
