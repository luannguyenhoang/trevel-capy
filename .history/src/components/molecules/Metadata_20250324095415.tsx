import { replaceSeoRM } from "@/utils/replaceSeoRM";
import ReactHtmlParser from "html-react-parser";
import Head from "next/head";
import { useEffect, useState } from "react";

interface MetadataProps {
  slug?: any;
}

export default function Metadata({ slug }: MetadataProps) {
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
        setError("Có lỗi");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  const getTitleFromMeta = (head: string) => {
    const match = head.match(/<meta\s+property="og:title"\s+content="([^"]*)"/);
    return match ? match[1] : null;
  };
  const ogTitleContent = data ? getTitleFromMeta(data) : null;

  if (!data) {
    return <>Loi</>;
  }
  return (
    <Head>
      <title>{ogTitleContent}</title>
      {ReactHtmlParser(replaceSeoRM(data))}
    </Head>
  );
}
