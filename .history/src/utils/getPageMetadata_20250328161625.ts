import { replaceSeoRM } from "@/utils/replaceSeoRM";
import { Metadata } from 'next';

export async function getMetadata(slug: string): Promise<Metadata> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_RMS_URL}/${slug}`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch metadata');
    }

    const data = await res.json();
    const processedHead = replaceSeoRM(data.head);
    const getTitleFromMeta = (head: string) => {
      const match = head.match(/<meta\s+property="og:title"\s+content="([^"]*)"/);
      return match ? match[1] : null;
    };
    const ogTitleContent = data ? getTitleFromMeta(data) : null;
    

    return {
      title: ogTitleContent,
      other: {
        custom: processedHead,
      },
    };
  } catch (error) {
   
  }
}