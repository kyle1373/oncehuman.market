import { UserData } from "next-auth/providers/42-school";
import { getSession } from "next-auth/react";
import supabaseAdmin from "./supabaseAdmin";

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
