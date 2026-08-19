import { featureGone } from "@/lib/api/gone";

export const runtime = "nodejs";

export async function POST() {
  return featureGone();
}
