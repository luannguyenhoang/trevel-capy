import { Image } from "@chakra-ui/react";
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
        return; // Nếu không có slug, dùng giá trị mặc định
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
  }, [slug]); // Thêm slug vào dependency array để fetch lại khi slug thay đổi

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  let metaTitle = title;
  if (data?.head) {
    const ogTitleMatch = data.head.match(
      /<meta property="og:title" content="([^"]+)"/
    );
    if (ogTitleMatch && ogTitleMatch[1]) {
      metaTitle = ogTitleMatch[1];
    }
  }
  let metaDescription = description;
  if (data?.head) {
    const ogTitleMatch = data.head.match(
      /<meta property="og:description" content="([^"]+)"/
    );
    if (ogTitleMatch && ogTitleMatch[1]) {
      metaDescription = ogTitleMatch[1];
    }
  }
  let metaImage = image;
  if (data?.head) {
    const ogTitleMatch = data.head.match(
      /<meta property="og:image" content="([^"]+)"/
    );
    if (ogTitleMatch && ogTitleMatch[1]) {
      metaImage = ogTitleMatch[1];
    }
  }
  let metaCanonical = description;
  if (data?.head) {
    const ogTitleMatch = data.head.match(
      /<meta property="og:description" content="([^"]+)"/
    );
    if (ogTitleMatch && ogTitleMatch[1]) {
      metaCanonical = ogTitleMatch[1];
    }
  }

  let metaRobots = "index, follow";
  if (data?.head) {
    const robotsMatch = data.head.match(
      /<meta name="robots" content="([^"]+)"/
    );
    if (robotsMatch && robotsMatch[1]) {
      metaRobots = robotsMatch[1];
    }
  }

  let twitterCard = "summary_large_image";
  if (data?.head) {
    const twitterCardMatch = data.head.match(
      /<meta name="twitter:card" content="([^"]+)"/
    );
    if (twitterCardMatch && twitterCardMatch[1]) {
      twitterCard = twitterCardMatch[1];
    }
  }

  let twitterTitle = metaTitle;
  if (data?.head) {
    const twitterTitleMatch = data.head.match(
      /<meta name="twitter:title" content="([^"]+)"/
    );
    if (twitterTitleMatch && twitterTitleMatch[1]) {
      twitterTitle = twitterTitleMatch[1];
    }
  }

  let twitterDescription = metaDescription;
  if (data?.head) {
    const twitterDescMatch = data.head.match(
      /<meta name="twitter:description" content="([^"]+)"/
    );
    if (twitterDescMatch && twitterDescMatch[1]) {
      twitterDescription = twitterDescMatch[1];
    }
  }

  let twitterImage = metaImage;
  if (data?.head) {
    const twitterImageMatch = data.head.match(
      /<meta name="twitter:image" content="([^"]+)"/
    );
    if (twitterImageMatch && twitterImageMatch[1]) {
      twitterImage = twitterImageMatch[1];
    }
  }

  let keywords =
    "du lịch Việt Nam, Hạ Long, Hội An, Sapa, Phong Nha, Mũi Né, đặt tour du lịch";
  if (data?.head) {
    const keywordsMatch = data.head.match(
      /<meta name="keywords" content="([^"]+)"/
    );
    if (keywordsMatch && keywordsMatch[1]) {
      keywords = keywordsMatch[1];
    }
  }

  return (
    <>
      {" "}
      <NextSeo
        title={metaTitle}
        description={metaDescription}
        canonical={canonicalUrl}
        noindex={metaRobots.includes("noindex")}
        nofollow={metaRobots.includes("nofollow")}
        openGraph={{
          url: canonicalUrl,
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
          locale: "vi_VN",
          type: "article",
        }}
        twitter={{
          handle: "@dulichvietnam",
          site: "@dulichvietnam",
          cardType: twitterCard,
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content: keywords,
          },
          {
            name: "twitter:title",
            content: twitterTitle,
          },
          {
            name: "twitter:description",
            content: twitterDescription,
          },
          {
            name: "twitter:image",
            content: twitterImage,
          },
        ]}
      />{" "}
      <NextSeo
        title={metaTitle}
        description={metaDescription}
        canonical={canonicalUrl}
        noindex={metaRobots.includes("noindex")}
        nofollow={metaRobots.includes("nofollow")}
        openGraph={{
          url: canonicalUrl,
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
          locale: "vi_VN",
          type: "article",
        }}
        twitter={{
          handle: "@dulichvietnam",
          site: "@dulichvietnam",
          cardType: twitterCard,
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content: keywords,
          },
          {
            name: "twitter:title",
            content: twitterTitle,
          },
          {
            name: "twitter:description",
            content: twitterDescription,
          },
          {
            name: "twitter:image",
            content: twitterImage,
          },
        ]}
      />
      <div>{twitterCard} </div>
      <Image src={metaImage}/>
    </>
  );
}
