"use client";

import { useUpdateDocumentMetadata } from "@/utils/getPageMetadata";

export default function MetadataUpdater({ slug }:{slug:any}) {
  useUpdateDocumentMetadata(slug);
  return null;
}
