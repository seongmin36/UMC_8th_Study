import { useEffect, type JSX } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useNavigate } from "react-router-dom";

const GoogleLoginRedirectPage = (): JSX.Element => {
  const navigate = useNavigate();

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
      navigate("/myPage");
    }
  }, [navigate, setAccessToken, setRefreshToken]);
  return <div>구글 로그인 리다이렉트 화면</div>;
};

export default GoogleLoginRedirectPage;
