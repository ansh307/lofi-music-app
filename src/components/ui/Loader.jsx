// components/ui/Loader.jsx
"use client";

import { useTheme } from "@/context/ThemeContext";

export default function Loader({ size = "md", fullScreen = false }) {
  const { theme } = useTheme();
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-4",
  };

  const spinner = (
    <div
      className={`animate-spin rounded-full border-t-transparent border-indigo-200 ${sizes[size]} ${theme.shadow}`}
      style={{ borderRightColor: "transparent" }}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        {spinner}
      </div>
    );
  }

  return spinner;
}
