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
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import parse from "html-react-parser";

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
    // Highlight code blocks whenever messages change
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, [messages]);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
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
                </div>
                <pre className={`language-${lang || "html"}`}>
                  <code className={`language-${lang || "html"}`}>{code.trim()}</code>
                </pre>
              </div>
            );
          }
        }
        // Regular text
        return <span key={index}>{segment}</span>;
      });
    }
    
    // Regular text without code blocks
    return content;
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
      <style jsx global>{`
        .code-block {
          position: relative;
          margin: 1em 0;
          border-radius: 6px;
          overflow: hidden;
          background: #1e1e1e;
        }
        .code-header {
          display: flex;
          justify-content: space-between;
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
          font-size: 14px;
          line-height: 1.5;
        }
        code {
          font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        }
        .token.comment { color: #6a9955; }
        .token.punctuation { color: #d4d4d4; }
        .token.string { color: #ce9178; }
        .token.function { color: #dcdcaa; }
        .token.keyword { color: #569cd6; }
        .token.tag { color: #569cd6; }
        .token.attr-name { color: #9cdcfe; }
        .token.attr-value { color: #ce9178; }
      `}</style>
      
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
