import { redirect } from "next/navigation";

/** @deprecated Web sepet siparişleri kaldırıldı */
export default function WebSiparislerRedirect() {
  redirect("/admin");
}
