export const useLocalStorage = (key: string) => {
  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const setItem = (value: unknown) => {
    try {
      // JSON.stringify 로 했을 때 문자열 ""가 생겨서 getInfo() 실행시 토큰에서 ""까지 포함됨. 아래 코드로 수정
      const isString = typeof value === "string";
      window.localStorage.setItem(
        key,
        isString ? value : JSON.stringify(value)
      );
    } catch (error) {
      console.error("Error setting localStorage", error);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing localStorage", error);
    }
  };

  return { getItem, setItem, removeItem };
};
