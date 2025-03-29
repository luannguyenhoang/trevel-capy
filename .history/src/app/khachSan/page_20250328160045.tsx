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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaSearch, FaUser } from "react-icons/fa";
import Loading from "../components/molecules/Loading";
import { ScrollAnimation } from "../components/molecules/ScrollAnimation";
import CardZoom from "./card";
import { GET_KHACHSAN } from "@/utils/graphql/GetKhachSan";

export default function KhachSan() {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const api_url = process.env.NEXT_PUBLIC_API_RMS_URL;
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
  const res = await fetch(`${api_url}/api/graphQLs`, {

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
        bgPosition="center"
        h="600px"
        position="relative"
        display={"flex"}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg="blackAlpha.600"
        >
          <ScrollAnimation delay={0.3}>
            <Container
              maxW="container.xl"
              centerContent
              py={{ base: 20, md: 20 }}
              pt={"100px"}
              textColor={"black"}
            >
              <VStack spacing={6} color="white" textAlign="center" w="full">
                <Heading size={{ base: "xl", md: "2xl" }}>
                  Tìm Khách Sạn Phù Hợp Với Bạn
                </Heading>
                <Text fontSize={{ base: "lg", md: "xl" }}>
                  Khám phá những khách sạn tốt nhất với giá cả hợp lý
                </Text>

                <Box
                  bg="white"
                  p={{ base: 4, md: 6 }}
                  borderRadius="lg"
                  w="full"
                  maxW="4xl"
                  boxShadow="md"
                >
                  <Stack
                    direction={{ base: "column", md: "row" }}
                    spacing={4}
                    w="full"
                    align="flex-end"
                  >
                    <InputGroup>
                      <InputLeftElement
                        children={<FaSearch color="gray.300" />}
                      />
                      <Input
                        color={"black"}
                        placeholder="Nhập tên khách sạn..."
                      />
                    </InputGroup>

                    <InputGroup>
                      <InputLeftElement
                        children={<FaCalendarAlt color="gray.300" />}
                      />
                      <Input
                        color={"black"}
                        type="date"
                        placeholder="Ngày nhận phòng"
                      />
                    </InputGroup>

                    <InputGroup>
                      <InputLeftElement
                        children={<FaUser color="gray.300" />}
                      />
                      <Input
                        color={"black"}
                        type="number"
                        placeholder="Số người"
                      />
                    </InputGroup>

                    <Button
                      colorScheme="blue"
                      w={{ base: "full", md: "auto" }}
                      px={8}
                    >
                      Tìm Kiếm
                    </Button>
                  </Stack>
                </Box>
              </VStack>
            </Container>
          </ScrollAnimation>
        </Box>
      </Box>
      <ScrollAnimation delay={0.5}>
        <CardZoom prop={data} />
      </ScrollAnimation>
    </>
  );
}
