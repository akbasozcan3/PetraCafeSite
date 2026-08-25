import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export function featureGone() {
  return NextResponse.json({ error: "Bu özellik kapatıldı." }, { status: 410 });
}

export function revalidatePublicSite() {
  // Ana sayfa
  revalidatePath("/");
  revalidatePath("/", "layout");
  // Menü sayfaları — tüm alt sayfalar dahil
  revalidatePath("/menu");
  revalidatePath("/menu", "layout");
  revalidatePath("/menu/[categorySlug]", "page");
  revalidatePath("/menu/[categorySlug]/[productSlug]", "page");
  // Ürünler
  revalidatePath("/urunler");
  revalidatePath("/urunler", "layout");
  revalidatePath("/urunler/[categorySlug]", "page");
  revalidatePath("/urunler/[categorySlug]/[productSlug]", "page");
  // Blog
  revalidatePath("/blog");
  revalidatePath("/blog", "layout");
  // Hakkımızda
  revalidatePath("/hakkimizda");
  revalidatePath("/hakkimizda", "page");
  // Havuz & Plaj
  revalidatePath("/havuz-plaj");
  revalidatePath("/havuz-plaj", "page");
}
