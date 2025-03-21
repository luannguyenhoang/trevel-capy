import { ScrollAnimation } from "@/components/organisms/ScrollAnimation";
import { MienBacContentItem } from "@/type/types";
import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react";

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
        display="flex"
        gap="30px"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Box position="relative" flex={4} alignItems="center" marginTop="5%">
          <Box>
            <Heading as="h1" size={"md"} marginBottom="2%">
              {/* them so thu tu */}
              {index + 1}. {group.dia_diem}
            </Heading>
            <Box
              width={{ base: "100%", sm: "85%" }}
              zIndex="2"
              marginLeft={{ base: "0", sm: "5%" }}
            >
              <Box
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
                width="100%"
              >
                <Image
                  width="100%"
                  height="auto"
                  borderRadius="lg"
                  src={group.hinh_anh}
                  alt="some good alt text"
                  objectFit="cover"
                />
              </Box>
              <Text
                color={"gray.400"}
                display={"flex"}
                justifyContent={"center"}
              >
                {group.ghi_chu}
              </Text>
            </Box>
            <Box mt={5}>{group.noi_dung}</Box>
          </Box>
        </Box>
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
      </Box>
    </ScrollAnimation>
  );
}
