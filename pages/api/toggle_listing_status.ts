import {
  getUserDataServer,
  isUserListingCreator,
  updateListingStatus,
} from "@utils/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userData = await getUserDataServer(req, res);

  if (!userData) {
    return res.status(401).json({ error: "Unauthenticated" });
  }

  const { listing_id, is_closed } = req.query;

  console.log(listing_id);

  const isOwner = await isUserListingCreator({
    userID: userData.user_id,
    listingID: parseInt(listing_id as string),
  });

  if (!isOwner) {
    return res.status(403).json({ error: "Forbidden" });
  }

  await updateListingStatus({
    listingID: listing_id,
    isClosed: (is_closed as string) === "true",
  });

  return res.json({ data: "Updated listing visibility." });
}
