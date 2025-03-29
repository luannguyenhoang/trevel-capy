'use client';

import { replaceSeoRM } from "@/utils/replaceSeoRM";
import { useEffect } from "react";

interface MetadataProps {
  slug?: any;
}

export default function MetadataExtras({ slug }: MetadataProps) {
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
        
        if (result?.head) {
          // Phân tích head từ API và thêm các thẻ meta vào document head
          const headContent = replaceSeoRM(result.head);
          const parser = new DOMParser();
          const doc = parser.parseFromString(headContent, 'text/html');
          
          // Lấy tất cả các thẻ meta từ dữ liệu API
          const metaTags = doc.querySelectorAll('meta');
          
          // Thêm vào head của document
          metaTags.forEach(tag => {
            const existingTag = document.querySelector(`meta[property="${tag.getAttribute('property')}"]`);
            if (existingTag) {
              existingTag.remove();
            }
            document.head.appendChild(tag);
          });
        }
      } catch (err) {
        console.error("Error fetching metadata:", err);
      }
    }

    fetchData();
    
    // Cleanup khi component unmount
    return () => {
      // Có thể xóa các meta tags đã thêm nếu cần
    };
  }, [slug]);

  return null; // Component này không render gì cả
}
