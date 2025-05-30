// context/MusicPlayerContext.js
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

const MusicPlayerContext = createContext();

export const useMusicPlayer = () => useContext(MusicPlayerContext);

export const MusicPlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0); // Add duration state here

  const audioRef = useRef(null);

  const songs = [
    {
      title: "Dil Tu Jaan Tu",
      artist: "Artist 1",
      src: "https://kiyaloveseden-playlist.s3.ap-south-1.amazonaws.com/Dil-Tu-Jaan-Tu.mp3",
      albumPhoto: "/images/photos/image1.jpg",
    },
    {
      title: "Guzarish",
      artist: "Artist 2",
      src: "https://kiyaloveseden-playlist.s3.ap-south-1.amazonaws.com/Guzarish.mp3",
      albumPhoto: "/images/photos/image2.jpg",
    },
    {
      title: "Jab Tak",
      artist: "Artist 1",
      src: "https://kiyaloveseden-playlist.s3.ap-south-1.amazonaws.com/Jab-Tak.mp3",
      albumPhoto: "/images/photos/image3.jpg",
    },
    {
      title: "Kaise Hua",
      artist: "Artist 2",
      src: "https://kiyaloveseden-playlist.s3.ap-south-1.amazonaws.com/Kaise-Hua.mp3",
      albumPhoto: "/images/photos/image4.jpg",
    },
    {
      title: "Mere Bina",
      artist: "Artist 1",
      src: "https://kiyaloveseden-playlist.s3.ap-south-1.amazonaws.com/Mere-Bina.mp3",
      albumPhoto: "/images/photos/image5.jpg",
    },
    {
      title: "O Re Piya",
      artist: "Artist 2",
      src: "https://kiyaloveseden-playlist.s3.ap-south-1.amazonaws.com/O-Re-Piya.mp3",
      albumPhoto: "/images/photos/image6.jpg",
    },
    {
      title: "Sau Aasmaan",
      artist: "Artist 1",
      src: "https://kiyaloveseden-playlist.s3.ap-south-1.amazonaws.com/Sau-Aasmaan.mp3",
      albumPhoto: "/images/photos/image7.jpg",
    },
    {
      title: "Saudebaazi",
      artist: "Artist 2",
      src: "https://kiyaloveseden-playlist.s3.ap-south-1.amazonaws.com/Saudebaazi.mp3",
      albumPhoto: "/images/photos/image8.jpg",
    },
    {
      title: "Sukoon Mila",
      artist: "Artist 1",
      src: "https://kiyaloveseden-playlist.s3.ap-south-1.amazonaws.com/Sukoon-Mila.mp3",
      albumPhoto: "/images/photos/image9.jpg",
    },
    {
      title: "Zaalima",
      artist: "Artist 2",
      src: "https://kiyaloveseden-playlist.s3.ap-south-1.amazonaws.com/Zaalima.mp3",
      albumPhoto: "/images/photos/image10.jpg",
    },
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      // audioRef.current.currentTime = currentTime;
    }
  }, [volume, isMuted]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);
    audioRef.current.pause();
  };

  const handlePrev = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
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