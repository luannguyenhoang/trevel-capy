import { ScrollAnimation } from "@/components/organisms/ScrollAnimation";
import { MienBacContentItem } from "@/type/types";
import { Box, Heading, Image, Text } from "@chakra-ui/react";

export default function DestinationGroup({
  group,
}: {
  group: MienBacContentItem;
}) {
  return (
    <ScrollAnimation delay={0.3}>
      <Box
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Box position="relative" alignItems="center" marginTop="5%">
          <Box>
            <Heading as="h1" size={"md"} marginBottom="2%">
                {/* them so thu tu */}
               .{group.dia_diem}
            </Heading>
            <Box
              width={{ base: "100%", sm: "85%" }}
              zIndex="2"
              marginLeft={{ base: "0", sm: "5%" }}
            >
              <Box
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
                minW={"fit-content"}
              >
                <Image
                  maxW={"2xl"}
                  minW={"2xl"}
                  borderRadius="lg"
                  src={group.hinh_anh}
                  alt="some good alt text"
                  objectFit="contain"
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
