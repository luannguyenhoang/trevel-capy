import { getMetadata } from "@/utils/getPageMetadata";
import { Metadata } from "next";

export async function generateMetadata({ slug }: any): Promise<Metadata> {
  const metadata = await getMetadata("mien-bac");
  return {
    ...metadata,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
} 