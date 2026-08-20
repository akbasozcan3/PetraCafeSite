const fs = require('fs');

function makePage(slug, key, defaultTitle) {
  return `import type { Metadata } from "next";
import { getPublicContent } from "@/lib/db/content";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";
import LegalPageTemplate from "@/components/site/LegalPageTemplate";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent().catch(() => null);
  const data = (content?.legal as any)?.${key} || (DEFAULT_CONTENT.legal as any)?.${key};
  return {
    title: \`\${data?.title || "${defaultTitle}"} — Petra Cafe Restaurant\`,
    description: data?.lead || "Petra Cafe Restaurant yasal bildirim ve koşulları.",
  };
}

export default async function Page() {
  const content = await getPublicContent().catch(() => null);
  const data = (content?.legal as any)?.${key} || (DEFAULT_CONTENT.legal as any)?.${key};

  return (
    <LegalPageTemplate
      currentSlug="${slug}"
      title={data?.title || "${defaultTitle}"}
      lead={data?.lead}
      body={data?.body || ""}
    />
  );
}
`;
}

const list = [
  ['app/(shop)/gizlilik-politikasi', 'gizlilik-politikasi', 'gizlilikPolitikasi', 'Gizlilik Politikası ve KVKK Aydınlatma Metni'],
  ['app/(shop)/rezervasyon-kosullari', 'rezervasyon-kosullari', 'rezervasyonKosullari', 'Rezervasyon, İptal ve İade Koşulları'],
  ['app/(shop)/kullanim-kosullari', 'kullanim-kosullari', 'kullanimKosullari', 'Kullanım Koşulları'],
  ['app/(shop)/cerez-politikasi', 'cerez-politikasi', 'cerezPolitikasi', 'Çerez Politikası'],
  ['app/(shop)/ticari-bilgiler', 'ticari-bilgiler', 'ticariBilgiler', 'İşletme ve Ticari Bilgiler'],
];

for (const [dir, slug, key, title] of list) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(dir + '/page.tsx', makePage(slug, key, title), 'utf8');
}
console.log('5 Yasal sayfa oluşturuldu.');