"use client";

import { MienBacContent } from "@/type/types";
import { Box, Heading, Image, Container, Text, Link } from "@chakra-ui/react";

export default function Containers({session2}:{session2:MienBacContent}) {
  return (
    <Container maxW={"7xl"} p={4}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Heading as="h2" size="lg" mb={4} fontWeight="bold">
          7. Ninh Bình - Vùng đất cổ đô
        </Heading>
        
        <Text fontSize="md" mb={4}>
          <Link color="teal.500" fontWeight="bold">Ninh Bình</Link>, được ví von như "Vùng đất cổ đô," đang dần trở thành một điểm đến du lịch đáng chú ý không chỉ đối với du khách trong nước mà còn với du khách quốc tế. Vùng đất cổ kính này tọa lạc tại miền Bắc Việt Nam và đặc biệt nổi tiếng với những danh lam thắng cảnh tuyệt đẹp, tạo nên những hành trình <Link color="teal.700" fontWeight="bold">du lịch miền Bắc</Link> không thể quên.
        </Text>
        
        <Box 
          width="100%" 
          borderRadius="lg" 
          overflow="hidden" 
          mb={4}
        >
          <Image
            src="https://images.unsplash.com/photo-1528127269322-539801943592"
            alt="Ninh Bình - Vùng đất cổ đô"
            width="100%"
            borderRadius="lg"
          />
          <Text fontSize="sm" textAlign="center" mt={2} color="gray.600">
            Vùng đất cổ đô núi non trùng điệp. @vnexpress
          </Text>
        </Box>
        
        <Text fontSize="md">
          Ninh Bình tự hào với nhiều điểm tham quan nổi tiếng như Tam Cốc - Bích Động, quần thể danh thắng Tràng An, đầm Vân Long, hay việc tham quan các ngôi chùa và di tích lịch sử tại Hoa Lư - thủ đô đầu tiên của đất nước. Du khách có thể đạo chơi qua những con đường ven sông đẹp như tranh, khám phá thừa hưởng bậc thang, và chiêm ngưỡng vẻ đẹp kỳ vĩ của các hang động đá.
        </Text>
      </Box>
    </Container>
  );
}
