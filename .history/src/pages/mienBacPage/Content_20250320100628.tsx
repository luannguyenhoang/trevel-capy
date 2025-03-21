"use client";

import { MienBacContent } from "@/type/types";
import { Box, Heading, Image, Container, Text } from "@chakra-ui/react";

export default function Containers({ session2 }: { session2: MienBacContent }) {
  return (
    <Container maxW={"7xl"}>
      <Box
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Box position="relative" alignItems="center" marginTop="5%">
          <Box>
            <Heading as="h1" size={"md"} marginBottom="2%">
              12 Địa Điểm Du Lịch Miền Bắc Nổi Tiếng Cho Hội Tự Túc
            </Heading>
            <Box
              width={{ base: "100%", sm: "85%" }}
              zIndex="2"
              marginLeft={{ base: "0", sm: "5%" }}
            >
              <Box
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
                minW={"fit-content"}
              >
                <Image
                  maxW={"2xl"}
                  minW={"2xl"}
                  borderRadius="lg"
                  src={session2.hinh_anh}
                  alt="some good alt text"
                  objectFit="contain"
                />
              </Box>
              <Text
                color={"gray.400"}
                display={"flex"}
                justifyContent={"center"}
              >
                {" "}
                {session2.ghi_chu}
              </Text>
            </Box>
            <Box maxW={"3xl"} mt={5}>
              {session2.noi_dung}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
