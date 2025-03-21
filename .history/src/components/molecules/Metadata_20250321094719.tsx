import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

interface MetadataProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  image?: string;
  slug?: string;
}

export default function Metadata({
  title = "Du Lịch Việt Nam - Khám phá vẻ đẹp đất nước Việt Nam",
  description = "Khám phá những địa điểm du lịch tuyệt vời tại Việt Nam: Vịnh Hạ Long, Phố cổ Hội An, Sapa, Phong Nha, Mũi Né và nhiều điểm đến hấp dẫn khác.",
  canonicalUrl = "https://dulichvietnam.example.com",
  image = "https://images.unsplash.com/photo-1528127269322-539801943592",
  slug,
}: MetadataProps) {
  const [data, setData] = useState<any>(null);
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
        setData(result);
      } catch (err) {
        console.error("Error:", err);
        setError("Có lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Trích xuất thông tin SEO từ head nếu là mảng
  let metaTitle = title;
  let metaDescription = description;
  let metaImage = image;
  let metaCanonical = canonicalUrl;
  let metaRobots = "index, follow";

  if (data?.head && Array.isArray(data.head)) {
    // Xử lý tiêu đề
    const ogTitle = data.head.find(tag => tag.includes('property="og:title"'));
    if (ogTitle) {
      const match = ogTitle.match(/content="([^"]+)"/);
      if (match && match[1]) {
        metaTitle = match[1];
      }
    }

    // Xử lý mô tả
    const ogDescription = data.head.find(tag => tag.includes('property="og:description"'));
    if (ogDescription) {
      const match = ogDescription.match(/content="([^"]+)"/);
      if (match && match[1]) {
        metaDescription = match[1];
      }
    }

    // Xử lý URL
    const ogUrl = data.head.find(tag => tag.includes('property="og:url"'));
    if (ogUrl) {
      const match = ogUrl.match(/content="([^"]+)"/);
      if (match && match[1]) {
        metaCanonical = match[1];
      }
    }

    // Xử lý hình ảnh
    const ogImage = data.head.find(tag => tag.includes('property="og:image"'));
    if (ogImage) {
      const match = ogImage.match(/content="([^"]+)"/);
      if (match && match[1]) {
        metaImage = match[1];
      }
    }

    // Xử lý robots
    const robots = data.head.find(tag => tag.includes('name="robots"'));
    if (robots) {
      const match = robots.match(/content="([^"]+)"/);
      if (match && match[1]) {
        metaRobots = match[1];
      }
    }
  }

  return (
    <NextSeo
      title={metaTitle}
      description={metaDescription}
      canonical={metaCanonical}
      noindex={metaRobots.includes("noindex")}
      nofollow={metaRobots.includes("nofollow")}
      openGraph={{
        url: metaCanonical,
        title: metaTitle,
        description: metaDescription,
        images: [
          {
            url: metaImage,
            width: 1200,
            height: 630,
            alt: "Du lịch Việt Nam",
          },
        ],
        siteName: "Du Lịch Việt Nam",
      }}
      twitter={{
        handle: "@dulichvietnam",
        site: "@dulichvietnam",
        cardType: "summary_large_image",
      }}
      additionalMetaTags={[
        {
          name: "keywords",
          content: "du lịch Việt Nam, Hạ Long, Hội An, Sapa, Phong Nha, Mũi Né, đặt tour du lịch",
        },
      ]}
    />
  );
}
