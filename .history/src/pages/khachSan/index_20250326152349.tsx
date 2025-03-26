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
  InputRightElement,
  SimpleGrid,
  Text,
  VStack,
  Stack,
  Tabs,
  TabList,
  Tab,
  IconButton,
  Select,
  Checkbox,
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
  FaMinus,
  FaPlus,
  FaChevronDown,
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
                  p={{ base: 6, md: 8 }}
                  borderRadius="xl"
                  w="full"
                  maxW="5xl"
                  boxShadow="lg"
                  position="relative"
                  _before={{
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    borderTopLeftRadius: "xl",
                    borderTopRightRadius: "xl",
                  }}
                >
                  <VStack spacing={6} w="full">
                    <Stack
                      direction={{ base: "column", md: "row" }}
                      spacing={5}
                      w="full"
                      align="flex-start"
                    >
                      <VStack align="start" flex={1}>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="gray.600"
                        >
                          Điểm đến
                        </Text>
                        <InputGroup size="lg">
                          <InputLeftElement pointerEvents="none">
                            <Box color="red.500">
                              <FaSearch />
                            </Box>
                          </InputLeftElement>
                          <Input
                            color="black"
                            placeholder="Nhập tên khách sạn hoặc địa điểm..."
                            _placeholder={{ color: "gray.400" }}
                            borderRadius="md"
                            bg="gray.50"
                            _hover={{ bg: "gray.100" }}
                            _focus={{ bg: "white", borderColor: "red.400" }}
                          />
                        </InputGroup>
                      </VStack>

                      <VStack align="start" flex={1}>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="gray.600"
                        >
                          Ngày nhận phòng
                        </Text>
                        <InputGroup size="lg">
                          <InputLeftElement pointerEvents="none">
                            <Box color="red.500">
                              <FaCalendarAlt />
                            </Box>
                          </InputLeftElement>
                          <Input
                            color="black"
                            type="date"
                            placeholder="Chọn ngày..."
                            borderRadius="md"
                            bg="gray.50"
                            _hover={{ bg: "gray.100" }}
                            _focus={{ bg: "white", borderColor: "red.400" }}
                          />
                        </InputGroup>
                      </VStack>

                      <VStack align="start" flex={1}>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="gray.600"
                        >
                          Ngày trả phòng
                        </Text>
                        <InputGroup size="lg">
                          <InputLeftElement pointerEvents="none">
                            <Box color="red.500">
                              <FaCalendarAlt />
                            </Box>
                          </InputLeftElement>
                          <Input
                            color="black"
                            type="date"
                            placeholder="Chọn ngày..."
                            borderRadius="md"
                            bg="gray.50"
                            _hover={{ bg: "gray.100" }}
                            _focus={{ bg: "white", borderColor: "red.400" }}
                          />
                        </InputGroup>
                      </VStack>
                    </Stack>

                    <Stack
                      direction={{ base: "column", md: "row" }}
                      spacing={5}
                      w="full"
                      align="flex-start"
                    >
                      <VStack align="start" flex={1}>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="gray.600"
                        >
                          Số người
                        </Text>
                        <InputGroup size="lg">
                          <InputLeftElement pointerEvents="none">
                            <Box color="red.500">
                              <FaUser />
                            </Box>
                          </InputLeftElement>
                          <Input
                            color="black"
                            type="number"
                            min={1}
                            defaultValue={2}
                            placeholder="Số người"
                            borderRadius="md"
                            bg="gray.50"
                            _hover={{ bg: "gray.100" }}
                            _focus={{ bg: "white", borderColor: "red.400" }}
                          />
                          <InputRightElement width="4.5rem">
                            <HStack>
                              <IconButton
                                aria-label="Giảm số người"
                                icon={<FaMinus />}
                                size="xs"
                                colorScheme="red"
                                variant="ghost"
                              />
                              <IconButton
                                aria-label="Tăng số người"
                                icon={<FaPlus />}
                                size="xs"
                                colorScheme="red"
                                variant="ghost"
                              />
                            </HStack>
                          </InputRightElement>
                        </InputGroup>
                      </VStack>

                      <VStack align="start" flex={1}>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="gray.600"
                        >
                          Số phòng
                        </Text>
                        <Select
                          size="lg"
                          placeholder="Chọn số phòng"
                          borderRadius="md"
                          bg="gray.50"
                          _hover={{ bg: "gray.100" }}
                          _focus={{ bg: "white", borderColor: "red.400" }}
                          icon={<FaChevronDown />}
                          color="black"
                        >
                          <option value="1">1 phòng</option>
                          <option value="2">2 phòng</option>
                          <option value="3">3 phòng</option>
                          <option value="4">4+ phòng</option>
                        </Select>
                      </VStack>

                      <VStack align="start" flex={1}>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="gray.600"
                        >
                          Giá
                        </Text>
                        <Select
                          size="lg"
                          placeholder="Chọn khoảng giá"
                          borderRadius="md"
                          bg="gray.50"
                          _hover={{ bg: "gray.100" }}
                          _focus={{ bg: "white", borderColor: "red.400" }}
                          icon={<FaChevronDown />}
                          color="black"
                        >
                          <option value="1">Dưới 1 triệu</option>
                          <option value="2">1 - 2 triệu</option>
                          <option value="3">2 - 3 triệu</option>
                          <option value="4">Trên 3 triệu</option>
                        </Select>
                      </VStack>
                    </Stack>

                    <HStack justify="space-between" w="full">
                      <Checkbox colorScheme="red" defaultChecked>
                        Hiển thị giá khuyến mãi
                      </Checkbox>
                      <Button
                        colorScheme="red"
                        size="lg"
                        px={12}
                        rightIcon={<FaSearch />}
                        _hover={{
                          transform: "translateY(-2px)",
                          boxShadow: "lg",
                        }}
                        transition="all 0.2s"
                      >
                        Tìm Kiếm
                      </Button>
                    </HStack>
                  </VStack>
                </Box>
              </VStack>
            </Container>
          </ScrollAnimation>
        </Box>
      </Box>
      <ScrollAnimation delay={0.5}>
        <Container maxW="container.xl" py={12}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {data?.allKhachSan?.nodes?.[0]?.cardZoom?.roomCardChild?.map(
              (room: any, index: number) => (
                <Card
                  key={index}
                  borderRadius={10}
                  role="group"
                  transition="all 0.3s ease-in-out"
                  _hover={{
                    transform: "translateY(-8px)",
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  overflow="hidden"
                >
                  <CardBody p={0} position="relative" borderRadius={10}>
                    <Box
                      borderTopRadius={10}
                      overflow="hidden"
                      height="250px"
                      position="relative"
                    >
                      <Image
                        src={
                          room?.cardContent?.image?.node?.mediaItemUrl ||
                          "/quanCafe.jpg"
                        }
                        alt={room?.cardContent?.zoomName || "Khách sạn"}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                        transition="transform 0.3s ease-in-out"
                        _groupHover={{
                          transform: "scale(1.1)",
                        }}
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

                      <Heading as="h3" color="red.700" fontSize="2xl" mb={1}>
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
                        <HStack justify="start" mb={2}>
                          <Text fontWeight="bold">Photos</Text>
                        </HStack>

                        <Box
                          width="100%"
                          overflowX="auto"
                          sx={{
                            "&::-webkit-scrollbar": {
                              height: "4px",
                            },
                            "&::-webkit-scrollbar-track": {
                              height: "6px",
                              background: "gray.100",
                            },
                            "&::-webkit-scrollbar-thumb": {
                              background: "gray.300",
                              borderRadius: "24px",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                              background: "gray.400",
                            },
                            scrollBehavior: "smooth",
                            WebkitOverflowScrolling: "touch",
                          }}
                        >
                          <HStack spacing={2} pb={2}>
                            {room?.cardContent?.photos.map(
                              (photo: any, photoIndex: number) => (
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
                                    transition="transform 0.4s ease-in-out"
                                    _hover={{
                                      transform: "scale(1.2)",
                                    }}
                                  />
                                  <Box
                                    position="absolute"
                                    top="0"
                                    left="0"
                                    width="100%"
                                    height="100%"
                                    bg="blackAlpha.100"
                                    opacity="0"
                                    transition="opacity 0.4s ease-in-out"
                                    _hover={{
                                      opacity: "1",
                                      cursor: "pointer",
                                    }}
                                  />
                                </Box>
                              )
                            )}
                          </HStack>
                        </Box>
                      </Box>

                      <HStack spacing={4} mt={4}>
                        <Button colorScheme="red" flex={2} borderRadius="md">
                          Book now
                        </Button>
                        <Link
                          href={`/hotelDetail/${room?.cardContent?.zoomName}`}
                          style={{ display: "block" }}
                          className="flex-2/12"
                        >
                          <Button
                            colorScheme="red"
                            w={"full"}
                            borderRadius="md"
                          >
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
