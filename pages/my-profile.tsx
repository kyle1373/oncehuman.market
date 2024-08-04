import { signIn, signOut, useSession } from "next-auth/react";
import { logServerStats } from "@utils/logger";
import SEO from "@components/SEO";
import Link from "next/link";
import { getUserDataServer } from "@utils/server";
import supabaseAdmin from "@utils/supabaseAdmin";

export default function Home() {
  return (
    <main>
      <SEO title="My Profile" />
    </main>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  try {
    const userData = await getUserDataServer(req);

    if (!userData) {
      return {
        redirect: {
          destination: "/auth/signin",
          permanent: false,
        },
      };
    }

    const { data, error } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("discord_id", userData.discord_id)
      .single();

    if (error || !data) {
      return {
        redirect: {
          destination: "/500",
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: `/profile/${data.id}`,
        permanent: false,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }
};
