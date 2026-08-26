const API_BASE = "/api/v1";

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    cache: "no-store",
    credentials: "include",
    headers: {
      ...(options?.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Bir hata oluştu" }));
    throw new Error(err.error || "Bir hata oluştu");
  }
  return res.json();
}

import type { SiteContent } from "@/lib/content/types";
import type { AdminRole, Permission } from "@/lib/admin/roles";

export type SessionUserDto = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  permissions: Permission[];
};

export type PublicAdminUser = {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ActivityEntry = {
  id: string;
  at: string;
  userId?: string;
  email?: string;
  name?: string;
  action: string;
  detail?: string;
  ip?: string;
};

export type BackupMeta = {
  id: string;
  createdAt: string;
  size: number;
  label?: string;
  createdBy?: string;
};

export const api = {
  login: (email: string, password: string) =>
    fetchApi<{ success: boolean; user: SessionUserDto }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  getSession: () =>
    fetchApi<{ authenticated: boolean; user: SessionUserDto | null }>("/auth/session"),
  logout: () => fetchApi<{ success: boolean }>("/auth/session", { method: "POST" }),
  getSettings: () =>
    fetchApi<{
      email: string | null;
      name: string;
      role: AdminRole | null;
      source: string;
    }>("/admin/settings"),
  changePassword: (currentPassword: string, newPassword: string) =>
    fetchApi<{ success: boolean }>("/admin/settings", {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
  getAdminContent: () =>
    fetchApi<{ data: SiteContent; imageKeys: Record<string, { label: string; hint: string }> }>(
      "/admin/content"
    ),
  updateContent: (data: Partial<SiteContent>) =>
    fetchApi<{ data: SiteContent }>("/admin/content", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  listUsers: () => fetchApi<{ users: PublicAdminUser[] }>("/admin/users"),
  createUser: (payload: {
    email: string;
    password: string;
    name: string;
    role: AdminRole;
  }) =>
    fetchApi<{ user: PublicAdminUser }>("/admin/users", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateUser: (payload: {
    id: string;
    name?: string;
    role?: AdminRole;
    active?: boolean;
    password?: string;
  }) =>
    fetchApi<{ user: PublicAdminUser }>("/admin/users", {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  deleteUser: (id: string) =>
    fetchApi<{ success: boolean }>(`/admin/users?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    }),
  listLogs: (limit = 100) =>
    fetchApi<{ entries: ActivityEntry[] }>(`/admin/logs?limit=${limit}`),
  listBackups: () => fetchApi<{ backups: BackupMeta[] }>("/admin/backups"),
  createBackup: (label?: string) =>
    fetchApi<{ backup: BackupMeta }>("/admin/backups", {
      method: "POST",
      body: JSON.stringify({ action: "create", label }),
    }),
  restoreBackup: (id: string) =>
    fetchApi<{ success: boolean; data: SiteContent }>("/admin/backups", {
      method: "POST",
      body: JSON.stringify({ action: "restore", id }),
    }),
  deleteBackup: (id: string) =>
    fetchApi<{ success: boolean }>("/admin/backups", {
      method: "POST",
      body: JSON.stringify({ action: "delete", id }),
    }),
  downloadBackup: async (id: string) => {
    const data = await fetchApi<{ meta: BackupMeta; content: SiteContent }>(
      `/admin/backups?id=${encodeURIComponent(id)}`
    );
    return data;
  },
  uploadImage: async (file: File, key: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("key", key);
    const res = await fetch(`${API_BASE}/admin/upload`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    const data = (await res.json().catch(() => ({}))) as {
      url?: string;
      error?: string;
      data?: SiteContent;
    };
    if (!res.ok || !data.url) {
      throw new Error(data.error || "Görsel yüklenemedi.");
    }
    return data;
  },
  uploadFiles: async (
    files: File[],
    key = "",
    onProgress?: (percent: number, index: number) => void
  ) => {
    const results: Array<{ url: string; key?: string }> = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${API_BASE}/admin/upload`, true);
        xhr.withCredentials = true;
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable && onProgress) {
            const pct = Math.round((e.loaded / e.total) * 100);
            onProgress(pct, i);
          }
        };
        xhr.onload = () => {
          try {
            const data = JSON.parse(xhr.responseText || "{}");
            if (xhr.status >= 200 && xhr.status < 300 && data.url) {
              results.push({ url: data.url, key: data.key });
              resolve();
            } else {
              reject(new Error(data.error || "Upload failed"));
            }
          } catch {
            reject(new Error("Invalid response from server"));
          }
        };
        xhr.onerror = () => reject(new Error("Upload error"));
        const fd = new FormData();
        fd.append("file", file, file.name);
        if (key) fd.append("key", key);
        xhr.send(fd);
      });
    }
    return results;
  },
  deleteUpload: async (url: string) => {
    return fetchApi<{ success: boolean; url: string }>("/admin/upload", {
      method: "DELETE",
      body: JSON.stringify({ url }),
    });
  },
};
