"use client";

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import CartShop from "../molecules/Cart";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      position={isScrolled ? "fixed" : "relative"}
      top={0}
      width="100%"
      zIndex={10}
      transform={isScrolled ? "translateY(0)" : "translateY(0)"}
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      animation={isScrolled ? "slideDown 0.3s ease-in-out" : undefined}
      sx={{
        "@keyframes slideDown": {
          "0%": {
            transform: "translateY(-100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
      }}
    >
      <Flex
        bg={useColorModeValue("whiteAlpha.900", "gray.800")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        boxShadow={isScrolled ? "md" : "none"}
        transition="box-shadow 0.3s ease, background-color 0.3s ease"
        backdropFilter={isScrolled ? "blur(5px)" : "none"}
        backgroundColor={
          isScrolled
            ? useColorModeValue(
                "rgba(255, 255, 255, 0.95)",
                "rgba(26, 32, 44, 0.95)"
              )
            : useColorModeValue("whiteAlpha.900", "gray.800")
        }
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
              transition="transform 0.3s ease"
              _hover={{ transform: "scale(1.05)" }}
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
          <CartShop />

          {isLoggedIn ? (
            <>
              <Menu>
                <MenuButton
                  as={Button}
                  aria-label="Shopping cart"
                  width={10}
                  height={10}
                  variant="outline"
                  rounded={"full"}
                  bgImage="url('/cat.jpg')"
                  bgSize="cover"
                  bgPosition="center"
                  _hover={{
                    objectFit: "cover",
                    bgImage: "url('/cat.jpg')",
                    opacity: 0.9,
                    transform: "scale(1.05)",
                  }}
                  borderColor="gray.200"
                  _active={{
                    objectFit: "cover",
                    bgImage: "url('/cat.jpg')",
                    transform: "scale(0.98)",
                  }}
                />
                <MenuList>
                  <MenuItem>Create a Copy</MenuItem>
                  <MenuItem>Mark as Draft</MenuItem>
                  <MenuItem>Delete</MenuItem>
                  <MenuItem> Đăng xuất</MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
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
            </>
          )}
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
