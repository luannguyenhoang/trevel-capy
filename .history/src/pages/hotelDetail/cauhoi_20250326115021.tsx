import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

export default function CauHoi() {
  return (
  <> <Box mb={10}>
  <Heading as="h2" size="lg" mb={6}>
    Câu hỏi thường gặp
  </Heading>
  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
    <Box>
      <VStack align="start" spacing={6}>
        <Box>
          <Heading as="h4" size="sm" mb={2}>
            Có bao gồm bữa sáng không?
          </Heading>
          <Text>
            Có, tất cả các đặt phòng đều bao gồm bữa sáng buffet tại nhà
            hàng chính của khách sạn từ 6:30 đến 10:00 sáng.
          </Text>
        </Box>
        <Box>
          <Heading as="h4" size="sm" mb={2}>
            Có thể đặt thêm giường phụ không?
          </Heading>
          <Text>
            Có thể đặt thêm giường phụ với chi phí 500.000 VND/đêm, tùy
            thuộc vào tình trạng phòng trống.
          </Text>
        </Box>
        <Box>
          <Heading as="h4" size="sm" mb={2}>
            Khách sạn có bãi đỗ xe không?
          </Heading>
          <Text>
            Có, khách sạn có bãi đỗ xe miễn phí cho khách lưu trú. Vui
            lòng thông báo trước nếu bạn đi bằng ô tô.
          </Text>
        </Box>
      </VStack>
    </Box>
    <Box>
      <VStack align="start" spacing={6}>
        <Box>
          <Heading as="h4" size="sm" mb={2}>
            Khoảng cách từ khách sạn đến biển là bao xa?
          </Heading>
          <Text>
            Khách sạn nằm ngay sát biển, chỉ mất khoảng 2 phút đi bộ từ
            sảnh chính đến bãi biển riêng của resort.
          </Text>
        </Box>
        <Box>
          <Heading as="h4" size="sm" mb={2}>
            Có dịch vụ đưa đón sân bay không?
          </Heading>
          <Text>
            Có, khách sạn cung cấp dịch vụ đưa đón sân bay với chi phí
            300.000 VND/lượt. Vui lòng đặt trước ít nhất 24 giờ.
          </Text>
        </Box>
        <Box>
          <Heading as="h4" size="sm" mb={2}>
            Có thể check-in sớm hoặc check-out muộn không?
          </Heading>
          <Text>
            Check-in sớm và check-out muộn được áp dụng tùy thuộc vào tình
            trạng phòng. Check-out muộn sau 14:00 sẽ tính phí 50% giá
            phòng một đêm.
          </Text>
        </Box>
      </VStack>
    </Box>
  </SimpleGrid>
</Box></>
  )
}
