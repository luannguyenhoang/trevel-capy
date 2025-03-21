import { ScrollAnimation } from "@/components/organisms/ScrollAnimation";
import Metadata from "@/components/molecules/Metadata";
import SplitWithImage from "../HomePgae/Features";
import Carousel from "./Carousels";

export default function MienBac() {
  return (
    <>
      <Carousel />
      <ScrollAnimation delay={0.3}>
        <SplitWithImage />
      </ScrollAnimation>
    </>
  );
}
