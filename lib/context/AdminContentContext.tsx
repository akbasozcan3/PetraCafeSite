"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api/client";
import type { SiteContent } from "@/lib/content/types";

type ImageKeyMeta = Record<string, { label: string; hint: string }>;

interface AdminContentState {
  content: SiteContent | null;
  imageKeys: ImageKeyMeta;
  loading: boolean;
  error: string;
  refresh: () => Promise<void>;
  setContent: React.Dispatch<React.SetStateAction<SiteContent | null>>;
}

const AdminContentContext = createContext<AdminContentState | null>(null);

export function AdminContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [imageKeys, setImageKeys] = useState<ImageKeyMeta>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.getAdminContent();
      setContent(res.data);
      setImageKeys(res.imageKeys);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Veri yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <AdminContentContext.Provider value={{ content, imageKeys, loading, error, refresh, setContent }}>
      {children}
    </AdminContentContext.Provider>
  );
}

export function useAdminContent() {
  const ctx = useContext(AdminContentContext);
  if (!ctx) throw new Error("useAdminContent must be used within AdminContentProvider");
  return ctx;
}
