"use client";
import { useEffect, useState } from "react";
import { useMusicPlayer } from "../../context/MusicPlayerContext";
import { useTheme } from "@/context/ThemeContext";
import themes from "@/lib/themes";

const TypingTitle = ({ speed = 150 }) => {
  const { currentSongIndex, songs, isPlaying, combinedSongs } = useMusicPlayer();
  const currentSong = combinedSongs?.[currentSongIndex];

  const { theme } = useTheme();
  const themeClass = themes[theme] || themes["indigo"]; // fallback

  // If song hasn't loaded yet
  if (!currentSong || !currentSong.title) {
    return <span className={`${themeClass.icon} animate-pulse`}>Loading...</span>;
  }

  const text = currentSong.title;

  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Reset typing animation on song change
  useEffect(() => {
    setDisplayedText("");
    setIndex(0);
  }, [text]);

  // Typing effect
  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 750);
    return () => clearInterval(blink);
  }, []);

  return isPlaying ? (
    <span className={`${themeClass.dropShadow} ${themeClass.icon}`}>
      {displayedText}
      {index === text.length && (
        <span className={`${themeClass.text}`}>...</span>
      )}
      <span
        className={`${themeClass.bg} w-[8px] h-5 inline-block ml-1 ${
          showCursor ? "opacity-100" : "opacity-0"
        } transition-opacity duration-200  ${themeClass.shadow}`}
      />
    </span>
  ) : (
    <span
      className={`${themeClass.icon} ${themeClass.dropShadow} flex items-center`}
    >
      Paused... Click space to play
      <span
        className={`${themeClass.bg} w-[8px] h-5 inline-block ml-1  ${
          showCursor ? "opacity-100" : "opacity-0"
        } transition-opacity duration-200 `}
      />
    </span>
  );
};


export default TypingTitle;