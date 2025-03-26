import Loading from "@/components/molecules/Loading";
import { GET_HOME } from "@/utils/querys";
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
import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaRulerCombined,
  FaSearch,
  FaUser,
  FaUtensils,
  FaWifi,
} from "react-icons/fa";
import { BiMap } from "react-icons/bi";

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
          body: JSON.stringify({ query: GET_HOME }),
        });

        if (!res.ok) {
          throw new Error("error");
        }
        const result = await res.json();
        console.log(result);

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

              <Box bg="black" p={6} borderRadius="xl" shadow="md">
                <VStack spacing={4} w="full">
                  <Box w="full">
                    <Text mb={2} fontWeight="medium">Thành phố, địa điểm hoặc tên khách sạn:</Text>
                    <InputGroup>
                      <InputLeftElement children={<BiMap color="gray.400" />} />
                      <Input 
                        placeholder="Thành phố, khách sạn, điểm đến" 
                        borderRadius="md"
                      />
                    </InputGroup>
                  </Box>

                  <HStack w="full" spacing={4}>
                    <Box flex={1}>
                      <Text mb={2} fontWeight="medium">Nhận phòng:</Text>
                      <InputGroup>
                        <InputLeftElement children={<FaCalendarAlt color="gray.400" />} />
                        <Input 
                          type="date"
                          borderRadius="md"
                        />
                      </InputGroup>
                    </Box>

                    <Box flex={1}>
                      <Text mb={2} fontWeight="medium">Số đêm:</Text>
                      <InputGroup>
                        <InputLeftElement children={<FaCalendarAlt color="gray.400" />} />
                        <Input 
                          defaultValue="1 đêm"
                          borderRadius="md"
                        />
                      </InputGroup>
                    </Box>

                    <Box flex={1}>
                      <Text mb={2} fontWeight="medium">Trả phòng:</Text>
                      <InputGroup>
                        <InputLeftElement children={<FaCalendarAlt color="gray.400" />} />
                        <Input 
                          type="date"
                          borderRadius="md"
                          isReadOnly
                        />
                      </InputGroup>
                    </Box>
                  </HStack>

                  <Box w="full">
                    <Text mb={2} fontWeight="medium">Khách và Phòng:</Text>
                    <InputGroup>
                      <InputLeftElement children={<FaUser color="gray.400" />} />
                      <Input 
                        defaultValue="2 người lớn, 0 Trẻ em, 1 phòng"
                        borderRadius="md"
                      />
                    </InputGroup>
                  </Box>

                  <HStack w="full">
                    <input type="checkbox" id="payAtHotel" />
                    <label htmlFor="payAtHotel" style={{ display: 'flex', alignItems: 'center' }}>
                      <Image src="/path-to-hotel-icon.png" alt="" width={20} height={20} className="mr-2" />
                      <Text>Thanh Toán Tại Khách Sạn</Text>
                    </label>
                  </HStack>

                  <Button 
                    w="full" 
                    colorScheme="orange" 
                    size="lg"
                    borderRadius="md"
                    leftIcon={<FaSearch />}
                  >
                    Tìm khách sạn
                  </Button>
                </VStack>
              </Box>
            </VStack>
          </Container>
        </Box>
      </Box>
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
                    <FaRulerCombined color="#2B6CB0" />
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
                    <FaRulerCombined color="#2B6CB0" />
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
                    <FaRulerCombined color="#2B6CB0" />
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
