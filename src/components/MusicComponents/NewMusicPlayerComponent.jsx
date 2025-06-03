"use client";

import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { IoPlaySkipForward, IoPlaySkipBack } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import TypingTitle from "../TypingTitle/TypingTitle";
import { useGif } from "../../context/GifContext";
import { useTheme } from "@/context/ThemeContext";
import themes from "@/lib/themes";

const NewMusicPlayerComponent = () => {
  const {
    songs,
    currentSongIndex,
    isPlaying,
    togglePlayPause,
    volume,
    handleVolumeChange,
    isMuted,
    toggleMute,
    currentTime,
    handleNext,
    handlePrev,
    audioRef,
    handleTimeUpdate,
    handleProgressChange,
    duration,
    setDuration,
    combinedSongs,
  } = useMusicPlayer();

  const { changeGif } = useGif();

  const currentSong = combinedSongs[currentSongIndex];

  const { theme, changeTheme } = useTheme();

  const themeClass = themes[theme] || themes["indigo"]; // fallback

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          handlePrev();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case "ArrowUp":
          if (!isMuted) {
            const newVolume = Math.min(volume + 0.1, 1);
            handleVolumeChange({ target: { value: newVolume } });
          }
          break;
        case "ArrowDown":
          if (!isMuted) {
            const newVolume = Math.max(volume - 0.1, 0);
            handleVolumeChange({ target: { value: newVolume } });
          }
          break;
        case " ":
          e.preventDefault(); // prevent space from scrolling
          togglePlayPause();
          break;
        case "m":
        case "M":
          toggleMute();
          break;
        case "g":
        case "G":
          if (typeof changeGif === "function") {
            changeGif(); // optional
          }
          break;
        case "t":
        case "T":
          changeTheme(); // optional
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    volume,
    isMuted,
    togglePlayPause,
    handleNext,
    handlePrev,
    handleVolumeChange,
    toggleMute,
    changeTheme,
  ]);

  return (
    <div className="absolute bottom-12 md:bottom-0 left-0 w-full z-0 py-5 px-0 md:px-6 flex flex-col mx-12">
      <div className="w-[90%] max-w-sm sm:max-w-md md:w-full text-start mb-4 px-0 ml-0">
        <h2 className="text-2xl font-semibold">
          <TypingTitle />
        </h2>
      </div>

      {/* <div className="w-full items-center gap-4 mb-4"> */}
      {/* Music progress bar */}
      {/* <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleProgressChange}
          className="flex-1 appearance-none bg-indigo-200 rounded-lg h-1 w-full cursor-pointer progress-range-slider "
        /> */}
      {/* Music play time */}
      {/* <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-indigo-200 transition-colors duration-300 hover:text-indigo-100">
            {currentTime
              ? new Date(currentTime * 1000).toISOString().substr(14, 5)
              : "00:00"}
          </span>
          <span className="text-xs font-medium text-indigo-200 transition-colors duration-300 hover:text-indigo-100">
            {duration
              ? new Date((duration - currentTime) * 1000)
                  .toISOString()
                  .substr(14, 5)
              : "00:00"}
          </span>
        </div> */}
      {/* </div> */}

      <div className="hidden md:grid grid-cols-12 items-center w-full mb-4">
        {/* Left: Volume Controls */}
        <div className="flex items-center gap-2 col-span-4">
          <button
            onClick={toggleMute}
            className={`p-2 ${themeClass.text} ${themeClass.hover} hover:scale-110 transition-transform duration-300`}
          >
            {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className={`flex-1 appearance-none ${themeClass.bg} rounded-lg h-[2px] max-w-24 cursor-pointer progress-range-slider`}
            style={{
              backgroundColor: themeClass.track,
              "--thumb-color": themeClass.thumb,
              "--thumb-hover": themeClass.thumbHover,
            }}
          />
        </div>

        {/* Center: Playback Controls */}
        <div className="flex justify-center items-center gap-4 col-span-3">
          <button
            onClick={handlePrev}
            className={`p-2 ${themeClass.bg} rounded-full ${themeClass.hover}`}
          >
            <IoPlaySkipBack className="text-slate-900" />
          </button>
          <button
            onClick={togglePlayPause}
            className={`p-4 ${themeClass.bg} rounded-full text-white ${themeClass.hover} transition-transform duration-300`}
          >
            {isPlaying ? (
              <FaPause className="text-slate-900" />
            ) : (
              <FaPlay className="text-slate-900" />
            )}
          </button>
          <button
            onClick={handleNext}
            className={`p-2 ${themeClass.bg} rounded-full ${themeClass.hover}`}
          >
            <IoPlaySkipForward className="text-slate-900" />
          </button>
        </div>

        {/* Right: Download Button */}
        <div className="flex justify-end col-span-4 ">
          <Link
            href={currentSong.src}
            target="_blank"
            className={`p-2 ${themeClass.text} ${themeClass.hover} hover:scale-110 transition-transform duration-300`}
          >
            <MdOutlineFileDownload className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewMusicPlayerComponent;
