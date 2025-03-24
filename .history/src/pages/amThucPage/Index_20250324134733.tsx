import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
  Image,
  Badge,
  Flex,
  Card,
  CardBody,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { DefaultLayout } from "@/components/templates/DefautLayout";
import SlideConten from "@/components/molecules/Slide";

export default function AmThuc() {
  const bgGradient = useColorModeValue(
    "linear(to-b, red.50, white)",
    "linear(to-b, gray.900, gray.800)"
  );

  const foodCategories = [
    { name: "Miền Bắc", slug: "mien-bac", color: "red.500" },
    { name: "Miền Trung", slug: "mien-trung", color: "yellow.500" },
    { name: "Miền Nam", slug: "mien-nam", color: "green.500" },
  ];

  const featuredDishes = {
    "mien-bac": [
      {
        id: 1,
        name: "Phở Hà Nội",
        image: "/images/pho.jpg",
        description:
          "Món ăn truyền thống với nước dùng thơm ngon, bánh phở mềm và thịt bò tái.",
      },
      {
        id: 2,
        name: "Bún Chả",
        image: "/images/bun-cha.jpg",
        description:
          "Bún ăn kèm với chả viên và chả miếng nướng, rau sống và nước mắm pha.",
      },
      {
        id: 3,
        name: "Bánh Cuốn Thanh Trì",
        image: "/images/banh-cuon.jpg",
        description:
          "Bánh cuốn mỏng, trong suốt với nhân thịt thơm và nước chấm đậm đà.",
      },
    ],
    "mien-trung": [
      {
        id: 4,
        name: "Bún Bò Huế",
        image: "/images/bun-bo-hue.jpg",
        description:
          "Món bún bò nổi tiếng với vị cay nồng, màu sắc đỏ rực đặc trưng.",
      },
      {
        id: 5,
        name: "Cao Lầu Hội An",
        image: "/images/cao-lau.jpg",
        description:
          "Món mì đặc sản của phố cổ Hội An với sợi mì vàng dai và thịt xá xíu.",
      },
      {
        id: 6,
        name: "Bánh Xèo Miền Trung",
        image: "/images/banh-xeo.jpg",
        description:
          "Bánh xèo giòn với nhân tôm, thịt và giá đỗ, cuốn với rau sống.",
      },
    ],
    "mien-nam": [
      {
        id: 7,
        name: "Hủ Tiếu Nam Vang",
        image: "/images/hu-tieu.jpg",
        description:
          "Món sợi hủ tiếu trong với nước dùng trong veo và nhiều loại topping.",
      },
      {
        id: 8,
        name: "Cơm Tấm Sài Gòn",
        image: "/images/com-tam.jpg",
        description:
          "Cơm gạo tấm với sườn nướng, bì, chả trứng và nước mắm ngọt đặc trưng.",
      },
      {
        id: 9,
        name: "Bánh Tét",
        image: "/images/banh-tet.jpg",
        description:
          "Bánh gạo nếp nhân đậu xanh và thịt heo, gói bằng lá chuối.",
      },
    ],
  };

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

          <TabPanels>
            {foodCategories.map((category) => (
              <TabPanel key={category.slug}>
                <Box mb={10}>
                  <Heading
                    size="lg"
                    mb={6}
                    textAlign="center"
                    color={category.color}
                  >
                    Đặc Sản {category.name}
                  </Heading>

                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={12}>
                    {featuredDishes[
                      category.slug as keyof typeof featuredDishes
                    ].map((dish) => (
                      <Card
                        key={dish.id}
                        overflow="hidden"
                        variant="outline"
                        _hover={{
                          transform: "translateY(-5px)",
                          boxShadow: "xl",
                        }}
                        transition="all 0.3s"
                      >
                        <Image
                          src={dish.image}
                          alt={dish.name}
                          height="200px"
                          objectFit="cover"
                        />
                        <CardBody>
                          <Stack spacing={3}>
                            <Heading size="md">{dish.name}</Heading>
                            <Text>{dish.description}</Text>
                            <Button
                              colorScheme="red"
                              size="sm"
                              width="fit-content"
                            >
                              Xem chi tiết
                            </Button>
                          </Stack>
                        </CardBody>
                      </Card>
                    ))}
                  </SimpleGrid>

                  <Box>
                    <Heading size="md" mb={6} textAlign="center">
                      Bài Viết Về Ẩm Thực {category.name}
                    </Heading>
                    <SlideConten slug={category.slug} />
                  </Box>
                </Box>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
}
