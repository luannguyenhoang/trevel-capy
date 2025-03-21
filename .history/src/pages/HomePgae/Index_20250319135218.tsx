import { useEffect, useState } from "react";
import { Comment, Navbar, PackageTour, source } from "@/type/types";
import { ScrollAnimation } from "@/components/organisms/ScrollAnimation";
import Loading from "@/components/molecules/loading";
import Metadata from "@/components/molecules/metadata";
import WithSpeechBubbles from "./testimonials";
import Containers from "./container";
import SplitWithImage from "./features";
import Pricing from "./pricing";

export default function TrangChu() {
  const [data, setData] = useState<source>();
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
      <Metadata title="Du Lịch Việt Nam - Khám phá vẻ đẹp đất nước Việt Nam" />
      <ScrollAnimation>
        <Containers session1={data?.acf.navbar as Navbar} />
      </ScrollAnimation>

      <ScrollAnimation delay={0.3}>
        <WithSpeechBubbles session2={data?.acf.comment as Comment} />
      </ScrollAnimation>
      <ScrollAnimation delay={0.3}>
        <BasicStatistics/>
      </ScrollAnimation>

      <ScrollAnimation delay={0.3}>
        <SplitWithImage session3={data?.acf.navbar as Navbar} />
      </ScrollAnimation>

      <ScrollAnimation delay={0.3}>
        <Pricing session4={data?.acf.package_tour as PackageTour} />
      </ScrollAnimation>
    </>
  );
}
