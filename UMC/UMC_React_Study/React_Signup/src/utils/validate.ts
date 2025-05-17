import type { LoginFormValues } from "../types/loginFormValues";

const validateLogin = (values: { email: string; password: string }) => {
  const errors: Record<keyof typeof values, string> = {
    email: "",
    password: "",
  };

  if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      values.email
    ) &&
    values.email
  ) {
    errors.email = "올바른 이메일 형식을 입력해주세요.";
  }

  if (
    !(values.password.length >= 8 && values.password.length <= 20) &&
    values.password
  ) {
    errors.password = "비밀번호는 8자 이상입니다.";
  }

  return errors;
};

// 로그인 유효성 검사
function validateSignin(values: LoginFormValues) {
  return validateLogin(values);
}

export { validateSignin };
