import { redirect } from "next/navigation";

/** Eski “Metinler” yolu → Hakkımızda */
export default function Page() {
  redirect("/admin/hakkimizda");
}
