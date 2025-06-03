"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { songs } from "@/data/SongList";
import { useGif } from "./GifContext";
import axios from "axios"; // or fetch
import { useSession } from "next-auth/react";

const MusicPlayerContext = createContext();

export const useMusicPlayer = () => useContext(MusicPlayerContext);

export const MusicPlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(9);
  const [volume, setVolume] = useState(0.2);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0); // Add duration state here

  const audioRef = useRef(null);
  const { changeGif } = useGif();

  const [userSongs, setUserSongs] = useState([]);
  const { data: session, status } = useSession();

  const fetchUserSongs = async () => {
    try {
      const res = await fetch("/api/songs/mine");
      if (!res.ok) throw new Error("Failed to fetch user songs");
      const data = await res.json();
      setUserSongs(data.songs);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchUserSongs();
    }
  }, [status]);

  const reloadUserSongs = () => fetchUserSongs();

  const [playlistMode, setPlaylistMode] = useState("default");

  const combinedSongs = React.useMemo(() => {
    if (playlistMode === "default") return songs;
    if (playlistMode === "user") return userSongs;
    if (playlistMode === "all") return [...songs, ...userSongs];
    return songs;
  }, [playlistMode, userSongs]);

  useEffect(() => {
    if (combinedSongs.length > 0) {
      setCurrentSongIndex(0); // or getRandomSongIndex(-1) if you prefer random
    }
  }, [playlistMode, combinedSongs]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      // audioRef.current.currentTime = currentTime;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (typeof changeGif === "function") {
      changeGif(); // whenever song changes
    }
  }, [currentSongIndex]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.load(); // reload new audio
      audioRef.current
        .play()
        .catch((err) => console.warn("Playback error:", err));
    }
  }, [currentSongIndex]);

  const getRandomSongIndex = (excludeIndex) => {
    let randomIndex = Math.floor(Math.random() * combinedSongs.length);
    // Prevent picking the same song
    while (randomIndex === excludeIndex && combinedSongs.length > 1) {
      randomIndex = Math.floor(Math.random() * combinedSongs.length);
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

  const playAudio = () => {
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .catch((err) => console.warn("Playback error:", err));
      }
    }, 100);
  };

  const handleNext = () => {
    const randomIndex = getRandomSongIndex(currentSongIndex);
    setCurrentSongIndex(randomIndex);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const randomIndex = getRandomSongIndex(currentSongIndex);
    setCurrentSongIndex(randomIndex);
    setIsPlaying(true);
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
        playlistMode,
        setPlaylistMode,
        combinedSongs,
        userSongs,
        reloadUserSongs,
      }}
    >
      {children}
      <audio
        // autoPlay
        ref={audioRef}
        src={combinedSongs[currentSongIndex]?.src || ""}
        onEnded={handleNext}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)} // Set duration locally
      />
    </MusicPlayerContext.Provider>
  );
};
