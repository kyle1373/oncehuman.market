import { signIn, signOut, useSession } from "next-auth/react";
import { logServerStats } from "@utils/logger";
import SEO from "@components/SEO";
import Link from "next/link";
import { getUserDataServer } from "@utils/server";
import { UserData } from "@constants/types";
import { useUser } from "@hooks/UserContext";

type PageProps = {
  session: UserData;
};
export default function Page({ session }: PageProps) {

  // The top bar user doesn't get set after a successful log in for some reason, so we're manually setting the context here
  const {discordUser, setDiscordUser} = useUser()

  setDiscordUser(session)

  return (
    <main>
      <SEO title="Create Listing" />
      {JSON.stringify(session)}
      <Link href="/">Home</Link>
    </main>
  );
}

export async function getServerSideProps({ req, res, query }) {
  const session = await getUserDataServer(req);

  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${encodeURIComponent(
          "/create-listing"
        )}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}