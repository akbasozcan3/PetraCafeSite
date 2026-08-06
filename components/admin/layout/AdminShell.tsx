"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/admin/cn";
import { AdminSessionProvider, useAdminSession } from "@/lib/context/AdminSessionContext";
import { AdminContentProvider } from "@/lib/context/AdminContentContext";
import Sidebar from "@/components/admin/layout/Sidebar";
import Header from "@/components/admin/layout/Header";
import { MobileSidebar } from "@/components/admin/layout/NavDropdown";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { loading, user } = useAdminSession();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#080D15]" aria-busy="true" aria-label="Oturum kontrol ediliyor" />
    );
  }

  return (
    <AdminContentProvider>
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
          <main className="relative z-10 mx-auto w-full max-w-[1600px] p-4 lg:p-8">{children}</main>
        </div>
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
