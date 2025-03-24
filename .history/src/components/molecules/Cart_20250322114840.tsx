import {
  Button,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function CartShop() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        aria-label="Shopping cart"
        rightIcon={
          <FaShoppingCart />
        }
        variant="outline"
        display={"flex"}
        justifyContent={"center"}
        colorScheme="red"
      ></Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Giỏ hàng của bạn</DrawerHeader>

          <DrawerBody>//////</DrawerBody>

          {/* <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button color="blue">Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
}
