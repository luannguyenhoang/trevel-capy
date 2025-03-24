import { useCart } from "@/utils/service/cart";
import {
  Badge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FaMinus, FaPlus, FaShoppingCart, FaTrash } from "react-icons/fa";

export default function CartShop() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cartItems, removeFromCart, updateQuantity, totalItems, clearCart } =
    useCart();

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <>
      <Button
        onClick={onOpen}
        p={"0px"}
        aria-label="Shopping cart"
        variant="outline"
        display={"flex"}
        justifyContent={"center"}
        colorScheme="red"
        position="relative"
      >
        <FaShoppingCart />

        <Badge
          position="absolute"
          top="-8px"
          right="-8px"
          borderRadius="full"
          bg="red.400"
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
      </Button>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            ({totalItems} sản phẩm)
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
                        <Tooltip label={item.name}>
                          <Text
                            fontWeight=""
                            color={"red.400"}
                            noOfLines={1}
                            overflow="hidden"
                            textOverflow="ellipsis"
                            maxWidth="200px"
                          >
                            {item.name}
                          </Text>
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
                            colorScheme="red.400"
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
                  <Button w="full" colorScheme="red.400" mt={4}>
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
