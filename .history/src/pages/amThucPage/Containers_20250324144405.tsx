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
  { name: "Miền Bắc", slug: "mien_bac", color: "red.500" },
  { name: "Miền Trung", slug: "mien_trung", color: "orange.500" },
  { name: "Miền Nam", slug: "mien_nam", color: "yellow.600" },
];

export default function Containers({ session1 }: { session1: any }) {
  const bgGradient = useColorModeValue(
    "linear(to-b, red.50, white)",
    "linear(to-b, gray.900, gray.800)"
  );

  const featuredDishes = {
    mien_bac: session1?.am_thuc?.mien_bac || [],
    mien_trung: session1?.am_thuc?.mien_trung || [],
    mien_nam: session1?.am_thuc?.mien_nam || [],
  };
  console.log("sos" + session1?.am_thuc?.mien_bac);

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
                    ].map((dish: AmThucItem) => (
                      <Card
                        key={dish.name}
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
                    {log}
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
