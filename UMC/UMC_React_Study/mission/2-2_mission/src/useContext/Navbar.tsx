import clsx from "clsx";
import { THEME, useTheme } from "./context/ThemeProvider";
import ThemeToggleButton from "./context/ThemeToggleButton";

export default function Navbar(): Element {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;
  return (
    <nav
      className={clsx(
        "p-4 w-full flex justify-end",
        isLightMode ? "bg-white text-black" : "bg-neutral-800 text-white"
      )}
    >
      <ThemeToggleButton />
    </nav>
  );
}
