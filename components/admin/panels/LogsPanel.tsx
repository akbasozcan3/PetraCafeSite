"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { api, type ActivityEntry } from "@/lib/api/client";
import { useAdminSession } from "@/lib/context/AdminSessionContext";
import AdminPageHeader, { AdminAlert } from "@/components/admin/AdminPageHeader";
import Button from "@/components/admin/ui/Button";

const ACTION_LABELS: Record<string, string> = {
  "auth.login": "Giriş",
  "auth.logout": "Çıkış",
  "content.update": "İçerik kaydı",
  "media.upload": "Medya yükleme",
  "users.create": "Kullanıcı oluşturma",
  "users.update": "Kullanıcı güncelleme",
  "users.delete": "Kullanıcı silme",
  "backup.create": "Yedek oluşturma",
  "backup.restore": "Yedek geri yükleme",
  "backup.delete": "Yedek silme",
  "settings.password": "Şifre değişikliği",
};

export default function LogsPanel() {
  const { can } = useAdminSession();
  const [entries, setEntries] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.listLogs(200);
      setEntries(res.entries);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Loglar yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (!can("logs:read")) {
    return <AdminAlert message="Bu sayfaya erişim yetkiniz yok." type="error" />;
  }

  return (
    <>
      <AdminPageHeader
        title="Aktivite Günlüğü"
        description="Kim ne zaman ne yaptı — çok kullanıcılı işlem kaydı."
      />
      {error && <AdminAlert message={error} type="error" />}

      <div className="mb-4 flex justify-end">
        <Button variant="outline" size="sm" onClick={() => void load()}>
          <RefreshCw className="h-4 w-4" /> Yenile
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-[#8A9BB0]" />
        </div>
      ) : entries.length === 0 ? (
        <p className="text-sm text-[#6B7A94]">Henüz kayıt yok.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#141E2E] text-[11px] uppercase tracking-wider text-[#6B7A94]">
              <tr>
                <th className="px-4 py-3 font-medium">Zaman</th>
                <th className="px-4 py-3 font-medium">Kullanıcı</th>
                <th className="px-4 py-3 font-medium">İşlem</th>
                <th className="px-4 py-3 font-medium">Detay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] bg-[#0D1117]/60">
              {entries.map((e) => (
                <tr key={e.id} className="hover:bg-white/[0.02]">
                  <td className="whitespace-nowrap px-4 py-3 text-[#8A9BB0]">
                    {new Date(e.at).toLocaleString("tr-TR")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-[#EEE9E0]">{e.name || "—"}</div>
                    <div className="text-xs text-[#6B7A94]">{e.email}</div>
                  </td>
                  <td className="px-4 py-3 text-[#C8703A]">
                    {ACTION_LABELS[e.action] || e.action}
                  </td>
                  <td className="max-w-[280px] truncate px-4 py-3 text-[#8A9BB0]">
                    {e.detail || "—"}
                    {e.ip ? ` · ${e.ip}` : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
