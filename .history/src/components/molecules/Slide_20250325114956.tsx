import Loading from "@/components/molecules/Loading";
import { Box, Heading, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SlideConten({ slug }: { slug: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const pathname = usePathname();
  const isAmThucPage = pathname?.includes("am-thuc");

  useEffect(() => {
    async function fetchCategories() {
      try {
        if (isAmThucPage) {
          const [amThucRes, regionRes] = await Promise.all([
            fetch(
              `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/categories?slug=am-thuc`
            ),
            fetch(
              `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/categories?slug=${slug}`
            ),
          ]);

          const [amThucData, regionData] = await Promise.all([
            amThucRes.json(),
            regionRes.json(),
          ]);

          if (amThucData.length > 0 && regionData.length > 0) {
            setCategoryIds([amThucData[0].id, regionData[0].id]);
          }
        } else {
          const regionRes = await fetch(
            `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/categories?slug=${slug}`
          );
          const regionData = await regionRes.json();

          if (regionData.length > 0) {
            setCategoryIds([regionData[0].id]);
          }
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    if (slug) {
      fetchCategories();
    } else {
      fetchPosts([]);
    }
  }, [slug, isAmThucPage]);

  useEffect(() => {
    if (categoryIds.length > 0) {
      fetchPosts(categoryIds);
    }
  }, [categoryIds]);

  async function fetchPosts(catIds: number[]) {
    try {
      if (catIds.length === 0) return;

      let result;
      if (isAmThucPage) {
        const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?_embed&categories=${catIds.join(',')}`;
        const res = await fetch(apiUrl);
        const data = await res.json();
        result = data.filter((post: any) => 
          catIds.every(id => post.categories.includes(id))
        );
      } else {
        const regionCategoryId = catIds[0];
        const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?_embed&categories=${regionCategoryId}`;
        const res = await fetch(apiUrl);
        const data = await res.json();
        result = data.filter((post: any) => 
          post.categories.length === 1 && post.categories.includes(regionCategoryId)
        );
      }

      setData(result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Box mb={6} borderColor="gray.200" pb={4}>
        {data.length > 0 ? (
          data.map((post: any) => {
            const featuredImage =
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

            return (
              <Box
                key={post.id}
                mb={5}
                _hover={{
                  img: {
                    transform: "scale(1.1)",
                  },
                  p: {
                    color: "#359DF3FF",
                  },
                }}
              >
                <Link href={`/blog/${post.slug}`} style={{ display: "block" }}>
                  <Heading as="h1" size="md" color="red.400" mb={2}>
                    {post.title.rendered}
                  </Heading>
                  <Box borderRadius="md" position="relative" overflow="hidden">
                    {featuredImage && (
                      <Image
                        maxHeight="72"
                        width="100%"
                        src={featuredImage}
                        alt={post.title.rendered}
                        borderRadius="md"
                        objectFit="cover"
                        transition="transform 0.3s ease-in-out"
                      />
                    )}
                  </Box>
                  <div
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                </Link>
              </Box>
            );
          })
        ) : (
          <Box textAlign="center" py={10}>
            Không có bài viết nào.
          </Box>
        )}
      </Box>
    </div>
  );
}
