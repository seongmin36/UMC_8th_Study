import { Link /*useLocation*/ } from "react-router-dom";
import { type Navitem } from "../types/NavItem";
import { useAuth } from "../context/AuthContext";

const navList: Navitem[] = [
  { path: "/login", label: "로그인" },
  { path: "/signup", label: "회원가입" },
];

const authNavList: Navitem[] = [
  { path: "/myPage", label: "마이페이지" },
  { path: "/search", label: "찾기" },
];

const Navbar = () => {
  const { accessToken } = useAuth();

  return (
    <nav className="flex justify-between bg-blue-100 w-full fixed z-10">
      <div className="flex items-center justify-between p-5">
        <Link className="font-bold text-xl text-blue-600 " to={"/"}>
          돌려돌려LP판
        </Link>
      </div>
      <div className="flex gap-3 items-center pr-8">
        {!accessToken ? (
          <>
            {navList
              .filter((item) => item.path !== "/")
              .map((item) => (
                <Link
                  className={`px-3 py-2  ${
                    item.label === "회원가입"
                      ? "bg-blue-500 rounded-md text-white hover:bg-blue-600"
                      : "hover:text-blue-600"
                  }`}
                  key={item.path}
                  to={item.path}
                >
                  {item.label}
                </Link>
              ))}
          </>
        ) : (
          <>
            {authNavList
              .filter((item) => item.path !== "/")
              .map((item) => (
                <Link
                  className={`px-3 py-2 hover:text-blue-600 ${
                    item.label === "회원가입"
                      ? "bg-blue-500 rounded-md text-white"
                      : ""
                  }`}
                  key={item.path}
                  to={item.path}
                >
                  {item.label}
                </Link>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
