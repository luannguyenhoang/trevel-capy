import { getMetadata } from "@/utils/getPageMetadata";
import { Metadata } from "next";

export async function generateMetadata({ slug }: {  slug: string  }): Promise<Metadata> {
  // Lấy slug từ route hiện tại hoặc sử dụng giá trị mặc định 'mien-bac'
  const metadata = await getMetadata(slug);
  return {
    ...metadata,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
} 