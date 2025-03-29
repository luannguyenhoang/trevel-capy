import { Metadata } from "next";
import { replaceSeoRM } from "./replaceSeoRM";

export async function getMetadata(slug: string): Promise<Metadata> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_RMS_URL}/${slug}`, {
      next: { revalidate: 3600 },
    });

    const data = await res.json();

    const processedHead = replaceSeoRM(data.head);

    const getTitleFromMeta = (head: any) => {
      const match = head.match(
        /<meta\s+property="og:title"\s+content="([^"]*)"/
      );
      return match ? match[1] : null;
    };

    const getDescriptionFromMeta = (head: any) => {
      const match = head.match(
        /<meta\s+property="og:description"\s+content="([^"]*)"/
      );
      return match ? match[1] : null;
    };

    const title = getTitleFromMeta(processedHead);
    const description = getDescriptionFromMeta(processedHead);

    return {
      title,
      description,
    };
}
