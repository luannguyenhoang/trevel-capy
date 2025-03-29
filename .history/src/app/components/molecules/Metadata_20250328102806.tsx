"use client";

import { getPageMetadata } from "@/utils/getPageMetadata";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function MetadataUpdater({ slug }: { slug?: string }) {
  const [metadata, setMetadata] = useState<{ title: string; description: string } | null>(null);

  useEffect(() => {
    if (!slug) return;
    
    async function updateMetadata() {
      const meta = await getPageMetadata(slug);
      setMetadata(meta);
    }
    
    updateMetadata();
  }, [slug]);

  if (!metadata) return null;

  return (
    <Head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
    </Head>
  );
}