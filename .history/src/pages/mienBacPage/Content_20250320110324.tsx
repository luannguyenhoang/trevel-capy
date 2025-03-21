"use client";

import { MienBacContent } from "@/type/types";
import { Container } from "@chakra-ui/react";
import DestinationGroup from "./DestinationGroup";
import SlideConten from "./Slide";

export default function Containers({ session2 }: { session2: MienBacContent }) {
  const groups = Object.keys(session2)
    .filter((key) => key.startsWith("nhom_"))
    .map((key) => session2[key as keyof MienBacContent]);

  return (
    <Container maxW={"7xl"}>
      {groups.map((group, index) => (
        <DestinationGroup index={index} key={index} group={group} />
      ))}
      <SlideConten group={s}/>
    </Container>
  );
}
