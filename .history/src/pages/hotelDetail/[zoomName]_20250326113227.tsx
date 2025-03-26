import Loading from "@/components/molecules/Loading";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  Divider,
  Badge,
  List,
  ListItem,
  ListIcon,
  Spacer,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FaCalendar,
  FaCheck,
  FaClock,
  FaCocktail,
  FaCoffee,
  FaHotel,
  FaMapMarkerAlt,
  FaParking,
  FaRulerCombined,
  FaShower,
  FaSmokingBan,
  FaStar,
  FaSwimmingPool,
  FaUser,
  FaUtensils,
  FaWifi,
  FaArrowLeft,
  FaBed,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";

export default function HotelDetail() {
  const router = useRouter();
  const { zoomName } = router.query;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (!zoomName) return;

    async function fetchData() {
      try {
        // Tạo query GraphQL để lấy thông tin chi tiết phòng
        const query = `
          query GetRoomDetail($name: String!) {
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
            variables: { name: zoomName },
          }),
        });

        if (!res.ok) {
          throw new Error("Không thể tải dữ liệu");
        }

        const result = await res.json();
        console.log("API Response:", result);

        // Tìm phòng có zoomName phù hợp
        const allRooms = result.data?.allKhachSan?.nodes?.[0]?.cardZoom?.roomCardChild || [];
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

  // Chuẩn bị mảng ảnh để hiển thị
  const mainImage = data.image?.node?.mediaItemUrl || "/quanCafe.jpg";
  const allImages = [
    mainImage,
    ...(data.photos?.map((photo: any) => photo?.child?.node?.mediaItemUrl) || []),
  ].filter(Boolean);

  return (
    <Container maxW="container.xl" py={8}>
      {/* Đường dẫn và nút quay lại */}
      <HStack spacing={4} mb={6}>
        <Link href="/khachSan">
          <Button leftIcon={<FaArrowLeft />} variant="outline" size="sm">
            Quay lại danh sách phòng
          </Button>
        </Link>
        <Text color="gray.500">
          Trang chủ / Khách sạn / {data.zoomName}
        </Text>
      </HStack>

      {/* Tiêu đề phòng */}
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

      {/* Phần hình ảnh chính */}
      <Grid
        templateColumns={{ base: "1fr", lg: "3fr 1fr" }}
        gap={4}
        mb={8}
      >
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
                  border={selectedImageIndex === index ? "2px solid #3182CE" : "none"}
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

            {/* Thông tin giá và đặt phòng */}
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
              <Button
                colorScheme="red"
                size="lg"
                w="100%"
                fontSize="md"
              >
                Đặt phòng ngay
              </Button>
            </Box>
          </VStack>
        </GridItem>
      </Grid>

      {/* Tab thông tin chi tiết */}
      <Tabs colorScheme="blue" mb={8}>
        <TabList>
          <Tab fontWeight="semibold">Tổng quan</Tab>
          <Tab fontWeight="semibold">Tiện nghi</Tab>
          <Tab fontWeight="semibold">Đánh giá</Tab>
          <Tab fontWeight="semibold">Chính sách</Tab>
        </TabList>

        <TabPanels>
          {/* Tab Tổng quan */}
          <TabPanel>
            <Grid templateColumns={{ base: "1fr", md: "3fr 1fr" }} gap={8}>
              <GridItem>
                <VStack align="start" spacing={6}>
                  <Box>
                    <Heading as="h3" size="md" mb={4}>
                      Mô tả
                    </Heading>
                    <Text color="gray.700" lineHeight="tall">
                      {data.summaryOfContent || 
                      `Phòng ${data.zoomName} là sự lựa chọn hoàn hảo cho kỳ nghỉ của bạn tại Seashore Hotel & Resort. Phòng được thiết kế hiện đại với không gian rộng rãi, thoáng mát, cung cấp đầy đủ tiện nghi và dịch vụ cao cấp. Từ ban công phòng bạn có thể ngắm nhìn toàn cảnh biển tuyệt đẹp hoặc khu vườn xanh mát của resort.`}
                    </Text>
                  </Box>

                  <Box width="100%">
                    <Heading as="h3" size="md" mb={4}>
                      Điểm nổi bật
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                      <HStack>
                        <Box color="green.500">
                          <FaCheck />
                        </Box>
                        <Text>View biển tuyệt đẹp</Text>
                      </HStack>
                      <HStack>
                        <Box color="green.500">
                          <FaCheck />
                        </Box>
                        <Text>Giường King size</Text>
                      </HStack>
                      <HStack>
                        <Box color="green.500">
                          <FaCheck />
                        </Box>
                        <Text>Bữa sáng miễn phí</Text>
                      </HStack>
                      <HStack>
                        <Box color="green.500">
                          <FaCheck />
                        </Box>
                        <Text>Dịch vụ dọn phòng hàng ngày</Text>
                      </HStack>
                      <HStack>
                        <Box color="green.500">
                          <FaCheck />
                        </Box>
                        <Text>Smart TV, minibar</Text>
                      </HStack>
                      <HStack>
                        <Box color="green.500">
                          <FaCheck />
                        </Box>
                        <Text>Phòng tắm sang trọng</Text>
                      </HStack>
                    </SimpleGrid>
                  </Box>
                </VStack>
              </GridItem>

              <GridItem>
                <Box p={6} borderRadius="lg" bgColor="blue.50">
                  <Heading as="h3" size="md" mb={4}>
                    Thông tin phòng
                  </Heading>
                  <VStack spacing={4} align="start">
                    <HStack>
                      <Box color="blue.500" w="24px">
                        <FaRulerCombined />
                      </Box>
                      <Text>Diện tích: {data.m2 || "50"} m²</Text>
                    </HStack>
                    <HStack>
                      <Box color="blue.500" w="24px">
                        <FaUser />
                      </Box>
                      <Text>Sức chứa: {data.people} người</Text>
                    </HStack>
                    <HStack>
                      <Box color="blue.500" w="24px">
                        <FaBed />
                      </Box>
                      <Text>Giường: 1 giường King-size</Text>
                    </HStack>
                    <HStack>
                      <Box color="blue.500" w="24px">
                        <FaHotel />
                      </Box>
                      <Text>Hướng phòng: Hướng biển</Text>
                    </HStack>
                    <HStack>
                      <Box color="blue.500" w="24px">
                        <FaClock />
                      </Box>
                      <Text>Check-in: 14:00, Check-out: 12:00</Text>
                    </HStack>
                  </VStack>
                </Box>
              </GridItem>
            </Grid>
          </TabPanel>

          {/* Tab Tiện nghi */}
          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <Box>
                <Heading as="h3" size="md" mb={4} color="blue.600">
                  <HStack>
                    <FaHotel />
                    <Text>Tiện nghi phòng</Text>
                  </HStack>
                </Heading>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Điều hòa nhiệt độ
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    TV màn hình phẳng
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Minibar đầy đủ
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Két an toàn
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Bàn làm việc
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Ban công/Sân hiên
                  </ListItem>
                </List>
              </Box>

              <Box>
                <Heading as="h3" size="md" mb={4} color="blue.600">
                  <HStack>
                    <FaShower />
                    <Text>Phòng tắm</Text>
                  </HStack>
                </Heading>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Bồn tắm và vòi sen riêng
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Đồ vệ sinh cá nhân cao cấp
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Máy sấy tóc
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Áo choàng tắm
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Dép đi trong phòng
                  </ListItem>
                </List>
              </Box>

              <Box>
                <Heading as="h3" size="md" mb={4} color="blue.600">
                  <HStack>
                    <FaSwimmingPool />
                    <Text>Dịch vụ khách sạn</Text>
                  </HStack>
                </Heading>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    WiFi miễn phí
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Bữa sáng buffet
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Hồ bơi ngoài trời
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Phòng gym đầy đủ thiết bị
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Dịch vụ Spa
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Đưa đón sân bay (có phí)
                  </ListItem>
                </List>
              </Box>
            </SimpleGrid>
          </TabPanel>

          {/* Tab Đánh giá */}
          <TabPanel>
            <VStack spacing={8} align="start">
              <Box width="100%">
                <HStack justify="space-between" mb={4}>
                  <Heading as="h3" size="md">
                    Đánh giá từ khách hàng
                  </Heading>
                  <HStack>
                    <Box
                      bgColor="green.500"
                      color="white"
                      fontWeight="bold"
                      px={3}
                      py={1}
                      borderRadius="md"
                    >
                      4.8/5
                    </Box>
                    <Text fontWeight="medium">(124 đánh giá)</Text>
                  </HStack>
                </HStack>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mb={8}>
                  <Box p={4} borderRadius="md" bgColor="gray.50">
                    <Text fontWeight="bold" mb={2}>
                      Sạch sẽ
                    </Text>
                    <HStack>
                      <Box bgColor="green.500" h="10px" flex={9} borderRadius="full"></Box>
                      <Box bgColor="gray.200" h="10px" flex={1} borderRadius="full"></Box>
                    </HStack>
                    <Text textAlign="right" fontSize="sm">
                      4.9
                    </Text>
                  </Box>
                  <Box p={4} borderRadius="md" bgColor="gray.50">
                    <Text fontWeight="bold" mb={2}>
                      Thoải mái
                    </Text>
                    <HStack>
                      <Box bgColor="green.500" h="10px" flex={9} borderRadius="full"></Box>
                      <Box bgColor="gray.200" h="10px" flex={1} borderRadius="full"></Box>
                    </HStack>
                    <Text textAlign="right" fontSize="sm">
                      4.8
                    </Text>
                  </Box>
                  <Box p={4} borderRadius="md" bgColor="gray.50">
                    <Text fontWeight="bold" mb={2}>
                      Vị trí
                    </Text>
                    <HStack>
                      <Box bgColor="green.500" h="10px" flex={8} borderRadius="full"></Box>
                      <Box bgColor="gray.200" h="10px" flex={2} borderRadius="full"></Box>
                    </HStack>
                    <Text textAlign="right" fontSize="sm">
                      4.7
                    </Text>
                  </Box>
                  <Box p={4} borderRadius="md" bgColor="gray.50">
                    <Text fontWeight="bold" mb={2}>
                      Dịch vụ
                    </Text>
                    <HStack>
                      <Box bgColor="green.500" h="10px" flex={9} borderRadius="full"></Box>
                      <Box bgColor="gray.200" h="10px" flex={1} borderRadius="full"></Box>
                    </HStack>
                    <Text textAlign="right" fontSize="sm">
                      4.8
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>

              {/* Reviews mẫu */}
              <VStack spacing={6} width="100%" divider={<Divider />}>
                <Box width="100%">
                  <HStack mb={2}>
                    <Image
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Avatar"
                      borderRadius="full"
                      boxSize="40px"
                      mr={2}
                    />
                    <Box>
                      <Text fontWeight="bold">Nguyễn Thị Minh</Text>
                      <Text fontSize="sm" color="gray.500">
                        Tháng 6, 2023
                      </Text>
                    </Box>
                    <Spacer />
                    <HStack>
                      <FaStar color="#F6AD55" />
                      <FaStar color="#F6AD55" />
                      <FaStar color="#F6AD55" />
                      <FaStar color="#F6AD55" />
                      <FaStar color="#F6AD55" />
                    </HStack>
                  </HStack>
                  <Text>
                    Phòng rất đẹp và sạch sẽ. Quang cảnh từ ban công thật tuyệt vời, đặc biệt vào buổi sáng khi có thể ngắm bình minh. Nhân viên rất nhiệt tình và chuyên nghiệp. Bữa sáng đa dạng và ngon miệng. Tôi sẽ quay lại trong kỳ nghỉ tiếp theo!
                  </Text>
                </Box>

                <Box width="100%">
                  <HStack mb={2}>
                    <Image
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Avatar"
                      borderRadius="full"
                      boxSize="40px"
                      mr={2}
                    />
                    <Box>
                      <Text fontWeight="bold">Trần Văn Hùng</Text>
                      <Text fontSize="sm" color="gray.500">
                        Tháng 5, 2023
                      </Text>
                    </Box>
                    <Spacer />
                    <HStack>
                      <FaStar color="#F6AD55" />
                      <FaStar color="#F6AD55" />
                      <FaStar color="#F6AD55" />
                      <FaStar color="#F6AD55" />
                      <FaStar color="#E2E8F0" />
                    </HStack>
                  </HStack>
                  <Text>
                    Phòng rộng rãi và thoải mái. Vị trí tuyệt vời, đi bộ ra biển chỉ mất 5 phút. Tuy nhiên, WiFi hơi chậm vào buổi tối. Dịch vụ nhà hàng khá tốt, thức ăn ngon miệng.
                  </Text>
                </Box>
              </VStack>

              {/* Nút xem thêm đánh giá */}
              <Button variant="outline" alignSelf="center">
                Xem thêm đánh giá
              </Button>
            </VStack>
          </TabPanel>

          {/* Tab Chính sách */}
          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              <Box>
                <Heading as="h3" size="md" mb={4}>
                  Chính sách đặt phòng
                </Heading>
                <List spacing={4}>
                  <ListItem>
                    <HStack align="start">
                      <Box color="blue.500" mt={1}>
                        <FaCalendar />
                      </Box>
                      <Box>
                        <Text fontWeight="medium">Check-in / Check-out</Text>
                        <Text>
                          Nhận phòng từ 14:00, trả phòng trước 12:00
                        </Text>
                      </Box>
                    </HStack>
                  </ListItem>
                  <ListItem>
                    <HStack align="start">
                      <Box color="blue.500" mt={1}>
                        <FaUser />
                      </Box>
                      <Box>
                        <Text fontWeight="medium">Chính sách trẻ em</Text>
                        <Text>
                          Trẻ em dưới 5 tuổi được ở miễn phí khi sử dụng giường có sẵn. Trẻ từ 6 tuổi trở lên được tính như người lớn.
                        </Text>
                      </Box>
                    </HStack>
                  </ListItem>
                  <ListItem>
                    <HStack align="start">
                      <Box color="blue.500" mt={1}>
                        <FaSmokingBan />
                      </Box>
                      <Box>
                        <Text fontWeight="medium">Không hút thuốc</Text>
                        <Text>
                          Đây là phòng không hút thuốc. Phí phạt 1.000.000 VND nếu vi phạm.
                        </Text>
                      </Box>
                    </HStack>
                  </ListItem>
                </List>
              </Box>

              <Box>
                <Heading as="h3" size="md" mb={4}>
                  Chính sách hủy phòng
                </Heading>
                <Box p={4} borderRadius="md" bgColor="gray.50">
                  <List spacing={4}>
                    <ListItem>
                      <Text fontWeight="medium">Trước 7 ngày</Text>
                      <Text>Hoàn tiền 100% giá trị đặt phòng</Text>
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="medium">Trước 3-7 ngày</Text>
                      <Text>Hoàn tiền 70% giá trị đặt phòng</Text>
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="medium">Dưới 3 ngày</Text>
                      <Text>Không hoàn tiền</Text>
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="medium">Không đến</Text>
                      <Text>Không hoàn tiền, tính toàn bộ phí</Text>
                    </ListItem>
                  </List>
                </Box>
                
                <Box mt={8}>
                  <Heading as="h3" size="md" mb={4}>
                    Phương thức thanh toán
                  </Heading>
                  <Text mb={2}>Chấp nhận các phương thức thanh toán sau:</Text>
                  <HStack spacing={4} mt={2}>
                    <Image src="/visa.png" alt="Visa" height="30px" />
                    <Image src="/mastercard.png" alt="Mastercard" height="30px" />
                    <Image src="/jcb.png" alt="JCB" height="30px" />
                    <Image src="/momo.png" alt="MoMo" height="30px" />
                  </HStack>
                </Box>
              </Box>
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Phần phòng tương tự */}
      <Box mb={10}>
        <Heading as="h2" size="lg" mb={6}>
          Phòng tương tự
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {/* Mẫu phòng tương tự */}
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
                  href={`/hotelDetail/${encodeURIComponent(data.zoomName + " " + i)}`}
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
      
      {/* Phần đặt phòng */}
      <Box 
        position="fixed" 
        bottom="0" 
        left="0" 
        right="0" 
        bg="white" 
        boxShadow="0 -4px 6px -1px rgba(0, 0, 0, 0.1)" 
        p={4}
        zIndex={10}
        display={{ base: 'block', md: 'none' }}
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

      {/* FAQ Section */}
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
                  Có, tất cả các đặt phòng đều bao gồm bữa sáng buffet tại nhà hàng chính của khách sạn từ 6:30 đến 10:00 sáng.
                </Text>
              </Box>
              <Box>
                <Heading as="h4" size="sm" mb={2}>
                  Có thể đặt thêm giường phụ không?
                </Heading>
                <Text>
                  Có thể đặt thêm giường phụ với chi phí 500.000 VND/đêm, tùy thuộc vào tình trạng phòng trống.
                </Text>
              </Box>
              <Box>
                <Heading as="h4" size="sm" mb={2}>
                  Khách sạn có bãi đỗ xe không?
                </Heading>
                <Text>
                  Có, khách sạn có bãi đỗ xe miễn phí cho khách lưu trú. Vui lòng thông báo trước nếu bạn đi bằng ô tô.
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
                  Khách sạn nằm ngay sát biển, chỉ mất khoảng 2 phút đi bộ từ sảnh chính đến bãi biển riêng của resort.
                </Text>
              </Box>
              <Box>
                <Heading as="h4" size="sm" mb={2}>
                  Có dịch vụ đưa đón sân bay không?
                </Heading>
                <Text>
                  Có, khách sạn cung cấp dịch vụ đưa đón sân bay với chi phí 300.000 VND/lượt. Vui lòng đặt trước ít nhất 24 giờ.
                </Text>
              </Box>
              <Box>
                <Heading as="h4" size="sm" mb={2}>
                  Có thể check-in sớm hoặc check-out muộn không?
                </Heading>
                <Text>
                  Check-in sớm và check-out muộn được áp dụng tùy thuộc vào tình trạng phòng. Check-out muộn sau 14:00 sẽ tính phí 50% giá phòng một đêm.
                </Text>
              </Box>
            </VStack>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Map Section */}
      <Box mb={10}>
        <Heading as="h2" size="lg" mb={6}>
          Vị trí
        </Heading>
        <Box borderRadius="lg" overflow="hidden" height="400px" position="relative">
          <Image
            src="/map.jpg"
            alt="Map"
            objectFit="cover"
            w="100%"
            h="100%"
          />
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
                <Text>123 Bãi biển Đẹp, Phường 1, Thành phố Biển, Việt Nam</Text>
              </HStack>
              <Button colorScheme="blue" size="sm" leftIcon={<FaMapMarkerAlt />}>
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
      <Box 
        bg="blue.50" 
        p={8} 
        borderRadius="lg" 
        mb={10}
      >
        <VStack spacing={4} align="center">
          <Heading as="h2" size="lg">
            Cần hỗ trợ thêm?
          </Heading>
          <Text textAlign="center" maxW="xl">
            Đội ngũ nhân viên của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Liên hệ ngay để được tư vấn và đặt phòng.
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