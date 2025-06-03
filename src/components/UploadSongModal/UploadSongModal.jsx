"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { toast } from "sonner";
import Loader from "../ui/Loader";

export default function UploadSongModal({ isOpen, onClose, onUploadSuccess }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      setError("Please provide both a title and an audio file.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);

      const res = await fetch("/api/songs/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }

      const data = await res.json();
      onUploadSuccess(data.song); // notify parent to reload or update songs
      toast("Song uploaded successfully!", {
        description: "New song has been added to your library.",
        duration: 2000,
        action: {
          label: "Undo",
        },
      });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className=" p-6 w-96 max-w-full text-white">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Upload New Song
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Song Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 px-4 rounded-md border border-gray-400 text-gray-300 placeholder:text-zinc-500"
            required
          />
          <Input
            type="file"
            accept="audio/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="text-gray-300 border border-gray-400 file:px-[5px] file:pr-4  file:text-sm file:text-zinc-500  "
            required
          />
          {error && (
            <p className="text-red-500 text-sm">Something went wrong.</p>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader size="sm" />
                <span>Uploading...</span>
              </>
            ) : (
              "Upload"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
