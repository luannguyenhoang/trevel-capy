import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <ChakraProvider>
        <Center minH="100vh" flexDirection="column">
          {/* Logo */}
          <img
            src="/path/to/your/logo.png" // Replace with your logo path
            alt="Logo"
            className=" absolute " // Add margin below the logo
            style={{ width: '150px', height: 'auto' }} // Adjust size as needed
          />
          {/* Spinner */}
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
