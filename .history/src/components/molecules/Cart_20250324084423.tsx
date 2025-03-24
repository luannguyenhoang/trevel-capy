import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
  VStack,
  HStack,
  Text,
  Box,
  Button,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { FaShoppingCart, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "@/contexts/CartContext";

export default function CartShop() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { items, removeFromCart, updateQuantity } = useCart();

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
        {items.length > 0 && (
          <Box
            position="absolute"
            top="-8px"
            right="-8px"
            bg="red.500"
            color="white"
            borderRadius="full"
            width="20px"
            height="20px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="xs"
            fontWeight="bold"
          >
            {items.reduce((total, item) => total + item.quantity, 0)}
          </Box>
        )}
      </IconButton>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Giỏ hàng của bạn</DrawerHeader>

          <DrawerBody>
            {items.length === 0 ? (
              <Text textAlign="center" mt={10} color="gray.500">
                Giỏ hàng của bạn đang trống
              </Text>
            ) : (
              <VStack spacing={4} align="stretch">
                {items.map((item) => (
                  <Box key={item.id} p={3} borderWidth="1px" borderRadius="md">
                    <HStack justifyContent="space-between">
                      <Text fontWeight="bold">{item.name}</Text>
                      <IconButton
                        aria-label="Remove item"
                        icon={<FaTrash />}
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                      />
                    </HStack>
                    <Flex justify="space-between" align="center" mt={2}>
                      <HStack>
                        <IconButton
                          aria-label="Decrease quantity"
                          icon={<FaMinus />}
                          size="xs"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        />
                        <Text>{item.quantity}</Text>
                        <IconButton
                          aria-label="Increase quantity"
                          icon={<FaPlus />}
                          size="xs"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        />
                      </HStack>
                      <Text fontWeight="semibold">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                      </Text>
                    </Flex>
                  </Box>
                ))}
                <Divider my={4} />
                <Box>
                  <Flex justify="space-between" fontWeight="bold">
                    <Text>Tổng cộng:</Text>
                    <Text>{totalAmount.toLocaleString('vi-VN')}đ</Text>
                  </Flex>
                </Box>
                <Button colorScheme="red" size="lg" mt={4}>
                  Thanh toán
                </Button>
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
