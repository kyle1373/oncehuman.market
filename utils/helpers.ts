import { UserData } from "@constants/types";
import { formatDistanceToNow } from "date-fns";
import { Session } from "next-auth";

// Function to get online status based on the timestamp
export const getOnlineStatus = (timestamp: string) => {
  const now = new Date().getTime();
  const lastOnlineDate = new Date(timestamp).getTime();
  const differenceInMinutes = (now - lastOnlineDate) / 1000 / 60;

  if (differenceInMinutes < 5) {
    return "online";
  } else {
    return `online ${formatDistanceToNow(lastOnlineDate, { addSuffix: true })}`;
  }
};

export const convertSessionToUserData = (session: Session): UserData => {
  const discordId = (session?.user as any)?.id ?? null;
  const discordUsername = session?.user?.name ?? null;
  const discordEmail = session?.user?.email ?? null;
  const discordImage = session?.user?.image ?? null;

  const userData: UserData = {
    discord_name: discordUsername,
    discord_email: discordEmail,
    discord_image: discordImage,
    discord_id: discordId,
  };

  return userData;
};

export const isOnceHumanServerFormatted = (server: string) => {
  const parts = server?.split("-");

  if (parts?.length !== 2) {
    return false;
  }

  console.log(parts[0].length)

  return parts[0].length === 5 && parts[1].length === 5;
};
