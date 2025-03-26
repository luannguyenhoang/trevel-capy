import SlideConten from "@/components/molecules/Slide";
import { AmThucItem } from "@/type/types";
import {
  Box,
  Button,
  Card,
  CardBody,
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

export default function Conten({ session2 }: { session2: any }) {
  const foodCategories = [
    { name: "Miền Bắc", slug: "mien-bac", color: "red.500" },
    { name: "Miền Trung", slug: "mien-trung", color: "orange.500" },
    { name: "Miền Nam", slug: "mien-nam", color: "yellow.600" },
  ];

  const bgGradient = useColorModeValue(
    "linear(to-b, red.50, white)",
    "linear(to-b, gray.900, gray.800)"
  );

  const featuredDishes = {
    "mien-bac": session2?.am_thuc?.mien_bac || [],
    "mien-trung": session2?.am_thuc?.mien_trung || [],
    "mien-nam": session2?.am_thuc?.mien_nam || [],
  };
  return (
    <div>
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
                  <Flex>
                    <SlideConten slug={category.slug} />
                    
                  </Flex>
                </Box>
              </Box>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
}
