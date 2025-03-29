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
    
    // Áp dụng replaceSeoRM cho phần head
    const processedHead = replaceSeoRM(data.head);

    const getTitleFromMeta = (head: any) => {
      const match = head.match(
        /<meta\s+property="og:title"\s+content="([^"]*)"/
      );
      return match ? match[1] : null;
    };
    // Sử dụng processedHead thay vì data.head
    const title = getTitleFromMeta(processedHead) || "Du Lịch Việt Nam";
    return {
      title,

    };
  } catch (error) {
    return {
      title: "Du Lịch Việt Nam",
      description: "Khám phá vẻ đẹp Việt Nam",
    };
  }
}
