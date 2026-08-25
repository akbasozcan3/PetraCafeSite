import LuxuryLoader from "@/components/site/LuxuryLoader";
import { getPublicContent } from "@/lib/db/content";

export default async function Loading() {
  const content = await getPublicContent().catch(() => null);

  return (
    <LuxuryLoader
      config={content?.loader}
      fullScreen={true}
    />
  );
}


