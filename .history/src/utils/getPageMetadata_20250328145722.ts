import { replaceSeoRM } from "@/utils/replaceSeoRM";
import { Metadata } from 'next';

export async function getMetadata(slug: string): Promise<Metadata> {
  try {
    console.log('Fetching metadata for slug:', slug);
    const apiUrl = `${process.env.NEXT_PUBLIC_API_RMS_URL}/${slug}`;
    console.log('API URL:', apiUrl);

    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch metadata: ${res.status}`);
    }

    const data = await res.json();
    console.log('Raw metadata:', data);

    const processedHead = replaceSeoRM(data.head);
    console.log('Processed metadata:', processedHead);
    
    return {
      title: data.title || 'Du Lịch Việt Nam',
      other: {
        custom: processedHead,
      },
    };
  } catch (error) {
    console.error('Error in getMetadata:', error);
    return {
      title: 'Du Lịch Việt Nam'
    };
  }
}