import { MienBacContentItem } from "@/type/types";
import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function SlideConten({
  group,
}: {
  group: MienBacContentItem;
}) {
  return (
    <Box display="flex" mb={6} borderColor="gray.200" pb={4}>
     <Link></Link>
    </Box>
  );
}
