"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CalendarDays, Inbox, LayoutDashboard, LayoutList } from "lucide-react";
import { cn } from "@/lib/admin/cn";
import { AdminSessionProvider, useAdminSession } from "@/lib/context/AdminSessionContext";
import { AdminContentProvider } from "@/lib/context/AdminContentContext";
import Sidebar from "@/components/admin/layout/Sidebar";
import Header from "@/components/admin/layout/Header";
import { MobileSidebar } from "@/components/admin/layout/NavDropdown";
import AdminFaviconSync from "@/components/admin/ui/AdminFaviconSync";
import AdminSplash from "@/components/admin/ui/AdminSplash";

/** Mobil alt navigasyon — yalnızca küçük ekranda görünür */
function MobileBottomNav() {
  const pathname = usePathname();
  const [pending, setPending] = useState(0);
  const [newMsgs, setNewMsgs] = useState(0);

  const fetchCounts = useCallback(async () => {
    try {
      const [resRes, msgRes] = await Promise.all([
        fetch("/api/v1/admin/reservations", { credentials: "include", cache: "no-store" }),
        fetch("/api/v1/admin/messages", { credentials: "include", cache: "no-store" }),
      ]);
      if (resRes.ok) {
        const d = (await resRes.json()) as { items?: { status: string }[] };
        setPending((d.items || []).filter((x) => x.status === "pending").length);
      }
      if (msgRes.ok) {
        const d = (await msgRes.json()) as { items?: { status: string }[] };
        setNewMsgs((d.items || []).filter((x) => x.status === "new").length);
      }
    } catch { /* sessiz */ }
  }, []);

  useEffect(() => {
    void fetchCounts();
    const t = setInterval(() => void fetchCounts(), 30_000);
    return () => clearInterval(t);
  }, [fetchCounts]);

  const tabs = [
    { href: "/admin", icon: LayoutDashboard, label: "Özet", badge: 0 },
    { href: "/admin/rezervasyonlar", icon: CalendarDays, label: "Rezervasyon", badge: pending },
    { href: "/admin/mesajlar", icon: Inbox, label: "Mesajlar", badge: newMsgs },
    { href: "/admin/menu", icon: LayoutList, label: "Menü", badge: 0 },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 flex border-t border-white/[0.06] bg-[#080D15]/95 backdrop-blur-xl lg:hidden">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive =
          pathname === tab.href ||
          (tab.href !== "/admin" && pathname.startsWith(tab.href));
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "relative flex flex-1 flex-col items-center gap-1 py-3 text-[10px] font-medium transition",
              isActive ? "text-[#C8703A]" : "text-[#6B7A94]"
            )}
          >
            <div className="relative">
              <Icon className="h-5 w-5" />
              {tab.badge > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#C8703A] text-[8px] font-bold text-white">
                  {tab.badge > 9 ? "9+" : tab.badge}
                </span>
              )}
            </div>
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { loading, user } = useAdminSession();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading || !user) {
    return <AdminSplash label="Oturum kontrol ediliyor" />;
  }

  return (
    <AdminContentProvider>
      <AdminFaviconSync />
      <div className="relative min-h-screen overflow-hidden bg-[#080D15] text-[#EEE9E0]">
        <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(135deg,rgba(200,112,58,0.06),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_26%)]" />
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
        <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
        <div
          className={cn(
            "relative transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            collapsed ? "lg:ml-[72px]" : "lg:ml-[260px]"
          )}
        >
          <Header onMobileMenuOpen={() => setMobileOpen(true)} />
          {/* Mobilde alt nav için padding-bottom */}
          <main className="relative z-10 mx-auto w-full max-w-[1600px] p-4 pb-24 lg:p-8 lg:pb-8">{children}</main>
        </div>
        <MobileBottomNav />
      </div>
    </AdminContentProvider>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <AdminSessionProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminSessionProvider>
  );
}
