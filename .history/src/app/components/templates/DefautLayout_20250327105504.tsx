import { ReactNode } from "react";

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
