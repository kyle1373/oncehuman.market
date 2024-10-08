// API Handler
import type { NextApiRequest, NextApiResponse } from "next";
import { getListings } from "@utils/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    asking_item_id,
    selling_item_id,
    region,
    server,
    user_id,
    filter_old_listings,
  } = req.query;

  const listings = await getListings({
    region,
    server,
    askingItemID: asking_item_id,
    sellingItemID: selling_item_id,
    userID: user_id,
  });

  if (!listings) {
    return res.status(500).json({ error: "Failed to fetch listings" });
  }

  return res.status(200).json(listings);
}
