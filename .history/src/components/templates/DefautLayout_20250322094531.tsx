import { ReactNode } from "react";
import WithSubnavigation from "../organisms/Navbar";
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
