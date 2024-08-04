import { signIn, signOut, useSession } from "next-auth/react";
import { logServerStats } from "@utils/logger";
import SEO from "@components/SEO";
import Link from "next/link";
import { getListings, getUserDataServer } from "@utils/server";
import { ListingData, UserData } from "@constants/types";
import { useUser } from "@hooks/UserContext";
import supabaseAdmin from "@utils/supabaseAdmin";
import ItemSearchDropdown from "@components/ItemSearchDropdown";

type PageProps = {
  session: UserData;
  previousListing: ListingData;
};
export default function Page({ session, previousListing }: PageProps) {
  // The top bar user doesn't get set after a successful log in for some reason, so we're manually setting the context here
  const { discordUser, setDiscordUser } = useUser();

  setDiscordUser(session);

  const handleOfferingItemSelect = (item) => {};

  const handleLookingForItemSelect = (item) => {};

  return (
    <main className="h-full w-full overflow-y-auto">
      <div className="flex flex-col items-center relative mb-20">
        <SEO title="Create Listing" />
        <div className="w-full max-w-lg px-4">
          <h1 className="mt-8 mb-1 text-neutral-300 text-lg">
            I am offering... (select 1)
          </h1>
          <ItemSearchDropdown
            onItemSelect={handleLookingForItemSelect}
            cacheKey="/create-item/lookingForItem"
          />
        </div>
        <div className="w-full max-w-lg px-4">
          <h1 className="mt-8 mb-1 text-neutral-300 text-lg">
            I am looking for... (select up to 3)
          </h1>
          <ItemSearchDropdown
            onItemSelect={handleOfferingItemSelect}
            cacheKey="/create-item/offeringItem"
          />
        </div>
        <h1>INFORMATION</h1>
        <h1>Region, Server</h1>
        <h1>World (number)</h1>
        <h1>Location</h1>
        <h1>SELLER CONTACT</h1>
        <h1>Discord (if your username changed, click here [clicks sign in])</h1>
        <h1>Once Human Username</h1>
      </div>
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

  const { data: user, error: userError } = await supabaseAdmin
    .from("users")
    .select("id, discord_id, discord_image, discord_name")
    .eq("discord_id", session.discord_id)
    .maybeSingle();

  if (userError) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${encodeURIComponent(
          "/create-listing"
        )}`,
        permanent: false,
      },
    };
  }

  const listings = await getListings({ userID: user.id, limit: 1 });

  const lastListing = listings?.length > 0 ? listings[0] : null;

  return {
    props: {
      session: session,
      previousListing: lastListing,
    },
  };
}
