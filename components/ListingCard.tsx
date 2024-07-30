import { LINKS } from "@constants/constants";
import Link from "next/link";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { IoMdSwap } from "react-icons/io";

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

const ListingCard = ({ entry }: ListingCardProps) => {
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
    entry.items_selling.length > 0 ? entry.items_selling[0] : null;

  return (
    <>
      <Link href={`/listing/${entry.listing.id}`}>
        <div className="bg-sky-950 border border-sky-700 rounded-md max-w-[600px] hover:bg-sky-900">
          <div className="flex">
            <div className="flex-shrink-0 px-4 py-2 justify-center items-center text-center font-bold">
              <div className="relative border-2 rounded-sm border-sky-950">
                <img
                  className=" border-sky-950 sm:w-20 sm:h-20 h-14 w-14"
                  src={LINKS.baseImagePath + sellingItem.s3_image_path}
                />
                <div className="absolute bottom-0 right-0 left-0 sm:px-2 py-1 bg-[#00000085] text-white text-xs">
                  X {sellingItem.amount}
                </div>
              </div>
              <h1 className="sm:text-xs text-[10px] mt-1 break-all">
                {sellingItem.total_stock} total
              </h1>
            </div>
            <div className="flex-grow pt-1 pr-3">
              <h1 className="font-bold sm:text-lg text-sm">{sellingItem.name}</h1>
              <h1 className="font-normal sm:text-xs text-[10px]">
                {entry.listing.oncehuman_username}{" "}
                <DateComponent timestamp={entry.user_info.last_online} />
              </h1>
              <div className="flex flex-col items-start mt-2 mb-1">
                <div className="flex justify-start">
                  <IoMdSwap className="mt-2 sm:h-6 sm:w-6 h-4 w-4" />
                  {entry.items_asking.map((item, index) => (
                    <>
                      <div
                        key={index}
                        className="flex flex-col items-center sm:mx-2 mx-1"
                      >
                        <img
                          className="sm:w-10 sm:h-10 w-8 h-8 border rounded-sm border-sky-950"
                          src={LINKS.baseImagePath + item.s3_image_path}
                        />
                        <h1 className="text-center items-center sm:text-xs text-[10px] font-bold">
                          X {item.amount}
                        </h1>
                      </div>
                      {index < entry.items_asking.length - 1 && (
                        <h1 className="mt-2 sm:text-base text-xs">or</h1>
                      )}
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-between px-4 py-2 border-t border-sky-700 sm:text-sm text-xs break-all text-sky-500">
            <h1 className="pr-2">
              World {entry.listing.world}: {entry.listing.location}
            </h1>
            <h1 className="">{entry.listing.server}</h1>
          </div>
        </div>
      </Link>
      <div className="h-4" />
    </>
  );
};

export default ListingCard;
