"use client";
import { useEffect, useState } from "react";
import { useMusicPlayer } from "../../context/MusicPlayerContext";

const TypingTitle = ({ speed = 150 }) => {
  const { currentSongIndex, songs, isPlaying } = useMusicPlayer();
  const currentSong = songs[currentSongIndex];
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
    <span className="glow-text">
      {displayedText}
      {index === currentSong.title.length && (
        <span className="text-indigo-200">...</span>
      )}
      <span
        className={`bg-indigo-200 w-[8px] h-5 inline-block ml-1 ${
          showCursor ? "opacity-100" : "opacity-0"
        } transition-opacity duration-200 shadow-[0_0_6px_rgba(129,140,248,0.8)]`}
      />
    </span> 
  ) : (
    <span className="text-indigo-300 glow-text flex items-center">
      Paused... Click space to play
      <span
        className={`bg-indigo-200 w-[8px] h-5 inline-block ml-1  ${
          showCursor ? "opacity-100" : "opacity-0"
        } transition-opacity duration-200 `}
      />
    </span>
  );
};

export default TypingTitle;
