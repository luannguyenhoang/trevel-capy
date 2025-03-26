import {
  Box,
  Button,
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
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FaBed,
  FaCalendar,
  FaCheck,
  FaClock,
  FaHotel,
  FaRulerCombined,
  FaShower,
  FaSmokingBan,
  FaStar,
  FaSwimmingPool,
  FaUser,
} from "react-icons/fa";

export default function TongQuanHotel({ prop }: { prop: any }) {
  return (
    <Tabs colorScheme="blue" mb={8}>
      <TabList>
        <Tab fontWeight="semibold">Tổng quan</Tab>
        <Tab fontWeight="semibold">Tiện nghi</Tab>
        <Tab fontWeight="semibold">Đánh giá</Tab>
        <Tab fontWeight="semibold">Chính sách</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Grid templateColumns={{ base: "1fr", md: "3fr 1fr" }} gap={8}>
            <GridItem>
              <VStack align="start" spacing={6}>
                <Box>
                  <Heading as="h3" size="md" mb={4}>
                    Mô tả
                  </Heading>
                  <Text color="gray.700" lineHeight="tall">
                    {prop.summaryOfContent ||
                      `Phòng ${prop.zoomName} là sự lựa chọn hoàn hảo cho kỳ nghỉ của bạn tại Seashore Hotel & Resort. Phòng được thiết kế hiện đại với không gian rộng rãi, thoáng mát, cung cấp đầy đủ tiện nghi và dịch vụ cao cấp. Từ ban công phòng bạn có thể ngắm nhìn toàn cảnh biển tuyệt đẹp hoặc khu vườn xanh mát của resort.`}
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
                    <Text>Diện tích: {prop.m2 || "50"} m²</Text>
                  </HStack>
                  <HStack>
                    <Box color="blue.500" w="24px">
                      <FaUser />
                    </Box>
                    <Text>Sức chứa: {prop.people} người</Text>
                  </HStack>
                  <HStack>
                    <Box color="blue.500" w="24px">
                      <FaBed />
                    </Box>
                    <Text>Giường: {prop.bed} </Text>
                  </HStack>
                  <HStack>
                    <Box color="blue.500" w="24px">
                      <FaHotel />
                    </Box>
                    <Text>Hướng phòng:{prop.roomDirection}</Text>
                  </HStack>
                  <HStack>
                    <Box color="blue.500" w="24px">
                      <FaClock />
                    </Box>
                    <Text>
                      Check-in: {prop.checkIn}, Check-out: {prop.checkOut}
                    </Text>
                  </HStack>
                </VStack>
              </Box>
            </GridItem>
          </Grid>
        </TabPanel>

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
                {(prop.roomAmenities || "")
                  .split("\r\n")
                  .map((item: any, index: number) => (
                    <ListItem key={index}>
                      <ListIcon as={FaCheck} color="green.500" />
                      {item}
                    </ListItem>
                  ))}
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
                {(prop.bathroom || "")
                  .split("\r\n")
                  .map((item: any, index: number) => (
                    <ListItem key={index}>
                      <ListIcon as={FaCheck} color="green.500" />
                      {item}
                    </ListItem>
                  ))}
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
                {(prop.hotelServices || "")
                  .split("\r\n")
                  .map((item: any, index: number) => (
                    <ListItem key={index}>
                      <ListIcon as={FaCheck} color="green.500" />
                      {item}
                    </ListItem>
                  ))}
              </List>
            </Box>
          </SimpleGrid>
        </TabPanel>

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

              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 4 }}
                spacing={4}
                mb={8}
              >
                <Box p={4} borderRadius="md" bgColor="gray.50">
                  <Text fontWeight="bold" mb={2}>
                    Sạch sẽ
                  </Text>
                  <Box display={"flex"}>
                    <HStack>
                      <Box
                        bgColor="green.500"
                        h="10px"
                        flex={9}
                        borderRadius="full"
                      ></Box>
                    </HStack>
                    <Text textAlign="right" fontSize="sm">
                      4.9
                    </Text>
                  </Box>
                </Box>
                <Box p={4} borderRadius="md" bgColor="gray.50">
                  <Text fontWeight="bold" mb={2}>
                    Thoải mái
                  </Text>
                  <HStack>
                    <Box
                      bgColor="green.500"
                      h="10px"
                      flex={9}
                      borderRadius="full"
                    ></Box>
                    <Box
                      bgColor="gray.200"
                      h="10px"
                      flex={1}
                      borderRadius="full"
                    ></Box>
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
                    <Box
                      bgColor="green.500"
                      h="10px"
                      flex={8}
                      borderRadius="full"
                    ></Box>
                    <Box
                      bgColor="gray.200"
                      h="10px"
                      flex={2}
                      borderRadius="full"
                    ></Box>
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
                    <Box
                      bgColor="green.500"
                      h="10px"
                      flex={9}
                      borderRadius="full"
                    ></Box>
                    <Box
                      bgColor="gray.200"
                      h="10px"
                      flex={1}
                      borderRadius="full"
                    ></Box>
                  </HStack>
                  <Text textAlign="right" fontSize="sm">
                    4.8
                  </Text>
                </Box>
              </SimpleGrid>
            </Box>

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
                  Phòng rất đẹp và sạch sẽ. Quang cảnh từ ban công thật tuyệt
                  vời, đặc biệt vào buổi sáng khi có thể ngắm bình minh. Nhân
                  viên rất nhiệt tình và chuyên nghiệp. Bữa sáng đa dạng và ngon
                  miệng. Tôi sẽ quay lại trong kỳ nghỉ tiếp theo!
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
                  Phòng rộng rãi và thoải mái. Vị trí tuyệt vời, đi bộ ra biển
                  chỉ mất 5 phút. Tuy nhiên, WiFi hơi chậm vào buổi tối. Dịch vụ
                  nhà hàng khá tốt, thức ăn ngon miệng.
                </Text>
              </Box>
            </VStack>

            <Button variant="outline" alignSelf="center">
              Xem thêm đánh giá
            </Button>
          </VStack>
        </TabPanel>

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
                      <Text>Nhận phòng từ 14:00, trả phòng trước 12:00</Text>
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
                        Trẻ em dưới 5 tuổi được ở miễn phí khi sử dụng giường có
                        sẵn. Trẻ từ 6 tuổi trở lên được tính như người lớn.
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
                        Đây là phòng không hút thuốc. Phí phạt 1.000.000 VND nếu
                        vi phạm.
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
                  {/* <Image src="/visa.png" alt="Visa" height="30px" />
                <Image
                  src="/mastercard.png"
                  alt="Mastercard"
                  height="30px"
                />
                <Image src="/jcb.png" alt="JCB" height="30px" />
                <Image src="/momo.png" alt="MoMo" height="30px" /> */}
                </HStack>
              </Box>
            </Box>
          </SimpleGrid>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
