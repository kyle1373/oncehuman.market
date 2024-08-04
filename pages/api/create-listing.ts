// pages/api/receive-request.js

import { NextApiRequest, NextApiResponse } from "next";

type ListingBody = {
  description?: string;
  region: "NA";
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
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
  }
  const { data } = req.body;

  // validate the data here using the listingBody type


}
