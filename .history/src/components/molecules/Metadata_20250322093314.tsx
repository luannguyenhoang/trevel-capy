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
  const [head, setHead] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  let metaTitle = defaultTitle;
  if (data?.head) {
    const ogTitleMatch = data.head.match(
      /<meta property="og:title" content="([^"]+)"/
    );
    if (ogTitleMatch && ogTitleMatch[1]) {
      metaTitle = ogTitleMatch[1];
    }
  }
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

  if (head) {
    return <Head>{ReactHtmlParser(replaceSeoRM(head))}</Head>;
  }

  return (
    <NextSeo
      title={ogTitleContent}
      description={defaultDescription}
      canonical={defaultCanonicalUrl}
      openGraph={{
        url: defaultCanonicalUrl,
        title: defaultTitle,
        description: defaultDescription,
        images: [
          {
            url: defaultImage,
            width: 1200,
            height: 630,
            alt: "Du lịch Việt Nam",
          },
        ],
        siteName: "Du Lịch Việt Nam",
        locale: "vi_VN",
        type: "article",
      }}
      twitter={{
        handle: "@dulichvietnam",
        site: "@dulichvietnam",
        cardType: "summary_large_image",
      }}
    />
  );
}
