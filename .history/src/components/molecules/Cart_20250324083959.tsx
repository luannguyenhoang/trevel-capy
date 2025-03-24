import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
  Box,
  Text,
  VStack,
  HStack,
  Image,
  Button,
  Flex,
  Badge,
  DrawerFooter,
} from "@chakra-ui/react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

export default function CartShop() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cartItems, removeFromCart, getTotalItems, getTotalPrice } = useCart();

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="Shopping cart"
        icon={
          <Box position="relative">
            <FaShoppingCart />
            {getTotalItems() > 0 && (
              <Badge 
                colorScheme="red" 
                borderRadius="full" 
                position="absolute" 
                top="-10px" 
                right="-10px"
              >
                {getTotalItems()}
              </Badge>
            )}
          </Box>
        }
        variant="outline"
        display={"flex"}
        justifyContent={"center"}
        colorScheme="red"
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Giỏ hàng của bạn</DrawerHeader>

          <DrawerBody>
            {cartItems.length === 0 ? (
              <Text>Giỏ hàng trống</Text>
            ) : (
              <VStack spacing={4} align="stretch">
                {cartItems.map((item) => (
                  <Box 
                    key={item.product.id} 
                    p={3} 
                    borderWidth="1px" 
                    borderRadius="lg"
                    shadow="sm"
                  >
                    <HStack>
                      <Image 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        boxSize="80px"
                        objectFit="cover"
                        borderRadius="md"
                        fallbackSrc="https://via.placeholder.com/80"
                      />
                      <VStack align="start" flex={1}>
                        <Text fontWeight="bold">{item.product.name}</Text>
                        <Text fontSize="sm" color="gray.600">{item.product.duration}</Text>
                        <Flex justify="space-between" w="100%">
                          <Text>
                            {item.quantity} x {item.product.currency === "VND" ? "₫" : "$"}
                            {item.product.price.toLocaleString()}
                          </Text>
                          <IconButton
                            aria-label="Remove from cart"
                            icon={<FaTrash />}
                            size="sm"
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => removeFromCart(item.product.id)}
                          />
                        </Flex>
                      </VStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            )}
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <VStack w="100%" spacing={3}>
              <HStack justify="space-between" w="100%">
                <Text fontWeight="bold">Tổng cộng:</Text>
                <Text fontWeight="bold">
                  ₫{getTotalPrice().toLocaleString()}
                </Text>
              </HStack>
              <Button 
                w="100%" 
                colorScheme="red"
                isDisabled={cartItems.length === 0}
              >
                Tiến hành thanh toán
              </Button>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
