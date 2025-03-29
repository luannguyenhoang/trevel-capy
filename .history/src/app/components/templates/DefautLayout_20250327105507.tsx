import { ReactNode } from "react";

import { CartProvider } from "@/utils/service/cart";
import Header from "../organisms/Header";

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <CartProvider>
      <Header />
      {children}
      <Footer />
    </CartProvider>
  );
};
