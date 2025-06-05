// src/components/Home/HomeClient.jsx
"use client";

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { useGif } from "@/context/GifContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";

export default function HomeClient() {
  const words = [
    { text: "Tune", className: "text-indigo-200 dark:text-indigo-200" },
    { text: "In", className: "text-indigo-200 dark:text-indigo-200" },
    { text: "Zone", className: "text-indigo-200 dark:text-indigo-200" },
    { text: "Out", className: "text-indigo-200 dark:text-indigo-200" },
    { text: "Work", className: "text-pink-400 dark:text-pink-400" },
  ];

  const { changeGif, currentGif } = useGif();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "g" && typeof changeGif === "function") {
        changeGif();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeGif]);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/play");
    }, 800);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('${currentGif}')` }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90 z-10" />

      {/* Foreground Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-6 py-12 text-indigo-100 text-center">
        <div className="max-w-4xl space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-indigo-200 drop-shadow-lg">
            Welcome to the LofiDa 🎵
          </h1>

          <TypewriterEffectSmooth
            words={words}
            className="text-lg md:text-xl font-medium justify-center"
          />

          <p className="text-sm md:text-base text-slate-400 mb-8">
            Block the noise. Flow into deep focus with your lofi sanctuary.
          </p>

          <div className="pt-5">
            <button
              onClick={handleClick}
              disabled={isLoading}
              className={`inline-flex items-center justify-center gap-2 py-4 px-8 rounded-full border text-indigo-200 hover:text-indigo-100 shadow-[0_0_6px_rgba(129,140,248,0.8)] transition-all duration-300 ${
                isLoading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <Loader size="sm" />
                  <span>Loading...</span>
                </>
              ) : (
                "Music"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
