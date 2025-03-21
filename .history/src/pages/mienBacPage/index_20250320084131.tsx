import { ScrollAnimation } from "@/components/organisms/ScrollAnimation";
import Metadata from "@/components/molecules/Metadata";
import { Box } from "@chakra-ui/react";
import SplitWithImage from "../HomePgae/Features";
import Carousel from "./Carousels";

export default function MienBac() {
  return (
    <>
      <Metadata
        title="Du lịch Miền Bắc Việt Nam | Khám phá Sapa, Hạ Long, Hà Giang"
       
      />
      <Carousel />
      <ScrollAnimation delay={0.3}>
        <SplitWithImage />
      </ScrollAnimation>
    </>
  );
}
