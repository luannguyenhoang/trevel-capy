import { ReactNode } from "react";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import { CartProvider } from "@/utils/service/cart";

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <CartProvider>
      <Header />
      {children}
      <Footer />
    </CartProvider>
  );
};
