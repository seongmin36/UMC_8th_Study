export const useLocalStorage = (key: string) => {
  // accessToken이 null인 경우와 string인 경우 + setItem을 string형식으로 안받을때(JSON.stringify) parsing 처리까지
  const getItem = (): string | null => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return null;

      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } catch (e) {
      console.error("Error reading from localStorage", e);
      return null;
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
