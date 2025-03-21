"use client";

import { TitlesMienBac } from "@/type/types";
import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  Tag,
  useColorModeValue,
  Container,
  Button,
} from "@chakra-ui/react";
import { RiArrowRightLine, RiMailLine } from "react-icons/ri"
interface Props {
  marginTop?: number;
  tags: string[];
}

const BlogTags = (props: Props) => {
  const { marginTop = 0, tags } = props;

  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => {
        return (
          <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

export default function Titles({ session1 }: { session1: TitlesMienBac }) {
  return (
    <Container maxW={"7xl"} pt={12}>
      <Box
        marginTop={{ base: "1", sm: "5" }}
        display="flex"
        gap={"30px"}
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Box flex="5" position="relative">
          <Box width={"full"}>
            <Heading as="h1">{session1.title}</Heading>
            <Box
              display={"flex"}
              justifyContent={"center"}
              width={{ base: "100%", sm: "100%" }}
              zIndex="2"
              marginTop="5%"
            >
              <Box textDecoration="none" _hover={{ textDecoration: "none" }}>
                <Image
                  borderRadius="lg"
                  src={session1.anh_title}
                  alt="some good alt text"
                  objectFit="contain"
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          display={{ base: "flex", sm: "none", md: "flex" }}
          flex="3"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: "3", sm: "0" }}
        >
          <BlogTags tags={["Du lịch", "Việt Nam", "Khám phá"]} />
          <Heading marginTop="1">
            <Text textDecoration="none" _hover={{ textDecoration: "none" }}>
              Khám Phá Vẻ Đẹp Của Việt Nam
            </Text>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="lg"
          >
            Việt Nam là một điểm đến du lịch tuyệt vời với cảnh đẹp thiên nhiên
            hùng vĩ, văn hóa phong phú và ẩm thực đa dạng. Từ những bãi biển
            tuyệt đẹp ở Đà Nẵng đến những cánh đồng xanh mướt ở Sapa, mỗi nơi
            đều mang đến những trải nghiệm độc đáo cho du khách.
          </Text>
          <HStack>
      <Button colorPalette="teal" variant="solid">
        <RiMailLine /> Email
      </Button>
      <Button colorPalette="teal" variant="outline">
        Call us <RiArrowRightLine />
      </Button>
    </HStack>
        </Box>
      </Box>
    </Container>
  );
}
