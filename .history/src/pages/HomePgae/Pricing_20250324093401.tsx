"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  useToast,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import productsData from "@/data.json";
import { useCart } from "@/utils/cartContext";
import { ScrollAnimation } from "@/components/molecules/ScrollAnimation";

interface Props {
  children: React.ReactNode;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  duration: string;
  rating: number;
  reviewCount: number;
}

function PriceWrapper(props: Props) {
  const { children } = props;

  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}

export default function Pricing() {
  const [products, setProducts] = useState<Product[]>(productsData.products);
  const { addToCart } = useCart();
  const toast = useToast();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      currency: product.currency,
      quantity: 1,
      image:
        product.images && product.images.length > 0
          ? product.images[0]
          : "/logo.png",
    });

    toast({
      title: "Thêm vào giỏ hàng thành công",
      description: `Đã thêm ${product.name} vào giỏ hàng`,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  return (  
  <ScrollAnimation delay={0.3}>

    <Box py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Gói Tour Du Lịch Phù Hợp Với Bạn
        </Heading>
        <Text fontSize="lg" color={"gray.500"}>
          Đa dạng lựa chọn tour với nhiều mức giá. Đặt tour trước 30 ngày để
          nhận ưu đãi đặc biệt.
        </Text>
      </VStack>
      <Stack
        direction={{ base: "column", md: "row" }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}
      >
        {products.map((product, index) => (
          <PriceWrapper key={product.id}>
            {index === 1 && (
              <Box position="relative">
                <Box
                  position="absolute"
                  top="-16px"
                  left="50%"
                  style={{ transform: "translate(-50%)" }}
                >
                  <Text
                    textTransform="uppercase"
                    bg={useColorModeValue("red.300", "red.700")}
                    px={3}
                    py={1}
                    color={useColorModeValue("gray.900", "gray.300")}
                    fontSize="sm"
                    fontWeight="600"
                    rounded="xl"
                  >
                    Phổ Biến Nhất
                  </Text>
                </Box>
              </Box>
            )}
            <Box py={4} px={4}>
              <Text fontWeight="500" fontSize="2xl">
                {product.name}
              </Text>
              <Box display={"flex"} justifyContent="center">
                <Text fontSize="2xl" fontWeight="600">
                  {product.currency === "VND" ? "₫" : "$"}
                </Text>
                <Text fontSize="4xl" fontWeight="700">
                  {(product.price / 1000).toFixed(0)}K
                </Text>
                <Text fontSize="3xl" color="gray.500">
                  /người
                </Text>
              </Box>
            </Box>
            <VStack
              bg={useColorModeValue("gray.50", "gray.900")}
              py={4}
              borderBottomRadius={"xl"}
            >
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  {product.duration}
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  {product.category}
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Đánh giá: {product.rating}/5 ({product.reviewCount} đánh giá)
                </ListItem>
              </List>
              <Box w="80%" pt={7}>
                <Button
                  w="full"
                  colorScheme="red"
                  variant={index === 1 ? "solid" : "outline"}
                >
                  Đặt ngay
                </Button>
              </Box>
              <Box w="80%">
                <Button
                  w="full"
                  colorScheme="red"
                  variant={index === 1 ? "solid" : "outline"}
                  onClick={() => handleAddToCart(product)}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Box>
            </VStack>
          </PriceWrapper>
        ))}
      </Stack>
    </Box>
  </ScrollAnimation>
  );
}
