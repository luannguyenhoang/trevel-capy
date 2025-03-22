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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CartShop from "../molecules/Cart";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };
    checkLoginStatus();
    window.addEventListener("loginStatusChanged", checkLoginStatus);
    window.addEventListener("storage", checkLoginStatus);
    return () => {
      window.removeEventListener("loginStatusChanged", checkLoginStatus);
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("loginStatusChanged"));
    router.push("/sign-in");
  };

  return (
    <Box position="fixed" top={0} width="100%" zIndex={10}>
      <Flex
        bg={useColorModeValue("whiteAlpha.900", "gray.800")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
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
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link href="/" passHref>
            <Image
              className="object-cover"
              alt="1"
              width={40}
              height={40}
              src="/logo.png"
            />
          </Link>
          <Flex
            display={{ base: "none", md: "flex" }}
            alignItems={{ base: "center" }}
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
          {isLoggedIn ? (
            <>
              <CartShop />

              <Menu>
                <MenuButton
                  as={Button}
                  aria-label="Shopping cart"
                  width={10}
                  height={10}
                  variant="outline"
                  rounded={"full"}
                  bgImage="url('/logo.png')"
                  bgSize="cover"
                  bgPosition="center"
                  _hover={{
                    objectFit: "cover",
                    bgImage: "url('/logo.png')",
                    opacity: 0.9,
                    transform: "scale(1.05)",
                  }}
                  borderColor="gray.200"
                  _active={{
                    objectFit: "cover",
                    bgImage: "url('/logo.png')",
                    transform: "scale(0.98)",
                  }}
                />
                <MenuList>
                  <MenuItem>Create a Copy</MenuItem>
                  <MenuItem>Mark as Draft</MenuItem>
                  <MenuItem>Delete</MenuItem>
                  <MenuItem onClick={handleLogout}> Đăng xuất</MenuItem>
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
