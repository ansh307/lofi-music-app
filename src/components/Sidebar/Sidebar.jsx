"use client";

import { useTheme } from "@/context/ThemeContext";
import themes from "@/lib/themes";
import { useSession, signOut, signIn } from "next-auth/react";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { MdOutlineFileUpload } from "react-icons/md";
import Loader from "../ui/Loader";

export default function Sidebar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const themeClass = themes[theme] || themes["indigo"];

  const handleSignOut = () => {
    setIsLoading(true);
    signOut({ callbackUrl: "/play" });
  };

  const handleSignIn = () => {
    setIsLoading(true);
    signIn({ callbackUrl: "/play" });
  };

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
            className={`absolute top-5 right-4 p-2 rounded-md bg-black bg-opacity-30 hover:bg-opacity-50 transition ${themeClass.icon} ${themeClass.hover}`}
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
                    <a
                      href="/play"
                      className={`block py-3 px-4 rounded-md hover:bg-zinc-950 transition text-white`}
                    >
                      All Playlists
                    </a>
                  </li>
                  <li>
                    <a
                      href="/play/curated"
                      className={`block py-3 px-4 rounded-md hover:bg-zinc-950 transition text-white`}
                    >
                      Curated Playlists
                    </a>
                  </li>
                  <li>
                    <a
                      href="/play/user"
                      className={`block py-3 px-4 rounded-md hover:bg-zinc-950 transition text-white`}
                    >
                      Your Playlists
                    </a>
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

        {/* Bottom Content */}
        <div>
          {/* Upload Songs */}
          {status === "authenticated" && (
            <button
              onClick={() => console.log("Upload Songs Clicked")}
              className={`w-full mt-6 py-3 px-4 rounded-md hover:bg-zinc-950 transition text-white flex items-center justify-between group`}
            >
              Upload Songs
              <MdOutlineFileUpload
                className={`h-6 w-6 group-hover:scale-110 transition-transform duration-300`}
              />
            </button>
          )}

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
