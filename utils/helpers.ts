import { formatDistanceToNow } from "date-fns";

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

export default getOnlineStatus;
