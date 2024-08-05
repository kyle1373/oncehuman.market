import { LOCATIONS_LIST, REGIONS_MAP } from "@constants/constants";
import { isOnceHumanServerFormatted } from "@utils/helpers";
import {
  createOrUpdateListing,
  getUserDataServer,
  isUserListingCreator,
} from "@utils/server";
import supabaseAdmin from "@utils/supabaseAdmin";
import { NextApiRequest, NextApiResponse } from "next";

export type CreateListingBody = {
  create_new: boolean;
  listing_id?: number;
  region: string;
  server: string;
  world: string;
  location: string;
  oncehuman_username: string;
  items_listings_ask: {
    item_id: number;
    amount: number;
  }[];
  items_listings_sell: {
    item_id: number;
    amount: number;
    total_stock: number;
  }[];
  do_not_contact_discord: boolean;
};

function validateCreateListingBody(data: CreateListingBody) {
  const errors = [];

  if (
    !data.create_new &&
    data.listing_id &&
    isNaN(parseInt(data.listing_id.toString()))
  ) {
    errors.push("Could not parse listing ID (Code 1)");
  }

  if (
    !data.create_new &&
    !data.listing_id &&
    (data.listing_id !== null || data.listing_id !== undefined)
  ) {
    errors.push("Could not parse listing ID (Code 2)");
  }
  // Validate items_listings_ask
  if (
    !Array.isArray(data.items_listings_ask) ||
    data.items_listings_ask.length === 0
  ) {
    errors.push("Ask item list is empty");
  } else {
    for (const item of data.items_listings_ask) {
      if (typeof item.item_id !== "number") {
        errors.push("Invalid item ask ID");
      }
      if (typeof item.amount !== "number") {
        errors.push("Invalid item ask amount");
      }
      if (item.amount <= 0 || item.amount >= 9999) {
        errors.push("Item ask amount is either too small or too big");
      }
    }
  }

  // Validate items_listings_sell
  if (
    !Array.isArray(data.items_listings_sell) ||
    data.items_listings_sell.length === 0
  ) {
    errors.push("Offering item list is empty");
  } else {
    for (const item of data.items_listings_sell) {
      if (typeof item.item_id !== "number") {
        errors.push("Invalid sell item ID");
      }
      if (typeof item.amount !== "number") {
        errors.push("Invalid sell item amount");
      }
      if (typeof item.total_stock !== "number") {
        errors.push("Invalid total stock number for one item");
      }
      if (item.amount <= 0 || item.amount >= 9999) {
        errors.push("Sell item amount is either too small or too big");
      }
      if (item.total_stock <= 0 || item.total_stock >= 9999) {
        errors.push("Total stock amount is either too small or too big");
      }
      if (item.amount > item.total_stock) {
        errors.push("The selling amount is greater than the total stock");
      }
    }
  }

  // Validate region
  if (!data.region) {
    errors.push("Region is missing");
  } else if (!REGIONS_MAP[data.region]) {
    errors.push("Region is invalid");
  }

  // Validate server
  if (!data.server) {
    errors.push("Server is invalid");
  } else if (
    typeof data.server !== "string" ||
    !isOnceHumanServerFormatted(data.server)
  ) {
    errors.push("Server is not a valid format");
  }

  // Validate world
  if (!data.world) {
    errors.push("World is missing");
  } else if (typeof data.world !== "string" || data.world.length >= 20) {
    errors.push("World name is too long");
  }

  // Validate location
  if (!data.location) {
    errors.push("Location is missing");
  } else if (!LOCATIONS_LIST.includes(data.location)) {
    errors.push("Invalid location");
  }

  // Validate oncehuman_username
  if (!data.oncehuman_username) {
    errors.push("Once Human Username is missing");
  } else if (
    typeof data.oncehuman_username !== "string" ||
    data.oncehuman_username.length >= 30
  ) {
    errors.push("Once Human Username too long");
  }

  // Validate do_not_contact_discord
  if (typeof data.do_not_contact_discord !== "boolean") {
    errors.push("Invalid discord message response");
  }

  return errors;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getUserDataServer(req, res);

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const data: CreateListingBody = req.body;

    // Validate the data here using the listingBody type
    const errors = validateCreateListingBody(data);

    if (errors.length > 0) {
      console.log(errors);
      return res.status(400).json({ error: errors[0] });
    }

    if (!data.create_new) {
      const isCreator = await isUserListingCreator({
        listingID: data.listing_id,
        userID: session.user_id,
      });
      if (!isCreator) {
        return res.status(403).json({ error: "Forbidden" });
      }
    }

    // Convert relevant fields to integers
    const itemsListingsAsk = data.items_listings_ask.map((item) => ({
      item_id: parseInt(item.item_id.toString(), 10),
      amount: parseInt(item.amount.toString(), 10),
    }));

    const itemsListingsSell = data.items_listings_sell.map((item) => ({
      item_id: parseInt(item.item_id.toString(), 10),
      amount: parseInt(item.amount.toString(), 10),
      total_stock: parseInt(item.total_stock.toString(), 10),
    }));

    await createOrUpdateListing({
      listingID: data.create_new ? null : data.listing_id,
      region: data.region,
      server: data.server,
      world: data.world,
      location: data.location,
      onceHumanUsername: data.oncehuman_username,
      itemsListingsAsk: itemsListingsAsk,
      itemsListingsSell: itemsListingsSell,
      doNotContactDiscord: data.do_not_contact_discord,
      userID: session.user_id,
    });

    // Proceed with handling the valid request
    res.status(200).json({ message: "Listing created successfully" });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
