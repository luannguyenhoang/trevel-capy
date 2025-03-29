import { Metadata } from "next";
import { getPageMetadata } from "@/utils/getPageMetadata";
import HomePageClient from "./HomePageClient";

export async function generateMetadata(): Promise<Metadata> {
  return await getPageMetadata("trangChu");
}

export default async function TrangChu() {
  const res = await fetch("/api/trangChu");
  const data = await res.json();

  return <HomePageClient initialData={data[0]} />;
}
