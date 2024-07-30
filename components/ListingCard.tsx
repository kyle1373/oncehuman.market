import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { IoMdSwap } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import Modal from "react-modal";
import { LINKS } from "@constants/constants";
import "react-tooltip/dist/react-tooltip.css";

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

Modal.setAppElement('#__next'); // Required for accessibility

const ListingCard = ({ entry }: ListingCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const DateComponent = ({ timestamp }) => {
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
      const updateFormattedDate = () => {
        const now = new Date().getTime();
        const lastOnlineDate = new Date(timestamp).getTime();
        const differenceInMinutes = (now - lastOnlineDate) / 1000 / 60;

        if (differenceInMinutes < 5) {
          setFormattedDate("online");
        } else {
          setFormattedDate(
            `online ${formatDistanceToNow(lastOnlineDate, { addSuffix: true })}`
          );
        }
      };

      updateFormattedDate(); // Initial update
      const interval = setInterval(updateFormattedDate, 1000); // Update every second

      return () => clearInterval(interval);
    }, [timestamp]);

    return <span className="italic">({formattedDate})</span>;
  };

  const sellingItem =
    entry.items_selling?.length > 0 ? entry.items_selling[0] : {} as any;

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
              <DateComponent timestamp={entry.user_info.last_online} />
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
        <div className="flex flex-wrap justify-between px-4 py-2 border-t border-sky-700 sm:text-sm text-xs break-all text-sky-500">
          <h1 className="pr-4">
            World {entry.listing.world}: {entry.listing.location}
          </h1>
          <h1 className="">{entry.listing.server}</h1>
        </div>
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
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 p-4"
      >
        <h2 className="text-xl font-bold mb-4">Listing Details</h2>
        <div className="space-y-2">
          <div>
            <h3 className="text-lg font-semibold">Selling Item</h3>
            <p>{sellingItem.name}</p>
            <p>Amount: {sellingItem.amount}</p>
            <p>Total Stock: {sellingItem.total_stock}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">User Info</h3>
            <p>Username: {entry.listing.oncehuman_username}</p>
            <p>Discord: {entry.user_info.discord_name}</p>
            <p>Last Online: <DateComponent timestamp={entry.user_info.last_online} /></p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Items Asking</h3>
            {entry.items_asking?.map((item, index) => (
              <div key={index}>
                <p>{item.name}</p>
                <p>Amount: {item.amount}</p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-lg font-semibold">Listing Info</h3>
            <p>Region: {entry.listing.region}</p>
            <p>Server: {entry.listing.server}</p>
            <p>World: {entry.listing.world}</p>
            <p>Location: {entry.listing.location}</p>
          </div>
        </div>
        <button onClick={closeModal} className="mt-4 bg-sky-700 hover:bg-sky-600 text-white py-2 px-4 rounded">
          Close
        </button>
      </Modal>
    </>
  );
};

export default ListingCard;
