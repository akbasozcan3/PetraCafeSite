export type AdminRole = "owner" | "admin" | "editor" | "viewer";

export type Permission =
  | "content:read"
  | "content:write"
  | "media:write"
  | "users:manage"
  | "logs:read"
  | "backup:manage"
  | "settings:password"
  | "seo:write"
  | "system:read"
  | "integrations:manage";

const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  owner: [
    "content:read",
    "content:write",
    "media:write",
    "users:manage",
    "logs:read",
    "backup:manage",
    "settings:password",
    "seo:write",
    "system:read",
    "integrations:manage",
  ],
  admin: [
    "content:read",
    "content:write",
    "media:write",
    "logs:read",
    "backup:manage",
    "settings:password",
    "seo:write",
    "system:read",
    "integrations:manage",
  ],
  editor: [
    "content:read",
    "content:write",
    "media:write",
    "seo:write",
    "settings:password",
  ],
  viewer: ["content:read", "system:read", "logs:read"],
};

export const ROLE_LABELS: Record<AdminRole, string> = {
  owner: "Sahip",
  admin: "Yönetici",
  editor: "Editör",
  viewer: "İzleyici",
};

export function permissionsFor(role: AdminRole): Permission[] {
  return ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.viewer;
}

export function hasPermission(role: AdminRole | undefined, permission: Permission): boolean {
  if (!role) return false;
  return permissionsFor(role).includes(permission);
}

export function isAdminRole(value: string): value is AdminRole {
  return value === "owner" || value === "admin" || value === "editor" || value === "viewer";
}
