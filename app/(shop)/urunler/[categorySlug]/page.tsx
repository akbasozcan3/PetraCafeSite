import { redirect } from "next/navigation";

type Props = { params: Promise<{ categorySlug: string }> };

export default async function UrunlerCategoryRedirect({ params }: Props) {
  const { categorySlug } = await params;
  redirect(`/menu/${categorySlug}`);
}
