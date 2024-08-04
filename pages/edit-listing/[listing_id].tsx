import { signIn, signOut, useSession } from "next-auth/react";
import { logServerStats } from "@utils/logger";
import SEO from "@components/SEO";
import Link from "next/link";
import { getListings, getUserDataServer } from "@utils/server";
import { ListingData, UserData } from "@constants/types";
import { useUser } from "@hooks/UserContext";
import supabaseAdmin from "@utils/supabaseAdmin";
import { notFound } from "next/navigation"; // Import the notFound function

type PageProps = {
  session: UserData;
  listing: ListingData;
};

export default function Page({ session }: PageProps) {
  // The top bar user doesn't get set after a successful log in for some reason, so we're manually setting the context here
  const { user: discordUser, setUser: setDiscordUser } = useUser();

  setDiscordUser(session);

  // NOTE: WHEN USER CLICKS UPDATE LISTING, CLEAR BROWSER CACHE

  return (
    <main>
      <SEO title="Edit Listing" />
      {JSON.stringify(session)}
      <Link href="/">Home</Link>
    </main>
  );
}

export async function getServerSideProps({ req, res, query, params }) {
  const session = await getUserDataServer(req, res);
  const listingID = params?.listing_id as string;

  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${encodeURIComponent(
          `/edit-listing/${listingID}`
        )}`,
        permanent: false,
      },
    };
  }

  const listings = await getListings({ listingID: listingID, limit: 1 });

  const listing = listings?.length > 0 ? listings[0] : null;

  if (!listing || listing.user_info.discord_id !== session.discord_id) {
    // Redirect to not found
    return {
      notFound: true,
    };
  }

  return {
    props: {
      session: session,
      listing: listing,
    },
  };
}
