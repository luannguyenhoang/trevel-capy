import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <ChakraProvider>
        <Center minH="100vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="red.500"
            size="xl"
          />
        </Center>
      </ChakraProvider>
    </div>
  );
}
