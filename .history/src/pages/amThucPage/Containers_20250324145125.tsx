import { Box, Heading, TabPanel, TabPanels } from '@chakra-ui/react'
import React from 'react'

export default function Containers() {
  return (
    <div>
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
                  </Box>
                </Box>
              </TabPanel>
            ))}
          </TabPanels>
    </div>
  )
}
