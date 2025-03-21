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
import { FaFacebook, FaShareAlt } from "react-icons/fa";

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

const handleShare = () => {
  const currentUrl = window.location.href;
  console.log(currentUrl);
  
  navigator.clipboard.writeText(currentUrl)
    .then(() => {
      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
      window.open(facebookShareUrl, "_blank");
    })
    .catch(err => {
      console.error("Error copying text: ", err);
    });
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
                {log}
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
          <HStack mt={4} >
            <Button variant="outline" onClick={handleShare}>
              <FaFacebook />
            </Button>
            <Button variant="outline">
              <FaShareAlt />
            </Button>
          </HStack>
        </Box>
      </Box>
    </Container>
  );
}
