"use client";

import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaPlane, FaHotel, FaUmbrellaBeach } from "react-icons/fa";

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}

function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box my={"auto"} color={"red.400"} alignContent={"center"}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function BasicStatistics() {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.700")}>
      <Box maxW="7xl" mx={"auto"} py={40} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={"center"}
          fontSize={"4xl"}
          pb={10}
          fontWeight={"bold"}
        >
          Khám phá vẻ đẹp đất nước Việt Nam
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={"Điểm đến"}
            stat={"63 tỉnh thành"}
            icon={<FaUmbrellaBeach size={"3em"} />}
          />
          <StatsCard
            title={"Du khách/năm"}
            stat={"18 triệu"}
            icon={<FaPlane size={"3em"} />}
          />
          <StatsCard
            title={"Khách sạn"}
            stat={"3,000+"}
            icon={<FaHotel size={"3em"} />}
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
}
