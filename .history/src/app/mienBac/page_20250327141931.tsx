"use client";
import { MienBacContent, Source, TitlesMienBac } from "@/type/types";
import { useEffect, useState, Suspense } from "react";
import Containers from "../components/organisms/Content";
import Loading from "../components/molecules/Loading";
import { ScrollAnimation } from "../components/molecules/ScrollAnimation";
import Titles from "../components/molecules/Title";
import MetadataUpdater from "../components/molecules/Metadata";

export default function MienBac() {
  const [data, setData] = useState<Source | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let controller = new AbortController();

    async function fetchData() {
      try {
        const res = await fetch("/api/mienBac", {
          signal: controller.signal
        });
        if (!res.ok) {
          throw new Error("error");
        }
        const result = await res.json();
        
        if (isMounted) {
          setData(result[0]);
          setLoading(false);
        }
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== 'AbortError' && isMounted) {
          console.error("Error:", error);
          setError("Có lỗi");
          setLoading(false);
        }
      }
    }

    fetchData();
    
    // Smooth scroll after data loading, not during cleanup
    if (isMounted && !loading && data) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error || !data) {
    return <div>{error || "Không có dữ liệu"}</div>;
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="page-wrapper">
        {data.type && <MetadataUpdater slug={data.type} />}
        <ScrollAnimation delay={0.2}>
          <Titles session1={data.acf.title as TitlesMienBac} />
        </ScrollAnimation>
        <Containers
          slug={data.type}
          session2={data.acf.mien_bac_content as MienBacContent}
        />
      </div>
    </Suspense>
  );
}
