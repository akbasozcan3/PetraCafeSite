import type { Metadata } from "next";
import AdminShell from "@/components/admin/layout/AdminShell";
import { getPublicContent } from "@/lib/db/content";
import { siteFaviconHref } from "@/lib/content/favicon";
import "./admin.css";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent().catch(() => null);
  const icon = siteFaviconHref(content);
  return {
    title: {
      default: "Admin",
      template: "%s · Petra Admin",
    },
    robots: { index: false, follow: false },
    icons: {
      icon: [{ url: icon }],
      shortcut: icon,
      apple: icon,
    },
  };
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
