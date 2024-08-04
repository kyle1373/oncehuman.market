// pages/api/receive-request.js

import { NextApiRequest, NextApiResponse } from "next";

export type CreateListingBody = {
  description?: string;
  region: string; // Enforce that it's only NA
  server: string;
  world: string;
  location: string; // Enforce that it's an approved location in the array
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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
  }
  const { data } = req.body;

  // validate the data here using the listingBody type


}
