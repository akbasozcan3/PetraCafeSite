"use client";

import { useCallback, useEffect, useState } from "react";
import { Ban, Check, Phone, X } from "lucide-react";
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

export default function ReservationsPanel() {
  const [items, setItems] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [filter, setFilter] = useState<"all" | ReservationStatus>("pending");

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

  useEffect(() => {
    void load();
  }, [load]);

  const setStatus = async (id: string, status: ReservationStatus) => {
    try {
      const res = await fetch("/api/v1/admin/reservations", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = (await res.json()) as { item?: Reservation; error?: string };
      if (!res.ok) throw new Error(data.error || "Güncellenemedi");
      setItems((prev) => prev.map((x) => (x.id === id ? data.item! : x)));
      setMessage(`Rezervasyon ${LABELS[status].toLowerCase()}.`);
      setMessageType("success");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Güncellenemedi");
      setMessageType("error");
    }
  };

  const visible =
    filter === "all" ? items : items.filter((x) => x.status === filter);

  if (loading) return <AdminLoading />;

  return (
    <>
      <AdminPageHeader
        title="Rezervasyonlar"
        description="Siteden gelen masa talepleri — onay, red veya iptal."
      />
      <AdminAlert message={message} type={messageType} />

      <div className="mb-4 flex flex-wrap gap-2">
        {(["pending", "confirmed", "rejected", "cancelled", "all"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              filter === key
                ? "bg-[#C8703A] text-[#0A0F18]"
                : "bg-white/[0.04] text-[#8A9BB0]"
            }`}
          >
            {key === "all" ? "Tümü" : LABELS[key]}
            <span className="ml-1 opacity-70">
              {key === "all"
                ? items.length
                : items.filter((x) => x.status === key).length}
            </span>
          </button>
        ))}
      </div>

      {!visible.length ? (
        <p className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-8 text-sm text-[#8A9BB0]">
          Bu listede rezervasyon yok.
        </p>
      ) : (
        <div className="space-y-3">
          {visible.map((r) => (
            <article
              key={r.id}
              className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-[#EEE9E0]">{r.name}</p>
                  <p className="mt-1 text-sm text-[#8A9BB0]">
                    {r.date} · {r.time} · {r.guests} kişi
                  </p>
                  <a
                    href={`tel:${r.phone.replace(/\s/g, "")}`}
                    className="mt-1 inline-flex items-center gap-1 text-sm text-[#C8703A]"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {r.phone}
                  </a>
                  {r.note ? (
                    <p className="mt-2 text-sm text-[#C8D0DC]">{r.note}</p>
                  ) : null}
                  <p className="mt-2 text-[11px] text-[#6B7A94]">
                    {new Date(r.createdAt).toLocaleString("tr-TR")}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
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
              {r.status === "pending" ? (
                <div className="mt-4 flex flex-wrap gap-2">
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
                </div>
              ) : r.status === "confirmed" ? (
                <div className="mt-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => void setStatus(r.id, "cancelled")}
                  >
                    <Ban className="h-4 w-4" />
                    İptal et
                  </Button>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </>
  );
}
