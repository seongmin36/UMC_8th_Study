import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { type RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin } from "../apis/auth";
import { LoadingSpinner } from "../ErrorCase/LoadingSpinner";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signinData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext: React.Context<AuthContextType> =
  createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
  });

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isInitailized, setIsInitialized] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  // const navigate = useNavigate();
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  // 지연 초기화 방식
  // const [accessToken, setAccessToken] = useState<string | null>(() => {
  //   console.log("AccessToken 초기값을 localStorage에서 읽어옵니다."); // 처음 렌더링 시에만 실행됨
  //   return getAccessTokenFromStorage();
  // });
  // const [refreshToken, setRefreshToken] = useState<string | null>(() => {
  //   console.log(
  //     "RefreshToken 초기값을 localStorage에서 읽어옵니다 (지연 초기화)."
  //   );
  //   return getRefreshTokenFromStorage();
  // });

  // 비동기 제어 방식 (loading 화면을 위한 구조)
  useEffect(() => {
    const token = getAccessTokenFromStorage();
    const refresh = getRefreshTokenFromStorage();
    setAccessToken(token);
    setRefreshToken(refresh);
    setIsInitialized(true); // 초기화 완료
  }, [getAccessTokenFromStorage, getRefreshTokenFromStorage]);

  if (!isInitailized) {
    return <LoadingSpinner />; // 로딩 스피너 보여주기
  }

  const login = async (signindata: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signindata);

      if (data) {
        const newAccessToken: string = data.accessToken;
        const newRefreshToken: string = data.refreshToken;

        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        alert("로그인 성공!");
      }
    } catch (error) {
      console.error("로그인 오류", error);
      alert("로그인 실패");
    }
  };

  const logout = async () => {
    try {
      await postLogout();
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();

      setAccessToken(null);
      setRefreshToken(null);

      alert("로그아웃 성공");
    } catch (error) {
      console.error("로그아웃 오류", error);
      alert("로그아웃 실패");
    }
  };
  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context: AuthContextType = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext를 찾을 수 없습니다.");
  }

  return context;
};
