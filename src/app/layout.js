import { Geist, Geist_Mono } from "next/font/google";
import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";
import { MusicPlayerProvider } from "@/context/MusicPlayerContext";
import { GifProvider } from "@/context/GifContext";
import { ThemeProvider } from "@/context/ThemeContext";
import SessionWrapper from "@/components/SessionWrapper/SessionWrapper";
import { Toaster } from "@/components/ui/sonner";
import { createMetadata } from "@/components/Seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const zenMaru = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zen",
});

export const metadata = createMetadata({});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${zenMaru.variable}`}>
        <SessionWrapper>
          <ThemeProvider>
            <GifProvider>
              <MusicPlayerProvider>
                {children}
                <Toaster />
              </MusicPlayerProvider>
            </GifProvider>
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
