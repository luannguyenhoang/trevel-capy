import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

export default function CartShop() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Giỏ hàng của bạn</DrawerHeader>

          <DrawerBody>  </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
