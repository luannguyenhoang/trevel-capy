"use client";

import { MienBacContent, MienBacContentItem } from "@/type/types";
import { Box, Heading, Image, Container, Text } from "@chakra-ui/react";

// Component con để hiển thị cho mỗi nhóm

export default function Containers({ session2 }: { session2: MienBacContent }) {
  const groups = Object.keys(session2)
    .filter((key) => key.startsWith("nhom_"))
    .map((key) => session2[key as keyof MienBacContent]);

  return (
    <Container maxW={"7xl"}>
      {groups.map((group, index) => (
        <DestinationGroup key={index} group={group} />
      ))}
    </Container>
  );
}
