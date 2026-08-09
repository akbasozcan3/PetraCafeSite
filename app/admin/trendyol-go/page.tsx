import { redirect } from "next/navigation";

/** Eski yol — yeni Entegrasyonlar hub'ına yönlendir */
export default function LegacyTrendyolGoPage() {
  redirect("/admin/integrations/trendyol-go");
}
