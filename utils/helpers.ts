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
  const userID = (session?.user as any)?.user_id ?? null;

  const userData: UserData = {
    discord_name: discordUsername,
    discord_email: discordEmail,
    discord_image: discordImage,
    discord_id: discordId,
    user_id: userID,
  };

  return userData;
};

export const isOnceHumanServerFormatted = (server: string) => {
  if (!server) return false;

  // Split the server string by the first hyphen only
  const [firstPart, secondPart] = server.split(/-(.+)/);

  // First part validation:
  // - "W_Winter" is allowed (special case with mixed-case and underscore)
  // - For other formats (e.g., "PVE01"), it must be exactly 5 alphanumeric characters (A-Z, 0-9)
  const isValidFirstPart = (part: string) => {
    if (part === "W_Winter") {
      return true; // Valid special case for "W_Winter"
    }
    return /^[A-Z0-9]{5}$/.test(part); // Valid if exactly 5 alphanumeric characters
  };

  // Second part must be 5 characters long, no lowercase letters, and alphanumeric only
  const hasLowercase = (str: string) => /[a-z]/.test(str);
  const isValidSecondPart = (part: string) =>
    part.length === 5 && !hasLowercase(part) && /^[A-Z0-9]+$/.test(part);

  // Ensure both the first and second parts pass their respective validations
  return isValidFirstPart(firstPart) && isValidSecondPart(secondPart);
};
