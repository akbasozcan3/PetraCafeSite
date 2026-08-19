import { redirect } from "next/navigation";

export default function UrunlerNotFoundRedirect() {
  redirect("/menu");
}
