import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { IoMdSwap } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import Modal from "react-modal";
import { LINKS } from "@constants/constants";
import "react-tooltip/dist/react-tooltip.css";
import { getOnlineStatus } from "@utils/helpers";
import Link from "next/link";
import { usePageCache } from "@hooks/usePageCache"; // Import usePageCache
import { useUser } from "@hooks/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

type Listing = {
  id: number;
  region: string;
  server: string;
  created_at: string;
  description: string;
  world: string;
  location: string;
  can_discord_contact_when_offline: boolean;
  is_closed: boolean;
  oncehuman_username: string;
};

type UserInfo = {
  id: number;
  created_at: string;
  discord_id: string;
  last_online: string;
  discord_name: string;
  discord_image: string;
};

type ItemAsking = {
  name: string;
  amount: number;
  item_id: number;
  description: null;
  category_name: string;
  s3_image_path: string;
  category_image_path: string;
};

type ItemSelling = {
  name: string;
  amount: number;
  item_id: number;
  description: null;
  total_stock: number;
  category_name: string;
  s3_image_path: string;
  category_image_path: string;
};

type ListingEntry = {
  listing: Listing;
  user_info: UserInfo;
  items_asking: ItemAsking[];
  items_selling: ItemSelling[];
};

type ListingCardProps = {
  entry: ListingEntry;
  className?: any;
  cacheKey: string;
};

Modal.setAppElement("#__next"); // Required for accessibility

