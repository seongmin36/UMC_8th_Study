import { useEffect, useState, type JSX } from "react";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = (): JSX.Element => {
  const navigate = useNavigate();

  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response: ResponseMyInfoDto = await getMyInfo();
      console.log(response);

      setData(response);
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  console.log(data?.data?.name);
  return (
    <div>
      <h1>{data?.data?.name}님 환영합니다!</h1>
      <h1>{data?.data?.email}</h1>
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
