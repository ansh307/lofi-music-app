// src/app/providers.jsx
"use client";

import { MusicPlayerProvider } from "@/context/MusicPlayerContext";
import { GifProvider } from "@/context/GifContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <GifProvider>
          <MusicPlayerProvider>
            {children}
            <Toaster />
          </MusicPlayerProvider>
        </GifProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
