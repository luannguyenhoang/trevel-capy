"use client";

import {
  Box,
  Heading,
  Image,
  Button,
  HStack,
  Text,
  Center,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { GET_POSTS } from "@/utils/querys";
import { Post } from "@/type/types";

interface SlideContentProps {
  isHorizontal: boolean;
  showPagination?: boolean;
  postsPerPage?: number;
}

export default function SlideConten({
  isHorizontal = true,
  showPagination = true,
  postsPerPage = 3,
}: SlideContentProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allCursors, setAllCursors] = useState<string[]>([""]);

  useEffect(() => {
    async function fetchAllCursors() {
      try {
        setLoading(true);

        const firstPageResult = await fetchGraphQL(postsPerPage, null);
        setPosts(firstPageResult.data.posts.nodes);

        const cursors = [""];
        let hasMore = firstPageResult.data.posts.pageInfo.hasNextPage;
        let nextCursor = firstPageResult.data.posts.pageInfo.endCursor;

        let page = 1;
        const MAX_PAGES = 10;

        while (hasMore && page < MAX_PAGES) {
          const nextPageData = await fetchGraphQL(postsPerPage, nextCursor);
          if (!nextPageData) break;

          cursors.push(nextCursor);
          hasMore = nextPageData.data.posts.pageInfo.hasNextPage;
          nextCursor = nextPageData.data.posts.pageInfo.endCursor;
          page++;
        }

        setAllCursors(cursors);
        setTotalPages(cursors.length);
      } catch (error) {
        console.error("Lỗi khi khởi tạo phân trang:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAllCursors();
  }, [postsPerPage]);

  useEffect(() => {
    async function fetchPagePosts() {
      try {
        setLoading(true);
        const cursor = allCursors[currentPage - 1] || null;
        const result = await fetchGraphQL(postsPerPage, cursor);

        if (result) {
          setPosts(result.data.posts.nodes);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu trang:", error);
      } finally {
        setLoading(false);
      }
    }

    if (allCursors.length > 0) {
      fetchPagePosts();
    }
  }, [currentPage, allCursors, postsPerPage]);

  const fetchGraphQL = async (first: number, after: string | null) => {
    try {
      const res = await fetch("/api/graphQL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: GET_POSTS,
          variables: { first, after },
        }),
      });

      if (!res.ok) throw new Error("Lỗi khi gọi API GraphQL");
      return await res.json();
    } catch (error) {
      console.error("Lỗi kết nối GraphQL:", error);
      return null;
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <Center py="72">
        <Spinner size="xl" color="blue.500" thickness="4px" />
      </Center>
    );
  }

  return (
    <div className="pt-28">
      <Box mb={6} borderColor="gray.200" maxW={"7xl"} mx={"auto"}>
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
            posts.map((post) => (
              <PostCard key={post.id} post={post} isHorizontal={isHorizontal} />
            ))
          ) : (
            <Box textAlign="center" py={10} gridColumn="1/-1">
              Không có bài viết nào.
            </Box>
          )}
        </Box>

        {showPagination && totalPages > 1 && (
          <HStack spacing={2} justify="center" mt={6}>
            <Button
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              leftIcon={<ChevronLeftIcon />}
            >
              Trước
            </Button>

            {renderPaginationButtons()}

            <Button
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={currentPage === totalPages}
              rightIcon={<ChevronRightIcon />}
            >
              Sau
            </Button>

            <Text fontSize="sm" color="gray.500" ml={2}>
              Trang {currentPage} / {totalPages}
            </Text>
          </HStack>
        )}
      </Box>
    </div>
  );

  function renderPaginationButtons() {
    return [...Array(totalPages)].map((_, index) => {
      const pageNum = index + 1;

      if (
        pageNum === 1 ||
        pageNum === totalPages ||
        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
      ) {
        return (
          <Button
            key={pageNum}
            size="sm"
            colorScheme={currentPage === pageNum ? "blue" : "gray"}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </Button>
        );
      }

      if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
        return <Text key={`ellipsis-${pageNum}`}>...</Text>;
      }

      return null;
    });
  }
}

function PostCard({
  post,
  isHorizontal,
}: {
  post: Post;
  isHorizontal: boolean;
}) {
  return (
    <Box
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
            src={post.featuredImage?.node?.mediaItemUrl || "/quanCafe.jpg"}
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
          <Heading as="h1" size="md" color="red.400" mb={3} noOfLines={2}>
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
}
