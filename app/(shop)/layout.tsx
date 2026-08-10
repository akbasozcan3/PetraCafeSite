import type { ReactNode } from "react";
import SiteShell from "@/components/site/SiteShell";

export default function ShopLayout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
