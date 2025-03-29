import { Metadata } from "next";
import { replaceSeoRM } from "./replaceSeoRM";

export async function getMetadata(slug: string): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_RMS_URL}/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch metadata");
    }

    const data = await res.json();
    
    // Xử lý data.head với replaceSeoRM
    const processedHead = replaceSeoRM(data.head);
    
    // Hàm để lấy title từ meta
    const getTitleFromMeta = (head: string) => {
      const match = head.match(/<meta\s+property="og:title"\s+content="([^"]*)"/);
      return match ? match[1] : null;
    };
    
    // Lấy title từ head đã được xử lý
    const title = getTitleFromMeta(processedHead) || "Du Lịch Việt Nam";
    
    return {
      title,
      description: "Khám phá vẻ đẹp Việt Nam", // Để mặc định
    };
  } catch (error) {
    return {
      title: "Du Lịch Việt Nam",
      description: "Khám phá vẻ đẹp Việt Nam",
    };
  }
}