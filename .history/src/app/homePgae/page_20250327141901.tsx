"use client";
import { Banner, Comment, Navbar, Source } from "@/type/types";
import { useEffect, useState, Suspense } from "react";
import Containers from "./Container";
import SplitWithImage from "./Features";
import Pricing from "./Pricing";
import BasicStatistics from "./Statistics";
import WithSpeechBubbles from "./Testimonials";
import Loading from "../components/molecules/Loading";
import { ScrollAnimation } from "../components/molecules/ScrollAnimation";

export default function TrangChu() {
  const [data, setData] = useState<Source | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let controller = new AbortController();

    async function fetchData() {
      try {
        const res = await fetch("/api/trangChu", {
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
      } catch (err) {
        if (err.name !== 'AbortError' && isMounted) {
          console.error("Error:", err);
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
        <ScrollAnimation delay={0.2}>
          <Containers session1={data.acf.navbar as Navbar} />
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <BasicStatistics session4={data.acf.banner as Banner} />
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <WithSpeechBubbles session2={data.acf.comment as Comment} />
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <SplitWithImage />
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <Pricing />
        </ScrollAnimation>
      </div>
    </Suspense>
  );
}
