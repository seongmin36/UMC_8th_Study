import { THEME, useTheme } from "./ThemeProvider";
import clsx from "clsx";

export default function ThemeToggleButton(): Element {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <button
      onClick={toggleTheme}
      className={clsx("px-4 py-2 mt-4 rounded-ms transition-all", {
        "bg-white text-black": isLightMode,
        "bg-neutral-800 text-white": !isLightMode,
      })}
    >
      {isLightMode ? "☀️ 라이트 모드" : "🌙 다크 모드"}
    </button>
  );
}
