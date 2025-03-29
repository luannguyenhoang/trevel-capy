import { MienBacContent, Source, TitlesMienBac } from "@/type/types";
import Loading from "../components/molecules/Loading";
import { ScrollAnimation } from "../components/molecules/ScrollAnimation";
import Titles from "../components/molecules/Title";
import Containers from "../components/organisms/Content";
import { notFound } from "next/navigation";

// Hàm async để fetch dữ liệu từ server
async function getMienBacData(): Promise<Source> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/mienBac`, {
      cache: "no-store", // hoặc next: { revalidate: 3600 } để cache mỗi giờ
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const result = await res.json();
    return result[0];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Để Next.js xử lý lỗi
  }
}

export default async function MienBac() {
  try {
    // Fetch dữ liệu từ server
    const data = await getMienBacData();

    return (
      <>
        <ScrollAnimation delay={0.3}>
          <Titles session1={data?.acf.title as TitlesMienBac} />
        </ScrollAnimation>

        <Containers
          slug={data?.type}
          session2={data?.acf.mien_bac_content as MienBacContent}
        />
      </>
    );
  } catch (error) {
    // Trả về 404 page nếu không tìm thấy dữ liệu
    notFound();
  }
}
