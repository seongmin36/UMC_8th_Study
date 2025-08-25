import { useEffect, useState, type JSX } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../ErrorCase/LoadingSpinner";

const GoogleLoginRedirectPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  useEffect(() => {
    const urlParams: URLSearchParams = new URLSearchParams(
      window.location.search
    );
    const accessToken: string | null = urlParams.get(
      LOCAL_STORAGE_KEY.accessToken
    );
    const refreshToken: string | null = urlParams.get(
      LOCAL_STORAGE_KEY.refreshToken
    );

    if (accessToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      navigate("/myPage", { replace: true });
    } else {
      // 잘못되 접근 : 로그인 페이지로 되돌리기
      navigate("/login", { replace: true });
    }
    setIsLoading(false);
  }, [navigate, setAccessToken, setRefreshToken]);
  return (
    <div className="flex justify-center items-center h-dvh">
      {isLoading ? <LoadingSpinner /> : <p>처리 중입니다...</p>}
    </div>
  );
};

export default GoogleLoginRedirectPage;
