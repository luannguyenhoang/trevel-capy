import { NextSeo } from "next-seo";

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
  import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'error' });
  }

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/mien-bac`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ 
      message: "Có lỗi",
      error: error instanceof Error ? error.message : 'error'
    });
  }
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
