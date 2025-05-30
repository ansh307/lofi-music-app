"use client";

import Footer from "@/components/Footer/footer";
import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Link from "next/link";

export default function HomePage() {
  const words = [
    { text: "Tune", className: "text-indigo-200 dark:text-indigo-200" },
    { text: "In", className: "text-indigo-200 dark:text-indigo-200" },
    { text: "Zone", className: "text-indigo-200 dark:text-indigo-200" },
    { text: "Out", className: "text-indigo-200 dark:text-indigo-200" },
    { text: "Work", className: "text-pink-400 dark:text-pink-400" },
  ];
  return (
    <>
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/media/849790.gif')",
        }}
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
            // cursorClassName="text-indigo-400"
          />

          <p className="text-sm md:text-base text-slate-400  mb-8">
            Block the noise. Flow into deep focus with your lofi sanctuary.
          </p>

          <div className="pt-5">
            <Link
              href={"/play"}
              className=" py-4 px-8 rounded-full text-xl bg-primary shadow-xs text-indigo-200 hover:text-black hover:bg-indigo-200 font-medium transition-all duration-300"
              size={"lg"}
            >
              Music
            </Link>
          </div>
        </div>
      </div>
    </div> 
      <Footer />
    </>
  );
}
