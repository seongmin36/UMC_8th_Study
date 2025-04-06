import { JSX } from "react";
import { Link, useLocation } from "react-router-dom";

type NavItem = {
  path: string;
  label: string;
};

const navList: NavItem[] = [
  { path: "/", label: "홈" },
  { path: "/movies/popular", label: "인기 영화" },
  { path: "/movies/upcoming", label: "상영 중" },
  { path: "/movies/top_rated", label: "평점 높은" },
  { path: "/movies/now_playing", label: "개봉 예정" },
];

const Navbar = (): JSX.Element => {
  const location = useLocation();

  return (
    <nav className="p-4 space-y-5">
      {navList.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`px-2 hover:text-green-700 ${
            location.pathname === item.path ? " text-green-700" : "text-black"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
