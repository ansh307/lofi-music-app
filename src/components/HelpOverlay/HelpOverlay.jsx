import { useState } from "react";
import {
  FiHelpCircle,
} from "react-icons/fi";
import { FaArrowLeft, FaArrowRight, FaArrowUp, FaArrowDown } from "react-icons/fa";// spacebar icon

const HelpOverlay = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      {/* Question mark icon top-right */}
      <div className="fixed top-12 right-12 z-50">
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="text-indigo-300 hover:text-indigo-100 text-2xl transition"
          title="How to use"
        >
          <FiHelpCircle />
        </button>
      </div>

      {/* Help overlay */}
      {showHelp && (
        <div className="fixed top-10 right-5 w-64 bg-black/5 bg-opacity-80 text-indigo-200 md:py-2 font-mono text-sm z-[40] glow-text">
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

            <div className="mt-4 flex text-indigo-200">Creators:</div>
            <p className="flex font-medium">
              @
              <a href="https://twitter.com/Anshjz" className="text-lime-300 hover:underline glow-yellow">
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
