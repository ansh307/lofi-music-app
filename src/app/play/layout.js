"use client";
import { SessionProvider } from "next-auth/react";

export default function WorkspaceLayout({ children }) {
  return (
  <SessionProvider>
    {children}
  </SessionProvider>
  );
}
