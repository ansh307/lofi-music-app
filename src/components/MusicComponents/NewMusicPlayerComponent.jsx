"use client";

import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { IoPlaySkipForward, IoPlaySkipBack } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { useMusicPlayer } from "@/components/context/MusicPlayerContext";
import { useState } from "react";
import Link from "next/link";
import TypingTitle from "../TypingTitle/TypingTitle";

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
  } = useMusicPlayer();

  const currentSong = songs[currentSongIndex];

  return (
    <div className="absolute bottom-0 left-0 w-full z-0 py-5 px-6 flex flex-col items-center mx-12">
      <div className="w-full text-start mb-4 px-0">
        <h2 className="text-2xl font-semibold text-indigo-200 max-w-64">
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
            className="p-2 text-indigo-200 hover:text-indigo-100 hover:scale-110 transition-transform duration-300"
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="flex-1 appearance-none bg-indigo-200 rounded-lg h-[2px] max-w-24 cursor-pointer progress-range-slider"
          />
        </div>

        {/* Center: Playback Controls */}
        <div className="flex justify-center items-center gap-4 col-span-3">
          <button
            onClick={handlePrev}
            className="p-2 bg-indigo-200 rounded-full hover:bg-indigo-100"
          >
            <IoPlaySkipBack className="text-slate-900" />
          </button>
          <button
            onClick={togglePlayPause}
            className="p-4 bg-indigo-200 rounded-full text-white hover:bg-indigo-100 transition-transform duration-300"
          >
            {isPlaying ? (
              <FaPause className="text-slate-900" />
            ) : (
              <FaPlay className="text-slate-900" />
            )}
          </button>
          <button
            onClick={handleNext}
            className="p-2 bg-indigo-200 rounded-full hover:bg-indigo-100"
          >
            <IoPlaySkipForward className="text-slate-900" />
          </button>
        </div>

        {/* Right: Download Button */}
        <div className="flex justify-end col-span-4 ">
          <Link
            href={currentSong.src}
            target="_blank"
            className="p-2 text-indigo-100 hover:text-indigo-200 hover:scale-110 transition-transform duration-300"
          >
            <MdOutlineFileDownload className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewMusicPlayerComponent;
