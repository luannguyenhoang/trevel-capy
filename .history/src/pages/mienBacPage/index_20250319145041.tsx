import { ScrollAnimation } from "@/components/organisms/ScrollAnimation";
import BasicStatistics from "../HomePgae/Statistics";
import Metadata from "@/components/molecules/Metadata";

export default function MienBac() {
  return (
    <>
      {" "}
      <Metadata title="" />
      <ScrollAnimation delay={0.3}>
        <BasicStatistics />
      </ScrollAnimation>
    </>
  );
}
