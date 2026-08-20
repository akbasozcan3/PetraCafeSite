import type { Metadata } from "next";
import { getPublicContent } from "@/lib/db/content";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";
import LegalPageTemplate from "@/components/site/LegalPageTemplate";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent().catch(() => null);
  const data = (content?.legal as any)?.kullanimKosullari || (DEFAULT_CONTENT.legal as any)?.kullanimKosullari;
  return {
    title: `${data?.title || "Kullanım Koşulları"} — Petra Cafe Restaurant`,
    description: data?.lead || "Petra Cafe Restaurant yasal bildirim ve koşulları.",
  };
}

export default async function Page() {
  const content = await getPublicContent().catch(() => null);
  const data = (content?.legal as any)?.kullanimKosullari || (DEFAULT_CONTENT.legal as any)?.kullanimKosullari;

  return (
    <LegalPageTemplate
      currentSlug="kullanim-kosullari"
      title={data?.title || "Kullanım Koşulları"}
      lead={data?.lead}
      body={data?.body || ""}
    />
  );
}
