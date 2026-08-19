import { featureGone } from "@/lib/api/gone";

export const runtime = "nodejs";

export async function GET() {
  return featureGone();
}

export async function POST() {
  return featureGone();
}

export async function PUT() {
  return featureGone();
}
