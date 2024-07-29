import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SEO from "@components/SEO";
import { LINKS } from "@constants/constants";
import { ClipLoader } from "react-spinners";
import ListingCard from "@components/ListingCard";

export default function Home(props) {
  const [query, setQuery] = useState("");
  const [itemSearchResults, setItemSearchResults] = useState([]);
  const [listingResults, setListingResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [fetchingItems, setFetchingItems] = useState(false);
  const [fetchingListings, setFetchingListings] = useState(false);
  const [itemSearchMessage, setItemSearchMessage] = useState("Items will appear here.");
  const [listingSearchMessage, setListingSearchMessage] = useState("");
  const [modalActive, setModalActive] = useState(true); // Control modal visibility after selection
  const [selectedItem, setSelectedItem] = useState(null);
  const [mode, setMode] = useState("PVE");
  const [twoDigitNumber, setTwoDigitNumber] = useState("");
  const [fiveDigitNumber, setFiveDigitNumber] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("NA");
  const [specificServer, setSpecificServer] = useState(false); // Control the checkbox state
  const inputRef = useRef(null);
  const timeoutRef = useRef(null); // To store the timeout ID

  useEffect(() => {
    if (!query) {
      setItemSearchResults([]);
      setShowModal(false);
      setItemSearchMessage("Items will appear here.");
    } else {
      const handler = setTimeout(() => {
        fetchItems(query);
      }, 500);

      timeoutRef.current = handler;

      return () => {
        clearTimeout(handler);
      };
    }
  }, [query]);

  const fetchItems = async (search) => {
    setFetchingItems(true);
    try {
      const response = await axios.get(`/api/search_items`, {
        params: { search },
      });
      setItemSearchResults(response.data);
      if (modalActive) {
        setShowModal(true);
      }
      setItemSearchMessage(response.data.length > 0 ? "" : "No results found.");
    } catch (error) {
      console.error("Error fetching search results:", error);
      setItemSearchMessage("Error fetching search results.");
    } finally {
      setFetchingItems(false);
    }
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchListings = async () => {
    if (fetchingListings) {
      return;
    }

    if (specificServer && (twoDigitNumber.length !== 2 || fiveDigitNumber.length !== 5)) {
      setListingSearchMessage("Server information was not properly filled out.");
      setListingResults([]);
      return;
    }

    setFetchingListings(true);
    setListingResults([]);
    const combinedSearch = `${mode}${twoDigitNumber.padStart(2, '0')}-${fiveDigitNumber.padStart(5, '0')}`;

    try {
      const response = await axios.get(`/api/search_listings`, {
        params: {
          server: specificServer ? combinedSearch : null,
          item_id: selectedItem ? selectedItem.id : null,
          region: "NA",
        },
      });
      setListingResults(response.data);
      setListingSearchMessage(response.data.length > 0 ? "" : "No open listings found.");
    } catch (error) {
      console.error("Error fetching listings:", error);
      setListingSearchMessage("Error fetching listings.");
    } finally {
      setFetchingListings(false);
    }
  };

  const searchItem = (item) => {
    setSelectedItem(item);
    setQuery(item.name);
    setModalActive(false); // Prevent the modal from showing again
    setShowModal(false); // Close the modal when an item is selected
    console.log("Selected " + JSON.stringify(item));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      clearTimeout(timeoutRef.current); // Clear any existing timeout
      setModalActive(true); // Allow the modal to show if Enter is pressed
      fetchItems(query);
    }
  };

  useEffect(() => {
    searchListings();
  }, [selectedItem]);

  return (
    <main className="flex flex-col items-center h-screen relative">
      <SEO />
      <div ref={inputRef} className="relative mt-8 w-full max-w-lg px-8 flex">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setModalActive(true); // Allow the modal to show if the query changes
          }}
          onFocus={() => setShowModal(true)}
          onKeyDown={handleKeyDown}
          placeholder="Type here..."
          className="p-2 border border-neutral-600 bg-neutral-700 rounded w-full"
        />
        <button
          onClick={() => searchListings()}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
        {showModal && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-black border border-neutral-600 rounded shadow-lg z-50 text-neutral-200 max-h-[300px] overflow-y-auto">
            {fetchingItems ? (
              <div className="flex justify-center items-center p-4">
                <ClipLoader color={"#ffffff"} loading={fetchingItems} />
              </div>
            ) : itemSearchResults.length > 0 ? (
              itemSearchResults.map((category) => (
                <div key={category.id} className="p-2">
                  <h3 className="font-bold">{category.name}</h3>
                  {category.items.map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex items-center p-2 ${
                        index !== category.items.length - 1 && "border-b"
                      } border-neutral-700 cursor-pointer hover:bg-neutral-800 ${
                        item.id === selectedItem?.id ? "bg-neutral-800" : ""
                      }`}
                      onClick={() => searchItem(item)}
                    >
                      <img
                        src={LINKS.baseImagePath + item.s3_image_path}
                        alt={item.name}
                        className="w-10 h-10 mr-4 rounded"
                      />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="p-2 text-center text-neutral-400">{itemSearchMessage}</div>
            )}
          </div>
        )}
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
            !specificServer && "opacity-80 text-neutral-500 cursor-not-allowed"
          }`}
          disabled={!specificServer}
        >
          <option value="NA">🇺🇸 NA</option>
        </select>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className={`p-2 border border-neutral-600 bg-neutral-700 rounded mr-2 ${
            !specificServer && "opacity-80 text-neutral-500 cursor-not-allowed"
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
            !specificServer && "opacity-80 text-neutral-500 cursor-not-allowed"
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
            !specificServer && "opacity-80 text-neutral-500 cursor-not-allowed"
          }`}
          disabled={!specificServer}
        />
      </div>
      {fetchingListings ? (
        <ClipLoader color="#FFFFFF" className="mt-8" size={30} />
      ) : (
        <div className="mt-8 text-neutral-300">
          {listingResults.length > 0 ? (
            listingResults.map((entry) => {
              return <ListingCard entry={entry}/>
            })
          ) : (
            <p>{listingSearchMessage}</p>
          )}
        </div>
      )}
    </main>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  return {
    props: {},
  };
};
