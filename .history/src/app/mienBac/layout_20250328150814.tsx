import { getMetadata } from "@/utils/getPageMetadata";
import { Metadata } from "next";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/mien-bac`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();
  const slug = data[0]?.type;
  const metadata = await getMetadata(slug);
  return metadata;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
} 