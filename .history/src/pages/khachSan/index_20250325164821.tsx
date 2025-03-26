import Loading from "@/components/molecules/Loading";
import Metadata from "@/components/molecules/Metadata";
import { ScrollAnimation } from "@/components/molecules/ScrollAnimation";
import { Source } from "@/type/types";
import { useEffect, useState } from "react";
import { FaWifi, FaCar, FaSwimmingPool, FaUtensils, FaSearch, FaCalendarAlt, FaUser } from 'react-icons/fa';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Card,
  CardBody,
  Image,
  Stack,
  Text,
  Badge,
  HStack,
  VStack,
} from '@chakra-ui/react';

export default function KhachSan() {
  // ... existing code ...

  return (
    <>
    
      
      {/* Hero Section với Form Tìm Kiếm */}
      <Box 
        bgImage="url('/images/hotel-bg.jpg')"
        bgPosition="center"
        bgSize="cover"
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
          <Container maxW="container.xl" centerContent py={20}>
            <VStack spacing={6} color="white" textAlign="center">
              <Heading size="2xl">Tìm Khách Sạn Phù Hợp Với Bạn</Heading>
              <Text fontSize="xl">Khám phá những khách sạn tốt nhất với giá cả hợp lý</Text>
              
              {/* Form Tìm Kiếm */}
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
                  <Input placeholder="Nhập tên khách sạn..." />
                </InputGroup>
                
                <InputGroup>
                  <InputLeftElement children={<FaCalendarAlt color="gray.300" />} />
                  <Input type="date" placeholder="Ngày nhận phòng" />
                </InputGroup>
                
                <InputGroup>
                  <InputLeftElement children={<FaUser color="gray.300" />} />
                  <Input type="number" placeholder="Số người" />
                </InputGroup>
                
                <Button colorScheme="blue" px={8}>
                  Tìm Kiếm
                </Button>
              </HStack>
            </VStack>
          </Container>
        </Box>
      </Box>

      {/* Danh Sách Khách Sạn */}
      <Container maxW="container.xl" py={12}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {/* Card Khách Sạn */}
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardBody>
              <Image
                src="/images/hotel-1.jpg"
                alt="Khách sạn"
                borderRadius="lg"
                className="h-48 w-full object-cover"
              />
              <Stack mt={4} spacing={3}>
                <HStack justify="space-between" align="center">
                  <Heading size="md">Khách Sạn Mẫu</Heading>
                  <Badge colorScheme="green">4.5 ⭐</Badge>
                </HStack>
                <Text color="gray.600">
                  Địa chỉ: 123 Đường ABC, Quận XYZ
                </Text>
                <HStack spacing={4}>
                  <FaWifi className="text-gray-500" />
                  <FaCar className="text-gray-500" />
                  <FaSwimmingPool className="text-gray-500" />
                  <FaUtensils className="text-gray-500" />
                </HStack>
                <HStack justify="space-between" align="center">
                  <Text color="blue.600" fontSize="2xl" fontWeight="bold">
                    1.200.000đ
                  </Text>
                  <Button colorScheme="blue" variant="outline">
                    Đặt Ngay
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