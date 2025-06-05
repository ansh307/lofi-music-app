"use client";

import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Loader from "@/components/ui/Loader"; // Make sure this path is correct

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState("");

  const handleSignIn = (providerName) => {
    setIsLoading(true);
    setProvider(providerName);
    signIn(providerName, { callbackUrl: "/play" });
  };

  return (
    <>
      <div className="min-h-screen bg-[#0e0e11] flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-3xl font-bold mb-6 text-indigo-100">
          Welcome to Lofida
        </h1>
        <p className="text-sm text-zinc-400 mb-10">
          Sign in to access your workspace
        </p>

        <div className="bg-[#141418] rounded-2xl p-6 flex flex-col gap-4 w-80 shadow-lg">
          <button
            onClick={() => handleSignIn("github")}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 transition-colors duration-200 text-white px-4 py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {isLoading && provider === "github" ? (
              <>
                <Loader size="sm" />
                Signing in...
              </>
            ) : (
              <>
                <FaGithub className="text-xl" />
                Sign in with GitHub
              </>
            )}
          </button>

          <button
            onClick={() => handleSignIn("google")}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 transition-colors duration-200 px-4 py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {isLoading && provider === "google" ? (
              <>
                <Loader size="sm" />
                Signing in...
              </>
            ) : (
              <>
                <FcGoogle className="text-xl" />
                Sign in with Google
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
