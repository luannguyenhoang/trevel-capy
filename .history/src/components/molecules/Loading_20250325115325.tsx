import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <div className="min-h-[100vh] min-w-[100vw] flex justify- items-center">
      <ChakraProvider>
        <Center minH="100vh" flexDirection="column">
          <img
            src="/logo.png"
            alt="Logo"
            className=" absolute object-cover"
            style={{ width: "60px", height: "60px" }}
          />
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="red.500"
            size="lg"
            style={{ width: '100px', height: '100px' }}
          />
        </Center>
      </ChakraProvider>
    </div>
  );
}
