'use client';
import { useUpdateDocumentMetadata } from '@/utils/metadata-helper';

interface MetadataProps {
  slug?: any;
}

export default function MetadataUpdater({ slug }: MetadataProps) {
  // Hook sẽ tự động cập nhật metadata khi component mount
  useUpdateDocumentMetadata(slug);
  
  // Component này không render gì
  return null;
}