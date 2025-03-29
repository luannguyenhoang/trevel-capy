import { Metadata } from "next";
import { Source } from "@/type/types";
import ClientScroll from "../components/ClientScroll";

// Fetch dữ liệu cho cả layout và page
async function getMienBacData(): Promise<Source> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/mienBac`, {
    cache: "no-store", // hoặc next: { revalidate: 3600 }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const result = await res.json();
  return result[0];
}

// Tạo metadata từ cùng dữ liệu
export async function generateMetadata(): Promise<Metadata> {
  const data = await getMienBacData();
  
  return {
    title: data?.acf?.title?.title_mien_bac || "Miền Bắc Việt Nam",
    description: data?.acf?.description || "Khám phá miền Bắc Việt Nam",
    // Các trường metadata khác
  };
}

// Layout truyền props xuống page con
export default async function MienBacLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getMienBacData();

  // Truyền dữ liệu đã fetch xuống page con
  return (
    <>
      <ClientScroll />
      {/* Truyền data xuống children với context hoặc props */}
      {React.cloneElement(children as React.ReactElement, { data })}
    </>
  );
}

