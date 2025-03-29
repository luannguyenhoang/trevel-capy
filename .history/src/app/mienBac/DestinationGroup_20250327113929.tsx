"use client";
import { MienBacContentItem } from "@/type/types";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { ScrollAnimation } from "../components/molecules/ScrollAnimation";

export default function DestinationGroup({
  group,
  index,
}: {
  group: MienBacContentItem;
  index: number;
}) {
  return (
    <ScrollAnimation delay={0.3}>
      <Box>
        <Box position="relative" alignItems="center" marginTop="5%">
          <Box>
            <Heading as="h1" size={"md"} marginBottom="2%">
              {/* them so thu tu */}
              {index + 1}. {group.dia_diem}
            </Heading>
            <Box
              width={{ base: "100%", sm: "100%" }}
              display={"flex"}
              justifyContent={"center"}
            >
              <Box
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
                width="80%"
              >
                <Image
                  width="100%"
                  height="auto"
                  borderRadius="lg"
                  src={group.hinh_anh}
                  alt="some good alt text"
                  objectFit="cover"
                />
                <Text
                  color={"gray.400"}
                  display={"flex"}
                  justifyContent={"center"}
                >
                  {group.ghi_chu}
                </Text>
              </Box>
            </Box>
            <Box mt={5}>{group.noi_dung}</Box>
          </Box>
        </Box>
      </Box>
    </ScrollAnimation>
  );
}
