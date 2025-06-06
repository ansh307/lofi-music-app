"use client";

import { useTheme } from "@/context/ThemeContext";
import themes from "@/lib/themes";
import { useSession, signOut, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { MdLockOutline, MdOutlineFileUpload } from "react-icons/md";
import Loader from "../ui/Loader";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import UploadSongModal from "../UploadSongModal/UploadSongModal";

export default function Sidebar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const { playlistMode, setPlaylistMode, reloadUserSongs, userSongs } =
    useMusicPlayer();

  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/subscription/status")
        .then((res) => res.json())
        .then((data) => {
          setIsSubscribed(data.subscribed);
        });
    }
  }, [status]);

  const toggleSidebar = () => {
    if (isOpen) {
      setTimeout(() => {
        setUploadOpen(false);
      }, 200);
    }
    setIsOpen(!isOpen);
  };

  const themeClass = themes[theme] || themes["indigo"];

  const [uploadOpen, setUploadOpen] = useState(false);

  const handleSignOut = () => {
    setIsLoading(true);
    signOut({ callbackUrl: "/play" });
  };

  const handleSignIn = () => {
    setIsLoading(true);
    signIn({ callbackUrl: "/play" });
  };

  const handleUploadClick = () => {
    setUploadOpen(true);
  };

  const handleUploadSuccess = (newSong) => {
    // You might want to refetch user songs or update music player context state here
    if (reloadUserSongs) reloadUserSongs();
  };

  const isFreeUploadUser =
    session?.user?.email === "anshsoni55333@gmail.com" ||
    session?.user?.email === "jenneviedeasis@gmail.com";

  const canUpload = isFreeUploadUser || isSubscribed;

  return (
    <>
      {/* Hamburger Icon */}
      <button
        className={`fixed top-12 left-12 z-40 rounded-md hover:bg-opacity-50 transition ${
          themeClass.icon
        } ${themeClass.hover} ${isOpen ? "hidden" : "flex"} `}
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <FiMenu size={24} className={`${themeClass.dropShadow}`} />
      </button>

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-[100%] sm:w-80 lg:w-96 bg-black bg-opacity-10 text-white z-50 p-6 transform transition-transform ease-in-out duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col justify-between`}
      >
        {/* Top Content */}
        <div>
          {/* Logo */}
          <div className="flex items-center mb-6">
            <img src="/LOFIDA.png" alt="Logo" className="h-8" />
            <span
              className={`ml-2 text-xl font-semibold ${themeClass.icon} ${themeClass.hover} ${themeClass.dropShadow}`}
            >
              LofiDa
            </span>
          </div>

          {/* Close Icon */}
          <button
            className={`z-72 absolute top-5 right-4 p-2 rounded-md bg-black bg-opacity-30 hover:bg-opacity-50 transition ${themeClass.icon} ${themeClass.hover}`}
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            <FiX size={24} className={`${themeClass.dropShadow}`} />
          </button>
          {status === "authenticated" && (
            <>
              <div className="flex flex-col gap-2">
                <h2 className={`text-lg font-semibold text-white`}>
                  Welcome, {session?.user?.name || "User"}
                </h2>
              </div>

              <div className="mt-8">
                <ul className="mt-2 space-y-2">
                  <li>
                    <button
                      onClick={() => setPlaylistMode("all")}
                      className={`block py-3 px-4 rounded-md transition w-full text-start ${
                        playlistMode === "all"
                          ? "bg-zinc-950 font-bold"
                          : "hover:bg-zinc-950"
                      } text-white`}
                    >
                      All Songs
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        if (userSongs.length > 0) setPlaylistMode("user");
                      }}
                      disabled={userSongs.length === 0}
                      title={`You have ${userSongs.length} songs`}
                      className={`block py-3 px-4 rounded-md transition w-full text-start ${
                        playlistMode === "user"
                          ? "bg-zinc-950 font-bold"
                          : "hover:bg-zinc-950"
                      } ${
                        userSongs.length === 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      } text-white`}
                    >
                      My Songs
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setPlaylistMode("default")}
                      className={`block py-3 px-4 rounded-md transition w-full text-start ${
                        playlistMode === "default"
                          ? "bg-zinc-950 font-bold"
                          : "hover:bg-zinc-950"
                      } text-white`}
                    >
                      Default Songs
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Middle content */}
        {status === "unauthenticated" && (
          <div className="flex flex-col gap-2 mt-6 p-4 bg-black bg-opacity-20 rounded-md justify-center items-center text-center">
            <h2 className="text-lg font-semibold text-gray-300">
              Welcome to LofiDa!
            </h2>
            <p className="text-sm text-gray-400">
              You need to sign in to access your playlists and upload songs.
            </p>
          </div>
        )}

        {status === "loading" && (
          <div className="flex flex-col justify-center items-center">
            <Loader size="md" />
          </div>
        )}

        {/* Bottom Content */}
        <div>
          {/* Upload Songs */}
          {status === "authenticated" && (
            <button
              onClick={() => {
                if (canUpload) {
                  handleUploadClick();
                } else {
                  window.location.href = "/subscribe";
                }
              }}
              disabled={!session?.user}
              className={`w-full mt-6 py-3 px-4 rounded-md transition text-white flex items-center justify-between group ${
                canUpload
                  ? "hover:bg-zinc-950"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              Upload Songs
              {canUpload ? (
                <MdOutlineFileUpload className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <MdLockOutline className="h-5 w-5" />
              )}
            </button>
          )}

          {/* Upload modal */}
          <UploadSongModal
            isOpen={uploadOpen}
            onClose={() => setUploadOpen(false)}
            onUploadSuccess={handleUploadSuccess}
          />

          {/* Sign In Button */}
          {status === "unauthenticated" && (
            <button
              onClick={handleSignIn}
              disabled={isLoading}
              className={`w-full mt-4 px-4 py-2 rounded-md transition border border-gray-400 text-gray-400 hover:text-gray-300 inline-flex items-center justify-center gap-2`}
            >
              {isLoading ? (
                <>
                  <Loader size="sm" />
                  <span>Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          )}

          {/* Sign Out Button */}
          {/* authenticated */}
          {status === "authenticated" && (
            <button
              onClick={handleSignOut}
              disabled={isLoading}
              className={`w-full mt-4 px-4 py-2 rounded-md transition border border-gray-400 text-gray-400 hover:text-gray-300 inline-flex items-center justify-center gap-2`}
            >
              {isLoading ? (
                <>
                  <Loader size="sm" />
                  <span>Loading...</span>
                </>
              ) : (
                "Sign Out"
              )}
            </button>
          )}

          {status === "loading" && (
            <button
              disabled
              className={`w-full mt-4 px-4 py-2 rounded-md transition border border-gray-400 text-gray-400 hover:text-gray-300 inline-flex items-center justify-center gap-2`}
            >
              <>
                <Loader size="sm" />
                <span>Loading...</span>
              </>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
