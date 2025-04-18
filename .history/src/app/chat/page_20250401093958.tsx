"use client";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Container,
  Flex,
  useToast,
  Avatar,
  Icon,
  InputGroup,
  InputRightElement,
  Heading,
} from "@chakra-ui/react";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";
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
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, [messages]);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatMessageContent = (content: string) => {
    if (content.includes("```")) {
      const segments = content.split(/(```(?:.*?)\n[\s\S]*?```)/g);

      return segments.map((segment, index) => {
        if (segment.startsWith("```") && segment.endsWith("```")) {
          const match = segment.match(/```(?:(.*?)\n)?([\s\S]*?)```/);
          if (match) {
            const [_, lang = "html", code] = match;
            return (
              <div key={index} className="code-block">
                <div className="code-header">
                  <span>{lang || "code"}</span>
                </div>
                <pre className={`language-${lang || "html"}`}>
                  <code className={`language-${lang || "html"}`}>
                    {code.trim()}
                  </code>
                </pre>
              </div>
            );
          }
        }
        
        return (
          <Text key={index} whiteSpace="pre-wrap">
            {segment}
          </Text>
        );
      });
    }


    return <Text whiteSpace="pre-wrap">{content}</Text>;
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
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            "HTTP-Referer": window.location.origin,
            "X-Title": "Chat Application", 
          },
          body: JSON.stringify({
            model: "openai/gpt-3.5-turbo",
            messages: [...messages, userMessage].map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            temperature: 0.7,
            max_tokens: 1000,
          }),
        }
      );

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
        description:
          "Failed to get response from OpenRouter. Make sure your API key is set properly.",
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
    <Box bg="gray.50" minH="100vh" py={4}>
      <Container maxW="container.lg" h="calc(100vh - 2rem)">
        <style jsx global>{`
          .code-block {
            position: relative;
            margin: 1em 0;
            border-radius: 8px;
            overflow: hidden;
            background: #1e1e1e;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
            border-bottom: 1px solid #444;
          }
          pre {
            margin: 0 !important;
            padding: 15px !important;
            overflow-x: auto;
            font-size: 14px;
            line-height: 1.5;
          }
          code {
            font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono",
              monospace;
          }
          .token.comment {
            color: #6a9955;
          }
          .token.punctuation {
            color: #d4d4d4;
          }
          .token.string {
            color: #ce9178;
          }
          .token.function {
            color: #dcdcaa;
          }
          .token.keyword {
            color: #569cd6;
          }
          .token.tag {
            color: #569cd6;
          }
          .token.attr-name {
            color: #9cdcfe;
          }
          .token.attr-value {
            color: #ce9178;
          }
        `}</style>

        <VStack
          h="100%"
          spacing={4}
          bg="white"
          borderRadius="xl"
          boxShadow="lg"
          overflow="hidden"
        >
          <Flex
            w="100%"
            bg="blue.500"
            p={4}
            color="white"
            alignItems="center"
            boxShadow="sm"
          >
            <Icon as={FaRobot} mr={3} fontSize="xl" />
            <Heading size="md">AI Assistant</Heading>
          </Flex>

          <Box
            w="100%"
            flex="1"
            overflowY="auto"
            px={4}
            py={2}
            className="chat-container"
          >
            {messages.length === 0 ? (
              <Flex
                h="100%"
                alignItems="center"
                justifyContent="center"
                direction="column"
                color="gray.400"
                p={8}
              >
                <Icon as={FaRobot} fontSize="5xl" mb={4} />
                <Text fontSize="lg" textAlign="center">
                  Start a conversation with the AI assistant
                </Text>
                <Text fontSize="sm" mt={2} textAlign="center">
                  Ask anything about coding, writing, or general questions
                </Text>
              </Flex>
            ) : (
              <VStack spacing={4} align="stretch" pb={2}>
                {messages.map((message, index) => (
                  <Flex
                    key={index}
                    alignSelf={
                      message.role === "user" ? "flex-end" : "flex-start"
                    }
                    direction="row"
                    maxW="80%"
                  >
                    {message.role === "assistant" && (
                      <Avatar
                        size="sm"
                        bg="blue.500"
                        icon={<FaRobot fontSize="1rem" />}
                        mr={2}
                        mt={1}
                      />
                    )}
                    <Box
                      bg={message.role === "user" ? "blue.50" : "gray.50"}
                      p={3}
                      borderRadius="lg"
                      borderTopRightRadius={message.role === "user" ? 0 : "lg"}
                      borderTopLeftRadius={
                        message.role === "assistant" ? 0 : "lg"
                      }
                      boxShadow="sm"
                      border="1px solid"
                      borderColor={
                        message.role === "user" ? "blue.100" : "gray.200"
                      }
                    >
                      {typeof message.content === "string"
                        ? formatMessageContent(message.content)
                        : message.content}
                    </Box>
                    {message.role === "user" && (
                      <Avatar
                        size="sm"
                        bg="blue.400"
                        icon={<FaUser fontSize="0.9rem" />}
                        ml={2}
                        mt={1}
                      />
                    )}
                  </Flex>
                ))}
                <div ref={endOfMessagesRef} />
              </VStack>
            )}
          </Box>

          <Flex w="100%" p={4} borderTop="1px solid" borderColor="gray.100">
            <InputGroup size="md">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                pr="4.5rem"
                borderRadius="full"
                boxShadow="sm"
                focusBorderColor="blue.400"
                disabled={isLoading}
                h="50px"
                _placeholder={{ color: "gray.400" }}
              />
              <InputRightElement width="4.5rem" h="50px">
                <Button
                  h="1.75rem"
                  size="sm"
                  colorScheme="blue"
                  onClick={handleSendMessage}
                  isLoading={isLoading}
                  disabled={isLoading || !input.trim()}
                  borderRadius="full"
                  mr={1}
                >
                  <FaPaperPlane />
                </Button>
              </InputRightElement>
            </InputGroup>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
}
