import { useEffect, useState } from "react";
import { Banner, Comment, Navbar, PackageTour, Source,  } from "@/type/types";
import { ScrollAnimation } from "@/components/organisms/ScrollAnimation";
import BasicStatistics from "./Statistics";
import Loading from "@/components/molecules/Loading";
import WithSpeechBubbles from "./Testimonials";
import SplitWithImage from "./Features";
import Pricing from "./Pricing";
import Containers from "./Container";

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
    <Me></Me>
      <ScrollAnimation delay={0.3}>
        <Containers session1={data?.acf.navbar as Navbar} />
      </ScrollAnimation>
      
      <ScrollAnimation delay={0.3}>
        <BasicStatistics session4={data?.acf.banner as Banner}/>
      </ScrollAnimation>

      <ScrollAnimation delay={0.3}>
        <WithSpeechBubbles session2={data?.acf.comment as Comment} />
      </ScrollAnimation>

      <ScrollAnimation delay={0.3}>
        <SplitWithImage  />
      </ScrollAnimation>

      <ScrollAnimation delay={0.3}>
        <Pricing session3={data?.acf.package_tour as PackageTour} />
      </ScrollAnimation>
    </>
  );
}
