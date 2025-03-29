"use client";

import { getPageMetadata } from "@/utils/getPageMetadata";


export default function MetadataUpdater({ slug }: { slug?: any }) {
  getPageMetadata(slug);
  return null;
}
