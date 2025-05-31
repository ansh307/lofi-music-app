"use client";

import NewMusicPlayerComponent from "@/components/MusicComponents/NewMusicPlayerComponent";
import "@/app/play/VHS-style-scanline-effect.css";
import HelpOverlay from "@/components/HelpOverlay/HelpOverlay";
import SocialOverlay from "@/components/SocialOverlay/SocialOverlay";

export default function PlayPage() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white flex flex-col items-center justify-center px-4 py-8">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/media/6158782.jpg')",
        }}
      />

      {/* Horizontal Lines Overlay */}
      <div className="absolute inset-0 horizontal-lines-overlay z-10" />

      <HelpOverlay />
      <SocialOverlay />

      {/* Foreground Content */}
      <div className="w-full ">
        <NewMusicPlayerComponent />
      </div>
    </div>
  );
}
