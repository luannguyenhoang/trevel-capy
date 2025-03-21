import { ScrollAnimation } from "@/components/organisms/ScrollAnimation";
import BasicStatistics from "../HomePgae/Statistics";

export default function MienBac() {
  return (
    <Me/>
    <ScrollAnimation delay={0.3}>
      <BasicStatistics />
    </ScrollAnimation>
  );
}
