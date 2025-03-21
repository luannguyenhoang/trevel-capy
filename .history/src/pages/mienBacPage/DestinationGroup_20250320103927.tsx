import { ScrollAnimation } from "@/components/organisms/ScrollAnimation";
import { MienBacContentItem } from "@/type/types";
import { Box, Heading, Image, Text } from "@chakra-ui/react";

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
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent=""
      >
        <Box position="relative" alignItems="center" marginTop={{ base: "10%", md: "5%" }} width="7xl">
          <Box>
            <Heading as="h1" size={{ base: "sm", md: "md" }} marginBottom="2%">
                {/* them so thu tu */}
                {index + 1}. {group.dia_diem}
            </Heading>
            <Box
              width="100%"
              zIndex="2"
              marginLeft={{ base: "0", sm: "5%" }}
              marginRight={{ base: "0", sm: "5%" }}
            >
              <Box
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
                width="100%"
              >
                <Image
                  width="100%"
                  maxW={{ base: "100%", md: "2xl" }}
                  borderRadius="lg"
                  src={group.hinh_anh}
                  alt={`Hình ảnh ${group.dia_diem}`}
                  objectFit={{ base: "cover", md: "contain" }}
                />
              </Box>
              <Text
                color={"gray.400"}
                display={"flex"}
                justifyContent={"center"}
                fontSize={{ base: "sm", md: "md" }}
                mt={2}
              >
                {group.ghi_chu}
              </Text>
            </Box>
            <Box 
              maxW={{ base: "100%", md: "3xl" }} 
              mt={5}
              fontSize={{ base: "sm", md: "md" }}
              px={{ base: 2, md: 0 }}
            >
              {group.noi_dung}
            </Box>
          </Box>
        </Box>
      </Box>
    </ScrollAnimation>
  );
}
