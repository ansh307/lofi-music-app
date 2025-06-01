"use client"

// pages/500.js
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { FiAlertCircle } from "react-icons/fi";
import themes from "@/lib/themes";

export default function Custom500() {

  const { theme } = useTheme();

  const themeClass = themes[theme] || themes["indigo"]; // fallback

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-center horizontal-lines-overlay">
      <h1 className={`text-6xl font-bold glow-text ${themeClass.text}`}>500</h1>
      <p className={`mt-4 text-xl ${themeClass.text}`}>
        Something’s gone off-beat... <br />
        The lo-fi stream hit a glitch.
      </p>
      <Link href="/" className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border ${themeClass.text} ${themeClass.hover} ${themeClass.shadow}`}>
        <FiAlertCircle className="text-xl" />
        Return home
      </Link>
    </div>
  );
}
