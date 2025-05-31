"use client";

import NewMusicPlayerComponent from "@/components/MusicComponents/NewMusicPlayerComponent";
import "@/app/play/VHS-style-scanline-effect.css";
import HelpOverlay from "@/components/HelpOverlay/HelpOverlay";
import SocialOverlay from "@/components/SocialOverlay/SocialOverlay";
import { useGif } from "@/context/GifContext";
import { Pause, Play, SkipForward } from "lucide-react";
import { useState } from "react";
import { TbCircleChevronDown } from "react-icons/tb";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { MdSync } from "react-icons/md";

export default function PlayPage() {
  const { currentGif, changeGif } = useGif();
  const [showControls, setShowControls] = useState(false);
  const { isPlaying, togglePlayPause, handleNext, handlePrev } =
    useMusicPlayer();

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white flex flex-col items-center justify-center px-4 py-8">
      {/* Background Image */}
      <div
        className="
          absolute inset-0 
          bg-zinc-900
          bg-no-repeat bg-cover bg-center 
          sm:bg-top md:bg-center lg:bg-cover 
          z-0
        "
        style={{
          backgroundImage: `url('${currentGif}')`,
        }}
      />

      {/* Horizontal Lines Overlay */}
      <div className="absolute inset-0 horizontal-lines-overlay z-10" />

      <HelpOverlay />
      <SocialOverlay />

      {/* Mobile Controls Dropdown - Fixed on top right */}
      <div className="md:hidden fixed top-[9rem] right-11 z-30 flex flex-col items-center">
        <button
          className="text-indigo-300 hover:text-indigo-100 text-2xl transition "
          title="Toggle controls"
          onClick={() => setShowControls(!showControls)}
        >
          <TbCircleChevronDown
            className={`transition-transform duration-300 ${
              showControls ? "rotate-180" : ""
            } drop-shadow-[0_0_6px_rgba(129,140,248,0.8)]`}
            size={30}
          />
        </button>

        {showControls && (
          <div className="mt-3 flex flex-col items-center gap-4 py-3 rounded-xl text-indigo-300">
            <button
              onClick={togglePlayPause}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause
                  size={24}
                  className="drop-shadow-[0_0_6px_rgba(129,140,248,0.8)]"
                />
              ) : (
                <Play
                  size={24}
                  className="drop-shadow-[0_0_6px_rgba(129,140,248,0.8)]"
                />
              )}
            </button>
            <button onClick={handlePrev} title="Prev Song">
              <SkipForward
                size={24}
                className="rotate-180 drop-shadow-[0_0_6px_rgba(129,140,248,0.8)]"
              />
            </button>
            <button onClick={handleNext} title="Next Song">
              <SkipForward
                size={24}
                className="drop-shadow-[0_0_6px_rgba(129,140,248,0.8)]"
              />
            </button>
            <button onClick={changeGif} title="Change Gif">
              <MdSync
                size={24}
                className="drop-shadow-[0_0_6px_rgba(129,140,248,0.8)]"
              />
            </button>
          </div>
        )}
      </div>

      {/* Foreground Content */}
      <div className="w-full ">
        <NewMusicPlayerComponent />
      </div>
    </div>
  );
}
