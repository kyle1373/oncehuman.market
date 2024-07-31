import ListingCard from "@components/ListingCard";
import SEO from "@components/SEO";
import { usePageCache } from "@hooks/usePageCache";
import getOnlineStatus from "@utils/helpers";
import supabaseAdmin from "@utils/supabaseAdmin";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

export default function Profile({ user, error }) {
  const { pageCache, cachePageData } = usePageCache();

  const [listingResults, setListingResults] = useState(
    pageCache(`/${user.id}`, "listingResults") ?? []
  );
  const [fetchingListings, setFetchingListings] = useState(false);
  const [listingSearchMessage, setListingSearchMessage] = useState(
    pageCache(`/${user.id}`, "listingSearchMessage") ?? ""
  );

  const joinedDate = new Date(user.created_at).toLocaleDateString();

  const searchListings = async () => {
    console.log(error);
    console.log(user.id);
    if (fetchingListings || !user?.id || error) {
      return;
    }

    setFetchingListings(true);
    setListingResults([]);

    try {
      const response = await axios.get(`/api/search_listings`, {
        params: {
          user_id: user.id,
        },
      });
      setListingResults(response.data);
      setListingSearchMessage(
        response.data.length > 0 ? "" : "No open listings found."
      );
    } catch (error) {
      console.error("Error fetching listings:", error);
      setListingSearchMessage("Error fetching listings.");
    } finally {
      setFetchingListings(false);
    }
  };

  useEffect(() => {
    console.log(listingResults);
    cachePageData(`/${user.id}`, "listingResults", listingResults);
    cachePageData(`/${user.id}`, "listingSearchMessage", listingSearchMessage);
  }, [listingResults, listingSearchMessage]);

  useEffect(() => {
    if (listingResults?.length === 0) {
      searchListings();
    }
  }, []);

  if (error) {
    return (
      <main className="min-h-screen w-full flex justify-center items-center">
        <SEO title="Error" />
        <h1 className="text-center text-xl font-bold text-red-500 mt-20">
          Error: {error}
        </h1>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen w-full flex justify-center items-center">
        <SEO title="User Not Found" />
        <h1 className="text-center text-xl font-bold mt-20">User not found</h1>
      </main>
    );
  }

  return (
    <main className="h-full w-full overflow-y-auto">
      <SEO title={`${user.discord_name}'s Profile`} />
      <div className="flex flex-col items-center relative mt-10 px-4">
        <div className="max-w-2xl w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 flex items-center">
          <img
            src={user.discord_image}
            alt={`${user.discord_name}'s profile`}
            className="w-24 h-24 rounded-full mr-6"
          />
          <div>
            <h1 className="sm:text-3xl text-2xl font-bold mb-2">
              {user.discord_name}
            </h1>
            <p className="text-gray-400 sm:text-base text-sm">
              Joined: {joinedDate}
            </p>
            <p className="text-gray-400 sm:text-base text-sm">
              {getOnlineStatus(user.last_online)}
            </p>
          </div>
        </div>
        {fetchingListings ? (
          <ClipLoader color="#FFFFFF" className="mt-8" size={30} />
        ) : (
          <div className="mt-8 text-neutral-300">
            {listingResults.length > 0 ? (
              listingResults.map((entry, index) => {
                return <ListingCard key={index} entry={entry} cacheKey={"/profile/"+ user.id + "/listing_id/"+ entry.listing.id + "/profilelistingcard"}/>;
              })
            ) : (
              <p>{listingSearchMessage}</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { user_id } = params;

  try {
    const { data, error } = await supabaseAdmin
      .from("users")
      .select(
        "id, created_at, discord_id, discord_image, discord_name, last_online"
      )
      .eq("id", parseInt(user_id as string))
      .single();

    if (error) {
      return {
        props: {
          user: null,
          error: error.message,
        },
      };
    }

    return {
      props: {
        user: data,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      props: {
        user: null,
        error: "Failed to fetch user data",
      },
    };
  }
};
