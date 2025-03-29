import { getMetadata } from "@/utils/getPageMetadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getMetadata(params.slug);
  return {
    ...metadata,
  };
}

export default function MienBacLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

