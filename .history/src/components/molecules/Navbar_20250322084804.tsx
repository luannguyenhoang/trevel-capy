"use client";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Tooltip,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  PopoverFooter,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NavItem } from "@/type/types";
import CartShop from "./Cart";

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
              <Popover>
                <PopoverTrigger>
                  <Button
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
                </PopoverTrigger>
                <PopoverContent zIndex={4}>
                  <PopoverArrow />
                  <PopoverCloseButton />

                  <PopoverBody display={"flex"}>
                    <Button
                      fontSize={"sm"}
                      fontWeight={600}
                      color={"white"}
                      bg={"red.400"}
                      _hover={{
                        bg: "red.500",
                      }}
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
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

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link href={navItem.href ?? "#"} passHref>
                {" "}
                <Box
                  as="span"
                  p={2}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </Box>
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href = "#", subLabel }: NavItem) => {
  return (
    <Link href={href} passHref>
      <Box
        as="span"
        role={"group"}
        display={"block"}
        p={2}
        rounded={"md"}
        _hover={{ bg: useColorModeValue("red.50", "gray.900") }}
      >
        <Stack direction={"row"} align={"center"}>
          <Box>
            <Text
              transition={"all .3s ease"}
              _groupHover={{ color: "red.400" }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize={"sm"}>{subLabel}</Text>
          </Box>
          <Flex
            transition={"all .3s ease"}
            transform={"translateX(-10px)"}
            opacity={0}
            _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
            justify={"flex-end"}
            align={"center"}
            flex={1}
          >
            <Icon color={"red.400"} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Box>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as={Link}
        href={href ?? "/"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as={Link} key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Điểm đến",
    children: [
      {
        label: "Miền Bắc",
        subLabel: "Sapa, Hà Giang, Hạ Long...",
        href: "/mien-bac",
      },
      {
        label: "Miền Trung",
        subLabel: "Huế, Đà Nẵng, Hội An...",
        href: "/BaiViet/baiviet",
      },
      {
        label: "Miền Nam",
        subLabel: "Phú Quốc, Cần Thơ, Đà Lạt...",
        href: "/mien-nam",
      },
    ],
  },
  {
    label: "Trải nghiệm",
    children: [
      {
        label: "Ẩm thực",
        subLabel: "Khám phá nền ẩm thực đa dạng",
        href: "/am-thuc",
      },
      {
        label: "Di sản văn hóa",
        subLabel: "Các di sản UNESCO tại Việt Nam",
        href: "/di-san-van-hoa",
      },
      {
        label: "Lễ hội",
        subLabel: "Lễ hội truyền thống Việt Nam",
        href: "/le-hoi",
      },
    ],
  },
  {
    label: "Lịch trình",
    href: "/itineraries",
  },
  {
    label: "Dịch vụ",
    children: [
      {
        label: "Khách sạn",
        subLabel: "Đặt phòng khách sạn",
        href: "/khach-san",
      },
      {
        label: "Tour du lịch",
        subLabel: "Tour trọn gói và tùy chỉnh",
        href: "/tours-du-lich",
      },
      {
        label: "Vận chuyển",
        subLabel: "Máy bay, tàu, xe du lịch",
        href: "/van-chuyen",
      },
    ],
  },
];
