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
};

type UserInfo = {
  id: number;
  created_at: string;
  discord_id: number;
  last_online: string;
  discord_name: string;
  discord_image: string;
  oncehuman_username: null;
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
        <div className="flex bg-sky-900 rounded-md">
          <div className="flex-shrink-0 px-4 py-2 justify-center items-center text-center">
            <img
              className="w-20 h-20 border-2 rounded-sm border-sky-950"
              src={LINKS.baseImagePath + sellingItem.s3_image_path}
            />
            <h1 className="text-xs mt-1">{sellingItem.amount} per order</h1>
            <h1 className="text-xs mt-1">{sellingItem.total_stock} in stock</h1>
          </div>
          <div className="flex-grow pt-1 pr-3">
            <h1 className="font-bold text-lg">{sellingItem.name}</h1>
            <h1 className="font-normal text-xs">
              {entry.user_info.oncehuman_username ||
                entry.user_info.discord_name}{" "}
              <DateComponent timestamp={entry.user_info.last_online} />
            </h1>
            <div className="flex flex-col items-start mt-1">
              <div className="flex justify-start mt-2">
                <IoMdSwap size={30} className="mt-1" />
                {entry.items_asking.map((item, index) => (
                  <>
                    <div
                      key={index}
                      className="flex flex-col items-center mx-2"
                    >
                      <img
                        className="w-10 h-10 border rounded-sm border-sky-950"
                        src={LINKS.baseImagePath + item.s3_image_path}
                      />
                      <h1 className="text-center items-center">
                        X {item.amount}
                      </h1>
                    </div>
                    {index < entry.items_asking.length - 1 && (
                      <h1 key={index} className="mt-1">
                        or
                      </h1>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="h-4" />
    </>
  );
};

export default ListingCard;
