import { ReactNode } from "react";
import Footer from "../molecules/Footer";
import Header from "../organisms/Header";

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
