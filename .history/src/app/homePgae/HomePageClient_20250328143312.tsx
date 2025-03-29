"use client";
import { Banner, Comment, Navbar, Source } from "@/type/types";
import { ScrollAnimation } from "../components/molecules/ScrollAnimation";
import Containers from "./Container";
import SplitWithImage from "./Features";
import Pricing from "./Pricing";
import BasicStatistics from "./Statistics";
import WithSpeechBubbles from "./Testimonials";

export default function HomePageClient({ initialData }: { initialData: Source }) {
  return (
    <>
      <ScrollAnimation delay={0.3}>
        <Containers session1={initialData?..navbar as Navbar} />
      </ScrollAnimation>

      <ScrollAnimation delay={0.3}>
        <BasicStatistics session4={initialData?.acf.banner as Banner} />
      </ScrollAnimation>

      <ScrollAnimation delay={0.3}>
        <WithSpeechBubbles session2={initialData?.acf.comment as Comment} />
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