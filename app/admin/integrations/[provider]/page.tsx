import IntegrationDetailPanel from "@/components/admin/panels/IntegrationDetailPanel";

export default async function IntegrationProviderPage({
  params,
}: {
  params: Promise<{ provider: string }>;
}) {
  const { provider } = await params;
  return <IntegrationDetailPanel providerSlug={provider} />;
}
