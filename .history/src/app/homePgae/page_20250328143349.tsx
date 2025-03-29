import { Metadata } from "next";
import { getPageMetadata } from "@/utils/getPageMetadata";
import HomePageClient from "./HomePageClient";

export async function generateMetadata(): Promise<Metadata> {
  return await getPageMetadata("trang-chu");
}

export default async function TrangChu() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_RMS_URL}/trangChu`, {
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  const data = await res.json();

  
  return <HomePageClient initialData={data[0]} />;
}
