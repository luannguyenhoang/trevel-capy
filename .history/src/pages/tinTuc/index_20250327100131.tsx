import Loading from "@/components/molecules/Loading";
import { Box, Heading, Image, Button, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { GET_POSTS } from "@/utils/querys";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage?: {
    node: {
      mediaItemUrl: string;
    };
  };
};

type PageInfo = {
  hasNextPage: boolean;
  endCursor: string | null;
};

interface SlideContentProps {
  isHorizontal: boolean;
  showPagination?: boolean;
  postsPerPage?: number;
}

export default function SlideConten({
  isHorizontal = false,
  showPagination = true,
  postsPerPage = 6,
}: SlideContentProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    hasNextPage: false,
    endCursor: null,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPosts = async (cursor?: string) => {
    try {
      setLoading(true);
      const res = await fetch("/api/graphQL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: GET_POSTS,
          variables: {
            first: postsPerPage,
            after: cursor,
          },
        }),
      });

      if (!res.ok) throw new Error("Không thể lấy danh sách bài viết");
      
      const result = await res.json();
      console.log('GraphQL Response:', result); // Debug log

      // Kiểm tra và xử lý dữ liệu an toàn hơn
      if (result?.data?.posts?.nodes) {
        if (cursor) {
          setPosts(prev => [...prev, ...result.data.posts.nodes]);
        } else {
          setPosts(result.data.posts.nodes);
        }
        
        // Kiểm tra pageInfo tồn tại trước khi set
        if (result.data.posts.pageInfo) {
          setPageInfo(result.data.posts.pageInfo);
        }
      } else {
        console.error('Invalid response structure:', result);
        throw new Error('Cấu trúc dữ liệu không hợp lệ');
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setPosts([]);
      setPageInfo({
        hasNextPage: false,
        endCursor: null,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const loadMore = () => {
    if (pageInfo.hasNextPage && pageInfo.endCursor) {
      fetchPosts(pageInfo.endCursor);
      setCurrentPage(prev => prev + 1);
    }
  };

  const Pagination = () => {
    if (!showPagination || !pageInfo.hasNextPage) return null;

    return (
      <HStack spacing={4} justify="center" mt={6}>
        <Button
          colorScheme="blue"
          onClick={loadMore}
          isLoading={loading}
          loadingText="Đang tải..."
          disabled={!pageInfo.hasNextPage}
        >
          Xem thêm
        </Button>
        
        {loading && <Loading />}
      </HStack>
    );
  };

  return (
    <div className="pt-28">
      <Box mb={6} borderColor="gray.200">
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
          {posts.length > 0 ? (
            posts.map((post) => {
              const featuredImage = post.featuredImage?.node?.mediaItemUrl;

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
                        alt={post.title}
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
                        {post.title}
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
                          __html: post.excerpt,
                        }}
                      />
                    </Box>
                  </Link>
                </Box>
              );
            })
          ) : (
            <Box textAlign="center" py={10} gridColumn="1/-1">
              Không có bài viết nào.
            </Box>
          )}
        </Box>

        {showPagination && <Pagination />}
      </Box>
    </div>
  );
}
