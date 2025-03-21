import { MienBacContentItem } from "@/type/types";
import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";





export default function SlideConten() {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function fetchData() {
      try {
        const res = await fetch(`/api/baiViet/${slug}`);
        if (!res.ok) throw new Error("Không tìm thấy bài viết");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  if (loading) return <Loading />;
  if (!data) return <div>Không tìm thấy bài viết</div>;
  return (
    <Link href={`/BaiViet/${group.slug}`}>
      <Box display="flex" mb={6} borderColor="gray.200" pb={4}>
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

          <Text as="s" color="gray.500" fontSize="xs">
            1.084.914 VND
          </Text>

          <Text color="orange.500" fontWeight="bold" fontSize="sm">
            934.330 VND
          </Text>
        </Box>
      </Box>
    </Link>
  );
}
