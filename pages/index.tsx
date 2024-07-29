import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SEO from "@components/SEO";
import { LINKS } from "@constants/constants";
import { ClipLoader } from "react-spinners";

export default function Home(props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Type something to search.");
  const [modalActive, setModalActive] = useState(true); // Control modal visibility after selection
  const inputRef = useRef(null);
  const timeoutRef = useRef(null); // To store the timeout ID
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    if (!query) {
      setResults([]);
      setMessage("Type something to search.");
    } else {
      const handler = setTimeout(() => {
        fetchResults(query);
      }, 500);

      timeoutRef.current = handler;

      return () => {
        clearTimeout(handler);
      };
    }
  }, [query]);

  const fetchResults = async (search) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/search_items`, {
        params: { search },
      });
      setResults(response.data);
      if (modalActive) {
        setShowModal(true);
      }
      setMessage(response.data.length > 0 ? "" : "No results found.");
    } catch (error) {
      console.error("Error fetching search results:", error);
      setMessage("Error fetching search results.");
    } finally {
      setLoading(false);
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

  const searchListings = (item) => {
    setSelectedItem(item);
    setQuery(item.name);
    setModalActive(false); // Prevent the modal from showing again
    setShowModal(false); // Close the modal when an item is selected
    console.log("Selected " + JSON.stringify(item));
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      clearTimeout(timeoutRef.current); // Clear any existing timeout
      setModalActive(true); // Allow the modal to show if Enter is pressed
      fetchResults(query);
    }
  };

  return (
    <main className="flex flex-col items-center h-screen relative">
      <SEO />
      <div ref={inputRef} className="relative mt-8 w-full max-w-lg px-8">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setModalActive(true); // Allow the modal to show if the query changes
          }}
          onFocus={() => setShowModal(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search items..."
          className="p-2 border border-neutral-600 bg-neutral-700 rounded w-full"
        />
        {showModal && (
          <div className="absolute top-full left-8 right-8 mt-2 bg-black border border-neutral-600 rounded shadow-lg z-50 text-neutral-200 max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center p-4">
                <ClipLoader color={"#ffffff"} loading={loading} />
              </div>
            ) : (
              results.length > 0 ? (
                results.map((category) => (
                  <div key={category.id} className="p-2">
                    <h3 className="font-bold">{category.name}</h3>
                    {category.items.map((item, index) => (
                      <div
                        key={item.id}
                        className={`flex items-center p-2 ${index !== category.items.length - 1 && "border-b"} border-neutral-700 cursor-pointer hover:bg-neutral-800 ${item.id === selectedItem?.id ? "bg-neutral-800" : ""}`}
                        onClick={() => searchListings(item)}
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
                <div className="p-2 text-center text-neutral-400">
                  {message}
                </div>
              )
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
