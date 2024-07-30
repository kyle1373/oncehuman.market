import { getSession } from "next-auth/react";
import supabaseAdmin from "./supabaseAdmin";
import { UserData } from "@constants/types";

export const getUserDataServer = async (req): Promise<UserData> => {
  try {
    const session = await getSession({ req });

    if (!session) {
      return null;
    }

    const userData: UserData = session.user as UserData;

    return userData;
  } catch (e) {
    return null;
  }
};

export const logUserOnlineStatus = async (discordID) => {
  const { error } = await supabaseAdmin
    .from("users")
    .update({
      last_online: new Date(),
    })
    .eq("discord_id", discordID);

  if (error) {
    throw new Error(error.message);
  }
};

export async function getListings({
  region,
  server,
  sellingItemID = null,
  askingItemID = null,
  filterOldListings = true,
  sortByRatio = true,
}) {
  const { data, error } = await supabaseAdmin.rpc("get_listings", {
    p_asking_item_id: askingItemID,
    p_filter_old_listings: filterOldListings,
    p_region: region,

    p_selling_item_id: sellingItemID,
    p_server: server,

    p_sort_by_ratio: sortByRatio,
  });

  if (error) {
    console.error("Error fetching listings:", error);
    return null;
  }

  return data;
}
