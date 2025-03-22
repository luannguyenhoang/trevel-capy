import { ReactNode } from "react";
import WithSubnavigation from "../organisms/Header";
import Footer from "../molecules/Footer";


export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
