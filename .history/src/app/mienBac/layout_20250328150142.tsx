import { getMetadata } from "@/utils/getPageMetadata";
import { Metadata } from "next";

export async function generateMetadata({}): Promise<Metadata> {
  const metadata = await getMetadata("trang-chu");
  return {
    ...metadata,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
} 