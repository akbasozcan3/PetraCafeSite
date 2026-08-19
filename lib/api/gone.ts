import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export function featureGone() {
  return NextResponse.json({ error: "Bu özellik kapatıldı." }, { status: 410 });
}

export function revalidatePublicSite() {
  revalidatePath("/");
  revalidatePath("/", "layout");
  revalidatePath("/menu");
  revalidatePath("/menu", "layout");
  revalidatePath("/urunler");
  revalidatePath("/urunler", "layout");
  revalidatePath("/blog");
  revalidatePath("/blog", "layout");
}
