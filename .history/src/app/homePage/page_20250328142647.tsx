import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_RMS_URL}/trangChu`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    const pageData = data[0];

    return {
      title: pageData?.title || "Trang chủ - Du lịch Việt Nam",
      description: pageData?.description || "Khám phá vẻ đẹp Việt Nam"
    };
  } catch (error) {
    return {
      title: "Trang chủ - Du lịch Việt Nam",
      description: "Khám phá vẻ đẹp Việt Nam"
    };
  }
}

// ... phần còn lại của component TrangChu giữ nguyên ... 