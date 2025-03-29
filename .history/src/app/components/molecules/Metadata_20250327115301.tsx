import { replaceSeoRM } from "@/utils/replaceSeoRM";
import ReactHtmlParser from "html-react-parser";
import Head from "next/head";
import { useEffect, useState } from "react";

interface MetadataProps {
  slug?: any;
}

export default function Metadata({ slug }: MetadataProps) {
  const [data, setHead] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      if (!slug) {
        return;
      }
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_RMS_URL}/${slug}`;
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        setHead(result?.head || null);
      } catch (err) {}
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
    <Next>
      <title>{ogTitleContent}</title>
      {ReactHtmlParser(replaceSeoRM(data))}
    </Next>
  );
}
