import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ThemeSwitcher from "./ThemeSwitcher.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeSwitcher />
  </StrictMode>
);
