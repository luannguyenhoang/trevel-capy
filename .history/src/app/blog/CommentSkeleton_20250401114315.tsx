"use client";
import { Box, Flex, VStack } from "@chakra-ui/react";
import React from "react";

const CommentSkeleton = () => {
  return (
    <VStack spacing={4} align="stretch">
      {[1, 2, 3].map((i) => (
        <Box key={i}>
          <Flex gap={2}>
            <Box>
              <Box
                width="32px"
                height="32px"
                borderRadius="full"
                bg="gray.200"
                animation="pulse 1.5s infinite"
              />
            </Box>
            <Box flex="1">
              <Box bg="gray.50" p={3} borderRadius="xl">
                <Box
                  width="120px"
                  height="20px"
                  bg="gray.200"
                  borderRadius="md"
                  mb={2}
                  animation="pulse 1.5s infinite"
                />
                <Box
                  width="100%"
                  height="40px"
                  bg="gray.200"
                  borderRadius="md"
                  animation="pulse 1.5s infinite"
                />
              </Box>
              <Flex mt={1} gap={4} ml={2}>
                <Box
                  width="60px"
                  height="16px"
                  bg="gray.200"
                  borderRadius="md"
                  animation="pulse 1.5s infinite"
                />
                <Box
                  width="80px"
                  height="16px"
                  bg="gray.200"
                  borderRadius="md"
                  animation="pulse 1.5s infinite"
                />
              </Flex>
            </Box>
          </Flex>
        </Box>
      ))}
    </VStack>
  );
};

export default CommentSkeleton; 