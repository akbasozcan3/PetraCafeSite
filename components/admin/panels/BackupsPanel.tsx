"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Loader2,
  Plus,
  RotateCcw,
  Trash2,
  Download,
  RefreshCw,
} from "lucide-react";
import { api, type BackupMeta } from "@/lib/api/client";
import { useAdminSession } from "@/lib/context/AdminSessionContext";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import AdminPageHeader, { AdminAlert } from "@/components/admin/AdminPageHeader";
import Input from "@/components/admin/ui/Input";
import Button from "@/components/admin/ui/Button";

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export default function BackupsPanel() {
  const { can } = useAdminSession();
  const { refresh } = useAdminContent();
  const [backups, setBackups] = useState<BackupMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [label, setLabel] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.listBackups();
      setBackups(res.backups);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Yedekler yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (!can("backup:manage")) {
    return <AdminAlert message="Bu sayfaya erişim yetkiniz yok." type="error" />;
  }

  const create = async () => {
    setBusy("create");
    setError("");
    try {
      await api.createBackup(label.trim() || "Manuel yedek");
      setLabel("");
      setMessage("Yedek oluşturuldu.");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Yedek oluşturulamadı");
    } finally {
      setBusy(null);
    }
  };

  const restore = async (id: string) => {
    if (
      !confirm(
        "Bu yedek geri yüklensin mi? Mevcut içerik otomatik yedeklenir, ardından seçilen yedek uygulanır."
      )
    ) {
      return;
    }
    setBusy(id);
    setError("");
    try {
      await api.restoreBackup(id);
      await refresh();
      setMessage("Yedek geri yüklendi. Site içeriği güncellendi.");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Geri yükleme başarısız");
    } finally {
      setBusy(null);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Yedek silinsin mi?")) return;
    setBusy(id);
    setError("");
    try {
      await api.deleteBackup(id);
      setMessage("Yedek silindi.");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Silinemedi");
    } finally {
      setBusy(null);
    }
  };

  const download = async (id: string) => {
    setBusy(id);
    setError("");
    try {
      const data = await api.downloadBackup(id);
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${id}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "İndirme başarısız");
    } finally {
      setBusy(null);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Yedekleme"
        description="Manuel yedek alın, indirin veya geri yükleyin. Kayıt öncesi otomatik yedekler de burada görünür."
      />
      {message && <AdminAlert message={message} />}
      {error && <AdminAlert message={error} type="error" />}

      <section className="mb-8 flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Input
            label="Yedek etiketi"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Örn. Yayın öncesi"
          />
        </div>
        <Button onClick={() => void create()} disabled={busy === "create"}>
          {busy === "create" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          Yedek oluştur
        </Button>
        <Button variant="outline" onClick={() => void load()}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </section>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-[#8A9BB0]" />
        </div>
      ) : backups.length === 0 ? (
        <p className="text-sm text-[#6B7A94]">Henüz yedek yok.</p>
      ) : (
        <div className="space-y-3">
          {backups.map((b) => (
            <div
              key={b.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-[#EEE9E0]">
                  {b.label || b.id}
                </p>
                <p className="text-xs text-[#6B7A94]">
                  {new Date(b.createdAt).toLocaleString("tr-TR")} ·{" "}
                  {formatBytes(b.size)}
                  {b.createdBy ? ` · ${b.createdBy}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={busy === b.id}
                  onClick={() => void download(b.id)}
                >
                  <Download className="h-3.5 w-3.5" /> İndir
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={busy === b.id}
                  onClick={() => void restore(b.id)}
                >
                  {busy === b.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <RotateCcw className="h-3.5 w-3.5" />
                  )}
                  Geri yükle
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={busy === b.id}
                  onClick={() => void remove(b.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
