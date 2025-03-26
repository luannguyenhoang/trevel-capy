import { Box, Heading, Image, SimpleGrid } from '@chakra-ui/react'
import React from 'react'

export default function TuongTu() {
  return (
    <>
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
    </>
  )
}
