import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SEO from "@components/SEO";
import { ClipLoader } from "react-spinners";
import ListingCard from "@components/ListingCard";
import ItemSearchDropdown from "@components/ItemSearchDropdown"; // Import the new component

export default function Home(props) {
  const [lookingForItemQuery, setLookingForItemQuery] = useState("");
  const [offeringItemQuery, setOfferingItemQuery] = useState("");

  const [listingResults, setListingResults] = useState([]);
  const [fetchingListings, setFetchingListings] = useState(false);
  const [listingSearchMessage, setListingSearchMessage] = useState("");
  const [selectedLookingForItem, setSelectedLookingForItem] = useState(null);
  const [selectedOfferingItem, setSelectedOfferingItem] = useState(null);

  const [mode, setMode] = useState("PVE");
  const [twoDigitNumber, setTwoDigitNumber] = useState("");
  const [fiveDigitNumber, setFiveDigitNumber] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("NA");
  const [specificServer, setSpecificServer] = useState(false); // Control the checkbox state

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
          region: "NA",
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
    searchListings();
  }, []);

  useEffect(() => {
    console.log(selectedLookingForItem);
    console.log(selectedOfferingItem);
    if (selectedLookingForItem && selectedOfferingItem) {
      searchListings();
    }
  }, [selectedLookingForItem, selectedOfferingItem]);

  return (
    <main className="min-h-screen w-full overflow-y-auto">
      <div className="flex flex-col items-center">
        <SEO />
        <div className="w-full max-w-lg px-4">
          <h1 className="mt-8 mb-1 text-neutral-300 text-lg">
            I am looking for...
          </h1>
          <ItemSearchDropdown
            query={lookingForItemQuery}
            setQuery={setLookingForItemQuery}
            onItemSelect={handleLookingForItemSelect}
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
          />
        </div>
        <label className="text-neutral-300 mt-4 mb-2">
          <input
            type="checkbox"
            checked={specificServer}
            onChange={() => setSpecificServer(!specificServer)}
            className="mr-1"
          />
          Search specific server
        </label>
        <div className="flex items-center">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className={`p-2 border border-neutral-600 bg-neutral-700 rounded mr-2 ${
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
            className={`p-2 border border-neutral-600 bg-neutral-700 rounded mr-2 ${
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
            className={`p-2 border border-neutral-600 bg-neutral-700 rounded mr-2 w-10 ${
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
            className={`p-2 border border-neutral-600 bg-neutral-700 rounded w-[70px] ${
              !specificServer &&
              "opacity-80 text-neutral-500 cursor-not-allowed"
            }`}
            disabled={!specificServer}
          />
        </div>
        <button
          onClick={() => searchListings()}
          className="py-2 px-7 bg-blue-500 text-white rounded mt-4"
        >
          Search
        </button>
        {fetchingListings ? (
          <ClipLoader color="#FFFFFF" className="mt-8" size={30} />
        ) : (
          <div className="mt-8 text-neutral-300">
            {listingResults.length > 0 ? (
              listingResults.map((entry, index) => {
                return <ListingCard key={index} entry={entry} />;
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

export const getServerSideProps = async ({ req, res }) => {
  return {
    props: {},
  };
};