const ListingCard = ({ entry, cacheKey }: ListingCardProps) => {
  const { discordUser, showLoading } = useUser(); // Destructure user data

  const { pageCache, cachePageData } = usePageCache();
  const [listingClosed, setListingClosed] = useState(
    pageCache(cacheKey, "listingClosed") ?? entry.listing.is_closed
  );

  const [isModalOpen, setIsModalOpen] = useState(
    pageCache(cacheKey, "isOpen") ?? false
  );

  useEffect(() => {
    cachePageData(cacheKey, "isOpen", isModalOpen);
    cachePageData(cacheKey, "listingClosed", listingClosed);
  }, [isModalOpen, listingClosed]);

  async function toggleListingVisibility() {
    showLoading(true);
    try {
      const response = await axios.get(`/api/toggle_listing_status`, {
        params: {
          is_closed: listingClosed ? "false" : "true",
          listing_id: entry.listing.id,
        },
      });
      setListingClosed((prevState) => !prevState);
      if (listingClosed) {
        toast("Opened your listing back up to the public");
      } else {
        toast("Closed your listing to the public");
      }
    } catch (error) {
      console.error("Error updating listing status:", error?.response?.data);
      toast("Failed to update your listing status: ");
    } finally {
      showLoading(false);
    }
  }

  function formatPostDate(dateString) {
    // Create a Date object from the input datetime string
    const date = new Date(dateString);

    // Define arrays for month names
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Extract day, month, year, hours, and minutes from the Date object
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();

    // Determine the AM/PM suffix
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Helper function to determine the ordinal suffix for the day
    function getOrdinalSuffix(day) {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }

    // Format minutes to always be two digits
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    // Format the date string
    const formattedDate = `${month} ${day}${getOrdinalSuffix(
      day
    )}, ${year} at ${hours}:${formattedMinutes}${ampm}`;

    return formattedDate;
  }

  const sellingItem =
    entry.items_selling?.length > 0 ? entry.items_selling[0] : ({} as any);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        className={`${
          listingClosed
            ? "bg-rose-950 border-rose-700 hover:bg-rose-900"
            : "bg-sky-950 border-sky-700 hover:bg-sky-900"
        } border rounded-md sm:w-[370px] w-[280px] shadow-lg`}
        onClick={openModal}
      >
        <div className="flex">
          <div className="flex flex-col items-center px-4 py-2 justify-center text-center">
            <div
              className={`relative border-2 rounded-sm ${
                listingClosed ? "border-rose-950" : "border-sky-950"
              }`}
              data-tooltip-id={`tooltip-${sellingItem.item_id}`}
              data-tooltip-content={
                sellingItem.name + " (" + sellingItem.amount + ")"
              }
            >
              <img
                className="sm:w-20 sm:h-20 h-14 w-14"
                src={LINKS.baseImagePath + sellingItem.s3_image_path}
              />
              <div className="absolute bottom-0 right-0 left-0 py-1 bg-[#00000085] text-white text-xs font-bold">
                {sellingItem.amount}
              </div>
            </div>
            <h1 className="text-xs mt-1 break-all">
              {sellingItem.total_stock}
            </h1>
            <h1 className="text-[10px] break-all">total stock</h1>
          </div>
          <div className="flex-grow pt-1 pr-3 text-left">
            <h1 className="font-bold sm:text-lg text-sm">{sellingItem.name}</h1>
            <h1 className="font-normal sm:text-xs text-[10px]">
              {entry.listing.oncehuman_username}{" "}
              <span className="italic">
                ({getOnlineStatus(entry.user_info.last_online)})
              </span>
            </h1>
            <div className="flex flex-col items-start mt-2 mb-1">
              <div className="flex justify-start">
                <IoMdSwap className="mt-2 sm:h-6 sm:w-6 h-4 w-4" />
                {entry.items_asking?.map((item, index) => (
                  <>
                    <div
                      key={index}
                      className="flex flex-col items-center sm:mx-2 mx-1"
                      data-tooltip-id={`tooltip-${item.item_id}`}
                      data-tooltip-content={
                        item.name + " (" + item.amount + ")"
                      }
                    >
                      <div
                        className={`relative border rounded-sm ${
                          listingClosed ? "border-rose-950" : "border-sky-950"
                        }`}
                      >
                        <img
                          className="sm:w-10 sm:h-10 w-8 h-8"
                          src={LINKS.baseImagePath + item.s3_image_path}
                        />
                        <h1 className="absolute bottom-0 right-0 left-0 bg-[#00000085] text-center items-center text-[10px] font-bold">
                          {item.amount}
                        </h1>
                      </div>
                      <h1 className="sm:text-xs text-[10px] mt-1 break-words text-center">
                        {item.amount / sellingItem.amount}
                      </h1>
                      <h1 className="text-[10px] break-words text-center">
                        each
                      </h1>
                    </div>
                    {index < entry.items_asking?.length - 1 && (
                      <h1 className="mt-2 sm:text-base text-xs">or</h1>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex flex-wrap justify-between px-4 pt-2 border-t ${
            listingClosed
              ? "border-rose-700 text-rose-500"
              : "border-sky-700 text-sky-500"
          } sm:text-sm text-xs break-all`}
        >
          <h1 className="pr-4">
            World {entry.listing.world}: {entry.listing.location}
          </h1>
          <h1 className="">
            {entry.listing.region}: {entry.listing.server}
          </h1>
        </div>
        <h1
          className={`italic text-xs ${
            listingClosed ? "text-rose-800" : "text-sky-800"
          } text-right px-4 pb-2`}
        >
          Posted {formatPostDate(entry.listing.created_at)}
        </h1>
      </button>
      <div className="h-4" />
      <Tooltip id={`tooltip-${sellingItem.item_id}`} />
      {entry.items_asking?.map((item) => (
        <Tooltip key={item.item_id} id={`tooltip-${item.item_id}`} />
      ))}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Listing Details"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 border border-gray-700 text-white rounded-lg shadow-lg max-w-lg w-full max-h-[60vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 p-4"
      >
        <div className="p-4">
          <div className="space-y-2">
            <div>
              <h3 className="text-xl font-semibold underline">Selling Items</h3>
              <p>
                {sellingItem.name} ({sellingItem.amount})
              </p>
              <p>Available Stock: {sellingItem.total_stock}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold underline">
                Asking Items (pick one)
              </h3>
              {entry.items_asking?.map((item, index) => (
                <div key={index}>
                  <p>
                    {item.name} ({item.amount})
                  </p>
                </div>
              ))}
            </div>
            <div>
              <div className="flex mb-1 items-center">
                <h3 className="text-xl font-semibold mr-3 underline">
                  User Info
                </h3>
                <Link
                  href={`/profile/${entry.user_info.id}`}
                  className="bg-neutral-600 hover:bg-neutral-500 px-4 rounded flex items-center justify-center h-6"
                >
                  <span className="text-xs text-white">View Profile</span>
                </Link>
              </div>

              <p>
                IGN:{" "}
                <span className="text-orange-300 font-bold">
                  {entry.listing.oncehuman_username}
                </span>
              </p>
              <p>
                Discord:{" "}
                <span className="text-blue-300 font-bold">
                  {entry.user_info.discord_name}
                </span>
              </p>
              <p>Status:{" " + getOnlineStatus(entry.user_info.last_online)}</p>
            </div>
            {entry.listing.description && (
              <div>
                <h3 className="text-xl font-semibold underline">
                  Note from Seller
                </h3>
                <p className="italic text-blue-400">
                  <span>{entry.listing.description}</span>
                </p>
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold underline">Listing Info</h3>
              <p>Posted: {formatPostDate(entry.listing.created_at)}</p>
              <p>
                Status:{" "}
                <span
                  className={`font-bold ${
                    listingClosed ? " text-red-500" : "text-green-500"
                  }`}
                >
                  {listingClosed ? "Closed" : "Open"}
                </span>
              </p>
              <p>Region: {entry.listing.region}</p>
              <p>Server: {entry.listing.server}</p>
              <p>World: {entry.listing.world}</p>
              <p>Location: {entry.listing.location}</p>
            </div>
          </div>
        </div>

        <div className="flex px-4 gap-4">
          {/* <button
            onClick={closeModal}
            className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4 sm:text-base text-xs"
          >
            Go Back
          </button> */}
          {discordUser?.id === entry.user_info.discord_id && (
            <button
              onClick={closeModal}
              className="bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded mt-4 sm:text-base text-xs"
            >
              Edit Listing
            </button>
          )}
          {discordUser?.id === entry.user_info.discord_id && (
            <button
              onClick={toggleListingVisibility}
              className={`${
                !listingClosed
                  ? "bg-red-700 hover:bg-red-600"
                  : "bg-purple-700 hover:bg-purple-600"
              } text-white py-2 px-4 rounded mt-4 sm:text-base text-xs`}
            >
              {listingClosed ? "Reopen Listing" : "Close Listing"}
            </button>
          )}
        </div>
        <h1 className="text-center text-gray-300 text-lg px-4 pt-2 pb-3 font-bold">
          To contact the seller, add {entry.listing.oncehuman_username} as a
          friend ingame or message {entry.user_info.discord_name} on Discord
        </h1>
      </Modal>
    </>
  );
};

export default ListingCard;
