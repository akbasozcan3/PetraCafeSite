"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import { Ban, Check, Phone, Mail, RefreshCw, X, Search, Trash2 } from "lucide-react";
import Button from "@/components/admin/ui/Button";
import AdminPageHeader, {
  AdminAlert,
  AdminLoading,
} from "@/components/admin/AdminPageHeader";
import type { Reservation, ReservationStatus } from "@/lib/db/inbox";

const LABELS: Record<ReservationStatus, string> = {
  pending: "Bekliyor",
  confirmed: "Onaylandı",
  rejected: "Reddedildi",
  cancelled: "İptal",
};

function isoToday() {
  return new Date().toISOString().slice(0, 10);
}
function isoWeekAgo() {
  return new Date(Date.now() - 7 * 86400_000).toISOString().slice(0, 10);
}

export default function ReservationsPanel() {
  const [items, setItems] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [filter, setFilter] = useState<"all" | ReservationStatus>("pending");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "week" | "past">("all");
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/admin/reservations", {
        credentials: "include",
        cache: "no-store",
      });
      const data = (await res.json()) as { items?: Reservation[]; error?: string };
      if (!res.ok) throw new Error(data.error || "Yüklenemedi");
      setItems(data.items || []);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Yüklenemedi");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  useEffect(() => {
    void load();
  }, [load]);

  const setStatus = async (id: string, status: ReservationStatus) => {
    try {
      const target = items.find((x) => x.id === id);
      const res = await fetch("/api/v1/admin/reservations", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = (await res.json()) as { item?: Reservation; error?: string };
      if (!res.ok) throw new Error(data.error || "Güncellenemedi");
      setItems((prev) => prev.map((x) => (x.id === id ? data.item! : x)));
      const emailNotice = target?.email && (status === "confirmed" || status === "rejected")
        ? ` (Müşteriye bildirim maili iletildi)`
        : "";
      setMessage(`Rezervasyon ${LABELS[status].toLowerCase()}${emailNotice}.`);
      setMessageType("success");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Güncellenemedi");
      setMessageType("error");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" adlı misafirin rezervasyon kaydını kalıcı olarak silmek istediğinize emin misiniz?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/v1/admin/reservations?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok) throw new Error(data.error || "Silinemedi");
      setItems((prev) => prev.filter((x) => x.id !== id));
      setMessage(`"${name}" rezervasyonu başarıyla silindi.`);
      setMessageType("success");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Silinemedi");
      setMessageType("error");
    }
  };

  const visible = useMemo(() => {
    const today = isoToday();
    const weekAgo = isoWeekAgo();
    let result = items;

    // Durum filtresi
    if (filter !== "all") result = result.filter((x) => x.status === filter);

    // Tarih filtresi
    if (dateFilter === "today") result = result.filter((x) => x.date === today);
    else if (dateFilter === "week") result = result.filter((x) => x.date >= weekAgo);
    else if (dateFilter === "past") result = result.filter((x) => x.date < today);

    // Arama
    if (search.trim()) {
      const q = search.trim().toLocaleLowerCase("tr-TR");
      result = result.filter(
        (x) =>
          x.name.toLocaleLowerCase("tr-TR").includes(q) ||
          x.phone.includes(q) ||
          (x.email || "").toLocaleLowerCase("tr-TR").includes(q) ||
          x.date.includes(q) ||
          (x.note || "").toLocaleLowerCase("tr-TR").includes(q)
      );
    }

    return result;
  }, [items, filter, dateFilter, search]);

  if (loading) return <AdminLoading />;

  const todayCount = items.filter((x) => x.date === isoToday() && x.status !== "rejected" && x.status !== "cancelled").length;
  const pendingCount = items.filter((x) => x.status === "pending").length;

  return (
    <>
      <AdminPageHeader
        title="Rezervasyonlar"
        description="Siteden gelen masa talepleri — onay, red veya iptal."
      />
      <AdminAlert message={message} type={messageType} />

      {/* Özet Banner */}
      {(todayCount > 0 || pendingCount > 0) && (
        <div className="mb-4 flex flex-wrap gap-2">
          {pendingCount > 0 && (
            <button
              type="button"
              onClick={() => { setFilter("pending"); setDateFilter("all"); }}
              className="flex items-center gap-1.5 rounded-lg bg-[#C8703A]/15 px-3 py-1.5 text-xs font-semibold text-[#E8915A] border border-[#C8703A]/20"
            >
              🔔 {pendingCount} onay bekliyor
            </button>
          )}
          {todayCount > 0 && (
            <button
              type="button"
              onClick={() => { setFilter("all"); setDateFilter("today"); }}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 border border-emerald-500/20"
            >
              📅 Bugün {todayCount} rezervasyon
            </button>
          )}
        </div>
      )}

      {/* Filtreler */}
      <div className="mb-4 space-y-3">
        {/* Durum Filtreleri */}
        <div className="flex flex-wrap gap-1.5">
          {(["pending", "confirmed", "rejected", "cancelled", "all"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                filter === key
                  ? "bg-[#C8703A] text-white"
                  : "bg-white/[0.04] text-[#8A9BB0] hover:bg-white/[0.08]"
              }`}
            >
              {key === "all" ? "Tümü" : LABELS[key]}
              <span className="ml-1 opacity-70">
                {key === "all" ? items.length : items.filter((x) => x.status === key).length}
              </span>
            </button>
          ))}
        </div>

        {/* Tarih + Arama + Yenile */}
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex gap-1">
            {(["all", "today", "week", "past"] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDateFilter(d)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                  dateFilter === d
                    ? "bg-[#1A2B40] text-[#EEE9E0] border border-white/10"
                    : "text-[#6B7A94] hover:text-[#8A9BB0]"
                }`}
              >
                {d === "all" ? "Tüm tarih" : d === "today" ? "Bugün" : d === "week" ? "Bu hafta" : "Geçmiş"}
              </button>
            ))}
          </div>
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#6B7A94]" />
            <input
              type="text"
              placeholder="İsim, telefon, tarih veya not ara…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-[#0D1117] pl-9 pr-4 py-2 text-sm text-[#EEE9E0] placeholder-[#4A5568] focus:border-[#C8703A]/40 focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={() => void handleRefresh()}
            disabled={refreshing}
            className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] px-3 py-2 text-xs font-medium text-[#8A9BB0] transition hover:border-white/[0.16] hover:text-white disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
            Yenile
          </button>
        </div>
      </div>

      {/* Liste */}
      {!visible.length ? (
        <p className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-8 text-center text-sm text-[#8A9BB0]">
          {search ? `"${search}" için sonuç yok.` : "Bu listede rezervasyon yok."}
        </p>
      ) : (
        <div className="space-y-3">
          {visible.map((r) => (
            <article
              key={r.id}
              className={`rounded-2xl border bg-[#141E2E]/80 p-5 transition ${
                r.status === "pending"
                  ? "border-[#C8703A]/20"
                  : "border-white/[0.08]"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-[#EEE9E0] text-base">{r.name}</p>
                    {(() => {
                      const conflictCount = items.filter(
                        (other) =>
                          other.id !== r.id &&
                          other.date === r.date &&
                          other.time === r.time &&
                          other.status !== "rejected" &&
                          other.status !== "cancelled"
                      ).length;
                      if (conflictCount > 0) {
                        return (
                          <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs text-amber-300 font-medium border border-amber-500/30">
                            ⚠️ Aynı saatte {conflictCount} talep daha
                          </span>
                        );
                      }
                      return null;
                    })()}
                  </div>
                  <p className="mt-1 text-sm text-[#EEE9E0] font-medium">
                    📅 {r.date} &nbsp;·&nbsp; 🕐 {r.time} &nbsp;·&nbsp; 👥 {r.guests} kişi
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-3">
                    <a
                      href={`tel:${r.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-1 text-sm text-[#C8703A] hover:underline"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {r.phone}
                    </a>
                    {r.email ? (
                      <a
                        href={`mailto:${r.email}`}
                        className="inline-flex items-center gap-1 text-sm text-sky-400 hover:underline"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        {r.email}
                      </a>
                    ) : null}
                  </div>
                  {r.note ? (
                    <p className="mt-2 text-sm text-[#C8D0DC] bg-white/[0.03] p-2.5 rounded-lg border border-white/[0.04]">
                      💬 <span className="italic">{r.note}</span>
                    </p>
                  ) : null}
                  <p className="mt-2 text-[11px] text-[#6B7A94]">
                    Oluşturulma: {new Date(r.createdAt).toLocaleString("tr-TR")}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    r.status === "confirmed"
                      ? "bg-emerald-500/15 text-emerald-300"
                      : r.status === "rejected" || r.status === "cancelled"
                        ? "bg-red-500/15 text-red-300"
                        : "bg-[#C8703A]/15 text-[#E8915A]"
                  }`}
                >
                  {LABELS[r.status]}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-3">
                <div className="flex flex-wrap gap-2">
                  {r.status === "pending" ? (
                    <>
                      <Button size="sm" onClick={() => void setStatus(r.id, "confirmed")}>
                        <Check className="h-4 w-4" />
                        Onayla
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => void setStatus(r.id, "rejected")}
                      >
                        <X className="h-4 w-4" />
                        Reddet
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => void setStatus(r.id, "cancelled")}
                      >
                        <Ban className="h-4 w-4" />
                        İptal
                      </Button>
                    </>
                  ) : r.status === "confirmed" ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => void setStatus(r.id, "cancelled")}
                    >
                      <Ban className="h-4 w-4" />
                      İptal et
                    </Button>
                  ) : null}
                </div>

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => void handleDelete(r.id, r.name)}
                  title="Rezervasyonu Kalıcı Olarak Sil"
                >
                  <Trash2 className="h-4 w-4" />
                  Sil
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}


