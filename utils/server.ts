import { getSession } from "next-auth/react";
import supabaseAdmin from "./supabaseAdmin";
import { ListingData, UserData } from "@constants/types";
import { getServerSession } from "next-auth";

export const NEXTAUTH_OPTIONS = {
  callbacks: {
    async session({ session, token }) {
      (session.user as any).id = token.id;
      return session;
    },
    async jwt({ token, user, account }) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async signIn({ user }) {
      const discord_id = user.id;
      const discord_email = user.email;
      const discord_image = user.image;
      const discord_name = user.name;

      try {
        const { data, error } = await supabaseAdmin
          .from("users")
          .select()
          .eq("discord_id", discord_id)
          .maybeSingle();

        if (error) {
          throw new Error(error.message);
        }

        if (!data) {
          // Insert new user
          const { error: insertError } = await supabaseAdmin
            .from("users")
            .insert({
              discord_id,
              discord_email,
              discord_image,
              discord_name,
            });

          if (insertError) {
            throw new Error(insertError.message);
          }
        } else {
          // Check if any data has changed
          let updateRequired = false;
          const updates: any = {};

          if (data.discord_email !== discord_email) {
            updates.discord_email = discord_email;
            updateRequired = true;
          }
          if (data.discord_image !== discord_image) {
            updates.discord_image = discord_image;
            updateRequired = true;
          }
          if (data.discord_name !== discord_name) {
            updates.discord_name = discord_name;
            updateRequired = true;
          }

          // Perform the update if necessary
          if (updateRequired) {
            const { error: updateError } = await supabaseAdmin
              .from("users")
              .update(updates)
              .eq("discord_id", discord_id);

            if (updateError) {
              throw new Error(updateError.message);
            }
          }
        }
      } catch (error) {
        console.error("Error in signIn event:", error);
        throw new Error("Database update failed. Please try again later."); // Throwing an error to stop the sign-in process
      }
      return true;
    },
  },
};
export const getUserDataServer = async (req, res): Promise<UserData> => {
  try {
    const session = await getServerSession(req, res, NEXTAUTH_OPTIONS);

    if (!session) {
      return null;
    }

    const userData: UserData = {
      discord_id: (session.user as any).id,
      discord_email: session.user.email,
      discord_image: session.user.image,
      discord_name: session.user.name,
    };

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
  region = null,
  server = null,
  sellingItemID = null,
  askingItemID = null,
  filterOldListings = true,
  sortByRatio = true,
  userID = null,
  listingID = null,
  onlyOpenedListings = true,
  limit = 150,
}): Promise<ListingData[]> {
  const { data, error } = await supabaseAdmin.rpc("get_listings", {
    p_asking_item_id: askingItemID,
    p_filter_old_listings: filterOldListings,
    p_region: region,

    p_selling_item_id: sellingItemID,
    p_server: server,

    p_sort_by_ratio: sortByRatio,
    p_user_id: userID,
    p_only_opened: onlyOpenedListings,
    p_limit: limit,
    p_listing_id: listingID,
  });

  if (error) {
    console.error("Error fetching listings:", error);
    return null;
  }

  return data;
}

export async function isUserListingCreator({
  listingID,
  discordID,
}: {
  listingID: number;
  discordID: string;
}) {
  const { data, error } = await supabaseAdmin
    .from("listings")
    .select("users(id, discord_id)")
    .eq("id", listingID)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data || !data.users) {
    return false;
  }
  const listingDiscordID = (data.users as any).discord_id;


  return discordID === listingDiscordID;
}

export async function updateListingStatus({ isClosed, listingID }) {
  const { error } = await supabaseAdmin
    .from("listings")
    .update({
      is_closed: isClosed,
    })
    .eq("id", listingID);

  if (error) {
    throw new Error(error.message);
  }
}

export async function createListing({
  region,
  server,
  world,
  location,
  onceHumanUsername,
  itemsListingsAsk,
  itemsListingsSell,
  doNotContactDiscord,
  userID,
}: {
  region: string;
  server: string;
  world: string;
  location: string;
  onceHumanUsername: string;
  itemsListingsAsk: {
    item_id: number;
    amount: number;
  }[];
  itemsListingsSell: {
    item_id: number;
    amount: number;
    total_stock: number;
  }[];
  doNotContactDiscord: boolean;
  userID: number;
}) {
  const { error } = await supabaseAdmin.rpc("create_listing", {
    p_region: region,
    p_server: server,
    p_world: world,
    p_location: location,
    p_oncehuman_username: onceHumanUsername,
    p_items_listings_ask: itemsListingsAsk,
    p_items_listings_sell: itemsListingsSell,
    p_do_not_contact_discord: doNotContactDiscord,
    p_user_id: userID,
  });

  if (error) {
    console.error("Error fetching listings:", error);
    return null;
  }
}
