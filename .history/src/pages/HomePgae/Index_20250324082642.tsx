import { useEffect, useState } from "react";
import { Banner, Comment, Navbar, PackageTour, Source } from "@/type/types";
import Loading from "@/components/molecules/Loading";
import Metadata from "@/components/molecules/Metadata";
import { ScrollAnimation } from "@/components/molecules/ScrollAnimation";
import dynamic from "next/dynamic";

// Dynamic imports cho các component lớn
const BasicStatistics = dynamic(() => import("./Statistics"), {
  loading: () => <div className="h-40 flex items-center justify-center">Đang tải...</div>
});

const WithSpeechBubbles = dynamic(() => import("./Testimonials"), {
  loading: () => <div className="h-40 flex items-center justify-center">Đang tải...</div>
});

const SplitWithImage = dynamic(() => import("./Features"), {
  loading: () => <div className="h-40 flex items-center justify-center">Đang tải...</div>
});

const Pricing = dynamic(() => import("./Pricing"), {
  loading: () => <div className="h-40 flex items-center justify-center">Đang tải...</div>
});

const Containers = dynamic(() => import("./Container"), {
  loading: () => <div className="h-40 flex items-center justify-center">Đang tải...</div>
});

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
      <Metadata slug={data?.type}/>
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
        <Pricing session3={data?.acf.package_tour as PackageTour} />
      </ScrollAnimation>
    </>
  );
}
