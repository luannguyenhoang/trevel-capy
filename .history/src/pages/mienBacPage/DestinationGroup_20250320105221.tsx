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
        spac
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Box position="relative" flex={5} alignItems="center" marginTop="5%">
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
            <Box  mt={5}>
              {group.noi_dung}
            </Box>
          </Box>
        </Box>
        <Box position="relative" flex={1}alignItems="center" marginTop="5%">
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
                  maxWidth="2xl"
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
            <Box maxW={"3xl"} mt={5}>
              {group.noi_dung}
            </Box>
          </Box>
        </Box>
      </Box>
    </ScrollAnimation>
  );
}
