'use client'

import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { BsPerson } from 'react-icons/bs'
import { FiServer } from 'react-icons/fi'
import { GoLocation } from 'react-icons/go'

interface StatsCardProps {
  title: string
  stat: string
  icon: ReactNode
}

function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  )
}

export default function BasicStatistics() {
  return (
 
    <VStack spacing={2} textAlign="center">
      <Heading as="h1" fontSize="4xl">
        Gói Tour Du Lịch Phù Hợp Với Bạn
      </Heading>
      <Text fontSize="lg" color={"gray.500"}>
        Đa dạng lựa chọn tour với nhiều mức giá. Đặt tour trước 30 ngày để
        nhận ưu đãi đặc biệt.
      </Text>
    </VStack>
    <Stack
      direction={{ base: "column", md: "row" }}
      textAlign="center"
      justify="center"
      spacing={{ base: 4, lg: 10 }}
      py={10}
    >
      <PriceWrapper>
        <Box py={4} px={12}>
          <Text fontWeight="500" fontSize="2xl">
            {session4.tour_tieu_chuan.loai_tour}
          </Text>
          <HStack justifyContent="center">
            <Text fontSize="3xl" fontWeight="600">
              ₫
            </Text>
            <Text fontSize="5xl" fontWeight="900">
              {session4.tour_tieu_chuan.gia_tien}K
            </Text>
            <Text fontSize="3xl" color="gray.500">
              /người
            </Text>
          </HStack>
        </Box>
        <VStack
          bg={useColorModeValue("gray.50", "gray.900")}
          py={4}
          borderBottomRadius={"xl"}
        >
          <List spacing={3} textAlign="start" px={12}>
            {session4.tour_tieu_chuan.dich_vu
              .split("\r\n")
              .map((item, index) => (
                <ListItem key={index}>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  {item}
                </ListItem>
              ))}
          </List>
          <Box w="80%" pt={7}>
            <Button w="full" colorScheme="red" variant="outline">
              Đặt ngay
            </Button>
          </Box>
        </VStack>
      </PriceWrapper>

      <PriceWrapper>
        <Box position="relative">
          <Box
            position="absolute"
            top="-16px"
            left="50%"
            style={{ transform: "translate(-50%)" }}
          >
            <Text
              textTransform="uppercase"
              bg={useColorModeValue("red.300", "red.700")}
              px={3}
              py={1}
              color={useColorModeValue("gray.900", "gray.300")}
              fontSize="sm"
              fontWeight="600"
              rounded="xl"
            >
              Phổ Biến Nhất
            </Text>
          </Box>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              {session4.tour_cao_cap.loai_tour}
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                ₫
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                {session4.tour_tieu_chuan.gia_tien}K
              </Text>
              <Text fontSize="3xl" color="gray.500">
                /người
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue("gray.50", "gray.700")}
            py={4}
            borderBottomRadius={"xl"}
          >
            <List spacing={3} textAlign="start" px={12}>
              {session4.tour_cao_cap.dich_vu
                .split("\r\n")
                .map((item, index) => (
                  <ListItem key={index}>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    {item}
                  </ListItem>
                ))}
            </List>
            <Box w="80%" pt={7}>
              <Button w="full" colorScheme="red">
                Đặt ngay
              </Button>
            </Box>
          </VStack>
        </Box>
      </PriceWrapper>
      <PriceWrapper>
        <Box py={4} px={12}>
          <Text fontWeight="500" fontSize="2xl">
            {session4.tour_tron_goi_vip.loai_tour}
          </Text>
          <HStack justifyContent="center">
            <Text fontSize="3xl" fontWeight="600">
              ₫
            </Text>
            <Text fontSize="5xl" fontWeight="900">
              {session4.tour_tron_goi_vip.gia_tien}K
            </Text>
            <Text fontSize="3xl" color="gray.500">
              /người
            </Text>
          </HStack>
        </Box>
        <VStack
          bg={useColorModeValue("gray.50", "gray.700")}
          py={4}
          borderBottomRadius={"xl"}
        >
          <List spacing={3} textAlign="start" px={12}>
            {session4.tour_tron_goi_vip.dich_vu
              .split("\r\n")
              .map((item, index) => (
                <ListItem key={index}>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  {item}
                </ListItem>
              ))}
          </List>
          <Box w="80%" pt={7}>
            <Button w="full" colorScheme="red" variant="outline">
              Đặt ngay
            </Button>
          </Box>
        </VStack>
      </PriceWrapper>
    </Stack>
  </Box>
    <Box maxW="7xl" mx={'auto'} py={20} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1 textAlign={'center'} fontSize={'4xl'} pb={10} fontWeight={'bold'}>
        Our company is expanding, you could be too.
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={'Users'} stat={'5,000'} icon={<BsPerson size={'3em'} />} />
        <StatsCard title={'Servers'} stat={'1,000'} icon={<FiServer size={'3em'} />} />
        <StatsCard title={'Datacenters'} stat={'7'} icon={<GoLocation size={'3em'} />} />
      </SimpleGrid>
    </Box>
  )
}