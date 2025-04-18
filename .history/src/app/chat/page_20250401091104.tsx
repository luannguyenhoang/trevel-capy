"use client";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  HStack,
  Text,
  Container,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // OpenRouter API call
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          "HTTP-Referer": window.location.origin, // Required for OpenRouter
          "X-Title": "Chat Application", // Optional
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo", // You can change this to another model offered by OpenRouter
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to get response");
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.choices[0].message.content },
      ]);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to get response from OpenRouter. Make sure your API key is set properly.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack h="calc(100vh - 100px)" spacing={4}>
        <Box
          w="100%"
          h="calc(100% - 60px)"
          overflowY="auto"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          bg="gray.50"
        >
          {messages.length === 0 ? (
            <Flex
              h="100%"
              alignItems="center"
              justifyContent="center"
              color="gray.500"
            >
              <Text>Start a conversation with the AI assistant</Text>
            </Flex>
          ) : (
            <VStack spacing={4} align="stretch">
              {messages.map((message, index) => (
                <Box
                  key={index}
                  alignSelf={
                    message.role === "user" ? "flex-end" : "flex-start"
                  }
                  bg={message.role === "user" ? "blue.100" : "gray.100"}
                  p={3}
                  borderRadius="lg"
                  maxW="80%"
                >
                  <Text>{message.content}</Text>
                </Box>
              ))}
              <div ref={endOfMessagesRef} />
            </VStack>
          )}
        </Box>

        <HStack w="100%">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            size="md"
            disabled={isLoading}
          />
          <Button
            colorScheme="blue"
            onClick={handleSendMessage}
            isLoading={isLoading}
            disabled={isLoading || !input.trim()}
            rightIcon={<FaPaperPlane />}
          >
            Send
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
}
