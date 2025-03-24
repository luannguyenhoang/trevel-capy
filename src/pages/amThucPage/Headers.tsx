import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";

export default function Headers({ session1 }: { session1: any }) {
  return (
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
    </Container>
  );
}
