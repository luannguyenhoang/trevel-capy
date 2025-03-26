"use client";

import ScrollIndicator from "@/components/molecules/ScrollIndicator";
import { Navbar } from "@/type/types";
import { PlayIcon } from "@/utils/common";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { span } from "framer-motion/client";

export default function CallToActionWithVideo({
  session1,
}: {
  session1: Navbar;
}) {
  return (
    <Container
      maxW={"7xl"}
      minH={"100vh"}
      alignContent={"center"}
      position="relative"
    >
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as="span"
              position="relative"
              letterSpacing="wider"
              fontWeight="black"
              textTransform="uppercase"
              fontFamily={"K2D-Regular"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "red.400",
                zIndex: -1,
              }}
            >
              {session1?.tieu_de || "abc"}
            </Text>
            <br />
            <Text
              as={span}
              fontSize={"4xl"}
              fontWeight={"bold"}
              fontFamily={"K2D-Regular"}
              letterSpacing={"wider"}
              position="relative"
              css={{
                background:
                  "linear-gradient(90deg, #F56565, #E53E3E, #C53030, #E8EB16FF, #F56565, #F56565, #F82626FF, #C53030, #E53E3E, #F56565)",
                backgroundSize: "400% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                animation: "gradientFlow 5s linear infinite",
                "@keyframes gradientFlow": {
                  "0%": { backgroundPosition: "0% 50%" },
                  "100%": { backgroundPosition: "100% 50%" },
                },
                textTransform: "uppercase",
                transform: "scaleX(1.1)",
              }}
            >
              {session1?.tieu_de_2 || "abc"}
            </Text>
          </Heading>
          <Text color={"gray.500"}>{session1?.noi_dung_tieu_de || "abc"}</Text>
          <Stack
            spacing={{ base: 4, sm: 10 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"red"}
              bg={"red.400"}
              _hover={{ bg: "red.500" }}
            >
              Get started
            </Button>
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              leftIcon={<PlayIcon h={4} w={4} color={"gray.300"} />}
            >
              How It Works
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          {/* <Blob
            w={"150%"}
            h={"150%"}
            position={"absolute"}
            top={"-20%"}
            left={0}
            zIndex={-1}
            color={useColorModeValue("red.50", "red.400")}
          /> */}
          <Box
            position={"relative"}
            height={"300px"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}
          >
            <IconButton
              aria-label={"Play Button"}
              variant={"ghost"}
              _hover={{ bg: "transparent" }}
              icon={<PlayIcon w={12} h={12} />}
              size={"lg"}
              color={"white"}
              position={"absolute"}
              left={"50%"}
              top={"50%"}
              transform={"translateX(-50%) translateY(-50%)"}
            />
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src={session1?.anh_navbar || "abc"}
            />
          </Box>
        </Flex>
      </Stack>

      <ScrollIndicator />
    </Container>
  );
}
