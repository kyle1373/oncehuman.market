import { signIn, signOut, useSession } from "next-auth/react";
import { logServerStats } from "@utils/logger";
import SEO from "@components/SEO";
import Link from "next/link";
import { getListings, getUserDataServer } from "@utils/server";
import { ListingData, SearchItemsEntry, UserData } from "@constants/types";
import { useUser } from "@hooks/UserContext";
import supabaseAdmin from "@utils/supabaseAdmin";
import ItemSearchDropdown from "@components/ItemSearchDropdown";
import { useState } from "react";
import { LINKS } from "@constants/constants";
import SelectedItem from "@components/SelectedItem";
import { toast } from "react-toastify";

type PageProps = {
  session: UserData;
  previousListing: ListingData;
};

export default function Page({ session, previousListing }: PageProps) {
  // The top bar user doesn't get set after a successful log in for some reason, so we're manually setting the context here
  const { discordUser, setDiscordUser } = useUser();

  const [selectedAskingItems, setSelectedAskingItems] = useState<
    { id: number; name: string; amount: number; image: string }[]
  >([]);
  const [selectedOfferingItems, setSelectedOfferingItems] = useState<
    { id: number; name: string; amount: number; image: string }[]
  >([]);

  setDiscordUser(session);

  const handleOfferingItemSelect = (item: SearchItemsEntry) => {
    if (!item) {
      return;
    }

    if (selectedOfferingItems.length >= 1) {
      toast("You can only select 1 item");
      return;
    }

    if (
      selectedOfferingItems.some((selectedItem) => selectedItem.id === item.id)
    ) {
      toast("This item is already selected");
      return;
    }

    setSelectedOfferingItems((prevState) => [
      ...prevState,
      {
        id: item.id,
        name: item.name,
        amount: 1,
        image: LINKS.baseImagePath + item.s3_image_path,
      },
    ]);
  };

  const handleLookingForItemSelect = (item: SearchItemsEntry) => {
    if (!item) {
      return;
    }

    if (selectedAskingItems.length >= 3) {
      toast("You can only select up to 3 items");
      return;
    }

    if (
      selectedAskingItems.some((selectedItem) => selectedItem.id === item.id)
    ) {
      toast("This item is already selected");
      return;
    }

    setSelectedAskingItems((prevState) => [
      ...prevState,
      {
        id: item.id,
        name: item.name,
        amount: 1,
        image: LINKS.baseImagePath + item.s3_image_path,
      },
    ]);
  };

  const removeOfferingItem = (item_id: number) => {
    setSelectedOfferingItems((prevState) =>
      prevState.filter((item) => item.id !== item_id)
    );
  };

  const removeAskingItem = (item_id: number) => {
    setSelectedAskingItems((prevState) =>
      prevState.filter((item) => item.id !== item_id)
    );
  };

  const onChangeOfferingItemAmount = (numItems, itemID) => {
    setSelectedOfferingItems((prevState) =>
      prevState.map((item) =>
        item.id === itemID ? { ...item, amount: numItems } : item
      )
    );
  };

  const onChangeAskingItemAmount = (numItems, itemID) => {
    setSelectedAskingItems((prevState) =>
      prevState.map((item) =>
        item.id === itemID ? { ...item, amount: numItems } : item
      )
    );
  };

  return (
    <main className="h-full w-full overflow-y-auto">
      <div className="flex flex-col items-center relative mb-20">
        <SEO title="Create Listing" />
        <div className="w-full max-w-lg px-4">
          <h1 className="mt-8 mb-1 text-neutral-300 text-lg">
            I am offering... (select 1)
          </h1>
          <ItemSearchDropdown
            onItemSelect={handleOfferingItemSelect}
            cacheKey="/create-item/lookingForItem"
            keepSelected={false}
          />
          <div className="mt-4 gap-4">
            {selectedOfferingItems.map((entry) => (
              <SelectedItem
                key={"offering" + entry.id}
                className="mt-4"
                entry={entry}
                onChangeAmount={onChangeOfferingItemAmount}
                onClickX={removeOfferingItem}
              />
            ))}
          </div>
        </div>
        <div className="w-full max-w-lg px-4">
          <h1 className="mt-6 mb-1 text-neutral-300 text-lg">
            I am looking for... (select up to 3)
          </h1>
          <ItemSearchDropdown
            onItemSelect={handleLookingForItemSelect}
            cacheKey="/create-item/offeringItem"
            keepSelected={false}
          />
          <div className="mt-4">
            {selectedAskingItems.map((entry, index) => (
              <SelectedItem
                key={"asking" + entry.id}
                className="mt-4"
                entry={entry}
                onChangeAmount={onChangeAskingItemAmount}
                onClickX={removeAskingItem}
              />
            ))}
          </div>
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
