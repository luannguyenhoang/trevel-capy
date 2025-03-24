"use client";

import { PackageTour } from "@/type/types";
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

interface Props {
  children: React.ReactNode;
}

function PriceWrapper(props: Props) {
  const { children } = props;

  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}

export default function Pricing({ session3 }: { session3: PackageTour }) {
  return (
    <Box py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Gói Tour Du Lịch Phù Hợp Với Bạn
        </Heading>
        <Text fontSize="lg" color={"gray.500"}>
          Đa dạng lựa chọn tour với nhiều mức giá. Đặt tour trước 30 ngày để
          nhận ưu đãi đặc biệt.
        </Text>
      </VStack>
      <Stack
        direction={{ base: "column", md: "row" }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}
      >
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              {session3?.tour_tieu_chuan.loai_tour}
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="2xl" fontWeight="600">
                ₫
              </Text>
              <Text fontSize="5xl" fontWeight="600">
                {session3?.tour_tieu_chuan.gia_tien}K
              </Text>
              <Text fontSize="3xl" color="gray.500">
                /người
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue("gray.50", "gray.900")}
            py={4}
            borderBottomRadius={"xl"}
          >
            <List spacing={3} textAlign="start" px={12}>
              {session3?.tour_tieu_chuan.dich_vu
                .split("\r\n")
                .map((item, index) => (
                  <ListItem key={index}>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    {item}
                  </ListItem>
                ))}
            </List>
            <Box w="80%" pt={7}>
              <Button w="full" colorScheme="red" variant="outline">
                Đặt ngay
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>
{/* 
        <PriceWrapper>
          <Box position="relative">
            <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{ transform: "translate(-50%)" }}
            >
              <Text
                textTransform="uppercase"
                bg={useColorModeValue("red.300", "red.700")}
                px={3}
                py={1}
                color={useColorModeValue("gray.900", "gray.300")}
                fontSize="sm"
                fontWeight="600"
                rounded="xl"
              >
                Phổ Biến Nhất
              </Text>
            </Box>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                {session3?.tour_cao_cap.loai_tour}
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  ₫
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  {session3?.tour_cao_cap.gia_tien}K
                </Text>
                <Text fontSize="3xl" color="gray.500">
                  /người
                </Text>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue("gray.50", "gray.700")}
              py={4}
              borderBottomRadius={"xl"}
            >
              <List spacing={3} textAlign="start" px={12}>
                {session3?.tour_cao_cap.dich_vu
                  .split("\r\n")
                  .map((item, index) => (
                    <ListItem key={index}>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      {item}
                    </ListItem>
                  ))}
              </List>
              <Box w="80%" pt={7}>
                <Button w="full" colorScheme="red">
                  Đặt ngay
                </Button>
              </Box>
            </VStack>
          </Box>
        </PriceWrapper>
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              {session3?.tour_tron_goi_vip.loai_tour}
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                ₫
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                {session3?.tour_tron_goi_vip.gia_tien}K
              </Text>
              <Text fontSize="3xl" color="gray.500">
                /người
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue("gray.50", "gray.700")}
            py={4}
            borderBottomRadius={"xl"}
          >
            <List spacing={3} textAlign="start" px={12}>
              {session3?.tour_tron_goi_vip.dich_vu
                .split("\r\n")
                .map((item, index) => (
                  <ListItem key={index}>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    {item}
                  </ListItem>
                ))}
            </List>
            <Box w="80%" pt={7}>
              <Button w="full" colorScheme="red" variant="outline">
                Đặt ngay
              </Button>
            </Box>
          </VStack>
        </PriceWrapper> */}
      </Stack>
    </Box>
  );
}
