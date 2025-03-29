"use client";

import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const bgColor = useColorModeValue("whiteAlpha.900", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.900");

  return (
    <Box position="fixed" w={"100%"} zIndex={1000} bg={"white"} top={0}>
      <Flex
        bg={bgColor}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={borderColor}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          alignItems={"center"}
        >
          <Link href="/" passHref>
            <Image
              className="object-cover"
              alt="1"
              width={10}
              height={10}
              src="/logo.png"
            />
          </Link>
          <Flex
            display={{ base: "none", md: "flex" }}
            alignItems={{ base: "start" }}
            ml={10}
          >
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={Link}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href={"/sign-in"}
          >
            Đăng nhập
          </Button>
          <Button
            as={Link}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"red.400"}
            href={"/signup"}
            _hover={{
              bg: "red.500",
            }}
          >
            Đăng ký
          </Button>
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
