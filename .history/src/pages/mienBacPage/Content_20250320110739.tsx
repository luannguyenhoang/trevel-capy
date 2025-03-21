"use client";

import { MienBacContent } from "@/type/types";
import { Box, Container } from "@chakra-ui/react";
import DestinationGroup from "./DestinationGroup";
import SlideConten from "./Slide";

export default function Containers({ session2 }: { session2: MienBacContent }) {
  const groups = Object.keys(session2)
    .filter((key) => key.startsWith("nhom_"))
    .map((key) => session2[key as keyof MienBacContent]);

  return (
    <Container
      maxW={"7xl"}
      display="flex"
      gap
      gap="30px"
      flexDirection={{ base: "column", sm: "row" }}
      justifyContent="space-between"
    >
      <Box flex={5}>
        {groups.map((group, index) => (
          <DestinationGroup index={index} key={index} group={group} />
        ))}
      </Box>
      <Box flex={3} mt={"20"}>
        <SlideConten group={session2.nhom_1} />
      </Box>
    </Container>
  );
}
