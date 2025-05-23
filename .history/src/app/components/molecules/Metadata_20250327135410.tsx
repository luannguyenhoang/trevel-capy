'use client';

import { useUpdateDocumentMetadata } from "@/utils/getPageMetadata";

interface MetadataProps {
  slug?: any;
}

export default function MetadataUpdater({ slug }: MetadataProps) {
  useUpdateDocumentMetadata(slug);
  
  // Component này không render gì
  return null;
}