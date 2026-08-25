import LuxuryLoader from "@/components/site/LuxuryLoader";
import { getPublicContent } from "@/lib/db/content";

export default async function MenuLoading() {
  const content = await getPublicContent().catch(() => null);

  return (
    <LuxuryLoader
      label="Petra Menüsü Yükleniyor"
      sublabel="Kahvaltı · Dünya Mutfağı · Tatlı · Kahve & İçecekler"
      config={content?.loader}
      fullScreen={false}
    />
  );
}


