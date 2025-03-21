import { ScrollAnimation } from "@/components/organisms/ScrollAnimation";
import Metadata from "@/components/molecules/Metadata";
import { Box } from "@chakra-ui/react";
import CaptionCarousel from "./Carousels";
import SplitWithImage from "../HomePgae/Features";

export default function MienBac() {
  return (
    <Box minH={"100vh"}>
      <Metadata title="Du lịch Miền Bắc Việt Nam | Khám phá Sapa, Hạ Long, Hà Giang" />
      <ScrollAnimation delay={0.3}><CaptionCarousel></ScrollAnimation>
      <ScrollAnimation delay={0.3}>
        <SplitWithImage  />
      </ScrollAnimation>
    </Box>
  );
}
