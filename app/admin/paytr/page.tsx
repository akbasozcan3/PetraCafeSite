import type { Metadata } from "next";
import PayTrPanel from "@/components/admin/panels/PayTrPanel";

export const metadata: Metadata = {
  title: "PayTR Sanal POS Yönetimi — Admin",
};

export default function Page() {
  return <PayTrPanel />;
}