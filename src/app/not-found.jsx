"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { FiArrowLeftCircle } from "react-icons/fi";
import themes from "@/lib/themes";

export default function NotFoundPage() {

  const { theme } = useTheme();

  const themeClass = themes[theme] || themes["indigo"]; // fallback

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-center horizontal-lines-overlay">
      <h1 className={`text-6xl font-bold glow-text ${themeClass.text}`}>404</h1>
      <p className={`mt-4 text-xl ${themeClass.text}`}>You’ve wandered too far into the lo-fi mist...</p>
      <Link href="/" className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border ${themeClass.text} ${themeClass.hover} ${themeClass.shadow}`}>
        <FiArrowLeftCircle className="text-xl" />
        Back to the vibes
      </Link>
    </div>
  );
}
