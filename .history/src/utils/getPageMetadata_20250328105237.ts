""
import { Metadata } from "next";

export async function getPageMetadata(slug: string): Promise<Metadata> {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_RMS_URL}/${slug}`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch metadata for ${slug}`);
      }
  
      const data = await res.json();
      console.log(data);
      
      const pageData = data[0];
  
      let defaultTitle = `${
        slug.charAt(0).toUpperCase() + slug.slice(1)
      } - Du lịch Việt Nam`;
      let defaultDescription = `Khám phá vẻ đẹp ${slug} Việt Nam`;
  
      let title = defaultTitle;
      let description = defaultDescription;
  
      if (pageData?.head) {
        const titleMatch = pageData.head.match(
          /<meta\s+property="og:title"\s+content="([^"]*)"/
        );
        if (titleMatch) title = titleMatch[1];
  
        const descMatch = pageData.head.match(
          /<meta\s+property="og:description"\s+content="([^"]*)"/
        );
        if (descMatch) description = descMatch[1];
      }
  
      return {
        title,
        description,
      };
    } catch (error) {
      console.error(`Error generating metadata for ${slug}:`, error);
      return {
        title: `${
          slug.charAt(0).toUpperCase() + slug.slice(1)
        } - Du lịch Việt Nam`,
        description: `Khám phá vẻ đẹp ${slug} Việt Nam`,
      };
    }
  }
  