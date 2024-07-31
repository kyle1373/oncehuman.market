import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SEO from "@components/SEO";
import { ClipLoader } from "react-spinners";
import ListingCard from "@components/ListingCard";
import ItemSearchDropdown from "@components/ItemSearchDropdown";
import { usePageCache } from "@hooks/usePageCache";
import { FaPlus } from "react-icons/fa";

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

  const [mode, setMode] = useState(pageCache("/", "mode") ?? "PVE");
  const [twoDigitNumber, setTwoDigitNumber] = useState(
    pageCache("/", "twoDigitNumber") ?? ""
  );
  const [fiveDigitNumber, setFiveDigitNumber] = useState(
    pageCache("/", "fiveDigitNumber") ?? ""
  );
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

    if (
      specificServer &&
      (twoDigitNumber.length !== 2 || fiveDigitNumber.length !== 5)
    ) {
      setListingSearchMessage(
        "Server information was not properly filled out."
      );
      setListingResults([]);
      return;
    }

    setFetchingListings(true);
    setListingResults([]);
    const combinedSearch = `${mode}${twoDigitNumber.padStart(
      2,
      "0"
    )}-${fiveDigitNumber.padStart(5, "0")}`;

    try {
      const response = await axios.get(`/api/search_listings`, {
        params: {
          server: specificServer ? combinedSearch : null,
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

  const handleLookingForItemSelect = (item) => {
    setSelectedLookingForItem(item);
    setLookingForItemQuery(item?.name);
    console.log("Selected " + JSON.stringify(item));
  };

  const handleOfferingItemSelect = (item) => {
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
    console.log(listingResults);
    cachePageData("/", "lookingForItemQuery", lookingForItemQuery);
    cachePageData("/", "offeringItemQuery", offeringItemQuery);
    cachePageData("/", "listingResults", listingResults);
    cachePageData("/", "listingSearchMessage", listingSearchMessage);
    cachePageData("/", "selectedLookingForItem", selectedLookingForItem);
    cachePageData("/", "selectedOfferingItem", selectedOfferingItem);
    cachePageData("/", "mode", mode);
    cachePageData("/", "twoDigitNumber", twoDigitNumber);
    cachePageData("/", "fiveDigitNumber", fiveDigitNumber);
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
    mode,
    twoDigitNumber,
    fiveDigitNumber,
    selectedRegion,
    specificServer,
    removeOldListings,
  ]);

  return (
    <main className="h-screen w-full overflow-y-auto">
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
        <div className="flex items-center">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className={`p-2 h-10 border border-neutral-600 bg-neutral-700 rounded mr-2 ${
              !specificServer &&
              "opacity-80 text-neutral-500 cursor-not-allowed"
            }`}
            disabled={!specificServer}
          >
            <option value="NA">🇺🇸 NA</option>
          </select>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className={`p-2 h-10 border border-neutral-600 bg-neutral-700 rounded mr-2 ${
              !specificServer &&
              "opacity-80 text-neutral-500 cursor-not-allowed"
            }`}
            disabled={!specificServer}
          >
            <option value="PVE">PVE</option>
            <option value="PVP">PVP</option>
          </select>
          <input
            type="text"
            value={twoDigitNumber}
            onChange={(e) => setTwoDigitNumber(e.target.value)}
            maxLength={2}
            placeholder="01"
            className={`p-2 border h-10 border-neutral-600 bg-neutral-700 rounded mr-2 w-10 ${
              !specificServer &&
              "opacity-80 text-neutral-500 cursor-not-allowed"
            }`}
            disabled={!specificServer}
          />
          <input
            type="text"
            value={fiveDigitNumber}
            onChange={(e) => setFiveDigitNumber(e.target.value)}
            maxLength={5}
            placeholder="00001"
            className={`p-2 border h-10 border-neutral-600 bg-neutral-700 rounded w-[70px] ${
              !specificServer &&
              "opacity-80 text-neutral-500 cursor-not-allowed"
            }`}
            disabled={!specificServer}
          />
        </div>

        {/* <label className="text-neutral-300 mt-4 mb-2">
          <input
            type="checkbox"
            checked={removeOldListings}
            onChange={() => setRemoveOldListings((prevState) => !prevState)}
            className="mr-1"
          />
          Remove listings older than 7 days
        </label> */}
        <button
          onClick={() => searchListings()}
          className="py-2 px-7 bg-blue-500 text-white rounded mt-4"
        >
          Search
        </button>
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
        <button className="fixed right-7 bottom-7 rounded-full w-16 h-16 bg-oncehuman-lightBlue bg-opacity-60 flex items-center justify-center hover:opacity-80 shadow-md shadow-black">
          <FaPlus className="opacity-80" size={30} />
        </button>
      </div>
    </main>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  return {
    props: {},
  };
};
