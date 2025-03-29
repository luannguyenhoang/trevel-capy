import TrangChu from "./homePgae/page";
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_RMS_URL}/trang-chu`);
    const data = await res.json();
    
    // Trích xuất metadata từ API
    const title = data?.head ? getTitleFromMeta(data.head) : 'Trang chủ - Du lịch Việt Nam';
    
    return {
      title: title,
      description: 'Khám phá vẻ đẹp Việt Nam qua các tour du lịch hấp dẫn',
      // Các thuộc tính khác...
    };
  } catch (error) {
    return {
      title: 'Trang chủ - Du lịch Việt Nam',
      description: 'Khám phá vẻ đẹp Việt Nam',
    };
  }
}

function getTitleFromMeta(head: string) {
  const match = head.match(/<meta\s+property="og:title"\s+content="([^"]*)"/);
  return match ? match[1] : null;
}

export default function Home() {
  return <TrangChu/>;
}
