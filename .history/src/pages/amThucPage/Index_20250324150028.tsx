import Loading from "@/components/molecules/Loading";
import { Source } from "@/type/types";
import { useEffect, useState } from "react";
import Containers from "./Headers";
import Conten from "./Conten";
import Headers from "./Headers";

export default function AmThuc() {
  const [data, setData] = useState<Source>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/amThuc");
        if (!res.ok) {
          throw new Error("error");
        }
        const result = await res.json();
        setData(result[0]);
      } catch (err) {
        console.error("Error:", err);
        setError("Có lỗi");
      } finally {
        setLoading(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box bgGradient={bgGradient} pt={24} pb={16}>
    <Container maxW="container.xl">
      <Box
        height="400px"
        mb={10}
        borderRadius="lg"
        overflow="hidden"
        position="relative"
        backgroundImage="url('/images/vietnamese-food-banner.jpg')"
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="blackAlpha.600"
        />
        <Flex
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          textAlign="center"
          color="white"
          p={8}
        >
          <Heading as="h1" size="2xl" mb={4}>
            Ẩm Thực Việt Nam
          </Heading>
          <Text fontSize="xl" maxW="800px">
            Khám phá nét đặc sắc trong ẩm thực ba miền Bắc - Trung - Nam với
            những món ăn đậm đà hương vị quê hương
          </Text>
        </Flex>
      </Box>

      <Tabs variant="soft-rounded" colorScheme="red" isLazy>
        <TabList justifyContent="center" mb={8}>
          {foodCategories.map((category) => (
            <Tab
              key={category.slug}
              _selected={{ color: "white", bg: category.color }}
              mx={2}
              fontWeight="bold"
            >
              {category.name}
            </Tab>
          ))}
        </TabList>

       
      </Tabs>
    </Container>
  </Box>
    <>
      <Headers session1={data?.acf} /> ;
      <Conten session2={data?.acf} />;
    </>
  );
}
