import { type JSX } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/navBar";

const RootLayout = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Outlet />
      <footer>푸터</footer>
    </>
  );
};

export default RootLayout;
