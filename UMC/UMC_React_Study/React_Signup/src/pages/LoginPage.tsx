import { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useLoginForm";
import { validateSignin } from "../utils/validate";
import { type LoginFormValues } from "../types/loginFormValues";
import { useAuth } from "../context/AuthContext";
// import { LoadingSpinner } from "../ErrorCase/LoadingSpinner";

const LoginPage = (): JSX.Element => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (accessToken) {
      navigate("/myPage", { replace: true });
    }
  }, [accessToken, navigate]);

  const { values, errors, touched, getInputProps } = useForm<LoginFormValues>({
    initialValue: { email: "", password: "" },
    validate: validateSignin,
  });

  const handleSubmit = async () => {
    await login(values);
    navigate("/myPage");
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  // 버튼 활성화 로직
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value.trim() === "");

  return (
    <div className="flex justify-center flex-col items-center min-h-screen">
      <div className="relative flex items-center justify-center w-80">
        <button
          className="absolute left-2 text-3xl mb-2 cursor-pointer"
          onClick={() => navigate(`/`)}
        >
          {"‹"}
        </button>
        <p className="font-bold text-xl">로그인</p>
      </div>
      <div className="flex flex-col gap-3 mt-5">
        <input
          className={`border-2 rounded p-2.5 w-85
            ${errors?.email ? "border-red-500" : "border-gray-400"}`}
          type="email"
          placeholder="이메일"
          {...getInputProps("email")}
        />
        {errors.email && (
          <small className="text-red-600 text-xs">{errors.email}</small>
        )}
        <input
          className={`border-2 rounded p-2.5 w-85
            ${errors?.password ? "border-red-500" : "border-gray-400"}`}
          type="password"
          placeholder="비밀번호"
          {...getInputProps("password")}
        />
        {touched.password && errors.password && (
          <small className="text-red-600 text-xs">{errors.password}</small>
        )}
        <button
          className="border-2 rounded-md bg-blue-400 text-white p-2.5 hover:bg-blue-500 disabled:bg-gray-400"
          type="button"
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          로그인
        </button>
        <button
          className="border-2 rounded-md text-white p-1.5 border-gray-400 cursor-pointer"
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <div className="flex justify-center items-center gap-3 text-black">
            <img src={"/src/assets/google.png"} />
            구글 로그인
          </div>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
