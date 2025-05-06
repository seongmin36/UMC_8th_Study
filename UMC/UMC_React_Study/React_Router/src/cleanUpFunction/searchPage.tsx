import { JSX, useEffect, useState } from "react";
// import { FC } from 'react';

const SearchPage = (): JSX.Element => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter((prev) => prev + 1);
  };

  // 최초 실행
  useEffect((): (() => void) => {
    const mouseClickEffectEvent = (): void => {
      console.log(counter);
    };

    window.addEventListener("click", mouseClickEffectEvent);

    // 클린업 함수
    // 클린업 함수는 다음 렌더링이 끝난 뒤에 실행.
    return () => {
      console.log("클린업 함수 실행!", counter);
      window.removeEventListener("click", mouseClickEffectEvent);
    };
  }, [counter]);
  return (
    <>
      <h1 style={{ color: "black" }}>{counter}</h1>
      <button onClick={handleClick}>+</button>
    </>
  );
};

export default SearchPage;
