import { NextResponse } from "next/server";
import { getPayTrConfig } from "@/lib/integrations/paytr/paytr";

export const runtime = "nodejs";

export async function GET() {
  try {
    const config = await getPayTrConfig();
    return NextResponse.json({
      depositAmount: config.depositAmount || 250,
      depositEnabled: config.depositEnabled !== false,
      depositNote: config.depositNote || "kapora ile masanızı anında garantileyin.",
      isConfigured: Boolean(config.merchantId && config.merchantKey && config.merchantSalt),
    });
  } catch {
    return NextResponse.json({
      depositAmount: 250,
      depositEnabled: true,
      depositNote: "kapora ile masanızı anında garantileyin.",
      isConfigured: false,
    });
  }
}
