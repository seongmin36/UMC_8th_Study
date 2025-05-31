import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";

const SideBar = () => {
  const { isOpen, closeSidebar } = useSidebar();
  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 z-30 w-full h-full bg-opacity-30"
          onClick={closeSidebar}
        />
      )}
      <aside
        className={`fixed top-16 left-0 h-full w-45 bg-blue-100 transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()} // 사이드바 내부 클릭 시 닫히지 않도록
      >
        <div className="flex flex-col space-y-5 p-7">
          <Link
            to="/search"
            onClick={closeSidebar}
            className="hover:text-blue-500"
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="sm"
              className="text-gray-700 hover:text-blue-600"
            />
            <span className="ml-2 text-sm">찾기</span>
          </Link>
          <Link
            to="/mypage"
            onClick={closeSidebar}
            className="hover:text-blue-500"
          >
            <FontAwesomeIcon
              icon={faUser}
              size="sm"
              className="text-gray-700 hover:text-blue-600"
            />
            <span className="ml-2 text-sm">마이페이지</span>
          </Link>
        </div>
        <a href="#" className="flex justify-center text-sm mt-180">
          탈퇴하기
        </a>
      </aside>
    </>
  );
};

export default SideBar;
