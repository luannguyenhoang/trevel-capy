"use client";

import { useEffect, useState } from "react";
import { getPageMetadata } from "@/utils/getPageMetadata";
import Head from "next/head";

export default function MetadataUpdater({ slug }: { slug?: any }) {
  const [metadata, setMetadata] = useState<{ title: string; description: string } | null>(null);

  useEffect(() => {
    async function fetchMetadata() {
      if (slug) {
        const data = await getPageMetadata(slug);
        setMetadata(data);
      }
    }
    fetchMetadata();
  }, [slug]);

  return (
    <>
      {metadata && (
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </Head>
      )}
    </>
  );
}