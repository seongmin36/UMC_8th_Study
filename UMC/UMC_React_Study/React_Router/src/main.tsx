import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import BrowserRouter from "./React_Router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter />
  </StrictMode>
);
