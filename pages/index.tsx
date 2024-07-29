import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SEO from "@components/SEO";
import { LINKS } from "@constants/constants";

export default function Home(props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        fetchResults(query);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const fetchResults = async (search) => {
    try {
      const response = await axios.get(`/api/search_items`, {
        params: { search },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
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

  const searchListings = () => {
    console.log("searchListings called with query:", query);
    // Implementation of searchListings function will be done later
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchListings();
    }
  };

  return (
    <main className="flex flex-col items-center h-screen relative">
      <SEO />
      <div ref={inputRef} className="relative mt-8 w-full max-w-lg px-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowModal(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search items..."
          className="p-2 border border-neutral-600 bg-neutral-700 rounded w-full"
        />
        {showModal && results.length > 0 && (
          <div className="absolute top-full left-8 right-8 mt-2 bg-black border border-neutral-600 rounded shadow-lg z-50 text-neutral-200">
            {results.map((category) => (
              <div key={category.id} className="p-2">
                <h3 className="font-bold">{category.name}</h3>
                {category.items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-center p-2 ${index !== category.items.length - 1 && "border-b"} border-neutral-700 cursor-pointer hover:bg-neutral-800`}
                    onClick={() => searchListings()}
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
