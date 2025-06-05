"use client";

import { useGif } from "@/context/GifContext";
import { useState } from "react";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { useTheme } from "@/context/ThemeContext";
import { Pause, Play, SkipForward } from "lucide-react";
import { TbCircleChevronDown } from "react-icons/tb";
import { MdSync } from "react-icons/md";

import SettingsOverlay from "@/components/SettingsOverlay/SettingsOverlay";
import themes from "@/lib/themes";
import NewMusicPlayerComponent from "../MusicComponents/NewMusicPlayerComponent";

export default function StaticPlayerUI() {
  const { currentGif, changeGif } = useGif();
  const [showControls, setShowControls] = useState(false);
  const { isPlaying, togglePlayPause, handleNext, handlePrev } = useMusicPlayer();
  const { theme } = useTheme();
  const themeClass = themes[theme] || themes["indigo"];

  return (
    <>
      {/* Background Image */}
      <div className="absolute inset-0 bg-zinc-900 bg-no-repeat bg-cover bg-center sm:bg-top md:bg-center lg:bg-cover z-0" style={{ backgroundImage: `url('${currentGif}')` }} />
      
      {/* Scanline effect */}
      <div className="absolute inset-0 horizontal-lines-overlay z-10" />

      {/* Mobile Controls */}
      <div className="md:hidden fixed top-[9rem] right-11 z-40 flex flex-col items-center">
        <button onClick={() => setShowControls(!showControls)} title="Toggle controls" className={`${themeClass.icon} ${themeClass.hover} text-2xl transition`}>
          <TbCircleChevronDown className={`transition-transform duration-300 ${showControls ? "rotate-180" : ""} ${themeClass.dropShadow}`} size={30} />
        </button>
        {showControls && (
          <div className={`mt-3 flex flex-col items-center gap-6 py-3 rounded-xl ${themeClass.icon}`}>
            <button onClick={togglePlayPause} title={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <Pause size={24} className={themeClass.dropShadow} /> : <Play size={24} className={themeClass.dropShadow} />}
            </button>
            <button onClick={handlePrev} title="Prev Song">
              <SkipForward size={24} className={`rotate-180 ${themeClass.dropShadow}`} />
            </button>
            <button onClick={handleNext} title="Next Song">
              <SkipForward size={24} className={themeClass.dropShadow} />
            </button>
            <button onClick={changeGif} title="Change Gif">
              <MdSync size={24} className={themeClass.dropShadow} />
            </button>
            <SettingsOverlay />
          </div>
        )}
      </div>

      {/* Player UI */}
      <div className="w-full">
        <NewMusicPlayerComponent />
      </div>
    </>
  );
}
