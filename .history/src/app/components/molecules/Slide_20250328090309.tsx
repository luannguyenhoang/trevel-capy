import { Box, Heading, Image, Button, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

type Post = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  categories: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
};

interface SlideContentProps {
  slug: string;
  isHorizontal: boolean;
  showPagination?: boolean;
  postsPerPage?: number;
}

export default function SlideConten({
  slug,
  isHorizontal = false,
  showPagination = true,
  postsPerPage = 6,
}: SlideContentProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pathname = usePathname();
  const isAmThucPage = pathname?.includes("am-thuc");

  const baseApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  const fetchCategoryBySlug = useCallback(
    async (categorySlug: string) => {
      const res = await fetch(`${baseApiUrl}/categories?slug=${categorySlug}`);
      if (!res.ok)
        throw new Error(`Không thể lấy thông tin category: ${categorySlug}`);
      return await res.json();
    },
    [baseApiUrl]
  );

  const fetchPosts = useCallback(async () => {
    let isMounted = true;
    if (!slug) {
      setLoading(false);
      return () => { isMounted = false; };
    }

    try {
      let categoryIds: number[] = [];

      if (isAmThucPage) {
        const [amThucData, regionData] = await Promise.all([
          fetchCategoryBySlug("am-thuc"),
          fetchCategoryBySlug(slug),
        ]);

        if (amThucData.length > 0 && regionData.length > 0) {
          categoryIds = [amThucData[0].id, regionData[0].id];
        }
      } else {
        const regionData = await fetchCategoryBySlug(slug);
        if (regionData.length > 0) {
          categoryIds = [regionData[0].id];
        }
      }

      if (categoryIds.length === 0) {
        setPosts([]);
        false;
        return () => { isMounted = false; };
      }

      const apiUrl = `${baseApiUrl}/posts?_embed&categories=${categoryIds.join(
        ","
      )}`;
      const res = await fetch(apiUrl);

      if (!res.ok) throw new Error("Không thể lấy danh sách bài viết");

      const data: Post[] = await res.json();

      const filteredPosts = isAmThucPage
        ? data.filter((post) =>
            categoryIds.every((id) => post.categories.includes(id))
          )
        : data.filter(
            (post) =>
              post.categories.length === 1 &&
              post.categories.includes(categoryIds[0])
          );

      if (isMounted) {
        setPosts(filteredPosts);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      if (isMounted) setPosts([]);
    } finally {
      if (isMounted) setLoading(false);
    }
    
    return () => { isMounted = false; };
  }, [slug, isAmThucPage, fetchCategoryBySlug, baseApiUrl]);

  useEffect(() => {
    const cleanup = fetchPosts();
    return cleanup;
  }, [fetchPosts]);

  const Pagination = () => {
    if (!showPagination || totalPages <= 1) return null;

    return (
      <HStack spacing={2} justify="center" mt={6}>
        <Button
          size="sm"
          onClick={() => paginate(currentPage - 1)}
          isDisabled={currentPage === 1}
          leftIcon={<ChevronLeftIcon />}
        >
          Trước
        </Button>

        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index + 1}
            size="sm"
            colorScheme={currentPage === index + 1 ? "blue" : "gray"}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Button>
        ))}

        <Button
          size="sm"
          onClick={() => paginate(currentPage + 1)}
          isDisabled={currentPage === totalPages}
          rightIcon={<ChevronRightIcon />}
        >
          Sau
        </Button>

        <Text fontSize="sm" color="gray.500" ml={2}>
          Trang {currentPage} / {totalPages}
        </Text>
      </HStack>
    );
  };

  return (
    <div>
      <Box mb={6} borderColor="gray.200" pb={4}>
        <Box
          display="grid"
          gridTemplateColumns={
            isHorizontal
              ? {
                  base: "1fr",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                }
              : "1fr"
          }
          gap={6}
        >
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => {
              const featuredImage =
                post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

              return (
                <Box
                  key={post.id}
                  borderRadius="lg"
                  overflow="hidden"
                  display={isHorizontal ? "block" : "flex"}
                  flexDirection={isHorizontal ? "column" : "row"}
                  gap={4}
                  bg="white"
                  boxShadow="sm"
                  height={isHorizontal ? "400px" : "200px"}
                  _hover={{
                    transform: "translateY(-4px)",
                    transition: "all 0.2s",
                    boxShadow: "lg",
                  }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{
                      display: "flex",
                      flexDirection: isHorizontal ? "column" : "row",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Box
                      position="relative"
                      width={isHorizontal ? "100%" : "40%"}
                      height={isHorizontal ? "50%" : "100%"}
                      flexShrink={0}
                      overflow="hidden"
                    >
                      <Image
                        src={featuredImage || "/quanCafe.jpg"}
                        alt={post.title.rendered}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                        transition="transform 0.3s ease-in-out"
                        _groupHover={{ transform: "scale(1.1)" }}
                      />
                    </Box>

                    <Box
                      p={4}
                      flex="1"
                      display="flex"
                      flexDirection="column"
                      height={isHorizontal ? "50%" : "100%"}
                      overflow="hidden"
                    >
                      <Heading
                        as="h1"
                        size="md"
                        color="red.400"
                        mb={3}
                        noOfLines={2}
                      >
                        {post.title.rendered}
                      </Heading>
                      <Box
                        flex="1"
                        overflow="hidden"
                        fontSize="sm"
                        color="gray.600"
                        css={{
                          display: "-webkit-box",
                          WebkitLineClamp: "3",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: post.excerpt.rendered,
                        }}
                      />
                    </Box>
                  </Link>
                </Box>
              );
            })
          ) : (
            <Box textAlign="center" py={10} gridColumn="1/-1"></Box>
          )}
        </Box>

        <Pagination />
      </Box>
    </div>
  );
}
