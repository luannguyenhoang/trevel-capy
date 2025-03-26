"use client";

import { Comment } from "@/type/types";
import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

const Testimonial = (props: Props) => {
  const { children } = props;

  return <Box>{children}</Box>;
};

const TestimonialContent = (props: Props) => {
  const { children } = props;

  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-15px)",
        boxShadow: "xl",
      }}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: useColorModeValue("white", "gray.800"),
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = (props: Props) => {
  const { children } = props;

  return (
    <Heading as={"h3"} fontSize={"xl"}>
      {children}
    </Heading>
  );
};

const TestimonialText = (props: Props) => {
  const { children } = props;

  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
      noOfLines={3}
      overflow="hidden"
      textOverflow="ellipsis"
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string;
  name: string;
  title?: string;
}) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function WithSpeechBubbles({ session2 }: { session2: Comment }) {
  const commentKeys = [1, 2, 3] as const;

  const testimonials = commentKeys.map((key) => {
    const comment = session2[`comment_${key}` as keyof Comment];
    return {
      heading: comment.tieu_de,
      content: comment.noi_dung,
      avatar: comment.hinh_anh,
      name: comment.ten_user,
    };
  });

  return (
    <Box>
      <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={"center"}>
          <Box>
            Khách Hàng Nói Gì Về
            <span style={{ fontFamily: "K2D-Regular" }}>KIM'S</span>
          </Box>
          <Text>
            Chúng tôi đã và đang làm việc với khách hàng trên toàn thế giới
          </Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index}>
              <TestimonialContent>
                <TestimonialHeading>{testimonial.heading}</TestimonialHeading>
                <TestimonialText>{testimonial.content}</TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={testimonial.avatar}
                name={testimonial.name}
              />
            </Testimonial>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
