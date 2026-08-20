import crypto from "crypto";
import { getAppSetting, setAppSetting } from "@/lib/db/settings";

export interface PayTrConfig {
  merchantId: string;
  merchantKey: string;
  merchantSalt: string;
  testMode: boolean;
  maxInstallment?: number;
  noInstallment?: boolean;
  depositAmount?: number; // Rezervasyon kapora tutarı (TL)
  depositEnabled?: boolean; // Online kapora ödemesi açık/kapalı
  depositNote?: string; // Kapora açıklama metni
}

export interface PayTrBasketItem {
  name: string;
  price: string | number; // TL formatında örn: 150.00
  quantity: number;
}

export interface CreatePayTrPaymentParams {
  merchantOid: string; // Benzersiz sipariş/ödeme numarası
  userEmail: string;
  userPhone: string;
  userName: string;
  userAddress: string;
  paymentAmount: number; // TL cinsinden (fonksiyon içinde * 100 kuruşa çevrilir)
  userIp: string;
  basket: PayTrBasketItem[];
  okUrl: string;
  failUrl: string;
  currency?: "TL" | "EUR" | "USD";
  timeoutLimit?: number; // dakika
}

const SETTING_PAYTR_KEY = "integration_paytr_config";

export async function getPayTrConfig(): Promise<PayTrConfig> {
  const envId = (process.env.PAYTR_MERCHANT_ID || "").trim();
  const envKey = (process.env.PAYTR_MERCHANT_KEY || "").trim();
  const envSalt = (process.env.PAYTR_MERCHANT_SALT || "").trim();
  const envTest = process.env.PAYTR_TEST_MODE === "1" || process.env.PAYTR_TEST_MODE === "true";

  let dbConfig: Partial<PayTrConfig> = {};
  try {
    const raw = await getAppSetting(SETTING_PAYTR_KEY);
    if (raw) {
      dbConfig = JSON.parse(raw);
    }
  } catch {
    /* fallback */
  }

  return {
    merchantId: envId || dbConfig.merchantId || "",
    merchantKey: envKey || dbConfig.merchantKey || "",
    merchantSalt: envSalt || dbConfig.merchantSalt || "",
    testMode: envId ? envTest : (dbConfig.testMode !== undefined ? Boolean(dbConfig.testMode) : true),
    maxInstallment: dbConfig.maxInstallment || 0,
    noInstallment: dbConfig.noInstallment !== false,
    depositAmount: Number(dbConfig.depositAmount) || 250,
    depositEnabled: dbConfig.depositEnabled !== false,
    depositNote: dbConfig.depositNote || "kapora ile masanızı anında garantileyin.",
  };
}

export async function savePayTrConfig(config: PayTrConfig): Promise<void> {
  await setAppSetting(SETTING_PAYTR_KEY, JSON.stringify(config));
}


/**
 * PayTR iFrame Token üreten resmi API fonksiyonu
 */
export async function createPayTrToken(
  params: CreatePayTrPaymentParams,
  configOverride?: PayTrConfig
): Promise<{ ok: boolean; token?: string; error?: string }> {
  const config = configOverride || (await getPayTrConfig());

  if (!config.merchantId || !config.merchantKey || !config.merchantSalt) {
    return {
      ok: false,
      error: "PayTR mağaza bilgileri (Merchant ID, Key, Salt) eksik. Lütfen admin panelinden ayarlayın.",
    };
  }

  try {
    const merchant_id = config.merchantId.trim();
    const merchant_key = config.merchantKey.trim();
    const merchant_salt = config.merchantSalt.trim();

    const user_ip = params.userIp || "127.0.0.1";
    const merchant_oid = params.merchantOid;
    const email = params.userEmail || "misafir@petracafe.com";
    const payment_amount = Math.round(params.paymentAmount * 100); // Kuruş cinsinden (örn: 100 TL = 10000)
    const user_name = params.userName || "Misafir";
    const user_address = params.userAddress || "Petra Cafe & Restaurant, Çekmeköy / İstanbul";
    const user_phone = params.userPhone || "05306089051";
    const merchant_ok_url = params.okUrl;
    const merchant_fail_url = params.failUrl;
    const currency = params.currency || "TL";
    const test_mode = config.testMode ? "1" : "0";
    const no_installment = config.noInstallment ? "1" : "0";
    const max_installment = String(config.maxInstallment || 0);
    const timeout_limit = String(params.timeoutLimit || 30);
    const debug_on = config.testMode ? "1" : "0";

    // Sepet verisini PayTR JSON formatında encode etme
    const user_basket = Buffer.from(
      JSON.stringify(
        params.basket.map((item) => [
          item.name,
          String(Number(item.price).toFixed(2)),
          item.quantity,
        ])
      )
    ).toString("base64");

    // PayTR Token İmza Hash Hesaplama (HMAC-SHA256)
    // Sıralama: merchant_id + user_ip + merchant_oid + email + payment_amount + user_basket + no_installment + max_installment + currency + test_mode
    const hashStr =
      merchant_id +
      user_ip +
      merchant_oid +
      email +
      payment_amount +
      user_basket +
      no_installment +
      max_installment +
      currency +
      test_mode;

    const paytr_token = crypto
      .createHmac("sha256", merchant_key)
      .update(hashStr + merchant_salt)
      .digest("base64");

    const formData = new URLSearchParams();
    formData.append("merchant_id", merchant_id);
    formData.append("user_ip", user_ip);
    formData.append("merchant_oid", merchant_oid);
    formData.append("email", email);
    formData.append("payment_amount", String(payment_amount));
    formData.append("paytr_token", paytr_token);
    formData.append("user_basket", user_basket);
    formData.append("debug_on", debug_on);
    formData.append("no_installment", no_installment);
    formData.append("max_installment", max_installment);
    formData.append("user_name", user_name);
    formData.append("user_address", user_address);
    formData.append("user_phone", user_phone);
    formData.append("merchant_ok_url", merchant_ok_url);
    formData.append("merchant_fail_url", merchant_fail_url);
    formData.append("timeout_limit", timeout_limit);
    formData.append("currency", currency);
    formData.append("test_mode", test_mode);

    const response = await fetch("https://www.paytr.com/odeme/api/get-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const responseText = await response.text();
    let resJson: any = null;

    try {
      resJson = JSON.parse(responseText);
    } catch {
      return {
        ok: false,
        error: responseText.trim() || "PayTR sunucusundan geçersiz yanıt alındı. Lütfen mağaza anahtarlarınızı kontrol edin.",
      };
    }

    if (resJson?.status === "success" && resJson?.token) {
      return { ok: true, token: resJson.token };
    }

    return {
      ok: false,
      error: resJson?.reason || "PayTR ödeme oturumu başlatılamadı. Lütfen PayTR mağaza panelinden IP ve anahtar ayarlarınızı doğrulayın.",
    };
  } catch (error) {
    console.error("[PayTR] Token alma hatası:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "PayTR bağlantı hatası.",
    };
  }
}


/**
 * PayTR Bildirim (Webhook Callback) Hash Doğrulama
 */
export async function verifyPayTrCallback(postData: {
  merchant_oid: string;
  status: string;
  total_amount: string;
  hash: string;
}): Promise<boolean> {
  const config = await getPayTrConfig();
  if (!config.merchantKey || !config.merchantSalt) return false;

  const hashStr =
    postData.merchant_oid + config.merchantSalt + postData.status + postData.total_amount;
  const calculatedHash = crypto
    .createHmac("sha256", config.merchantKey)
    .update(hashStr)
    .digest("base64");

  return calculatedHash === postData.hash;
}