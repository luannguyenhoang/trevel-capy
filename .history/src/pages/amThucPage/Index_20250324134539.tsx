import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
  Image,
  Badge,
  Flex,
  Card,
  CardBody,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { DefaultLayout } from "@/components/templates/DefautLayout";
import SlideConten from "@/components/molecules/Slide";

export default function AmThuc() {
  const bgGradient = useColorModeValue(
    "linear(to-b, red.50, white)",
    "linear(to-b, gray.900, gray.800)"
  );
  
  const foodCategories = [
    { name: "Miền Bắc", slug: "mien-bac", color: "red.500" },
    { name: "Miền Trung", slug: "mien-trung", color: "yellow.500" },
    { name: "Miền Nam", slug: "mien-nam", color: "green.500" },
  ];

  const featuredDishes = {
    "mien-bac": [
      {
        id: 1,
        name: "Phở Hà Nội",
        image: "/images/pho.jpg",
        description: "Món ăn truyền thống với nước dùng thơm ngon, bánh phở mềm và thịt bò tái.",
      },
      {
        id: 2,
        name: "Bún Chả",
        image: "/images/bun-cha.jpg",
        description: "Bún ăn kèm với chả viên và chả miếng nướng, rau sống và nước mắm pha.",
      },
      {
        id: 3,
        name: "Bánh Cuốn Thanh Trì",
        image: "/images/banh-cuon.jpg",
        description: "Bánh cuốn mỏng, trong suốt với nhân thịt thơm và nước chấm đậm đà.",
      },
    ],
    "mien-trung": [
      {
        id: 4,
        name: "Bún Bò Huế",
        image: "/images/bun-bo-hue.jpg",
        description: "Món bún bò nổi tiếng với vị cay nồng, màu sắc đỏ rực đặc trưng.",
      },
      {
        id: 5,
        name: "Cao Lầu Hội An",
        image: "/images/cao-lau.jpg",
        description: "Món mì đặc sản của phố cổ Hội An với sợi mì vàng dai và thịt xá xíu.",
      },
      {
        id: 6,
        name: "Bánh Xèo Miền Trung",
        image: "/images/banh-xeo.jpg",
        description: "Bánh xèo giòn với nhân tôm, thịt và giá đỗ, cuốn với rau sống.",
      },
    ],
    "mien-nam": [
      {
        id: 7,
        name: "Hủ Tiếu Nam Vang",
        image: "/images/hu-tieu.jpg",
        description: "Món sợi hủ tiếu trong với nước dùng trong veo và nhiều loại topping.",
  return (
    <>
   
    </>
  );
}
