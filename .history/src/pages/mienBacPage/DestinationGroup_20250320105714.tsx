import { ScrollAnimation } from "@/components/organisms/ScrollAnimation";
import { MienBacContentItem } from "@/type/types";
import { Box, Heading, Image, Text, Flex, VStack, HStack, Badge } from "@chakra-ui/react";

export default function DestinationGroup({
  group,
  index,
}: {
  group: MienBacContentItem;
  index: number;
}) {
  return (
    <ScrollAnimation delay={0.3}>
      <Box 
        borderWidth="1px" 
        borderRadius="lg" 
        overflow="hidden"
        boxShadow="md"
        mb={4}
        bg="white"
        maxW="100%"
      >
        <Flex direction={{ base: "column", sm: "row" }}>
          {/* Hình ảnh bên trái */}
          <Box 
            width={{ base: "100%", sm: "200px" }} 
            height={{ base: "200px", sm: "150px" }}
          >
            <Image
              width="100%"
              height="100%"
              src={group.hinh_anh}
              alt={group.dia_diem}
              objectFit="cover"
            />
          </Box>
          
          {/* Thông tin bên phải */}
          <VStack 
            align="start" 
            p={4} 
            spacing={2}
            width="100%"
          >
            <Heading as="h3" size="md" color="blue.800">
              {index + 1}. {group.dia_diem}
            </Heading>
            
            {/* Có thể thêm rating nếu có */}
            <HStack>
              {[1, 2, 3, 4, 5].map((star) => (
                <Box key={star} color="yellow.400">★</Box>
              ))}
              <Text fontWeight="bold" color="blue.700">8.8/10</Text>
            </HStack>
            
            <Text color="gray.500">{group.ghi_chu}</Text>
            
            {/* Giá và thông tin khác */}
            <Box width="100%">
              <Text as="s" color="gray.500" fontSize="sm">1.084.914 VND</Text>
              <Text color="orange.500" fontWeight="bold">934.330 VND</Text>
            </Box>
            
            {/* Nội dung ngắn gọn */}
            <Text noOfLines={3} fontSize="sm">
              {group.noi_dung}
            </Text>
          </VStack>
        </Flex>
      </Box>
    </ScrollAnimation>
  );
}
