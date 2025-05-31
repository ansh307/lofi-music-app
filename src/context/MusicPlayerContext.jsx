// context/MusicPlayerContext.js
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { songs } from "@/data/SongList";

const MusicPlayerContext = createContext();

export const useMusicPlayer = () => useContext(MusicPlayerContext);

export const MusicPlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(9);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0); // Add duration state here

  const audioRef = useRef(null);


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      // audioRef.current.currentTime = currentTime;
    }
  }, [volume, isMuted]);

  const getRandomSongIndex = (excludeIndex) => {
  let randomIndex = Math.floor(Math.random() * songs.length);
  // Prevent picking the same song
  while (randomIndex === excludeIndex && songs.length > 1) {
    randomIndex = Math.floor(Math.random() * songs.length);
  }
  return randomIndex;
};


  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

const handleNext = () => {
  const randomIndex = getRandomSongIndex(currentSongIndex);
  setCurrentSongIndex(randomIndex);
  setIsPlaying(true);
  audioRef.current.pause(); // will autoplay due to `autoPlay`
};


const handlePrev = () => {
  const randomIndex = getRandomSongIndex(currentSongIndex);
  setCurrentSongIndex(randomIndex);
  setIsPlaying(true);
  audioRef.current.pause();
};


  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        isPlaying,
        togglePlayPause,
        currentSongIndex,
        setCurrentSongIndex,
        volume,
        handleVolumeChange,
        isMuted,
        toggleMute,
        currentTime,
        duration, // Include duration in context
        setDuration, // Include setDuration in context
        handleNext,
        handlePrev,
        songs,
        audioRef,
        handleTimeUpdate,
        handleProgressChange,
      }}
    >
      {children}
      <audio
        autoPlay
        ref={audioRef}
        src={songs[currentSongIndex].src}
        onEnded={handleNext}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)} // Set duration locally
      />
    </MusicPlayerContext.Provider>
  );
};