"use client";

import { MienBacContent } from "@/type/types";
import { Box, Heading, Image, Container, Text } from "@chakra-ui/react";

// Component con để hiển thị cho mỗi nhóm
const DestinationGroup = ({ group }: { group: any }) => {
  return (
    <Box
      display="flex"
      flexDirection={{ base: "column", sm: "row" }}
      justifyContent="space-between"
    >
      <Box position="relative" alignItems="center" marginTop="5%">
        <Box>
          <Heading as="h1" size={"md"} marginBottom="2%">
            {group.dia_diem}
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
                src={group.hinh_anh}
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
              {group.ghi_chu}
            </Text>
          </Box>
          <Box maxW={"3xl"} mt={5}>
            {group.noi_dung}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default function Containers({ session2 }: { session2: MienBacContent }) {
  // Lấy tất cả các nhóm từ session2
  const groups = Object.keys(session2)
    .filter(key => key.startsWith('nhom_'))
    .map(key => session2[key as keyof MienBacContent]);

  return (
    <Container maxW={"7xl"}>
      {/* Sử dụng map để hiển thị tất cả các nhóm */}
      {groups.map((group, index) => (
        <DestinationGroup key={index} group={group} />
      ))}
    </Container>
  );
}
