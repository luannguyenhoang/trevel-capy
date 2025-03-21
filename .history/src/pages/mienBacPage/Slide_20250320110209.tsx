import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function SlideConten({
    group,
    index,
  }: {
    group: MienBacContentItem;
    index: number;
  }){
    return(
        <Box
          display="flex"
          mb={6}
          borderBottomWidth={index % 2 === 0 ? "1px" : "0px"}
          borderColor="gray.200"
          pb={4}
        >
          <Box width="100px" height="80px" mr={4}>
            <Image
              width="100%"
              height="100%"
              borderRadius="md"
              src={group.hinh_anh}
              alt={group.dia_diem}
              objectFit="cover"
            />
          </Box>

          <Box flex={1}>
            <Heading as="h3" size="sm" fontWeight="bold" mb={1}>
              {group.dia_diem}
            </Heading>

            <HStack spacing={1} mb={1}>
              <Text color="yellow.400" fontSize="xs">
                ★★★★★
              </Text>
              <Text color="blue.600" fontSize="sm" fontWeight="bold">
                8.8/10
              </Text>
            </HStack>

            <Text color="gray.600" fontSize="sm" mb={1}>
              {group.ghi_chu}
            </Text>

            <Text as="s" color="gray.500" fontSize="xs">
              1.084.914 VND
            </Text>

            <Text color="orange.500" fontWeight="bold" fontSize="sm">
              934.330 VND
            </Text>
          </Box>
        </Box>
    );
}