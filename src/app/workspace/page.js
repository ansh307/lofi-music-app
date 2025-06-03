"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";

import NewMusicPlayerComponent from "@/components/MusicComponents/NewMusicPlayerComponent";
import "@/app/play/VHS-style-scanline-effect.css";
import HelpOverlay from "@/components/HelpOverlay/HelpOverlay";
import SocialOverlay from "@/components/SocialOverlay/SocialOverlay";

import { Pause, Play, SkipForward } from "lucide-react";
import { TbCircleChevronDown } from "react-icons/tb";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { MdSync } from "react-icons/md";
import SettingsOverlay from "@/components/SettingsOverlay/SettingsOverlay";
import { useTheme } from "@/context/ThemeContext";
import themes from "@/lib/themes";
import Seo from "@/components/Seo";
import { useGif } from "@/context/GifContext";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function WorkspacePage() {
  const { data: session, status } = useSession();
  const [songs, setSongs] = useState([]);

  const { currentGif, changeGif } = useGif();
  const [showControls, setShowControls] = useState(false);
  const { isPlaying, togglePlayPause, handleNext, handlePrev } =
    useMusicPlayer();

  const { theme } = useTheme();

  const themeClass = themes[theme] || themes["indigo"]; // fallback

  <Seo title="Lofida Play" />;

  useEffect(() => {
    if (session) {
      fetch("/api/songs/mine")
        .then((res) => res.json())
        .then((data) => setSongs(data.songs))
        .catch(() => setSongs([]));
    }
  }, [session]);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "loading") {
    return <Loader size="lg" fullScreen />;
  }

  if (!session) {
    return null;
  }

  return (
   <div className="relative overflow-hidden min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white flex flex-col items-center justify-center px-4 py-8">
      <Sidebar />
    
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

      {/* <SettingsOverlay /> */}


      {/* Mobile Controls Dropdown - Fixed on top right */}
      <div className="md:hidden fixed top-[9rem] right-11 z-30 flex flex-col items-center">
        <button
          className={`${themeClass.icon} ${themeClass.hover} text-2xl transition `}
          title="Toggle controls"
          onClick={() => setShowControls(!showControls)}
        >
          <TbCircleChevronDown
            className={`transition-transform duration-300 ${
              showControls ? "rotate-180" : ""
            } ${themeClass.dropShadow}`}
            size={30}
          />
        </button>

        {showControls && (
          <div className={`mt-3 flex flex-col items-center gap-6 py-3 rounded-xl ${themeClass.icon} `}>
            <button
              onClick={togglePlayPause}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause
                  size={24}
                  className={`${themeClass.dropShadow}`}
                />
              ) : (
                <Play
                  size={24}
                  className={`${themeClass.dropShadow}`}
                />
              )}
            </button>
            <button onClick={handlePrev} title="Prev Song">
              <SkipForward
                size={24}
                className={`rotate-180 ${themeClass.dropShadow}`}
              />
            </button>
            <button onClick={handleNext} title="Next Song">
              <SkipForward
                size={24}
                className={`${themeClass.dropShadow}`}
              />
            </button>
            <button onClick={changeGif} title="Change Gif">
              <MdSync
                size={24}
                className={`${themeClass.dropShadow}`}
              />
            </button>
            <SettingsOverlay />
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
