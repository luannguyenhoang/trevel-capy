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
} from "@chakra-ui/react";

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

interface BlogAuthorProps {
  date: Date;
  name: string;
}



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
              // marginLeft={{ base: '0', sm: '5%' }}
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
            Việt Nam là một điểm đến du lịch tuyệt vời với cảnh đẹp thiên nhiên hùng vĩ, văn hóa phong phú và ẩm thực đa dạng. Từ những bãi biển tuyệt đẹp ở Đà Nẵng đến những cánh đồng xanh mướt ở Sapa, mỗi nơi đều mang đến những trải nghiệm độc đáo cho du khách.
          </Text>
        </Box>
      </Box>
      {/* <Heading as="h2" marginTop="5">
        Latest articles
      </Heading> */}
      {/* <Divider marginTop="5" /> */}
      {/* <Wrap spacing="30px" marginTop="5">
        <WrapItem width={{ base: "100%", sm: "45%", md: "45%", lg: "30%" }}>
          <Box w="100%">
            <Box borderRadius="lg" overflow="hidden">
              <Box textDecoration="none" _hover={{ textDecoration: "none" }}>
                <Image
                  transform="scale(1.0)"
                  src={
                    "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                  }
                  alt="some text"
                  objectFit="contain"
                  width="100%"
                  transition="0.3s ease-in-out"
                  _hover={{
                    transform: "scale(1.05)",
                  }}
                />
              </Box>
            </Box>
            <BlogTags tags={["Engineering", "Product"]} marginTop={3} />
            <Heading fontSize="xl" marginTop="2">
              <Text textDecoration="none" _hover={{ textDecoration: "none" }}>
                Some blog title
              </Text>
            </Heading>
            <Text as="p" fontSize="md" marginTop="2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book.
            </Text>
            <BlogAuthor
              name="John Doe"
              date={new Date("2021-04-06T19:01:27Z")}
            />
          </Box>
        </WrapItem>
      </Wrap> */}
      {/* <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
        <Heading as="h2">What we write about</Heading>
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
      </VStack> */}
    </Container>
  );
}
