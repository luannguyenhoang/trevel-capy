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
} from "@chakra-ui/react";
import {
  FaCalendarAlt,
  FaSearch,
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
          <Card
            className="hover:shadow-xl transition-shadow duration-300"
            borderRadius={10}
          >
            <CardBody p={0} position="relative" borderRadius={10}>
              <Box position="relative" h="250px">
                <Image
                  borderTopRadius={10}
                  src="/quanCafe.jpg"
                  alt="Khách sạn"
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
                    2.500.000 VND
                  </Text>
                  <Text color="red.500" fontSize="xl" fontWeight="bold">
                    2.000.000 VND
                  </Text>
                </HStack>

                <Heading as="h3" color="blue.700" fontSize="2xl" mb={1}>
                  Superior Deluxe
                </Heading>
                <Text fontSize="md" color="gray.600" mb={3}>
                  2 Day 1 Night For 2 Pax
                </Text>

                <Text color="gray.600" mb={4} fontSize="sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quibusdam, ipsam consectetur impedit ratione dolores fuga
                  iusto, sed voluptates at consequuntur corporis...
                </Text>

                <HStack justify="space-between" mb={4}>
                  <VStack align="center" spacing={1}>
                    <FaUser color="#2B6CB0" />
                    <Text fontSize="sm" color="gray.600">
                      2 People
                    </Text>
                  </VStack>
                  <VStack align="center" spacing={1}>
                    <FaWifi color="#2B6CB0" />
                    <Text fontSize="sm" color="gray.600">
                      Wifi
                    </Text>
                  </VStack>
                  <VStack align="center" spacing={1}>
                    <FaWifi color="#2B6CB0" />
                    <Text fontSize="sm" color="#2B6CB0">
                      50 m2
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
                  <HStack spacing={2}>
                    <Image
                      src="/quanCafe.jpg"
                      alt="Room photo 1"
                      className="w-24 h-16 object-cover rounded"
                    />
                    <Image
                      src="/quanCafe.jpg"
                      alt="Room photo 2"
                      className="w-24 h-16 object-cover rounded"
                    />
                    <Image
                      src="/quanCafe.jpg"
                      alt="Room photo 3"
                      className="w-24 h-16 object-cover rounded"
                    />
                  </HStack>
                </Box>

                <HStack spacing={4} mt={4}>
                  <Button colorScheme="red" flex={1} borderRadius="md">
                    Book now
                  </Button>
                  <Button colorScheme="blue" flex={1} borderRadius="md">
                    See more
                  </Button>
                </HStack>
              </Box>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Container>
      <Container maxW="container.xl" py={12}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          <Card
            className="hover:shadow-xl transition-shadow duration-300"
            borderRadius={10}
          >
            <CardBody p={0} position="relative" borderRadius={10}>
              <Box position="relative" h="250px">
                <Image
                  borderTopRadius={10}
                  src="/quanCafe.jpg"
                  alt="Khách sạn"
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
                    2.500.000 VND
                  </Text>
                  <Text color="red.500" fontSize="xl" fontWeight="bold">
                    2.000.000 VND
                  </Text>
                </HStack>

                <Heading as="h3" color="blue.700" fontSize="2xl" mb={1}>
                  Superior Deluxe
                </Heading>
                <Text fontSize="md" color="gray.600" mb={3}>
                  2 Day 1 Night For 2 Pax
                </Text>

                <Text color="gray.600" mb={4} fontSize="sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quibusdam, ipsam consectetur impedit ratione dolores fuga
                  iusto, sed voluptates at consequuntur corporis...
                </Text>

                <HStack justify="space-between" mb={4}>
                  <VStack align="center" spacing={1}>
                    <FaUser color="#2B6CB0" />
                    <Text fontSize="sm" color="gray.600">
                      2 People
                    </Text>
                  </VStack>
                  <VStack align="center" spacing={1}>
                    <FaWifi color="#2B6CB0" />
                    <Text fontSize="sm" color="gray.600">
                      Wifi
                    </Text>
                  </VStack>
                  <VStack align="center" spacing={1}>
                    <FaWifi color="#2B6CB0" />
                    <Text fontSize="sm" color="#2B6CB0">
                      50 m2
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
                  <HStack justify="space-between" spacing={2}>
                    <Image
                      src="/quanCafe.jpg"
                      alt="Room photo 1"
                      className="w-24 h-16 object-cover rounded"
                    />
                    <Image
                      src="/quanCafe.jpg"
                      alt="Room photo 2"
                      className="w-24 h-16 object-cover rounded"
                    />
                    <Image
                      src="/quanCafe.jpg"
                      alt="Room photo 3"
                      className="w-24 h-16 object-cover rounded"
                    />
                  </HStack>
                </Box>

                <HStack spacing={4} mt={4}>
                  <Button colorScheme="red" flex={1} borderRadius="md">
                    Book now
                  </Button>
                  <Button colorScheme="blue" flex={1} borderRadius="md">
                    See more
                  </Button>
                </HStack>
              </Box>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Container>
    </>
  );
}
