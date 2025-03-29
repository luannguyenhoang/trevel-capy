"use client";


export default function MetadataUpdater({ slug }: { slug?: any }) {
  useUpdateDocumentMetadata(slug);
  return null;
}
