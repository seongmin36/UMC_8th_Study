import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { useSidebar } from "../context/SidebarContext";

const Navbar = () => {
  const { accessToken, logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const { isOpen, toggleSidebar } = useSidebar();

  // 사용자 정보 불러오기
  useEffect(() => {
    if (!accessToken) return;
    const getData = async () => {
      const response = await getMyInfo();
      setData(response);
    };
    getData();
  }, [accessToken]);

  return (
    <>
      <nav className="fixed z-10 flex justify-between w-full mb-2 bg-blue-100">
        <div className="flex items-center justify-between p-5">
          <button onClick={toggleSidebar}>
            <FontAwesomeIcon
              icon={faBars}
              size="lg"
              className={`transition-colors duration-300 cursor-pointer ${
                isOpen ? "text-blue-600" : "text-gray-700"
              }`}
            />
          </button>
          <Link className="ml-4 text-xl font-bold text-blue-600" to={"/"}>
            돌려돌려LP판
          </Link>
        </div>
        <div className="flex items-center gap-3 pr-8">
          {!accessToken ? (
            <>
              <Link to="/login" className="px-3 py-2 hover:text-blue-600">
                로그인
              </Link>
              <Link
                to="/signup"
                className="px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                회원가입
              </Link>
            </>
          ) : (
            <>
              <Link to="/search">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size="lg"
                  className="text-gray-700 hover:text-blue-600"
                />
              </Link>
              <span className="text-black">
                {data?.data?.name ?? "사용자"}님 환영합니다
              </span>
              <button onClick={logout} className="px-3 py-2 hover:text-red-500">
                로그아웃
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
