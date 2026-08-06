"use client";

import { useEffect, useState } from "react";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";
import Button from "@/components/admin/ui/Button";
import { RefreshCw, CheckCircle2, XCircle } from "lucide-react";

type HealthPayload = {
  ok: boolean;
  service?: string;
  time?: string;
  checks?: Record<string, { ok: boolean; detail?: string }>;
};

export default function SystemPanel() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<HealthPayload | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/v1/health?deep=1", { cache: "no-store" });
      const json = (await res.json()) as HealthPayload;
      setData(json);
      if (!res.ok) setError("Sistem sağlığı uyarı veriyor.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sağlık kontrolü başarısız");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  if (loading && !data) return <AdminLoading />;

  const checks = data?.checks || {};

  return (
    <>
      <AdminPageHeader
        title="Sistem Durumu"
        description="API, içerik deposu ve güvenlik yapılandırması."
      />
      <AdminAlert message={error} type="error" />

      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-sm text-[#8A9BB0]">
          Son kontrol: {data?.time ? new Date(data.time).toLocaleString("tr-TR") : "—"}
        </p>
        <Button variant="outline" size="sm" onClick={() => void load()}>
          <RefreshCw className="h-4 w-4" /> Yenile
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatusCard
          label="Genel"
          ok={Boolean(data?.ok)}
          detail={data?.service || "firinci-api"}
        />
        {Object.entries(checks).map(([key, val]) => (
          <StatusCard
            key={key}
            label={key === "jwt" ? "JWT" : key === "content" ? "İçerik" : key === "database" ? "Veritabanı" : key}
            ok={val.ok}
            detail={val.detail || (val.ok ? "ok" : "hata")}
          />
        ))}
      </div>

      <section className="mt-8 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="font-semibold text-[#F8F8F8]">Yayın kontrol listesi</h3>
        <ul className="mt-3 space-y-2 text-sm text-[#8A9BB0]">
          <li>• `.env.local` içinde güçlü `JWT_SECRET` (min 32 karakter)</li>
          <li>• `npm run init-admin` ile admin hesabı</li>
          <li>• İsteğe bağlı: `DATABASE_URL` + `npm run db:setup` + `npm run db:migrate`</li>
          <li>• `npm run sync-public` (assets → public) — `npm run build` bunu otomatik çalıştırır</li>
          <li>• `npm run build` ve `npm start` (port 3010)</li>
          <li>• Admin’den ürün / galeri / yorum / iletişim kaydı → sitede anında `/api/content`</li>
          <li>• Vercel kullanıyorsanız `BLOB_READ_WRITE_TOKEN`</li>
        </ul>
      </section>
    </>
  );
}

function StatusCard({
  label,
  ok,
  detail,
}: {
  label: string;
  ok: boolean;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wider text-[#6B7A94]">
          {label}
        </p>
        {ok ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
        ) : (
          <XCircle className="h-5 w-5 text-red-400" />
        )}
      </div>
      <p className="mt-2 text-lg font-semibold text-[#F8F8F8]">
        {ok ? "Sağlıklı" : "Sorunlu"}
      </p>
      <p className="mt-1 truncate text-xs text-[#8A9BB0]">{detail}</p>
    </div>
  );
}
