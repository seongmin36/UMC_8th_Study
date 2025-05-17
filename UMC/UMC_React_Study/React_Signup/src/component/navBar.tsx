import { type JSX } from "react";
import { Link /*useLocation*/ } from "react-router-dom";
import { type Navitem } from "../types/NavItem";

const navList: Navitem[] = [
  { path: "/login", label: "로그인" },
  { path: "/signup", label: "회원가입" },
];

const Navbar = (): JSX.Element => {
  return (
    <nav className="relative flex justify-between bg-blue-100 p-4">
      <div>
        <Link
          className="font-bold text-xl text-blue-500 absolute left-5"
          to={"/"}
        >
          홈
        </Link>
      </div>
      <div className="flex gap-4">
        {navList
          .filter((item) => item.path !== "/")
          .map((item) => (
            <Link key={item.path} to={item.path}>
              {item.label}
            </Link>
          ))}
      </div>
    </nav>
  );
};

export default Navbar;
