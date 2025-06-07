import { type JSX } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";

const MyPage = (): JSX.Element => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const { data: me } = useGetMyInfo();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  console.log(me?.data?.name);
  return (
    <div className="min-h-screen">
      <h1>{me?.data?.name}님 환영합니다!</h1>
      <h1>{me?.data?.email}</h1>
      <button
        onClick={handleLogout}
        className="cursor-pointer hover:bg-blue-400 border-2 border-none bg-blue-300 rounded-sm p-0.5"
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
