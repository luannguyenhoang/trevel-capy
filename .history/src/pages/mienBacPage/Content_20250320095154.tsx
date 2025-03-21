"use client";

import { Box, Heading, Image, Container } from "@chakra-ui/react";

export default function Containers({session2}:{session2:Content}) {
  return (
    <Container maxW={"7xl"} >
      <Box
      
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Box
         
        
          position="relative"
          alignItems="center"
          marginTop="5%"
        >
          <Box>
            <Heading as="h1" size={"md"} marginBottom="2%">
              12 Địa Điểm Du Lịch Miền Bắc Nổi Tiếng Cho Hội Tự Túc
            </Heading>
            <Box
              width={{ base: "100%", sm: "85%" }}
              zIndex="2"
              marginLeft={{ base: '0', sm: '5%' }}
            >
              <Box
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
                minW={"fit-content"}
              >
                <Image
                  borderRadius="lg"
                  src={
                    "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                  }
                  alt="some good alt text"
                  objectFit="contain"
                />
              </Box>
            </Box>
           
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
