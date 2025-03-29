"use client";
import { Banner, Comment, Navbar, Source } from "@/type/types";
import { useEffect, useState } from "react";
import Containers from "./Container";
import SplitWithImage from "./Features";
import Pricing from "./Pricing";
import BasicStatistics from "./Statistics";
import WithSpeechBubbles from "./Testimonials";
import Loading from "../components/molecules/Loading";
import Metadata from "../components/molecules/Metadata";
import { ScrollAnimation } from "../components/molecules/ScrollAnimation";

export default function TrangChu() {
  const [data, setData] = useState<Source>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/trangChu");
        if (!res.ok) {
          throw new Error("error");
        }
        const result = await res.json();
        setData(result[0]);
      } catch (err) {
        console.error("Error:", err);
        setError("Có lỗi");
      } finally {
        setLoading(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Metadata slug={data?.type} />
      <ScrollAnimation delay={0.3}>
        <Containers session1={data?.acf.navbar as Navbar} />
      </ScrollAnimation>

      <ScrollAnimation delay={0.3}>
        <BasicStatistics session4={data?.acf.banner as Banner} />
      </ScrollAnimation>

      <ScrollAnimation delay={0.3}>
        <WithSpeechBubbles session2={data?.acf.comment as Comment} />
      </ScrollAnimation>

      <ScrollAnimation delay={0.3}>
        <SplitWithImage />
      </ScrollAnimation>

      <ScrollAnimation delay={0.3}>
        <Pricing />
      </ScrollAnimation>
    </>
  );
}
