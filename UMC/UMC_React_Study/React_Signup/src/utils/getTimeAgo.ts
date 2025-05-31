export function getTimeAgo(isoDateString: Date): string {
  // 입력값이 유효한 Date 문자열인지 확인 (선택 사항이지만 안정성 향상)
  if (!isoDateString || isNaN(new Date(isoDateString).getTime())) {
    // 유효하지 않은 날짜 문자열인 경우, 기본값 또는 에러 처리
    console.error("Invalid date string provided to getTimeAgo:", isoDateString);
    return "알 수 없음";
  }

  const targetDate = new Date(isoDateString);
  const now = new Date();

  const diffMilliseconds = now.getTime() - targetDate.getTime();
  const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));

  if (diffMinutes < 1) {
    return "Just now";
  } else if (diffMinutes < 60) {
    return `${diffMinutes}mins ago`;
  } else if (diffMinutes < 24 * 60) {
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours}hours ago`;
  } else if (diffMinutes < 7 * 24 * 60) {
    const diffDays = Math.floor(diffMinutes / (24 * 60));
    return `${diffDays}days ago`;
  } else {
    const year = targetDate.getFullYear();
    const month = (targetDate.getMonth() + 1).toString().padStart(2, "0");
    const day = targetDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}
