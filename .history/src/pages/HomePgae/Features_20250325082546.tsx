"use client";

import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { IoCompass, IoRestaurant, IoCalendar, IoCafe, IoHome } from "react-icons/io5";
import { ReactElement } from "react";

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function SplitWithImage() {
  return (
    <Box py={12} bg={useColorModeValue("gray.100", "gray.800")}>
      <Container maxW={"7xl"} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Text
              textTransform={"uppercase"}
              color={"brown.400"}
              fontWeight={600}
              fontSize={"sm"}
              bg={useColorModeValue("orange.50", "orange.900")}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              Phế Lạ Coffee
            </Text>
            <Heading>Không Gian Thư Giãn Lý Tưởng</Heading>
            <Text color={"gray.500"} fontSize={"lg"}>
              Khám phá hương vị cà phê độc đáo, không gian thoải mái và những trải nghiệm ẩm thực đặc biệt
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider borderColor={useColorModeValue("gray.100", "gray.700")} />
              }
            >
              <Feature
                icon={<Icon as={IoCafe} color={"brown.500"} w={5} h={5} />}
                iconBg={useColorModeValue("brown.100", "brown.900")}
                text={"Cà Phê Đặc Biệt"}
              />
              <Feature
                icon={<Icon as={IoRestaurant} color={"green.500"} w={5} h={5} />}
                iconBg={useColorModeValue("green.100", "green.900")}
                text={"Đồ Uống & Bánh Ngọt"}
              />
              <Feature
                icon={<Icon as={IoHome} color={"purple.500"} w={5} h={5} />}
                iconBg={useColorModeValue("purple.100", "purple.900")}
                text={"Không Gian Ấm Cúng"}
              />
            </Stack>
          </Stack>
          <Flex>
            <Image
              rounded={"md"}
              alt={"Không gian quán cà phê"}
              src={"/images/cafe-space.jpg"}
              objectFit={"cover"}
            />
          </Flex>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
