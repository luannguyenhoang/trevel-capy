import { ReactNode } from "react";
import Footer from "../../app/components/organisms/Footer";
import Header from "../../app/components/organisms/Header";
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
