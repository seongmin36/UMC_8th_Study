import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../utils/validateSignupSchema";
import { type SignupFormValues } from "../types/signupFormValues";

export const useSignupForm = () => {
  return useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange", // <--- 이 부분을 추가하거나 확인합니다.
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });
};
