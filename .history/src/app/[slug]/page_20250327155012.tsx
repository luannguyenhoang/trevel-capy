"use client";
import {
  calculateDiscountPercentage,
  parseVietnamCurrency,
} from "@/utils/common";
import { GET_KHACHSAN_BY_ZOOMNAME } from "@/utils/querys";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
  FaWhatsapp,
} from "react-icons/fa";
import TongQuanHotel from "../hotelDetail/tongQuan";
import TuongTu from "../hotelDetail/tuongTu";
import CauHoi from "../hotelDetail/cauHoi";
import Loading from "../components/molecules/Loading";
import { ScrollAnimation } from "../components/molecules/ScrollAnimation";

export default function HotelDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (!slug) return;
    async function fetchData() {
      try {
        const res = await fetch("/api/graphQLs", {
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
        console.log(result);

        const allRooms =
          result.data?.allKhachSan?.nodes?.[0]?.cardZoom?.roomCardChild || [];
        const roomDetail = allRooms.find(
          (room: any) => room.cardContent.slug === slug,
          console.log(allRooms.find((room: any) => room.cardContent.slug))
        );

        if (roomDetail) {
          setData(roomDetail.cardContent);
        } else {
          setError("Không tìm thấy thông tin phòng");
        }
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu");
      }
      setLoading(false);
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
          <Link href="/khach-san">
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
        <Grid templateColumns={{ base: "1fr", lg: "3fr 1fr" }} gap={4} mb={8}>
          <GridItem>
            <Box
              borderRadius="lg"
              overflow="hidden"
              height={{ base: "300px", md: "500px" }}
              position="relative"
            >
              <Image
                src={allImages[selectedImageIndex]}
                alt={data.zoomName}
                objectFit="cover"
                w="100%"
                h="100%"
              />
            </Box>
          </GridItem>

          <GridItem>
            <VStack spacing={4} height="100%">
              <Box
                maxHeight="260px"
                overflowY="auto"
                width="100%"
                sx={{
                  "&::-webkit-scrollbar": {
                    width: "4px",
                  },
                  "&::-webkit-scrollbar-track": {
                    width: "6px",
                    background: "gray.100",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "gray.300",
                    borderRadius: "24px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "gray.400",
                  },
                }}
              >
                <SimpleGrid columns={2} spacing={4} width="100%">
                  {allImages.map((src, index) => (
                    <Box
                      key={index}
                      borderRadius="md"
                      overflow="hidden"
                      height="120px"
                      cursor="pointer"
                      border={
                        selectedImageIndex === index
                          ? "2px solid #3182CE"
                          : "none"
                      }
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <Image
                        src={src}
                        alt={`Room image ${index + 1}`}
                        objectFit="cover"
                        w="100%"
                        h="100%"
                      />
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>

              <Box
                p={6}
                borderRadius="lg"
                backgroundColor="white"
                boxShadow="md"
                width="100%"
                mt="auto"
              >
                <HStack justify="space-between" mb={4}>
                  <Box>
                    <Text as="s" color="gray.500" fontSize="sm">
                      {data.maxPrice} VND
                    </Text>
                    <Text color="red.500" fontSize="2xl" fontWeight="bold">
                      {data.minPrice} VND
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {data.time || "1 đêm"} / {data.people || "2"} người
                    </Text>
                  </Box>
                  {calculateDiscountPercentage(
                    parseVietnamCurrency(data.maxPrice),
                    parseVietnamCurrency(data.minPrice)
                  ) > 0 && (
                    <Badge colorScheme="green" fontSize="lg" p={2}>
                      -
                      {calculateDiscountPercentage(
                        parseVietnamCurrency(data.maxPrice),
                        parseVietnamCurrency(data.minPrice)
                      )}
                      %
                    </Badge>
                  )}
                </HStack>
                <Button colorScheme="red" size="lg" w="100%" fontSize="md">
                  Đặt phòng ngay
                </Button>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </ScrollAnimation>
      <ScrollAnimation delay={0.5}>
        <TongQuanHotel prop={data} />
      </ScrollAnimation>
      <ScrollAnimation delay={0.4}>
        <TuongTu prop={data} />
      </ScrollAnimation>
      <ScrollAnimation delay={0.4}>
        <CauHoi />
      </ScrollAnimation>

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
