import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { IoMdSwap } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import Modal from "react-modal";
import { LINKS } from "@constants/constants";
import "react-tooltip/dist/react-tooltip.css";
import getOnlineStatus from "@utils/helpers";
import Link from "next/link";
import { usePageCache } from "@hooks/usePageCache"; // Import usePageCache
import { useUser } from "@hooks/UserContext";

type Listing = {
  id: number;
  region: string;
  server: string;
  created_at: string;
  description: null;
  world: string;
  location: string;
  can_discord_contact_when_offline: boolean;
  is_closed: boolean;
  oncehuman_username: string;
};

type UserInfo = {
  id: number;
  created_at: string;
  discord_id: number;
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
};

Modal.setAppElement("#__next"); // Required for accessibility

const ListingCard = ({ entry }: ListingCardProps) => {
  const { discordId, showLoading } = useUser(); // Destructure user data

  const [listingClosed, setListingClosed] = useState(entry.listing.is_closed);

  const { pageCache, cachePageData } = usePageCache();
  const [isOpen, setIsOpen] = useState(
    pageCache(`/listing/${entry.listing.id}`, "isOpen") ?? false
  );

  useEffect(() => {
    cachePageData(`/listing/${entry.listing.id}`, "isOpen", isOpen);
  }, [isOpen]);

  const LastOnlineDateComponent = ({ timestamp }) => {
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
      const updateFormattedDate = () => {
        setFormattedDate(getOnlineStatus(timestamp));
      };

      updateFormattedDate(); // Initial update
      const interval = setInterval(updateFormattedDate, 1000); // Update every second

      return () => clearInterval(interval);
    }, [timestamp]);

    return <span className="italic">({formattedDate})</span>;
  };

  function toggleListingVisibility() {}

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

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        className="bg-sky-950 border border-sky-700 rounded-md sm:w-[370px] w-[280px] hover:bg-sky-900 shadow-lg"
        onClick={openModal}
      >
        <div className="flex">
          <div className="flex flex-col items-center px-4 py-2 justify-center text-center">
            <div
              className="relative border-2 rounded-sm border-sky-950"
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
              <LastOnlineDateComponent
                timestamp={entry.user_info.last_online}
              />
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
                      <div className="relative border rounded-sm border-sky-950">
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
        <div className="flex flex-wrap justify-between px-4 pt-2 border-t border-sky-700 sm:text-sm text-xs break-all text-sky-500">
          <h1 className="pr-4">
            World {entry.listing.world}: {entry.listing.location}
          </h1>
          <h1 className="">
            {entry.listing.region}: {entry.listing.server}
          </h1>
        </div>
        <h1 className="italic text-xs text-sky-800 text-right px-4 pb-2">
          Posted {formatPostDate(entry.listing.created_at)}
        </h1>
      </button>
      <div className="h-4" />
      <Tooltip id={`tooltip-${sellingItem.item_id}`} />
      {entry.items_asking?.map((item) => (
        <Tooltip key={item.item_id} id={`tooltip-${item.item_id}`} />
      ))}

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Listing Details"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 p-4"
      >
        <div className="p-4">
          <div className="space-y-2">
            <div>
              <h3 className="text-xl font-semibold">Selling Item</h3>
              <p>
                {sellingItem.name} ({sellingItem.amount})
              </p>
              <p>Total Stock: {sellingItem.total_stock}</p>
            </div>
            <div>
              <div className="flex mb-1 items-center">
                <h3 className="text-xl font-semibold mr-3">User Info</h3>
                <Link
                  href={`/profile/${entry.user_info.id}`}
                  className="bg-neutral-600 hover:bg-neutral-500 px-4 rounded flex items-center justify-center h-6"
                >
                  <span className="text-xs text-white">View Profile</span>
                </Link>
              </div>

              <p>Username: {entry.listing.oncehuman_username}</p>
              <p>Discord: {entry.user_info.discord_name}</p>
              <p>
                Last Online:{" "}
                <LastOnlineDateComponent
                  timestamp={entry.user_info.last_online}
                />
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                Items Asking (any of one)
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
              <h3 className="text-xl font-semibold">Listing Info</h3>
              <p>Region: {entry.listing.region}</p>
              <p>Server: {entry.listing.server}</p>
              <p>World: {entry.listing.world}</p>
              <p>Location: {entry.listing.location}</p>
              <p>Posted: {formatPostDate(entry.listing.created_at)}</p>
            </div>
          </div>
        </div>
        <div className="flex border-t border-gray-400 px-4 gap-4">
          {discordId === entry.user_info.discord_id && (
            <button
              onClick={closeModal}
              className="bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded mt-4"
            >
              Update
            </button>
          )}
          {discordId === entry.user_info.discord_id && (
            <button
              onClick={closeModal}
              className={`${
                !listingClosed
                  ? "bg-red-700 hover:bg-red-600"
                  : "bg-blue-700 hover:bg-blue-600"
              } text-white py-2 px-4 rounded mt-4`}
            >
              {listingClosed ? "Reopen" : "Close"}
            </button>
          )}
        </div>
        <h1 className="text-center text-gray-300 text-lg px-4 py-2 ">
          If you are interested in this offer, contact the seller via Discord or
          Once Human under "User Info"
        </h1>
      </Modal>
    </>
  );
};

export default ListingCard;
