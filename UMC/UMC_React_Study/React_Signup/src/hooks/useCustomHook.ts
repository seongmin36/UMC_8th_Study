import { useState } from "react";

function useCustomHook() {
  const [value, setValue] = useState("");

  const updateValue = (newValue: string) => {
    setValue(newValue);
  };

  return { value, updateValue };
}

export default useCustomHook;
