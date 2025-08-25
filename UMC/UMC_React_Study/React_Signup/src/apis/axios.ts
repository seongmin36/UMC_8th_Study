// axios.ts
import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustominternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // 요청 재시도를 나타내는 플래그
}
// 전역 변수로 refresh 요청의 Promise를 저장해서 중복 요청을 방지한다.
let refreshPromise: Promise<string | null> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  // 쿠키로 로그인할 때 쿠키가 모든 요청이 심어진다.
  // withCredentials:true,
});

// 요청 인터셉터 : 요청 전에 매번 최신 토큰을 꺼내서 (Authorization)헤더에 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    console.log("accessToken from localStorage:", accessToken);

    // accessToken이 존재하면, Authorization 헤더에 Bearer 토큰 형식으로 추가한다.
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.warn("accessToken이 없습니다.");
    }
    // 수정된 요청 설정 반환
    return config;
  },
  // 요청 인터셉터가 실패하면, 에러 뿜음
  (error) => Promise.reject(error)
);

// 응답 인터셉터 : 401 에러 발생 => refreshToken을 통한 토큰 갱신 처리
axiosInstance.interceptors.response.use(
  (response) => response, // 정상 응답 그대로 반환
  async (error) => {
    const originalRequest: CustominternalAxiosRequestConfig = error.config;

    // 401 에러면서, 아직 재시도 하지 않은 요청 경우 처리
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      // refresh 엔드포인트(서버에서 refresh 요청을 하는 로직)에서 401 에러가 발생한 경우 (Unauthorized), 중복 재시도 방지를 위해 로그아웃 처리
      if (originalRequest.url == "/v1/auth/refresh") {
        const { removeItem: removeAccessToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.accessToken
        );
        const { removeItem: removeRefreshToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.refreshToken
        );
        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // 재시도 플래그 설정
      originalRequest._retry = true;

      // 이미 리프레시 요청이 진행중이면, 그 Promise를 재사용
      if (!refreshPromise) {
        // refresh 요청 실행 후, 프로미스를 전역 변수에 할당.
        refreshPromise = (async () => {
          const { getItem: getRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );
          const refreshToken = getRefreshToken();

          const { data } = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });
          // 새 토큰이 반환됨
          const { setItem: setAccessToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.accessToken
          );
          const { setItem: setRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );

          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);

          // 새 accessToken을 반환하여 다른 요청들이 이것을 사용할 수 있게함
          return data.data.accessToken;
        })()
          .catch((error) => {
            console.error("리프레시 토큰 요청 실패", error);
            const { removeItem: removeAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken
            );
            const { removeItem: removeRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken
            );

            removeAccessToken();
            removeRefreshToken();
          })
          .finally(() => {
            refreshPromise = null;
          });
      }
      // 진행중인 refreshPromise가 해결될때까지 기다림
      const newAccessToken = await refreshPromise;
      if (newAccessToken) {
        // 원본 요청의 Authorization 헤더를 갱싱된 토큰으로 업뎃
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // 업데이트 된 원본 요청을 재시도
        return axiosInstance.request(originalRequest);
      } else {
        // 토큰 갱신 실패시 오류
        return Promise.reject(error);
      }
    }
    // 401에러가 아닌경우에 그대로 오류를 반환
    return Promise.reject(error);
  }
);
