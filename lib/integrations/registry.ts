import type { IntegrationId, IntegrationProvider } from "./types";
import { trendyolGoProvider } from "./trendyol/provider";
import { yemeksepetiProvider } from "./yemeksepeti/provider";

const PROVIDERS: Record<IntegrationId, IntegrationProvider> = {
  trendyol_go: trendyolGoProvider,
  yemeksepeti: yemeksepetiProvider,
};

export function listProviders(): IntegrationProvider[] {
  return Object.values(PROVIDERS);
}

export function getProvider(id: string): IntegrationProvider | null {
  if (id === "trendyol-go" || id === "trendyol") return PROVIDERS.trendyol_go;
  if (id === "yemeksepeti" || id === "ys") return PROVIDERS.yemeksepeti;
  return PROVIDERS[id as IntegrationId] || null;
}

export function requireProvider(id: string): IntegrationProvider {
  const p = getProvider(id);
  if (!p) throw new Error("Bilinmeyen entegrasyon.");
  return p;
}
