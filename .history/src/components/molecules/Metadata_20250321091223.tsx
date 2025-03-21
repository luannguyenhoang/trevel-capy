import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

interface MetadataProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export default function Metadata({
  title = "Du Lịch Việt Nam - Khám phá vẻ đẹp đất nước Việt Nam",
  description = "Khám phá những địa điểm du lịch tuyệt vời tại Việt Nam: Vịnh Hạ Long, Phố cổ Hội An, Sapa, Phong Nha, Mũi Né và nhiều điểm đến hấp dẫn khác.",
  canonicalUrl = "https://dulichvietnam.example.com",
  ogImage = "https://images.unsplash.com/photo-1528127269322-539801943592",
  
}: MetadataProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_RMS_URL}/${slug}`;
        const res = await fetch(apiUrl);
        
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Error:", err);
        setError("Có lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={canonicalUrl}
      openGraph={{
        url: canonicalUrl,
        title: title,
        description: description,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: "Du lịch Việt Nam",
          },
        ],
        site_name: "Du Lịch Việt Nam",
      }}
      twitter={{
        handle: "@dulichvietnam",
        site: "@dulichvietnam",
        cardType: "summary_large_image",
      }}
      additionalMetaTags={[
        {
          name: "keywords",
          content:
            "du lịch Việt Nam, Hạ Long, Hội An, Sapa, Phong Nha, Mũi Né, đặt tour du lịch",
        },
      ]}
    />
  );
}
