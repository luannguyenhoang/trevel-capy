"use client";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Select,
  Badge,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaSearch,
  FaUser,
  FaCheck,
  FaPercentage,
  FaCreditCard,
} from "react-icons/fa";
import Loading from "../components/molecules/Loading";
import { ScrollAnimation } from "../components/molecules/ScrollAnimation";
import CardZoom from "./card";
import { GET_KHACHSAN } from "@/utils/graphql/GetKhachSan";

export default function KhachSan() {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/graphQLs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: GET_KHACHSAN }),
        });
        if (!res.ok) {
          throw new Error("error");
        }
        const result = await res.json();

        setData(result.data);
      } catch (err) {
        setError("Có lỗi");
      } finally {
        setLoading(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Box
        bgImage="url('/quanCafe.jpg')"
        py={{ base: 20, md: 24 }}
        position="relative"
        overflow="hidden"
        objectFit="cover"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bgImage="url('/images/hotel-bg.jpg')"
          bgPosition="center"
          bgSize="cover"
          opacity="0.3"
          zIndex="1"
        />

        <Box
          position="absolute"
          top="10%"
          left="5%"
          w="300px"
          h="300px"
          borderRadius="full"
          bg="whiteAlpha.200"
          filter="blur(60px)"
          zIndex="1"
        />
        <Box
          position="absolute"
          bottom="15%"
          right="10%"
          w="250px"
          h="250px"
          borderRadius="full"
          bg="whiteAlpha.100"
          filter="blur(40px)"
          zIndex="1"
        />

        <Container
          maxW="container.xl"
          centerContent
          position="relative"
          zIndex="2"
        >
          <VStack
            spacing={{ base: 8, md: 10 }}
            color="white"
            textAlign="center"
            w="full"
          >
            <Box maxW="800px">
              <Heading
                fontSize={{ base: "lg", md: "xl" }}
                opacity="0.9"
                maxW="700px"
                mx="auto"
                size={"3xl"}
              >
                Tìm Khách Sạn Phù Hợp Với Bạn
              </Heading>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                opacity="0.9"
                maxW="700px"
                mx="auto"
              >
                Khám phá những khách sạn tốt nhất với giá cả phù hợp cho chuyến
                đi của bạn
              </Text>
            </Box>

            <Box
              bg="white"
              p={{ base: 6, md: 8 }}
              borderRadius="xl"
              w="full"
              maxW="5xl"
              boxShadow="xl"
              transition="all 0.3s"
              _hover={{ boxShadow: "2xl", transform: "translateY(-5px)" }}
            >
              <Stack
                direction={{ base: "column", lg: "row" }}
                spacing={{ base: 5, md: 6 }}
                w="full"
                align="flex-end"
              >
                <FormControl>
                  <FormLabel color="gray.700" fontWeight="medium" fontSize="sm">
                    Tên khách sạn
                  </FormLabel>
                  <InputGroup size="lg">
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaSearch color="#4A5568" />}
                    />
                    <Input
                      color="gray.800"
                      placeholder="Tìm theo tên hoặc địa điểm..."
                      borderColor="gray.300"
                      _hover={{ borderColor: "blue.400" }}
                      _focus={{
                        borderColor: "blue.500",
                        boxShadow: "0 0 0 1px blue.500",
                      }}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel color="gray.700" fontWeight="medium" fontSize="sm">
                    Ngày nhận phòng
                  </FormLabel>
                  <InputGroup size="lg">
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaCalendarAlt color="#4A5568" />}
                    />
                    <Input
                      color="gray.800"
                      type="date"
                      borderColor="gray.300"
                      _hover={{ borderColor: "blue.400" }}
                      _focus={{
                        borderColor: "blue.500",
                        boxShadow: "0 0 0 1px blue.500",
                      }}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel color="gray.700" fontWeight="medium" fontSize="sm">
                    Số người
                  </FormLabel>
                  <InputGroup size="lg">
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaUser color="#4A5568" />}
                    />
                    <Select
                      color="gray.800"
                      borderColor="gray.300"
                      _hover={{ borderColor: "blue.400" }}
                      _focus={{
                        borderColor: "blue.500",
                        boxShadow: "0 0 0 1px blue.500",
                      }}
                      defaultValue="2"
                    >
                      <option value="1">1 người</option>
                      <option value="2">2 người</option>
                      <option value="3">3 người</option>
                      <option value="4">4 người</option>
                      <option value="5+">5+ người</option>
                    </Select>
                  </InputGroup>
                </FormControl>

                <Button
                  colorScheme="blue"
                  size="lg"
                  w={{ base: "full", md: "auto" }}
                  px={10}
                  py={7}
                  fontSize="md"
                  fontWeight="bold"
                  transition="all 0.3s"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "xl",
                  }}
                >
                  <HStack spacing={2}>
                    <FaSearch />
                    <Text>Tìm Kiếm</Text>
                  </HStack>
                </Button>
              </Stack>
            </Box>

            <HStack spacing={4} mt={6} flexWrap="wrap" justify="center">
              <Badge
                colorScheme="green"
                p={2}
                borderRadius="full"
                fontSize="sm"
              >
                <HStack spacing={1}>
                  <Icon as={FaCheck} />
                  <Text>Đảm bảo giá tốt nhất</Text>
                </HStack>
              </Badge>
              <Badge
                colorScheme="purple"
                p={2}
                borderRadius="full"
                fontSize="sm"
              >
                <HStack spacing={1}>
                  <Icon as={FaPercentage} />
                  <Text>Khuyến mãi đặc biệt</Text>
                </HStack>
              </Badge>
              <Badge
                colorScheme="orange"
                p={2}
                borderRadius="full"
                fontSize="sm"
              >
                <HStack spacing={1}>
                  <Icon as={FaCreditCard} />
                  <Text>Thanh toán an toàn</Text>
                </HStack>
              </Badge>
            </HStack>
          </VStack>
        </Container>
      </Box>
      <ScrollAnimation delay={0.5}>
        <CardZoom prop={data} />
      </ScrollAnimation>
    </>
  );
}
