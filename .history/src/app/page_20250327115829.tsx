import { Metadata } from 'next';
import TrangChu from "./homePgae/page";

export async function generateMetadata(): Promise<Metadata> {
  try {
    // Gọi API để lấy metadata
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_RMS_URL}/trang-chu`);
    if (!res.ok) {
      throw new Error("Failed to fetch metadata");
    }
    
    const data = await res.json();
    
    // Trích xuất title từ head
    let title = "Du lịch Việt Nam"; // Title mặc định
    if (data?.head) {
      const match = data.head.match(/<meta\s+property="og:title"\s+content="([^"]*)"/);
      if (match) title = match[1];
    }
    
    // Trích xuất description
    let description = "Khám phá vẻ đẹp Việt Nam"; // Description mặc định
    if (data?.head) {
      const match = data.head.match(/<meta\s+property="og:description"\s+content="([^"]*)"/);
      if (match) description = match[1];
    }
    
    return {
      title,
      description,
      // Các thuộc tính metadata khác
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Du lịch Việt Nam",
      description: "Khám phá vẻ đẹp Việt Nam"
    };
  }
}

export default function Home() {
  return <TrangChu />;
}
