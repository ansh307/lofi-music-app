"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  // const { data: session } = useSession();

  // if (session) {
  //   return (
  //     <button
  //       onClick={() => signOut()}
  //       className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
  //     >
  //       Logout
  //     </button>
  //   );
  // }

  return (
    <button
      onClick={() => signIn()}
      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 z-50"
    >
      Login
    </button>
  );
}
