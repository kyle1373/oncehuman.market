import Image from "next/image";
import { Inter } from "next/font/google";
import { signIn, signOut, useSession } from "next-auth/react";
import { logServerStats } from "@utils/logger";
import SEO from "@components/SEO";
import Link from "next/link";
import { getUserDataServer } from "@utils/server";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  const { data: session, status } = useSession();


  return (
    <main>
      <SEO />
      <Link href="/create-listing"> Create Listing</Link>
    </main>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  // logServerStats(req, res);
  const userData = await getUserDataServer(req);
  return {
    props: { userData },
  };
};
