import { ScrollAnimation } from "@/components/organisms/ScrollAnimation";
import Metadata from "@/components/molecules/Metadata";
import { Box } from "@chakra-ui/react";

export default function MienBac() {
  return (
    <Box min>
      <Metadata title="Du lịch Miền Bắc Việt Nam | Khám phá Sapa, Hạ Long, Hà Giang" />
      <ScrollAnimation delay={0.3}>sssss </ScrollAnimation>
    </Box>
  );
}
