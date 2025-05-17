import { useEffect, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useLoginForm";
import { validateSignin } from "../utils/validate";
import { type LoginFormValues } from "../types/loginFormValues";
import { useAuth } from "../context/AuthContext";

const LoginPage = (): JSX.Element => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/", { replace: true });
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

  // 버튼 활성화 로직
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value.trim() === "");

  return (
    <div className="flex justify-center flex-col items-center m-10 h-full">
      <div className="relative flex items-center justify-center w-80">
        <button
          className="absolute left-2 text-3xl mb-2"
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
      </div>
    </div>
  );
};

export default LoginPage;
