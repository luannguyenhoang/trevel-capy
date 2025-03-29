"use client";

import { useUpdateDocumentMetadata } from "@/utils/getPageMetadata";


export default function MetadataUpdater({ slug }: any) {
  useUpdateDocumentMetadata(slug);
}
