"use client";
import { useState, useRef, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Text,
  Textarea,
  IconButton,
} from "@chakra-ui/react";
import { FormEvent } from "react";
import React from "react";
import { FaSmile } from "react-icons/fa";


interface CommentFormProps {
  initialName?: string;
  initialContent?: string;
  replyingTo: number | null;
  replyingToName?: string;
  onSubmit: (name: string, content: string) => void;
  onCancelReply: () => void;
}

const CommentForm = React.memo(
  ({
    initialName = "",
    initialContent = "",
    replyingTo,
    replyingToName,
    onSubmit,
    onCancelReply,
  }: CommentFormProps) => {
    const [name, setName] = useState(initialName);
    const [content, setContent] = useState(initialContent);
    const [submitting, setSubmitting] = useState(false);
    const [showEmojis, setShowEmojis] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const emojiContainerRef = useRef<HTMLDivElement>(null);
    const emojiButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          emojiContainerRef.current &&
          emojiButtonRef.current &&
          !emojiContainerRef.current.contains(event.target as Node) &&
          !emojiButtonRef.current.contains(event.target as Node)
        ) {
          setShowEmojis(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setSubmitting(true);

      try {
        await onSubmit(name, content);
        setName(initialName);
        setContent(initialContent);
      } finally {
        setSubmitting(false);
      }
    };

    const insertEmoji = (emoji: string) => {
      setContent((prev) => prev + emoji);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    };

    return (
      <Box id="comment-form">
        <form onSubmit={handleSubmit}>
          {replyingTo && (
            <Flex mb={2} align="center" gap={2}>
              <Text fontSize="sm" color="gray.500">
                Đang trả lời bình luận của
              </Text>
              <Text fontSize="sm" fontWeight="bold" color="blue.500">
                {replyingToName}
              </Text>
              <Text
                fontSize="sm"
                color="gray.500"
                cursor="pointer"
                onClick={onCancelReply}
                _hover={{ textDecoration: "underline" }}
              >
                • Hủy
              </Text>
            </Flex>
          )}

          <Flex gap={2}>
            <Avatar size="sm" />
            <Box flex="1" position="relative">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên của bạn"
                size="sm"
                mb={2}
                bg="white"
              />

              <Box borderWidth="1px" borderRadius="xl" overflow="visible">
                <Textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Viết bình luận..."
                  minH="60px"
                  p={3}
                  border="none"
                  _focus={{ border: "none", boxShadow: "none" }}
                  resize="none"
                />

                <Flex p={2} borderTop="1px" borderColor="gray.100" gap={2}>
                  {emojiGroups["Phổ biến"].map((emoji: string, index: number) => (
                    <Box
                      key={index}
                      cursor="pointer"
                      onClick={() => insertEmoji(emoji)}
                      fontSize="xl"
                      _hover={{ transform: "scale(1.2)" }}
                      transition="transform 0.2s"
                    >
                      {emoji}
                    </Box>
                  ))}
                </Flex>

                <Flex
                  justify="space-between"
                  p={2}
                  borderTop="1px"
                  borderColor="gray.100"
                  align="center"
                >
                  <IconButton
                    ref={emojiButtonRef}
                    aria-label="Add emoji"
                    icon={<FaSmile />}
                    variant="ghost"
                    size="sm"
                    colorScheme="gray"
                    fontSize="18px"
                    onClick={() => setShowEmojis(!showEmojis)}
                  />

                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="sm"
                    isLoading={submitting}
                    borderRadius="full"
                  >
                    {replyingTo ? "Phản hồi" : "Bình luận"}
                  </Button>
                </Flex>
              </Box>

              {showEmojis && (
                <EmojiPicker 
                  ref={emojiContainerRef} 
                  onSelectEmoji={insertEmoji} 
                />
              )}
            </Box>
          </Flex>
        </form>
      </Box>
    );
  }
);

CommentForm.displayName = "CommentForm";
export default CommentForm;
