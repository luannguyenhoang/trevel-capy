import { Box, Container, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Custom404() {
  return (
    <Box className="page_404" py={10} bg="white" >
      <Container maxW="container.xl">
        <Box textAlign="center">
          <Box className="four_zero_four_bg" height="400px" mb={-12}>
            <Heading
              as="h1"
              fontSize="80px"
              textAlign="center"
              position="relative"
              zIndex={2}
            >
              404
            </Heading>
          </Box>

          <Box className="contant_box_404" mt={-50}>
            <Heading as="h3" fontSize="2xl" mb={4}>
              Có vẻ như bạn đã lạc đường
            </Heading>

            <Text mb={4}>
              Trang bạn đang tìm kiếm không tồn tại!
            </Text>

            <Link href="/" passHref>
              <Button
                as="a"
                colorScheme="red"
                size="lg"
                className="link_404"
                _hover={{
                  bg: "red.600",
                  textDecoration: "none"
                }}
              >
                Trở về trang chủ
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
