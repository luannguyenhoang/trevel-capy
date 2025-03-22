import { NextSeo } from "next-seo";
import Head from "next/head";
import ReactHtmlParser from "html-react-parser";
import { useEffect, useState } from "react";
import { replaceSeoRM } from "@/utils/replaceSeoRM";

interface MetadataProps {
  slug?: string;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultCanonicalUrl?: string;
  defaultImage?: string;
}

export default function Metadata({
  slug,
  defaultTitle = "Du Lịch Việt Nam - Khám phá vẻ đẹp đất nước Việt Nam",
  defaultDescription = "Khám phá những địa điểm du lịch tuyệt vời tại Việt Nam: Vịnh Hạ Long, Phố cổ Hội An, Sapa, Phong Nha, Mũi Né và nhiều điểm đến hấp dẫn khác.",
  defaultCanonicalUrl = "https://dulichvietnam.example.com",
  defaultImage = "https://images.unsplash.com/photo-1528127269322-539801943592",
}: MetadataProps) {
  const [data, setHead] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_RMS_URL}/${slug}`;
        const res = await fetch(apiUrl);

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await res.json();
        console.log(result);

        setHead(result?.head || null);
      } catch (err) {
        console.error("Error:", err);
        setError("Có lỗi khi tải dữ liệu SEO");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  let metaTitle = defaultTitle;
  if (data?.head) {
    const ogTitleMatch = data.head.match(
      /<meta property="og:title" content="([^"]+)"/
    );
    if (ogTitleMatch && ogTitleMatch[1]) {
      metaTitle = ogTitleMatch[1];
    }
  }
  console.log("sos"+metaTitle);
  
 

  return (
    {}
  );
}
