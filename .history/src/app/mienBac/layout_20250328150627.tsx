import { getMetadata } from "@/utils/getPageMetadata";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const metadata = await getMetadata(params.slug);
  return {
    ...metadata,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
} 