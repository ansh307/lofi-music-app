import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";
import { createMetadata } from "@/components/Seo";
import { ThemeProvider } from "@/context/ThemeContext";
import { GifProvider } from "@/context/GifContext";
import { MusicPlayerProvider } from "@/context/MusicPlayerContext";
import { Toaster } from "@/components/ui/sonner";
import SessionWrapper from "@/components/SessionWrapper/SessionWrapper";

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
