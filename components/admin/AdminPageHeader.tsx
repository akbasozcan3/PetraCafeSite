"use client";

import Button from "@/components/admin/ui/Button";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import type { SiteContent } from "@/lib/content/types";
import { RefreshCw } from "lucide-react";
import AdminSplash from "@/components/admin/ui/AdminSplash";

export default function AdminPageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold tracking-tight text-[#F8F8F8]">{title}</h1>
      {description && <p className="mt-1 text-sm text-[#8A9BB0]">{description}</p>}
    </div>
  );
}

export function AdminAlert({
  message,
  type = "info",
}: {
  message: string;
  type?: "info" | "success" | "error";
}) {
  if (!message) return null;

  const styles = {
    info: "border-[#C8703A]/30 bg-[#C8703A]/10 text-[#EEE9E0]",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    error: "border-red-500/30 bg-red-500/10 text-red-300",
  };

  return (
    <div className={`mb-6 rounded-xl border px-4 py-3 text-sm ${styles[type]}`}>
      {message}
    </div>
  );
}

export function AdminLoading() {
  return <AdminSplash compact label="İçerik yükleniyor" />;
}

export function AdminError({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="max-w-md text-sm text-red-300">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          <RefreshCw className="h-4 w-4" /> Tekrar Dene
        </Button>
      )}
    </div>
  );
}

/** Loading / error / content gate for admin panels. */
export function AdminGate({
  children,
}: {
  children: (content: SiteContent) => React.ReactNode;
}) {
  const { content, loading, error, refresh } = useAdminContent();
  if (loading) return <AdminLoading />;
  if (error) {
    return <AdminError message={error} onRetry={() => void refresh()} />;
  }
  if (!content) {
    return (
      <AdminError message="İçerik yüklenemedi." onRetry={() => void refresh()} />
    );
  }
  return <>{children(content)}</>;
}
