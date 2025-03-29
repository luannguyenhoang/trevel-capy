import { replaceSeoRM } from "@/utils/replaceSeoRM";
import ReactHtmlParser from "html-react-parser";

export async function getMetadata(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_RMS_URL}/${slug}`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch metadata');
    }

    const data = await res.json();
    return ReactHtmlParser(replaceSeoRM(data.head));
    
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}