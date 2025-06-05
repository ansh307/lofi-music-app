import "@/app/play/VHS-style-scanline-effect.css";
import HelpOverlay from "@/components/HelpOverlay/HelpOverlay";
import SocialOverlay from "@/components/SocialOverlay/SocialOverlay";

import { createMetadata } from "@/components/Seo";
import Sidebar from "@/components/Sidebar/Sidebar";
import StaticPlayerUI from "@/components/playComponent/StaticPlayerUI";

export const metadata = createMetadata({
  title: "Play",
  description: "Listen and vibe with lo-fi beats on the play screen.",
  canonicalUrl: "https://lofida.app/play",
});

export default function PlayPage() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white flex flex-col items-center justify-center px-4 py-8">
      <Sidebar />
      <HelpOverlay />
      <SocialOverlay />
      <StaticPlayerUI /> {/* This contains the interactive client parts */}
    </div>
  );
}
