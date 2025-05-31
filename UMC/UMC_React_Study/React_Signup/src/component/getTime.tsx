import React, { useState, useEffect } from "react";
import { getTimeAgo } from "../utils/getTimeAgo";

interface TimeProps {
  dateString: Date; // ISO 8601 형식의 날짜 문자열
  className?: string; // Tailwind CSS 또는 기타 CSS 클래스를 위한 선택적 prop
}

const TimeAgo: React.FC<TimeProps> = ({ dateString, className }) => {
  const [displayTime, setDisplayTime] = useState<string>(() =>
    getTimeAgo(dateString)
  );

  // 컴포넌트가 마운트될 때 또는 dateString이 바뀔 때 시간을 다시 계산
  useEffect(() => {
    // 초기 로딩 시에도 시간을 업데이트
    setDisplayTime(getTimeAgo(dateString));

    const interval = setInterval(() => {
      setDisplayTime(getTimeAgo(dateString));
    }, 60 * 1000);

    // 컴포넌트가 언마운트될 때 인터벌 클리어 (메모리 누수 방지)
    return () => clearInterval(interval);
  }, [dateString]);

  return (
    <span className={`text-gray-500 text-sm ${className || ""}`}>
      {displayTime}
    </span>
  );
};

export default TimeAgo;
