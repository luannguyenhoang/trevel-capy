import SlideConten from "@/components/molecules/Slide";
import { AmThuc, AmThucItem } from "@/type/types";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const foodCategories = [
  { name: "Miền Bắc", slug: "mien-bac", color: "red.500" },
  { name: "Miền Trung", slug: "mien-trung", color: "orange.500" },
  { name: "Miền Nam", slug: "mien-nam", color: "yellow.600" },
];

export default function H({ session1 }: { session1: any }) {
  const bgGradient = useColorModeValue(
    "linear(to-b, red.50, white)",
    "linear(to-b, gray.900, gray.800)"
  );

  const featuredDishes = {
    "mien-bac": session1?.am_thuc?.mien_bac || [],
    "mien-trung": session1?.am_thuc?.mien_trung || [],
    "mien-nam": session1?.am_thuc?.mien_nam || [],
  };
  console.log( session1?.am_thuc?.mien_bac);

  return (
    <Box bgGradient={bgGradient} pt={24} pb={16}>
      <Container maxW="container.xl">
        <Box
          height="400px"
          mb={10}
          borderRadius="lg"
          overflow="hidden"
          position="relative"
          backgroundImage="url('/images/vietnamese-food-banner.jpg')"
          backgroundSize="cover"
          backgroundPosition="center"
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg="blackAlpha.600"
          />
          <Flex
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            textAlign="center"
            color="white"
            p={8}
          >
            <Heading as="h1" size="2xl" mb={4}>
              Ẩm Thực Việt Nam
            </Heading>
            <Text fontSize="xl" maxW="800px">
              Khám phá nét đặc sắc trong ẩm thực ba miền Bắc - Trung - Nam với
              những món ăn đậm đà hương vị quê hương
            </Text>
          </Flex>
        </Box>

        <Tabs variant="soft-rounded" colorScheme="red" isLazy>
          <TabList justifyContent="center" mb={8}>
            {foodCategories.map((category) => (
              <Tab
                key={category.slug}
                _selected={{ color: "white", bg: category.color }}
                mx={2}
                fontWeight="bold"
              >
                {category.name}
              </Tab>
            ))}
          </TabList>

         
        </Tabs>
      </Container>
    </Box>
  );
}
