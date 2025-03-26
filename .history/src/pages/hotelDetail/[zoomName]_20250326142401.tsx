import Loading from "@/components/molecules/Loading";
import {
  Badge,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
  FaWhatsapp,
} from "react-icons/fa";
import TongQuanHotel from "./tongQuan";
import CauHoi from "./cauhoi";
import { GET_KHACHSAN_BY_ZOOMNAME } from "@/utils/querys";
import {
  parseVietnamCurrency,
  calculateDiscountPercentage,
} from "@/utils/common";
import { ScrollAnimation } from "@/components/molecules/ScrollAnimation";

export default function HotelDetail() {
  const router = useRouter();
  const { zoomName } = router.query;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (!zoomName) return;
    console.log(zoomName);

    async function fetchData() {
      try {
        const res = await fetch("/api/graphQL", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: GET_KHACHSAN_BY_ZOOMNAME,
          }),
        });

        if (!res.ok) {
          throw new Error("Không thể tải dữ liệu");
        }

        const result = await res.json();
        console.log("API Response:", result);

        const allRooms =
          result.data?.allKhachSan?.nodes?.[0]?.cardZoom?.roomCardChild || [];
        const roomDetail = allRooms.find(
          (room: any) => room.cardContent.zoomName === zoomName
        );

        if (roomDetail) {
          setData(roomDetail.cardContent);
        } else {
          setError("Không tìm thấy thông tin phòng");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [zoomName]);

  if (loading) {
    return <Loading />;
  }

  if (error || !data) {
    return (
      <Container maxW="container.xl" py={10}>
        <VStack spacing={4} align="center">
          <Heading color="red.500">Lỗi</Heading>
          <Text>{error || "Không tìm thấy dữ liệu phòng"}</Text>
          <Link href="/khachSan">
            <Button leftIcon={<FaArrowLeft />} colorScheme="blue">
              Quay lại danh sách phòng
            </Button>
          </Link>
        </VStack>
      </Container>
    );
  }

  const mainImage = data.image?.node?.mediaItemUrl || "/quanCafe.jpg";
  const allImages = [
    mainImage,
    ...(data.photos?.map((photo: any) => photo?.child?.node?.mediaItemUrl) ||
      []),
  ].filter(Boolean);

  return (
    <Container maxW="container.xl" py={"20"}>
      <HStack spacing={4} mb={6}>
        <Link href="/khach-san">
          <Button leftIcon={<FaArrowLeft />} variant="outline" size="sm">
            Quay lại danh sách phòng
          </Button>
        </Link>
        <Text color="gray.500">Trang chủ / Khách sạn / {data.zoomName}</Text>
      </HStack>

      <Box mb={8}>
        <Heading as="h1" size="xl" mb={2}>
          {data.zoomName}
        </Heading>
        <HStack spacing={4}>
          <HStack>
            <FaMapMarkerAlt color="#718096" />
            <Text color="gray.500">Seashore Hotel & Resort</Text>
          </HStack>
          <HStack>
            <FaStar color="#F6AD55" />
            <Text fontWeight="medium">4.8 (124 đánh giá)</Text>
          </HStack>
        </HStack>
      </Box>

      <ScrollAnimation delay={0.3}>
        {" "}
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
      </ScrollAnimation>
      <TongQuanHotel prop={data} />
      <Box mb={10}>
        <Heading as="h2" size="lg" mb={6}>
          Phòng tương tự
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {[1, 2, 3].map((i) => (
            <Box
              key={i}
              borderRadius="lg"
              overflow="hidden"
              boxShadow="base"
              transition="all 0.3s"
              _hover={{ transform: "translateY(-5px)", boxShadow: "lg" }}
            >
              <Box position="relative" height="200px">
                <Image
                  src={`/quanCafe.jpg`}
                  alt={`Phòng tương tự ${i}`}
                  objectFit="cover"
                  w="100%"
                  h="100%"
                />
              </Box>
              <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                  {data.zoomName} {i}
                </Heading>
                <HStack mb={2}>
                  <Text color="gray.500" fontSize="sm">
                    <s>2.500.000 VND</s>
                  </Text>
                  <Text color="red.500" fontSize="xl" fontWeight="bold">
                    2.000.000 VND
                  </Text>
                </HStack>
                <HStack spacing={3} mb={3}>
                  <Badge colorScheme="green">Free wifi</Badge>
                  <Badge colorScheme="blue">Bao gồm bữa sáng</Badge>
                </HStack>
                <Text fontSize="sm" noOfLines={2} color="gray.600" mb={4}>
                  Phòng sang trọng với đầy đủ tiện nghi cao cấp...
                </Text>
                <Button
                  as={Link}
                  href={`/hotelDetail/${encodeURIComponent(
                    data.zoomName + " " + i
                  )}`}
                  colorScheme="blue"
                  size="sm"
                  width="full"
                >
                  Xem chi tiết
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <CauHoi />

      <Box mb={10}>
        <Heading as="h2" size="lg" mb={6}>
          Vị trí
        </Heading>
        <Box
          borderRadius="lg"
          overflow="hidden"
          height="400px"
          position="relative"
        >
          {/* <Image src="/map.jpg" alt="Map" objectFit="cover" w="100%" h="100%" /> */}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="lg"
          >
            <VStack spacing={2} align="start">
              <Heading as="h3" size="md">
                Seashore Hotel & Resort
              </Heading>
              <HStack>
                <FaMapMarkerAlt color="#E53E3E" />
                <Text>
                  123 Bãi biển Đẹp, Phường 1, Thành phố Biển, Việt Nam
                </Text>
              </HStack>
              <Button
                colorScheme="blue"
                size="sm"
                leftIcon={<FaMapMarkerAlt />}
              >
                Xem trên Google Maps
              </Button>
            </VStack>
          </Box>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={6}>
          <HStack align="start">
            <Box color="blue.500" mt={1}>
              <FaMapMarkerAlt />
            </Box>
            <Box>
              <Text fontWeight="medium">Từ Sân bay</Text>
              <Text fontSize="sm">25 phút lái xe (15 km)</Text>
            </Box>
          </HStack>
          <HStack align="start">
            <Box color="blue.500" mt={1}>
              <FaMapMarkerAlt />
            </Box>
            <Box>
              <Text fontWeight="medium">Đến Trung tâm thành phố</Text>
              <Text fontSize="sm">10 phút lái xe (5 km)</Text>
            </Box>
          </HStack>
          <HStack align="start">
            <Box color="blue.500" mt={1}>
              <FaMapMarkerAlt />
            </Box>
            <Box>
              <Text fontWeight="medium">Đến Chợ đêm</Text>
              <Text fontSize="sm">15 phút đi bộ (1.2 km)</Text>
            </Box>
          </HStack>
        </SimpleGrid>
      </Box>

      <Box bg="blue.50" p={8} borderRadius="lg" mb={10}>
        <VStack spacing={4} align="center">
          <Heading as="h2" size="lg">
            Cần hỗ trợ thêm?
          </Heading>
          <Text textAlign="center" maxW="xl">
            Đội ngũ nhân viên của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Liên
            hệ ngay để được tư vấn và đặt phòng.
          </Text>
          <HStack spacing={6} mt={4}>
            <Button colorScheme="blue" leftIcon={<FaPhone />} size="lg">
              Gọi ngay
            </Button>
            <Button colorScheme="green" leftIcon={<FaWhatsapp />} size="lg">
              Chat Zalo
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Container>
  );
}
