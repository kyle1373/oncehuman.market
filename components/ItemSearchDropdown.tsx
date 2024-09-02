import { useState, useEffect, useRef, SetStateAction, Dispatch } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { LINKS } from "@constants/constants";
import { usePageCache } from "@hooks/usePageCache"; // Import usePageCache
import Link from "next/link";

type ItemSearchDropdownProps = {
  query?: string;
  setQuery?: Dispatch<SetStateAction<string>>;
  onItemSelect?: (item: any) => void;
  placeHolder?: string;
  className?: string;
  cacheKey: string;
  keepSelected?: boolean;
};

const ItemSearchDropdown = ({
  query: externalQuery = "",
  setQuery: externalSetQuery = undefined,
  onItemSelect = () => {},
  className = "",
  placeHolder = "Search items...",
  cacheKey,
  keepSelected = true,
}: ItemSearchDropdownProps) => {
  const { pageCache, cachePageData } = usePageCache();

  const [internalQuery, setInternalQuery] = useState(externalQuery);
  const query = externalSetQuery !== undefined ? externalQuery : internalQuery;
  const setQuery =
    externalSetQuery !== undefined ? externalSetQuery : setInternalQuery;

  const [itemSearchResults, setItemSearchResults] = useState(
    pageCache(cacheKey, `itemSearchResults`) ?? []
  );
  const [fetchingItems, setFetchingItems] = useState(
    pageCache(cacheKey, `fetchingItems`) ?? false
  );
  const [itemSearchMessage, setItemSearchMessage] = useState(
    pageCache(cacheKey, `itemSearchMessage`) ?? "Items will appear here."
  );
  const [showModal, setShowModal] = useState(false);
  const [modalActive, setModalActive] = useState(
    pageCache(cacheKey, `modalActive`) ?? true
  );
  const [selectedItem, setSelectedItem] = useState(
    pageCache(cacheKey, `selectedItem`) ?? null
  );
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    const cachedResults = pageCache(cacheKey, `${query}`);
    if (!query) {
      setItemSearchResults([]);
      setShowModal(false);
      setItemSearchMessage("Items will appear here.");
      if (keepSelected) {
        setSelectedItem(null);
      }
      onItemSelect(null);
    } else if (cachedResults) {
      setItemSearchResults(cachedResults);
      if (!isFirstMount.current) {
        setShowModal(true);
      }
      setItemSearchMessage(cachedResults.length > 0 ? "" : "No results found.");
    } else {
      const handler = setTimeout(() => {
        fetchItems(query);
      }, 500);

      timeoutRef.current = handler;

      return () => {
        clearTimeout(handler);
      };
    }

    isFirstMount.current = false;
  }, [query]);

  useEffect(() => {
    cachePageData(cacheKey, `itemSearchResults`, itemSearchResults);
    cachePageData(cacheKey, `fetchingItems`, fetchingItems);
    cachePageData(cacheKey, `itemSearchMessage`, itemSearchMessage);
    cachePageData(cacheKey, `showModal`, showModal);
    cachePageData(cacheKey, `modalActive`, modalActive);

    if (keepSelected) {
      cachePageData(cacheKey, `selectedItem`, selectedItem);
    }
    if (query) {
      cachePageData(cacheKey, `${query}`, itemSearchResults);
    }
  }, [
    itemSearchResults,
    fetchingItems,
    itemSearchMessage,
    showModal,
    modalActive,
    selectedItem,
    query,
  ]);

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      clearTimeout(timeoutRef.current); // Clear any existing timeout
      setModalActive(true); // Allow the modal to show if Enter is pressed
      fetchItems(query);
    }
  };

  const handleItemClick = (item) => {
    onItemSelect(item);
    if (keepSelected) {
      setQuery(item.name);
      setSelectedItem(item);
    } else {
      setQuery("");
    }
    setModalActive(false); // Prevent the modal from showing again
    setShowModal(false); // Close the modal when an item is selected
  };

  return (
    <div
      ref={inputRef}
      className={`relative w-full max-w-lg flex ${className}`}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setModalActive(true); // Allow the modal to show if the query changes
        }}
        onFocus={() => setShowModal(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeHolder}
        className="p-2 border border-neutral-600 bg-neutral-700 rounded w-full"
      />
      {showModal && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black border border-neutral-600 rounded shadow-lg z-10 text-neutral-200 max-h-[300px] overflow-y-auto">
          {fetchingItems ? (
            <div className="flex justify-center items-center p-4">
              <ClipLoader color={"#ffffff"} loading={fetchingItems} />
            </div>
          ) : itemSearchResults.length > 0 ? (
            <div>
              {itemSearchResults.map((category, index) => (
                <div key={category.id + index} className="p-2">
                  <h3 className="font-bold">{category.name}</h3>
                  {category.items.map((item, index) => (
                    <div
                      key={item.id + index}
                      className={`flex items-center p-2 ${
                        index !== category.items.length - 1 && "border-b"
                      } border-neutral-700 cursor-pointer hover:bg-neutral-800 ${
                        item.id === selectedItem?.id ? "bg-neutral-800" : ""
                      }`}
                      onClick={() => handleItemClick(item)}
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
              ))}
              <h1 className="text-xs text-neutral-300 text-center mb-4">
                Don't see your item?{" "}
                <Link
                  className="underline hover:font-bold"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={LINKS.discord}
                >
                  Add it here!
                </Link>
              </h1>
            </div>
          ) : (
            <div className="p-2 text-center text-neutral-400">
              {itemSearchMessage}

              {!!query && (
                <h1 className="text-xs text-neutral-300 mt-2">
                  <Link
                    className="underline hover:font-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={LINKS.discord}
                  >
                    Add a new item here!
                  </Link>
                </h1>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemSearchDropdown;
