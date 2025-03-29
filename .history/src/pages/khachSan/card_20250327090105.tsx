import { Container } from '@chakra-ui/react'
import React from 'react'

export default function Card() {
  return (
    <div>
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
                            colorScheme="blue"
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
    </div>
  )
}
