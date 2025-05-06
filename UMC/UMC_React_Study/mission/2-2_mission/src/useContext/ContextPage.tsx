import { ThemeProvider } from "./context/ThemeProvider";
import Navbar from "./NavBar";
import ThemeContent from "./ThemeContent";
// import { use, useState } from "react";

export default function ContextPage(): Element {
  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Navbar />
        <main className="flex-1 w-full">
          <ThemeContent />
        </main>
      </div>
    </ThemeProvider>
  );
}
