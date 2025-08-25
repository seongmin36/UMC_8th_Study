// 유효성 검사 Hook

import { type ChangeEvent, useEffect, useState } from "react";

interface UseFormProps<T> {
  initialValue: T; // {email: '', password: ''}
  // 값이 올바른지 검증하는 함수.
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 사용자가 입력값을 바꿀 때 실행되는 함수
  const handleChange = <K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => ({
      ...prev, // 기존 입력값 유지
      [key]: value,
    }));
  };

  // touched
  const handleBlur = (key: keyof T) => {
    setTouched((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  // 이메일 인풋, 패스워드 인풋, 속성들을 좀 가져오는 것
  const getInputProps = (key: keyof T) => {
    return {
      name: key,
      value: values[key],
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        handleChange(key, e.target.value as T[keyof T]),
      onBlur: () => handleBlur(key),
    };
  };

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    getInputProps,
    setErrors,
  };
}

export default useForm;
