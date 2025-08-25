// Zod 스키마로 유효성 검사 규칙을 정의하는 파일
import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요" }),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(20, "비밀번호는 20자 이하여야 합니다."),

    confirmPassword: z.string(),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });
