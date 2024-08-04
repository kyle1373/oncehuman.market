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
import { LINKS, LOCATIONS_LIST } from "@constants/constants";
import SelectedItem from "@components/SelectedItem";
import { toast } from "react-toastify";
import ServerSelection from "@components/ServerSelection";
import { FaArrowDownLong } from "react-icons/fa6";
import { CreateListingBody } from "./api/create-listing";

type PageProps = {
  session: UserData;
  previousListing: ListingData;
};

export default function Page({ session, previousListing }: PageProps) {
  // The top bar user doesn't get set after a successful log in for some reason, so we're manually setting the context here
  const { discordUser, setDiscordUser } = useUser();

  const [selectedAskingItems, setSelectedAskingItems] = useState<
    {
      id: number;
      name: string;
      amount: number;
      total_stock: number;
      image: string;
    }[]
  >([]);
  const [selectedOfferingItems, setSelectedOfferingItems] = useState<
    { id: number; name: string; amount: number; image: string }[]
  >([]);

  const [server, setServer] = useState<string>("");
  const [region, setRegion] = useState<string>("NA");

  const [world, setWorld] = useState<string>("");
  const [location, setLocation] = useState<string>(LOCATIONS_LIST[0]);
  const [oncehumanusername, setOncehumanusername] = useState<string>("");
  const [doNotDiscordContact, setDoNotDiscordContact] = useState(false);

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
        total_stock: 1,
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

  const onChangeOfferingItemTotalStock = (totalStock, itemID) => {
    setSelectedOfferingItems((prevState) =>
      prevState.map((item) =>
        item.id === itemID ? { ...item, total_stock: totalStock } : item
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

  const postListing = async () => {
    const body: CreateListingBody = {
      region,
      server,
      world,
      location,
      oncehuman_username: oncehumanusername,
      items_listings_ask: selectedAskingItems.map((item) => ({
        item_id: item.id,
        amount: item.amount,
      })),
      items_listings_sell: selectedOfferingItems.map((item) => ({
        item_id: item.id,
        amount: item.amount,
        total_stock: item.amount,
      })),
      do_not_contact_discord: doNotDiscordContact,
    };

    try {
      const response = await fetch("/api/create-listing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast("Listing created successfully!");
      } else {
        toast("Failed to create listing");
      }
    } catch (error) {
      console.error("Failed to post listing:", error);
      toast("Failed to create listing");
    }
  };

  return (
    <main className="h-full w-full overflow-y-auto">
      <h1 className="text-center font-bold sm:text-3xl text-2xl mt-10">
        Create a Listing
      </h1>
      <div className="flex flex-col items-center relative mb-20 px-4">
        <SEO title="Create Listing" />
        <div className="w-full max-w-lg">
          <h1 className="mt-8 mb-1 text-neutral-300 text-lg">
            I am offering... (select 1)
          </h1>
          <ItemSearchDropdown
            onItemSelect={handleOfferingItemSelect}
            cacheKey="/create-item/lookingForItem"
            keepSelected={false}
          />
          <div className="gap-4">
            {selectedOfferingItems.map((entry) => (
              <SelectedItem
                key={"offering" + entry.id}
                className="mt-4"
                entry={entry}
                onChangeAmount={onChangeOfferingItemAmount}
                onChangeTotalStock={onChangeOfferingItemTotalStock}
                onClickX={removeOfferingItem}
              />
            ))}
          </div>
        </div>
        <div className="w-full max-w-lg">
          <h1 className="mt-6 mb-1 text-neutral-300 text-lg">
            I am looking for... (select up to 3)
          </h1>
          <ItemSearchDropdown
            onItemSelect={handleLookingForItemSelect}
            cacheKey="/create-item/offeringItem"
            keepSelected={false}
          />
          <div className="">
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

        <div className="mt-6 w-full max-w-lg">
          <h1 className="mb-1 text-neutral-300 text-lg">Server</h1>
          <ServerSelection
            server={server}
            setServer={setServer}
            region={region}
            setRegion={setRegion}
            disabled={false}
          />
        </div>
        <div className={`relative w-full max-w-lg mt-6`}>
          <h1 className="mb-1 text-neutral-300 text-lg">World</h1>
          <input
            type="text"
            value={world}
            onChange={(e) => {
              setWorld(e.target.value);
            }}
            placeholder={"Your world number"}
            className="p-2 border border-neutral-600 bg-neutral-700 rounded w-full"
          />
        </div>
        <div className={`relative w-full max-w-lg mt-6`}>
          <h1 className="mb-1 text-neutral-300 text-lg">Location</h1>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border border-neutral-600 bg-neutral-700 rounded w-full"
          >
            {LOCATIONS_LIST.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className={`relative w-full max-w-lg mt-6`}>
          <h1 className="mb-1 text-neutral-300 text-lg">Once Human Username</h1>
          <input
            type="text"
            value={oncehumanusername}
            onChange={(e) => {
              setOncehumanusername(e.target.value);
            }}
            placeholder={"Your username"}
            className="p-2 border border-neutral-600 bg-neutral-700 rounded w-full"
          />
        </div>

        <div className="mt-6 w-full max-w-lg">
          <h1 className="text-white mb-6">
            Your discord username,{" "}
            <span className="text-purple-300 font-bold">
              {session.discord_name}
            </span>
            , will also be shown for easy contact. If you changed it recently,{" "}
            <span
              onClick={() => signIn("discord")}
              className="underline hover:text-blue-400 hover:font-bold font-semibold hover:cursor-pointer"
            >
              click here to update
            </span>
            .
          </h1>
          <label className="text-neutral-300">
            <input
              type="checkbox"
              checked={doNotDiscordContact}
              onChange={() => setDoNotDiscordContact((prevState) => !prevState)}
              className="mr-1"
            />
            Do not message me on Discord
          </label>
        </div>

        <div className="w-full flex justify-center items-center mt-8">
          <FaArrowDownLong size={25} />
        </div>

        <div className="mt-8 w-full max-w-lg">
          <h1 className="text-yellow-200 font-semibold text-center">
            Please keep this website open to display an{" "}
            <span className="font-black text-green-400">online</span> status
          </h1>
        </div>
        <div className="mt-4">
          <button
            onClick={postListing}
            className={
              "bg-green-700 hover:bg-green-600 text-white py-2 px-8 rounded text-base"
            }
          >
            Post Listing
          </button>
        </div>
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
