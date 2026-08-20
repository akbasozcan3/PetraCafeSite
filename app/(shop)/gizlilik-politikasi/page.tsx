import type { Metadata } from "next";
import { getPublicContent } from "@/lib/db/content";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";
import LegalPageTemplate from "@/components/site/LegalPageTemplate";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent().catch(() => null);
  const data = (content?.legal as any)?.gizlilikPolitikasi || (DEFAULT_CONTENT.legal as any)?.gizlilikPolitikasi;
  return {
    title: `${data?.title || "Gizlilik Politikası ve KVKK Aydınlatma Metni"} — Petra Cafe Restaurant`,
    description: data?.lead || "Petra Cafe Restaurant yasal bildirim ve koşulları.",
  };
}

export default async function Page() {
  const content = await getPublicContent().catch(() => null);
  const data = (content?.legal as any)?.gizlilikPolitikasi || (DEFAULT_CONTENT.legal as any)?.gizlilikPolitikasi;

  return (
    <LegalPageTemplate
      currentSlug="gizlilik-politikasi"
      title={data?.title || "Gizlilik Politikası ve KVKK Aydınlatma Metni"}
      lead={data?.lead}
      body={data?.body || ""}
    />
  );
}
