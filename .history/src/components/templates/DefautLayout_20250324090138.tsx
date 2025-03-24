import { ReactNode } from "react";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import { CartProvider } from "@/utils/cartContext";

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
