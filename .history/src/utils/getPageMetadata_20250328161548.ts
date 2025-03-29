import { replaceSeoRM } from "@/utils/replaceSeoRM";
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
    const processedHead = replaceSeoRM(data.head);
    
    

    return {
      title: data.title || 'Du Lịch Việt Nam',
      other: {
        custom: processedHead,
      },
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      title: 'Du Lịch Việt Nam'
    };
  }
}