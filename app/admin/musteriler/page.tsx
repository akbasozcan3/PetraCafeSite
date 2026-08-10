import { redirect } from "next/navigation";

/** @deprecated Web üyelik kaldırıldı */
export default function MusterilerRedirect() {
  redirect("/admin");
}
