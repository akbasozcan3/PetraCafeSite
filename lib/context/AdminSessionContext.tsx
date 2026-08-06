"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { api } from "@/lib/api/client";
import type { AdminRole, Permission } from "@/lib/admin/roles";
import { hasPermission } from "@/lib/admin/roles";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  permissions: Permission[];
}

interface AdminSessionState {
  user: AdminUser | null;
  loading: boolean;
  can: (permission: Permission) => boolean;
}

const AdminSessionContext = createContext<AdminSessionState>({
  user: null,
  loading: true,
  can: () => false,
});

export function AdminSessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    api
      .getSession()
      .then((session) => {
        if (session.authenticated && session.user) {
          setUser({
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            role: session.user.role,
            permissions: session.user.permissions || [],
          });
          setLoading(false);
        } else {
          setUser(null);
          setLoading(false);
          if (pathname !== "/admin/login") {
            window.location.href = "/admin/login";
          }
        }
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
        if (pathname !== "/admin/login") {
          window.location.href = "/admin/login";
        }
      });
  }, [pathname]);

  const can = useCallback(
    (permission: Permission) => hasPermission(user?.role, permission),
    [user?.role]
  );

  const value = useMemo(
    () => ({ user, loading, can }),
    [user, loading, can]
  );

  return (
    <AdminSessionContext.Provider value={value}>{children}</AdminSessionContext.Provider>
  );
}

export function useAdminSession() {
  return useContext(AdminSessionContext);
}
