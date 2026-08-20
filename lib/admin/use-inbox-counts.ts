"use client";

import { useEffect, useState, useCallback } from "react";

export interface InboxCounts {
  pending: number;
  newMessages: number;
  todayReservations: number;
  todayConfirmed: number;
}

const REFRESH_INTERVAL = 30_000;

export function useInboxCounts(): InboxCounts & { refresh: () => void } {
  const [counts, setCounts] = useState<InboxCounts>({
    pending: 0,
    newMessages: 0,
    todayReservations: 0,
    todayConfirmed: 0,
  });

  const fetchCounts = useCallback(async () => {
    try {
      const [resRes, msgRes] = await Promise.all([
        fetch("/api/v1/admin/reservations", { credentials: "include", cache: "no-store" }),
        fetch("/api/v1/admin/messages", { credentials: "include", cache: "no-store" }),
      ]);
      const today = new Date().toISOString().slice(0, 10);

      if (resRes.ok) {
        const data = (await resRes.json()) as { items?: { status: string; date?: string }[] };
        const items = data.items || [];
        setCounts((prev) => ({
          ...prev,
          pending: items.filter((x) => x.status === "pending").length,
          todayReservations: items.filter(
            (x) => x.date === today && (x.status === "confirmed" || x.status === "pending")
          ).length,
          todayConfirmed: items.filter(
            (x) => x.date === today && x.status === "confirmed"
          ).length,
        }));
      }

      if (msgRes.ok) {
        const data = (await msgRes.json()) as { items?: { status: string }[] };
        const items = data.items || [];
        setCounts((prev) => ({
          ...prev,
          newMessages: items.filter((x) => x.status === "new").length,
        }));
      }
    } catch {
      /* sessizce atla */
    }
  }, []);

  useEffect(() => {
    void fetchCounts();
    const timer = setInterval(() => void fetchCounts(), REFRESH_INTERVAL);
    return () => clearInterval(timer);
  }, [fetchCounts]);

  return { ...counts, refresh: fetchCounts };
}
