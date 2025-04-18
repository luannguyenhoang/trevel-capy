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
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { FaPaperPlane, FaCode, FaCopy } from "react-icons/fa";

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

  // Function to copy code to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Copied to clipboard",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      },
      (err) => {
        toast({
          title: "Failed to copy",
          description: err.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    );
  };

  // Function to format code in message content
  const formatMessageContent = (content: string) => {
    // Check if content contains code blocks
    if (content.includes("```")) {
      // Split by code blocks
      const segments = content.split(/(```(?:.*?)\n[\s\S]*?```)/g);
      
      return segments.map((segment, index) => {
        // Check if this segment is a code block
        if (segment.startsWith("```") && segment.endsWith("```")) {
          // Extract language and code
          const match = segment.match(/```(?:(.*?)\n)?([\s\S]*?)```/);
          if (match) {
            const [_, lang = "html", code] = match;
            return (
              <div key={index} className="code-block">
                <div className="code-header">
                  <span>{lang || "code"}</span>
                  <IconButton
                    aria-label="Copy code"
                    icon={<FaCopy />}
                    size="xs"
                    variant="ghost"
                    color="gray.300"
                    _hover={{ color: "white" }}
                    onClick={() => copyToClipboard(code.trim())}
                  />
                </div>
                <pre>
                  <code>{code.trim()}</code>
                </pre>
              </div>
            );
          }
        }
        // Regular text - handle line breaks for better readability
        return <span key={index}>{segment.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < segment.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}</span>;
      });
    }
    
    // Regular text with line breaks
    return content.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
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
          "HTTP-Referer": window.location.origin,
          "X-Title": "Chat Application",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
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
    <Container maxW="container.lg" py={6}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        bg="white"
      >
        <Box p={4} borderBottomWidth="1px" bg="gray.50">
          <Heading size="md" textAlign="center">AI Assistant</Heading>
        </Box>
        
        <style jsx global>{`
          .code-block {
            position: relative;
            margin: 1em 0;
            border-radius: 6px;
            overflow: hidden;
            background: #1e1e1e;
            font-size: 14px;
          }
          .code-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 15px;
            background: #343434;
            color: #e6e6e6;
            font-family: monospace;
            font-size: 0.85em;
          }
          pre {
            margin: 0 !important;
            padding: 15px !important;
            overflow-x: auto;
            line-height: 1.5;
          }
          code {
            font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
            color: #d4d4d4;
          }
          
          /* Scrollbar styling */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.05);
            border-radius: 8px;
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(0,0,0,0.2);
            border-radius: 8px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(0,0,0,0.3);
          }
        `}</style>
        
        <VStack h="calc(100vh - 180px)" spacing={0}>
          <Box
            w="100%"
            h="calc(100% - 60px)"
            overflowY="auto"
            p={4}
            bg="gray.50"
          >
            {messages.length === 0 ? (
              <Flex
                h="100%"
                direction="column"
                alignItems="center"
                justifyContent="center"
                color="gray.500"
                p={4}
                textAlign="center"
              >
                <Box fontSize="5xl" mb={4}>
                  <FaCode />
                </Box>
                <Text fontSize="lg" fontWeight="medium">
                  Xin chào! Tôi có thể giúp gì cho bạn?
                </Text>
                <Text mt={2}>
                  Hãy đặt câu hỏi hoặc yêu cầu một đoạn code ví dụ.
                </Text>
              </Flex>
            ) : (
              <VStack spacing={4} align="stretch">
                {messages.map((message, index) => (
                  <Box
                    key={index}
                    alignSelf={
                      message.role === "user" ? "flex-end" : "flex-start"
                    }
                    bg={message.role === "user" ? "blue.100" : "white"}
                    color={message.role === "user" ? "gray.800" : "gray.800"}
                    p={4}
                    borderRadius="lg"
                    maxW="80%"
                    boxShadow="sm"
                    border="1px solid"
                    borderColor={message.role === "user" ? "blue.200" : "gray.200"}
                  >
                    {typeof message.content === 'string' ? 
                      formatMessageContent(message.content) : 
                      message.content
                    }
                  </Box>
                ))}
                <div ref={endOfMessagesRef} />
              </VStack>
            )}
          </Box>

          <Box
            w="100%"
            p={4}
            borderTopWidth="1px"
            bg="white"
          >
            <HStack spacing={3}>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập tin nhắn của bạn..."
                size="md"
                disabled={isLoading}
                bg="white"
                boxShadow="sm"
                borderRadius="md"
                _focus={{
                  borderColor: "blue.300",
                  boxShadow: "0 0 0 1px var(--chakra-colors-blue-300)",
                }}
              />
              <Button
                colorScheme="blue"
                onClick={handleSendMessage}
                isLoading={isLoading}
                disabled={isLoading || !input.trim()}
                rightIcon={<FaPaperPlane />}
                borderRadius="md"
              >
                Gửi
              </Button>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </Container>
  );
}
