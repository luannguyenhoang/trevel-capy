"use client";

import { MienBacContent } from "@/type/types";
import { Box, Container } from "@chakra-ui/react";
import DestinationGroup from "../../pages/mienBacPage/DestinationGroup";
import SlideConten from "../molecules/Slide";

export default function Containers({
  session2,
  slug,
}: {
  session2: MienBacContent;
  slug: any;
}) {
  const groups = Object.keys(session2).map(
    (key) => session2[key as keyof MienBacContent]
  );

  return (
    <Container
      maxW={"7xl"}
      display="flex"
      gap="30px"
      flexDirection={{ base: "column", sm: "row" }}
      justifyContent="space-between"
    >
      <Box flex={6}>
        {groups.map((group, index) => (
          <DestinationGroup index={index} key={index} group={group} />
        ))}
      </Box>
      <Box
        flex={2}
        mt={"20"}
        position={{ base: "static", lg: "sticky" }}
        top={{ lg: "16" }}
        alignSelf="flex-start"
        height="fit-content"
        display={{ base: "none", md: "block" }}
      >
        <SlideConten slug={slug} />
      </Box>
    </Container>
  );
}
