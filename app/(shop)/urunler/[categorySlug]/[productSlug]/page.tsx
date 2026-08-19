import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ categorySlug: string; productSlug: string }>;
};

export default async function UrunlerProductRedirect({ params }: Props) {
  const { categorySlug, productSlug } = await params;
  redirect(`/menu/${categorySlug}/${productSlug}`);
}
