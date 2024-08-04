import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SEO from "@components/SEO";
import { ClipLoader } from "react-spinners";
import ListingCard from "@components/ListingCard";
import ItemSearchDropdown from "@components/ItemSearchDropdown";
import { usePageCache } from "@hooks/usePageCache";
import { FaPlus, FaSearch } from "react-icons/fa";
import Link from "next/link";
import ServerSelection from "@components/ServerSelection"; // Import the new component
import { isOnceHumanServerFormatted } from "@utils/helpers";

export default function Home(props) {
  const { pageCache, cachePageData } = usePageCache();

  const [lookingForItemQuery, setLookingForItemQuery] = useState(
    pageCache("/", "lookingForItemQuery") ?? ""
  );
  const [offeringItemQuery, setOfferingItemQuery] = useState(
    pageCache("/", "offeringItemQuery") ?? ""
  );

  const [listingResults, setListingResults] = useState(
    pageCache("/", "listingResults") ?? []
  );
  const [fetchingListings, setFetchingListings] = useState(false);
  const [listingSearchMessage, setListingSearchMessage] = useState(
    pageCache("/", "listingSearchMessage") ?? ""
  );
  const [selectedLookingForItem, setSelectedLookingForItem] = useState(
    pageCache("/", "selectedLookingForItem") ?? null
  );
  const [selectedOfferingItem, setSelectedOfferingItem] = useState(
    pageCache("/", "selectedOfferingItem") ?? null
  );

  const [server, setServer] = useState(pageCache("/", "server") ?? null);
  const [selectedRegion, setSelectedRegion] = useState(
    pageCache("/", "selectedRegion") ?? "NA"
  );
  const [specificServer, setSpecificServer] = useState(
    pageCache("/", "specificServer") ?? false
  );
  const [removeOldListings, setRemoveOldListings] = useState(
    pageCache("/", "removeOldListings") ?? true
  );

  const isMounted = useRef(false);

  const searchListings = async () => {
    if (fetchingListings) {
      return;
    }

    if (specificServer && !isOnceHumanServerFormatted(server)) {
      setListingSearchMessage(
        "Server information was not properly filled out."
      );
      setListingResults([]);
      return;
    }

    console.log(server);
    console.log(specificServer);

    setFetchingListings(true);
    setListingResults([]);

    try {
      const response = await axios.get(`/api/search_listings`, {
        params: {
          server: specificServer ? server : null,
          selling_item_id: selectedLookingForItem
            ? selectedLookingForItem.id
            : null,
          asking_item_id: selectedOfferingItem ? selectedOfferingItem.id : null,
          region: selectedRegion,
          filter_old_listings: removeOldListings ? "true" : "false",
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

  const handleLookingForItemSelect = (item: any) => {
    setSelectedLookingForItem(item);
    setLookingForItemQuery(item?.name);
    console.log("Selected " + JSON.stringify(item));
  };

  const handleOfferingItemSelect = (item: any) => {
    setSelectedOfferingItem(item);
    setOfferingItemQuery(item?.name);
    console.log("Selected " + JSON.stringify(item));
  };

  useEffect(() => {
    if (listingResults.length === 0) {
      searchListings();
    }
  }, []);

  useEffect(() => {
    console.log(selectedLookingForItem);
    console.log(selectedOfferingItem);
    if (isMounted.current && selectedLookingForItem && selectedOfferingItem) {
      searchListings();
    }
    isMounted.current = true;
  }, [selectedLookingForItem, selectedOfferingItem]);

  useEffect(() => {
    cachePageData("/", "lookingForItemQuery", lookingForItemQuery);
    cachePageData("/", "offeringItemQuery", offeringItemQuery);
    cachePageData("/", "listingResults", listingResults);
    cachePageData("/", "listingSearchMessage", listingSearchMessage);
    cachePageData("/", "selectedLookingForItem", selectedLookingForItem);
    cachePageData("/", "selectedOfferingItem", selectedOfferingItem);
    cachePageData("/", "server", server);
    cachePageData("/", "selectedRegion", selectedRegion);
    cachePageData("/", "specificServer", specificServer);
    cachePageData("/", "removeOldListings", removeOldListings);
  }, [
    lookingForItemQuery,
    offeringItemQuery,
    listingResults,
    listingSearchMessage,
    selectedLookingForItem,
    selectedOfferingItem,
    server,
    selectedRegion,
    specificServer,
    removeOldListings,
  ]);

  return (
    <main className="h-full w-full overflow-y-auto">
      <div className="flex flex-col items-center relative mb-20">
        <SEO />
        <div className="w-full max-w-lg px-4">
          <h1 className="mt-8 mb-1 text-neutral-300 text-lg">
            I am looking for...
          </h1>
          <ItemSearchDropdown
            query={lookingForItemQuery}
            setQuery={setLookingForItemQuery}
            onItemSelect={handleLookingForItemSelect}
            cacheKey="/root/lookingForItem"
          />
        </div>
        <div className="w-full max-w-lg px-4">
          <h1 className="mt-6 mb-1 text-neutral-300 text-lg">
            I am offering...
          </h1>
          <ItemSearchDropdown
            query={offeringItemQuery}
            setQuery={setOfferingItemQuery}
            onItemSelect={handleOfferingItemSelect}
            cacheKey="/root/offeringItem"
          />
        </div>
        <label className="text-neutral-300 mt-4 mb-2">
          <input
            type="checkbox"
            checked={specificServer}
            onChange={() => setSpecificServer((prevState) => !prevState)}
            className="mr-1"
          />
          Search specific server
        </label>
        <ServerSelection
          server={server}
          setServer={setServer}
          region={selectedRegion}
          setRegion={setSelectedRegion}
          disabled={!specificServer}
        />
        <div className="flex gap-4 flex-wrap justify-center items-center mt-4 px-4">
          <button
            onClick={() => searchListings()}
            className="py-2 px-5 bg-blue-500 hover:bg-blue-700 justify-center items-center text-white flex gap-3 rounded"
          >
            <FaSearch size={18} />
            Search
          </button>
          <Link
            href={"/create-listing"}
            className="py-2 px-5 flex gap-3 justify-center items-center bg-rose-700 hover:bg-rose-900 text-white rounded"
          >
            <FaPlus size={18} />
            Create Listing
          </Link>
        </div>

        {fetchingListings ? (
          <ClipLoader color="#FFFFFF" className="mt-8" size={30} />
        ) : (
          <>
            <h1 className="mt-8"> Showing listings in the last 7 days</h1>
            <div className="mt-2 text-neutral-300">
              {listingResults.length > 0 ? (
                listingResults.map((entry, index) => {
                  return (
                    <ListingCard
                      key={index}
                      entry={entry}
                      cacheKey={"/root/" + entry.listing.id + "/listingcard"}
                    />
                  );
                })
              ) : (
                <p>{listingSearchMessage}</p>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  return {
    props: {},
  };
};
