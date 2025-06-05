"use client";

import { FiSettings } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";
import themes from "@/lib/themes";

const SettingsOverlay = () => {
  const { theme, changeTheme } = useTheme();
  const themeKeys = Object.keys(themes);
  const themeClass = themes[theme] || themes["indigo"];

  return (
    <div className="">
      <button
        onClick={changeTheme}
        className={`text-2xl transition ${themeClass.icon} ${themeClass.hover}`}
        title="Change Theme"
      >
        <FiSettings className={`${themeClass.dropShadow}`} />
      </button>
    </div>
  );
};

export default SettingsOverlay;
