"use client";

import { useEffect } from 'react';

export default function MetadataUpdater({ slug }: { slug: string }) {
  useEffect(() => {
    if (!slug) return;

    async function updateMetadata() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_RMS_URL}/${slug}`);
        if (!res.ok) throw new Error('Failed to fetch');
        
        const data = await res.json();
        const pageData = data[0];

        if (pageData?.head) {
          // Tìm title từ thẻ title
          const titleTag = pageData.head.match(/<title>(.*?)<\/title>/);
          if (titleTag) {
            document.title = titleTag[1];
          } else {
            // Nếu không có thẻ title, tìm từ og:title
            const ogTitle = pageData.head.match(/<meta\s+property="og:title"\s+content="([^"]*)"/);
            if (ogTitle) {
              document.title = ogTitle[1];
            }
          }

          // Cập nhật các meta tags
          const parser = new DOMParser();
          const doc = parser.parseFromString(pageData.head, 'text/html');
          const metaTags = doc.getElementsByTagName('meta');

          // Xóa meta tags cũ
          const existingMetas = document.getElementsByTagName('meta');
          Array.from(existingMetas).forEach(meta => {
            const property = meta.getAttribute('property');
            if (property && (property.includes('og:') || property.includes('twitter:'))) {
              meta.remove();
            }
          });

          // Thêm meta tags mới
          Array.from(metaTags).forEach(meta => {
            const property = meta.getAttribute('property');
            if (property && (property.includes('og:') || property.includes('twitter:'))) {
              document.head.appendChild(meta.cloneNode(true));
            }
          });
        }
      } catch (error) {
        console.error('Error updating metadata:', error);
        // Set default title
        document.title = `${slug.charAt(0).toUpperCase() + slug.slice(1)} - Du lịch Việt Nam`;
      }
    }

    updateMetadata();
  }, [slug]);

  return null;
}