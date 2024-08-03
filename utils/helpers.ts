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
    name: discordUsername,
    email: discordEmail,
    image: discordImage,
    id: discordId,
  };

  return userData;
};
