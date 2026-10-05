import type { Metadata } from "next";
import { CmsPage } from "@/components/cms/CmsPage";
import { getCmsMetadata } from "@/components/cms/cms-api";

type Props = { params: Promise<{ slug: string[] }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return getCmsMetadata((await params).slug);
}
export default async function Page({ params }: Props) {
  return <CmsPage segments={(await params).slug} />;
}
