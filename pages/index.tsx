import Image from "next/image";
import { Inter } from "next/font/google";
import { signIn, signOut, useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div>
      {JSON.stringify(session)}
      {JSON.stringify(status)}

      {session ? (
        <>
          <p>Welcome, {session.user.name}!</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <p>You are not logged in</p>
          <button onClick={() => signIn("discord")}>Login with Discord</button>
        </>
      )}
    </div>
  );
}
