import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth";
import { getPayTrConfig, savePayTrConfig, PayTrConfig } from "@/lib/integrations/paytr/paytr";

export async function GET(req: NextRequest) {
  try {
    await requirePermission("integrations:manage");
    const config = await getPayTrConfig();
    return NextResponse.json({
      config: {
        merchantId: config.merchantId,
        merchantKey: config.merchantKey ? "••••••••" + config.merchantKey.slice(-4) : "",
        merchantSalt: config.merchantSalt ? "••••••••" + config.merchantSalt.slice(-4) : "",
        hasKey: Boolean(config.merchantKey),
        hasSalt: Boolean(config.merchantSalt),
        testMode: config.testMode,
        maxInstallment: config.maxInstallment || 0,
        noInstallment: config.noInstallment !== false,
        depositAmount: config.depositAmount || 250,
        depositEnabled: config.depositEnabled !== false,
        depositNote: config.depositNote || "kapora ile masanızı anında garantileyin.",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Yetkisiz erişim" },
      { status: 401 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await requirePermission("integrations:manage");
    const body = await req.json();
    const current = await getPayTrConfig();

    const merchantId = typeof body.merchantId === "string" ? body.merchantId.trim() : current.merchantId;
    const merchantKey =
      body.merchantKey && !body.merchantKey.startsWith("••••")
        ? body.merchantKey.trim()
        : current.merchantKey;
    const merchantSalt =
      body.merchantSalt && !body.merchantSalt.startsWith("••••")
        ? body.merchantSalt.trim()
        : current.merchantSalt;

    const newConfig: PayTrConfig = {
      merchantId,
      merchantKey,
      merchantSalt,
      testMode: Boolean(body.testMode),
      maxInstallment: Number(body.maxInstallment) || 0,
      noInstallment: body.noInstallment !== false,
      depositAmount: Number(body.depositAmount) || 250,
      depositEnabled: body.depositEnabled !== false,
      depositNote: typeof body.depositNote === "string" ? body.depositNote.trim() : "kapora ile masanızı anında garantileyin.",
    };

    await savePayTrConfig(newConfig);

    return NextResponse.json({
      success: true,
      message: "PayTR ve kapora ayarları başarıyla kaydedildi.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Kayıt başarısız" },
      { status: 500 }
    );
  }
}