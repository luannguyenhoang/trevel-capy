import { ReactNode } from "react";
import Footer from "../molecules/footer";
import WithSubnavigation from "../molecules/navbar";

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <WithSubnavigation />
      {children}
      <Footer />
    </>
  );
};
