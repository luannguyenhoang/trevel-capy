"use client";

import { Navbar } from "@/type/types";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { span } from "framer-motion/client";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { keyframes } from "@emotion/react";
import { PlayIcon } from "@/utils/common";

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-15px);}
  60% {transform: translateY(-7px);}
`;

export default function CallToActionWithVideo({
  session1,
}: {
  session1: Navbar;
}) {
  const bounceAnimation = `${bounce} 2s infinite`;

  return (
    <Container maxW={"7xl"} minH={"100vh"} alignContent={"center"} position="relative">
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
              as={"span"}
              position={"relative"}
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
              fontSize={"5xl"}
              fontWeight={"bold"}
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
          <Blob
            w={"150%"}
            h={"150%"}
            position={"absolute"}
            top={"-20%"}
            left={0}
            zIndex={-1}
            color={useColorModeValue("red.50", "red.400")}
          />
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
      
      <Flex 
        position="absolute" 
        bottom="20px" 
        left="0" 
        right="0" 
        justifyContent="center" 
        alignItems="center"
        flexDirection="column"
        opacity="0.8"
        _hover={{ opacity: 1 }}
        transition="opacity 0.3s"
      >
        <Text fontSize="sm" color="gray.500" mb="2">Scroll Down</Text>
        <Box 
          animation={bounceAnimation}
        >
          <ChevronDownIcon w={8} h={8} color="red.400" />
        </Box>
      </Flex>
    </Container>
  );
}



const Blob = (props: IconProps) => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};
