"use client";

import { useState } from "react";
import { FiHelpCircle } from "react-icons/fi";
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa"; // spacebar icon
import { useTheme } from "@/context/ThemeContext";
import themes from "@/lib/themes";
const HelpOverlay = () => {
  const [showHelp, setShowHelp] = useState(false);

  const { theme } = useTheme();

  const themeClass = themes[theme] || themes["indigo"]; // fallback
  // from workspace
  return (
    <>
      {/* Question mark icon top-right */}
      <div className="fixed top-12 right-12 z-40">
        <button
          onClick={() => setShowHelp(!showHelp)}
          className={`text-2xl transition ${themeClass.icon} ${themeClass.hover}`}
          title="How to use"
        >
          <FiHelpCircle className={`${themeClass.dropShadow}`} />
        </button>
      </div>

      {/* Help overlay */}
      {showHelp && (
        <div
          className={`fixed top-10 right-5 w-64 bg-opacity-80 ${themeClass.text} py-2 font-mono text-sm z-[30] ${themeClass.dropShadow}`}
        >
          <div className="w-full md:w-[200px] text-right space-y-2">
            <p className="flex items-center gap-2">
              <FaArrowLeft /> <FaArrowRight /> <span>change station</span>
            </p>
            <p className="flex items-center gap-2">
              <FaArrowUp /> <FaArrowDown /> <span>adjust volume</span>
            </p>
            <p className="flex items-center gap-2">
              Spacebar: <span>play/pause</span>
            </p>
            <p className="flex items-center gap-2">
              G: <span>change gif</span>
            </p>
            <p className="flex items-center gap-2">
              M: <span>mute</span>
            </p>
             <p className="flex items-center gap-2">
              T: <span>Changing theme</span>
            </p>

            <div className={`mt-4 flex ${themeClass.text}`}>Creators:</div>
            <p className="flex font-medium">
              @
              <a
                href="https://twitter.com/Anshjz"
                className="text-lime-300 hover:underline glow-yellow"
              >
                Anshjz
              </a>
              {/* linktr.ee/anshsoni55333 */}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpOverlay;
