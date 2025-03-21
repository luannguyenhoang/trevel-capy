import { ReactNode } from "react";
import WithSubnavigation from "../molecules/Navbar";
import Footer from "../molecules/Footer";


export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <WithSubnavigation />
      {children}
      <Footer />
    </>
  );
};
