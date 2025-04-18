"use client";
import { useState, useEffect } from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { CommentPost } from "@/type/types";
import { formatRelativeTime } from "@/utils/common";
import CommentForm from "./CommentForm";

const CommentItem = React.memo(
  ({
    comment,
    depth = 0,
    replyingTo,
    replyingToName,
    onReply,
    onSubmitComment,
    onCancelReply,
    parentExpanded,
    isLastChild = false,
  }: {
    comment: CommentPost;
    depth?: number;
    replyingTo: number | null;
    replyingToName?: string;
    onReply: (id: number) => void;
    onSubmitComment: (name: string, content: string) => Promise<boolean>;
    onCancelReply: () => void;
    parentExpanded: boolean;
    isLastChild?: boolean;
  }) => {
    const [showReplies, setShowReplies] = useState(false);
    const hasChildren = comment.children && comment.children.length > 0;
    const childrenCount = hasChildren ? comment.children.length : 0;

    useEffect(() => {
      if (depth === 0) {
        setShowReplies(parentExpanded);
      }
    }, [parentExpanded, depth]);

    const toggleReplies = () => {
      setShowReplies(!showReplies);
    };

    return (
      <Box position="relative">
        {depth > 0 && (
          <Box
            position="absolute"
            left="-57px"
            top="-70px"
            bottom={isLastChild ? "auto" : "0"}
            width="2px"
            height={isLastChild ? "76px" : "auto"}
            bg="gray.200"
            _before={{
              content: '""',
              position: "absolute",
              left: "0",
              top: "70px",
              width: "46px",
              height: "15px",
              borderLeft: "2.5px solid #E2E8F0",
              borderBottom: "2.5px solid #E2E8F0",
              borderBottomLeftRadius: "10px",
            }}
          />
        )}

        <Flex gap={2}>
          <Avatar
            src={comment.author_avatar_urls["48"]}
            name={comment.author_name}
            size={depth === 0 ? "sm" : "xs"}
          />
          <Box flex="1">
            <Box bg="gray.50" p={3} borderRadius="xl">
              <Text fontWeight="semibold" fontSize={depth === 0 ? "md" : "sm"}>
                {comment.author_name}
              </Text>
              <Box
                mt={1}
                fontSize={depth === 0 ? "md" : "sm"}
                color="gray.700"
                dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
              />
            </Box>

            <Flex mt={1} gap={4} ml={2}>
              <Text
                fontSize="sm"
                color="gray.500"
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
                onClick={() => onReply(comment.id)}
              >
                Phản hồi
              </Text>
              {hasChildren && (
                <Text
                  fontSize="sm"
                  color="gray.500"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                  onClick={toggleReplies}
                  fontWeight="bold"
                >
                  {showReplies ? "Ẩn phản hồi" : `${childrenCount} phản hồi`}
                </Text>
              )}
              <Text fontSize="sm" color="gray.500">
                {formatRelativeTime(comment.date)}
              </Text>
            </Flex>

            {replyingTo === comment.id && (
              <Box mt={3}>
                <CommentForm
                  replyingTo={replyingTo}
                  replyingToName={replyingToName || comment.author_name}
                  onSubmit={onSubmitComment}
                  onCancelReply={onCancelReply}
                />
              </Box>
            )}

            {hasChildren && showReplies && (
              <Box mt={2} ml={8} position="relative">
                {comment.children.map((child, index) => (
                  <Box key={child.id} mb={2}>
                    <CommentItem
                      comment={child}
                      depth={depth + 1}
                      replyingTo={replyingTo}
                      replyingToName={replyingToName}
                      onReply={onReply}
                      onSubmitComment={onSubmitComment}
                      onCancelReply={onCancelReply}
                      parentExpanded={false}
                      isLastChild={index === comment.children.length - 1}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Flex>
      </Box>
    );
  }
);

CommentItem.displayName = "CommentItem";

export default CommentItem;
