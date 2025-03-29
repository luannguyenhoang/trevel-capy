import { Box, Center, ChakraProvider, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box
      minH="100vh"
      minW="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <ChakraProvider>
        <Center minH="100vh" flexDirection="column">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="red.500"
            size="lg"
            style={{ width: "100px", height: "100px" }}
          />
        </Center>
      </ChakraProvider>
    </Box>
  );
}
