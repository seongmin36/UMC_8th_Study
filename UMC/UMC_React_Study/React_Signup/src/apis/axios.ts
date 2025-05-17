// axios.ts
import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// 요청 전에 매번 최신 토큰을 꺼내서 헤더에 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    console.log("accessToken from localStorage:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("accessToken이 없습니다.");
    }
    return config;
  },
  (error) => Promise.reject(error)
);
