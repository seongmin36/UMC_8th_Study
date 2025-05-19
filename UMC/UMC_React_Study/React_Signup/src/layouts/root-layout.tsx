import { type JSX } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/navBar";
import Footer from "../component/footer";

const RootLayout = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
