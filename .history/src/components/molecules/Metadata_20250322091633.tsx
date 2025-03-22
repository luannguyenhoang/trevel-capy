import { NextSeo } from "next-seo";
import Head from "next/head";
import ReactHtmlParser from "html-react-parser";
import { replaceSeoRM } from "./t";

interface MetadataProps {
  head: string | null;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultCanonicalUrl?: string;
  defaultImage?: string;
}

export default function Metadata({
  head,
  defaultTitle = "Du Lịch Việt Nam - Khám phá vẻ đẹp đất nước Việt Nam",
  defaultDescription = "Khám phá những địa điểm du lịch tuyệt vời tại Việt Nam: Vịnh Hạ Long, Phố cổ Hội An, Sapa, Phong Nha, Mũi Né và nhiều điểm đến hấp dẫn khác.",
  defaultCanonicalUrl = "https://dulichvietnam.example.com",
  defaultImage = "https://images.unsplash.com/photo-1528127269322-539801943592",
}: MetadataProps) {
  const getTitleFromMeta = (head: string) => {
    const match = head.match(/<meta\s+property="og:title"\s+content="([^"]*)"/);
    return match ? match[1] : null;
  };
  
  const ogTitleContent = head ? getTitleFromMeta(head) : null;

  if (head) {
    return (
      <div>
        <Head>
          {ReactHtmlParser(replaceSeoRM(head))}
          {ogTitleContent && <title>{ogTitleContent}</title>}
        </Head>
      </div>
    );
  }

  return (
    <NextSeo
      title={defaultTitle}
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
