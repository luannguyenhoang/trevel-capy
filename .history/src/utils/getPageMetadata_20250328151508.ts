import { Metadata } from 'next';

export async function getMetadata(slug: string): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_RMS_URL}/${slug}`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch metadata');
    }

    const data = await res.json();
    
    const getTitleFromMeta = (head: string) => {
      const match = head.match(/<meta\s+property="og:title"\s+content="([^"]*)"/);
      return match ? match[1] : null;
    };

    const getDescriptionFromMeta = (head: string) => {
      const match = head.match(/<meta\s+property="og:description"\s+content="([^"]*)"/);
      return match ? match[1] : null;
    };

    const title = getTitleFromMeta(data.head) || 'Du Lịch Việt Nam';
    const description = getDescriptionFromMeta(data.head) || 'Khám phá vẻ đẹp Việt Nam';

    return {
      title,
      description,
      openGraph: {
        title,
        description,
      }
    };
  } catch (error) {
    console.error('Error in getMetadata:', error);
    return {
      title: 'Du Lịch Việt Nam',
      description: 'Khám phá vẻ đẹp Việt Nam'
    };
  }
}