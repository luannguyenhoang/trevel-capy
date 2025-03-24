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
  Button,
  Flex,
  Image,
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import { FaShoppingCart, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "@/utils/cartContext";

export default function CartShop() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cartItems, removeFromCart, updateQuantity, totalItems, clearCart } =
    useCart();

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="Shopping cart"
        icon={<FaShoppingCart />}
        variant="outline"
        display={"flex"}
        justifyContent={"center"}
        colorScheme="red"
        position="relative"
      >
        {totalItems > 0 && (
          <Badge
            position="absolute"
            top="-8px"
            right="-8px"
            borderRadius="full"
            bg="red.500"
            color="white"
            fontSize="0.8em"
            minW="1.6em"
            minH="1.6em"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {totalItems}
          </Badge>
        )}
      </IconButton>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Giỏ hàng của bạn ({totalItems} sản phẩm)
          </DrawerHeader>

          <DrawerBody>
            {cartItems.length === 0 ? (
              <Box textAlign="center" py={10}>
                <Text>Giỏ hàng của bạn đang trống</Text>
                <Button mt={4} colorScheme="red" onClick={onClose}>
                  Tiếp tục mua sắm
                </Button>
              </Box>
            ) : (
              <VStack
                spacing={4}
                align="stretch"
                divider={<Box borderBottomWidth="1px" />}
              >
                {cartItems.map((item) => (
                  <Box key={item.id} p={2}>
                    <Flex>
                      <Image
                        src={item.image || "/logo.png"}
                        alt={item.name}
                        boxSize="80px"
                        objectFit="cover"
                        mr={4}
                        borderRadius="md"
                      />
                      <Box flex="1">
                       <Tooltip content="$${item.name}">
                       <Text fontWeight="" color={"red.400"}>{item.name}</Text>
                       </Tooltip>
                        <Text color="gray.600" fontSize="sm">
                          {item.currency === "VND" ? "₫" : "$"}
                          {item.price.toLocaleString()}
                        </Text>
                        <HStack mt={2}>
                          <IconButton
                            aria-label="Decrease quantity"
                            icon={<FaMinus />}
                            size="xs"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          />
                          <Text>{item.quantity}</Text>
                          <IconButton
                            aria-label="Increase quantity"
                            icon={<FaPlus />}
                            size="xs"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          />
                          <IconButton
                            aria-label="Remove item"
                            icon={<FaTrash />}
                            size="xs"
                            colorScheme="red"
                            ml={2}
                            onClick={() => removeFromCart(item.id)}
                          />
                        </HStack>
                      </Box>
                      <Text fontWeight="bold">
                        {item.currency === "VND" ? "₫" : "$"}
                        {(item.price * item.quantity).toLocaleString()}
                      </Text>
                    </Flex>
                  </Box>
                ))}

                <Box py={4}>
                  <Flex justify="space-between" fontWeight="bold" fontSize="lg">
                    <Text>Tổng cộng:</Text>
                    <Text>
                      {cartItems.length > 0 && cartItems[0].currency === "VND"
                        ? "₫"
                        : "$"}
                      {calculateTotal().toLocaleString()}
                    </Text>
                  </Flex>
                  <Button w="full" colorScheme="red" mt={4}>
                    Thanh toán
                  </Button>
                  <Button w="full" variant="outline" mt={2} onClick={clearCart}>
                    Xóa giỏ hàng
                  </Button>
                </Box>
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
