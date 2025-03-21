import { ScrollAnimation } from "@/components/organisms/ScrollAnimation";
import Metadata from "@/components/molecules/Metadata";
import { Box } from "@chakra-ui/react";
import SplitWithImage from "../HomePgae/Features";

export default function MienBac() {
  return (
    <Carousel/>
      <ScrollAnimation delay={0.3}>
        <SplitWithImage  />
      </ScrollAnimation>
  );
}
