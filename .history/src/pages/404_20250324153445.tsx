import { Box, Container, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Custom404() {
  return (
    <Box className="page_404" py={10} bg="white" fontFamily="'Arvo', serif">
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
              Look like you&apos;re lost
            </Heading>

            <Text mb={4}>the page you are looking for not available!</Text>

            <Link href="/" passHref>
              <Button
                colorScheme="red"
                size="lg"
                className="link_404"
                _hover={{
                  bg: "red.600",
                  textDecoration: "none",
                }}
              >
                Go to Home
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
