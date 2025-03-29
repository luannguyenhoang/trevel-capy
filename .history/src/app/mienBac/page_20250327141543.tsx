"use client";
import { MienBacContent, Source, TitlesMienBac } from "@/type/types";
import { useEffect, useState } from "react";
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
    
    async function fetchData() {
      try {
        const res = await fetch("/api/mienBac");
        if (!res.ok) {
          throw new Error("error");
        }
        const result = await res.json();
        
        if (isMounted) {
          setData(result[0]);
          setLoading(false);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      } catch (err) {
        console.error("Error:", err);
        if (isMounted) {
          setError("Có lỗi");
          setLoading(false);
        }
      }
    }

    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error || !data) {
    return <div>{error || "Không có dữ liệu"}</div>;
  }

  return (
    <>
      {data.type && <MetadataUpdater slug={data.type} />}
      <ScrollAnimation delay={0.3}>
        <Titles session1={data.acf.title as TitlesMienBac} />
      </ScrollAnimation>
      <Containers
        slug={data.type}
        session2={data.acf.mien_bac_content as MienBacContent}
      />
    </>
  );
}
