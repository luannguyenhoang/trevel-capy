import Loading from "@/components/molecules/Loading";
import { ScrollAnimation } from "@/components/molecules/ScrollAnimation";
import { GET_KHACHSAN } from "@/utils/querys";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
  VStack,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaRulerCombined,
  FaSearch,
  FaUser,
  FaUtensils,
  FaWifi,
} from "react-icons/fa";

export default function KhachSan() {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/graphQL", {
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

        console.log("Toàn bộ response:", result);
        console.log("Data:", result.data);
        console.log("Nodes:", result.data?.allKhachSan?.nodes);
        console.log(
          "CardZoom:",
          result.data?.allKhachSan?.nodes?.[0]?.cardZoom
        );
        console.log(
          "RoomCardChild:",
          result.data?.allKhachSan?.nodes?.[0]?.cardZoom?.roomCardChild
        );

        result.data?.allKhachSan?.nodes?.[0]?.cardZoom?.roomCardChild?.forEach(
          (room: any, index: number) => {
            console.log(`Room ${index + 1} photos:`, room?.cardContent?.photos);
            console.log(
              `Room ${index + 1} photos child url:`,
              room?.cardContent?.photos?.child?.node?.mediaItemUrl
            );
          }
        );

        setData(result.data);
      } catch (err) {
        console.error("Error:", err);
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
          <Container
            maxW="container.xl"
            centerContent
            py={{ base: 20, md: 20 }}
            textColor={"black"}
          >
            <VStack spacing={6} color="white" textAlign="center" w="full">
              <Heading size={{ base: "xl", md: "2xl" }}>Tìm Khách Sạn Phù Hợp Với Bạn</Heading>
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
                    <InputLeftElement children={<FaSearch color="gray.300" />} />
                    <Input color={"black"} placeholder="Nhập tên khách sạn..." />
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
                    <InputLeftElement children={<FaUser color="gray.300" />} />
                    <Input color={"black"} type="number" placeholder="Số người" />
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
        </Box>
      </Box>
      <ScrollAnimation delay={0.3}>

      <Container maxW="container.xl" py={12}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {data?.allKhachSan?.nodes?.[0]?.cardZoom?.roomCardChild?.map(
            (room: any, index: number) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-shadow duration-300"
                borderRadius={10}
              >
                <CardBody p={0} position="relative" borderRadius={10}>
                  <Box position="relative" h="250px">
                    <Image
                      borderTopRadius={10}
                      src={
                        room?.cardContent?.image?.node?.mediaItemUrl ||
                        "/quanCafe.jpg"
                      }
                      alt={room?.cardContent?.zoomName || "Khách sạn"}
                      className="w-full h-full object-cover"
                    />
                  </Box>

                  <Box
                    bg="white"
                    borderRadius="3xl"
                    mt="-40px"
                    position="relative"
                    p={6}
                  >
                    <HStack justify="space-between" align="center" mb={2}>
                      <Text as="s" color="gray.500" fontSize="sm">
                        {room?.cardContent?.maxPrice || "2.500.000"} VND
                      </Text>
                      <Text color="red.500" fontSize="xl" fontWeight="bold">
                        {room?.cardContent?.minPrice || "2.000.000"} VND
                      </Text>
                    </HStack>

                    <Heading as="h3" color="blue.700" fontSize="2xl" mb={1}>
                      {room?.cardContent?.zoomName || "Superior Deluxe"}
                    </Heading>
                    <Text fontSize="md" color="gray.600" mb={3}>
                      {room?.cardContent?.time || "null"} /{" "}
                      {room?.cardContent?.people || "2"} Người
                    </Text>

                    <Text color="gray.600" mb={4} fontSize="sm" noOfLines={3}>
                      {room?.cardContent?.summaryOfContent ||
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit..."}
                    </Text>

                    <HStack justify="space-between" mb={4}>
                      <VStack align="center" spacing={1}>
                        <FaUser color="#2B6CB0" />
                        <Text fontSize="sm" color="gray.600">
                          {room?.cardContent?.people || "2"} People
                        </Text>
                      </VStack>
                      <VStack align="center" spacing={1}>
                        <FaWifi color="#2B6CB0" />
                        <Text fontSize="sm" color="gray.600">
                          Wifi
                        </Text>
                      </VStack>
                      <VStack align="center" spacing={1}>
                        <FaRulerCombined color="#2B6CB0" />
                        <Text fontSize="sm" color="#2B6CB0">
                          {room?.cardContent?.m2 || "50"} m2
                        </Text>
                      </VStack>
                      <VStack align="center" spacing={1}>
                        <FaUtensils color="#2B6CB0" />
                        <Text fontSize="sm" color="gray.600">
                          breakfast
                        </Text>
                      </VStack>
                    </HStack>

                    <Box>
                      <HStack justify="space-between" mb={2}>
                        <Text fontWeight="bold">Photos</Text>
                        <Text color="red.500" fontSize="sm" cursor="pointer">
                          See all &gt;
                        </Text>
                      </HStack>

                      <HStack spacing={2} justifyContent={"space-between"}>
                        {room?.cardContent?.photos
                          ?.slice(0, 3)
                          .map((photo: any, photoIndex: number) => (
                            <Box
                              key={photoIndex}
                              width="100px"
                              height="70px"
                              borderRadius="md"
                              overflow="hidden"
                              flexShrink={0}
                              position="relative"
                            >
                              <Image
                                src={
                                  photo?.child?.node?.mediaItemUrl ||
                                  "/quanCafe.jpg"
                                }
                                alt={`Room photo ${photoIndex + 1}`}
                                objectFit="cover"
                                position="absolute"
                                width="100%"
                                height="100%"
                                borderRadius="md"
                              />
                            </Box>
                          ))}
                      </HStack>
                    </Box>

                    <HStack spacing={4} mt={4}>
                      <Button colorScheme="red" flex={1} borderRadius="md">
                        Book now
                      </Button>
                      <Link
                        href={`/hotelDetail/${room?.cardContent?.zoomName }`}
                        style={{ display: "block" }}
                        className="flex-1/12"
                      >
                        <Button colorScheme="blue" w={"full"} borderRadius="md">
                          See more
                        </Button>
                      </Link>
                    </HStack>
                  </Box>
                </CardBody>
              </Card>
            )
          )}
        </SimpleGrid>
      </Container>
      </ScrollAnimation>
    </>
  );
}
