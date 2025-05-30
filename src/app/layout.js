import { Geist, Geist_Mono } from "next/font/google";
import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/footer";

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

export const metadata = {
  title: "Lofi Lounge",
  description: "Relax and focus with lofi vibes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${zenMaru.variable}`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
