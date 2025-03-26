import Loading from "@/components/molecules/Loading";
import {
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaBed,
  FaCalendar,
  FaCheck,
  FaClock,
  FaHotel,
  FaMapMarkerAlt,
  FaPhone,
  FaRulerCombined,
  FaShower,
  FaSmokingBan,
  FaStar,
  FaSwimmingPool,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa";
import 

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
        const query = `
          query GetRoomDetail {
            allKhachSan {
              nodes {
                cardZoom {
                  roomCardChild {
                    cardContent {
                      zoomName
                      image {
                        node {
                          mediaItemUrl
                        }
                      }
                      maxPrice
                      minPrice
                      time
                      summaryOfContent
                      m2
                      people
                      photos {
                        child {
                          node {
                            mediaItemUrl
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `;

        const res = await fetch("/api/graphQL", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
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
    <Container maxW="container.xl" py={8}>
      <HStack spacing={4} mb={6}>
        <Link href="/khachSan">
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
            <SimpleGrid columns={2} spacing={4} width="100%">
              {allImages.slice(0, 4).map((src, index) => (
                <Box
                  key={index}
                  borderRadius="md"
                  overflow="hidden"
                  height="120px"
                  cursor="pointer"
                  border={
                    selectedImageIndex === index ? "2px solid #3182CE" : "none"
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
                    {data.time || "1 đêm"} / {data.people} người
                  </Text>
                </Box>
                <Badge colorScheme="green" fontSize="lg" p={2}>
                  -20%
                </Badge>
              </HStack>
              <Button colorScheme="red" size="lg" w="100%" fontSize="md">
                Đặt phòng ngay
              </Button>
            </Box>
          </VStack>
        </GridItem>
      </Grid>
      <tongQuan />
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

      <Box
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        bg="white"
        boxShadow="0 -4px 6px -1px rgba(0, 0, 0, 0.1)"
        p={4}
        zIndex={10}
        display={{ base: "block", md: "none" }}
      >
        <Container maxW="container.xl">
          <HStack justify="space-between">
            <Box>
              <Text as="s" color="gray.500" fontSize="sm">
                {data.maxPrice} VND
              </Text>
              <Text color="red.500" fontSize="xl" fontWeight="bold">
                {data.minPrice} VND
              </Text>
            </Box>
            <Button colorScheme="red" size="lg">
              Đặt ngay
            </Button>
          </HStack>
        </Container>
      </Box>

      <Box mb={10}>
        <Heading as="h2" size="lg" mb={6}>
          Câu hỏi thường gặp
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Box>
            <VStack align="start" spacing={6}>
              <Box>
                <Heading as="h4" size="sm" mb={2}>
                  Có bao gồm bữa sáng không?
                </Heading>
                <Text>
                  Có, tất cả các đặt phòng đều bao gồm bữa sáng buffet tại nhà
                  hàng chính của khách sạn từ 6:30 đến 10:00 sáng.
                </Text>
              </Box>
              <Box>
                <Heading as="h4" size="sm" mb={2}>
                  Có thể đặt thêm giường phụ không?
                </Heading>
                <Text>
                  Có thể đặt thêm giường phụ với chi phí 500.000 VND/đêm, tùy
                  thuộc vào tình trạng phòng trống.
                </Text>
              </Box>
              <Box>
                <Heading as="h4" size="sm" mb={2}>
                  Khách sạn có bãi đỗ xe không?
                </Heading>
                <Text>
                  Có, khách sạn có bãi đỗ xe miễn phí cho khách lưu trú. Vui
                  lòng thông báo trước nếu bạn đi bằng ô tô.
                </Text>
              </Box>
            </VStack>
          </Box>
          <Box>
            <VStack align="start" spacing={6}>
              <Box>
                <Heading as="h4" size="sm" mb={2}>
                  Khoảng cách từ khách sạn đến biển là bao xa?
                </Heading>
                <Text>
                  Khách sạn nằm ngay sát biển, chỉ mất khoảng 2 phút đi bộ từ
                  sảnh chính đến bãi biển riêng của resort.
                </Text>
              </Box>
              <Box>
                <Heading as="h4" size="sm" mb={2}>
                  Có dịch vụ đưa đón sân bay không?
                </Heading>
                <Text>
                  Có, khách sạn cung cấp dịch vụ đưa đón sân bay với chi phí
                  300.000 VND/lượt. Vui lòng đặt trước ít nhất 24 giờ.
                </Text>
              </Box>
              <Box>
                <Heading as="h4" size="sm" mb={2}>
                  Có thể check-in sớm hoặc check-out muộn không?
                </Heading>
                <Text>
                  Check-in sớm và check-out muộn được áp dụng tùy thuộc vào tình
                  trạng phòng. Check-out muộn sau 14:00 sẽ tính phí 50% giá
                  phòng một đêm.
                </Text>
              </Box>
            </VStack>
          </Box>
        </SimpleGrid>
      </Box>

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

      {/* Liên hệ đặt phòng */}
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
