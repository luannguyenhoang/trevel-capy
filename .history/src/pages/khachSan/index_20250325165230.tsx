import {
    Badge,
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
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import {
    FaCalendarAlt,
    FaCar,
    FaSearch,
    FaSwimmingPool,
    FaUser,
    FaUtensils,
    FaWifi,
} from "react-icons/fa";

export default function KhachSan() {
  return (
    <>
      <Box
        bgImage="url('/quanCafe.jpg')"
        bgPosition="center"
        h="500px"
        position="relative"
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
            py={20}
            textColor={"black"}
          >
            <VStack spacing={6} color="white" textAlign="center">
              <Heading size="2xl">Tìm Khách Sạn Phù Hợp Với Bạn</Heading>
              <Text fontSize="xl">
                Khám phá những khách sạn tốt nhất với giá cả hợp lý
              </Text>

               <HStack
                spacing={4}
                bg="white"
                p={6}
                borderRadius="lg"
                w="full"
                maxW="4xl"
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

                <Button colorScheme="blue" px={8}>
                  Tìm Kiếm
                </Button>
              </HStack>
            </VStack>
          </Container>
        </Box>
      </Box>

      <Container maxW="container.xl" py={12}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {/* Card Khách Sạn */}
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardBody>
              <Image
                src="quanCafe.jpg"
                alt="Khách sạn"
                borderRadius="lg"
                className="h-64 w-full object-cover"
              />
              <Stack mt={4} spacing={3}>
                <Box>
                  <HStack justify="space-between" align="center">
                    <Text as="s" color="gray.500">2.500.000 VND</Text>
                    <Text color="red.500" fontSize="xl" fontWeight="bold">2.000.000 VND</Text>
                  </HStack>
                </Box>
                
                <Heading size="lg" color="blue.700">Superior Deluxe</Heading>
                <Text fontSize="md" color="gray.600">2 Day 1 Night For 2 Pax</Text>
                
                <Text color="gray.600" noOfLines={3}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, ipsam consectetur impedit ratione dolores fuga iusto, sed voluptates at consequuntur corporis...
                </Text>

                <HStack spacing={8} justify="space-between" mt={2}>
                  <HStack spacing={2}>
                    <FaUser className="text-blue-600" />
                    <Text>2 People</Text>
                  </HStack>
                  <HStack spacing={2}>
                    <FaWifi className="text-blue-600" />
                    <Text>Wifi</Text>
                  </HStack>
                  <HStack spacing={2}>
                    <Box as="span" className="text-blue-600">50 m2</Box>
                  </HStack>
                  <HStack spacing={2}>
                    <FaUtensils className="text-blue-600" />
                    <Text>breakfast</Text>
                  </HStack>
                </HStack>

                <Box mt={2}>
                  <Text fontWeight="bold" mb={2}>Photos</Text>
                  <HStack spacing={2}>
                    <Image
                      src="/images/room-1.jpg"
                      alt="Room photo 1"
                      className="w-24 h-16 object-cover rounded"
                    />
                    <Image
                      src="/images/room-2.jpg"
                      alt="Room photo 2"
                      className="w-24 h-16 object-cover rounded"
                    />
                    <Image
                      src="/images/room-3.jpg"
                      alt="Room photo 3"
                      className="w-24 h-16 object-cover rounded"
                    />
                    <Button size="sm" colorScheme="red" variant="link">
                      See all &gt;
                    </Button>
                  </HStack>
                </Box>

                <HStack spacing={4} mt={2}>
                  <Button colorScheme="red" flex={1}>
                    Book now
                  </Button>
                  <Button colorScheme="blue" flex={1}>
                    See more
                  </Button>
                </HStack>
              </Stack>
            </CardBody>
          </Card>

          {/* Thêm các card khách sạn khác tương tự */}
        </SimpleGrid>
      </Container>
    </>
  );
}
