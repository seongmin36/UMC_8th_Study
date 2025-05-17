import { type JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type SubmitHandler } from "react-hook-form";
import { useSignupForm } from "../hooks/useSignupForm";
import { type SignupFormValues } from "../types/signupFormValues";
import { type ResponseSignupDto } from "../types/auth";
import { postSignup } from "../apis/auth";

const SignupPage = (): JSX.Element => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useSignupForm();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    if (step === 1 && !errors.email && isValid) {
      setStep(2);
    } else if (
      step === 2 &&
      !errors.confirmPassword &&
      !errors.password &&
      isValid
    ) {
      setStep(3);
    }
  }, [errors, isValid, step]);

  const [showPasswords, setShowPasswords] = useState({
    password: true,
    confirmPassword: true,
  });

  const showPasswordVisibility = (field: "password" | "confirmPassword") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  console.log(errors);
  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = data;
    try {
      const response: ResponseSignupDto = await postSignup(rest);
      console.log("회원가입 성곰", response);

      navigate("/myPage");
    } catch (error) {
      console.error("회원가입 실패", error);
    }

    console.log("data 제출됨 : ", rest);
  };

  const handleNextStep = () => {
    if (step === 1 && !errors.email) {
      setStep(2);
    } else if (step === 2 && !errors.password && !errors.confirmPassword) {
      setStep(3);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center m-10 h-lvh">
      <div className="relative flex items-center justify-center w-80">
        <button
          className="absolute left-2 text-3xl mb-2"
          onClick={() => navigate(-1)}
        >
          {"‹"}
        </button>
        <p className="font-bold text-xl">회원가입</p>
      </div>
      <form
        className="flex flex-col gap-3 mt-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              {...register("email")}
              className={`border-2 rounded p-2.5 w-80
          ${errors?.email ? "border-red-500" : "border-gray-400"}`}
              type="email"
              placeholder="이메일"
            />
            {errors.email && (
              <small className="text-red-600 text-xs">
                {errors.email.message}
              </small>
            )}
            {step === 1 && (
              <button
                type="button"
                onClick={handleNextStep}
                className="border-2 rounded-md bg-blue-400 text-white p-2.5 hover:bg-blue-500 disabled:bg-gray-400"
                disabled={!!errors.email || !isDirty}
              >
                다음
              </button>
            )}
          </>
        )}
        {/* STEP 2 */}
        {step >= 2 && (
          <>
            <div className="relative w-80">
              <input
                {...register("password")}
                className={`border-2 rounded p-2.5 w-full
                  ${errors?.password ? "border-red-500" : "border-gray-400"}`}
                type={showPasswords.password ? "password" : "text"}
                placeholder="비밀번호"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => showPasswordVisibility("password")}
              >
                {showPasswords.password ? (
                  // 눈 감은 아이콘
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.94 17.94A10.94 10.94 0 0112 19c-5 0-9.27-3.11-11-7 1.06-2.4 2.86-4.45 5.06-5.94m5.29-1.56A10.94 10.94 0 0112 5c5 0 9.27 3.11 11 7a10.94 10.94 0 01-1.52 2.78" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                ) : (
                  // 눈 뜬 아이콘
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <small className="text-red-600 text-xs">
                {errors.password.message}
              </small>
            )}

            <div className="relative w-80">
              <input
                {...register("confirmPassword")}
                className={`border-2 rounded p-2.5 w-full
                  ${
                    errors?.confirmPassword
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                type={showPasswords.confirmPassword ? "password" : "text"}
                placeholder="비밀번호 확인"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => showPasswordVisibility("confirmPassword")}
              >
                {showPasswords.confirmPassword ? (
                  // 눈 감은 아이콘
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.94 17.94A10.94 10.94 0 0112 19c-5 0-9.27-3.11-11-7 1.06-2.4 2.86-4.45 5.06-5.94m5.29-1.56A10.94 10.94 0 0112 5c5 0 9.27 3.11 11 7a10.94 10.94 0 01-1.52 2.78" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                ) : (
                  // 눈 뜬 아이콘
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
              {errors.confirmPassword && (
                <small className="text-red-600 text-xs">
                  {errors.confirmPassword?.message}
                </small>
              )}
            </div>

            {step === 2 && (
              <button
                type="button"
                // disabled={!isValid}
                onClick={() => {
                  if (!errors.password && !errors.confirmPassword) setStep(3);
                  if (errors.confirmPassword) {
                    console.log("confirmPassword 폼 제출 안됨");
                  } else if (!isValid) {
                    console.log("유효성 검사 자체 안됨");
                  }
                }}
                className="border-2 rounded-md bg-blue-400 text-white py-2.5 px-4 hover:bg-blue-500 disabled:bg-gray-400"
              >
                다음
              </button>
            )}
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <input
              {...register("name")}
              className={`border-2 rounded p-2.5 w-80
          ${errors?.name ? "border-red-500" : "border-gray-400"}`}
              type="name"
              placeholder="이름"
            />
            {errors.name && (
              <small className="text-red-600 text-xs">
                {errors.name?.message}
              </small>
            )}
            <button
              disabled={isSubmitting || !isDirty}
              type="submit"
              className="border-2 rounded-md bg-blue-400 text-white p-2.5 hover:bg-blue-500 disabled:bg-gray-400"
            >
              가입하기
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default SignupPage;
