import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { UserData } from "@constants/types";
import { convertSessionToUserData } from "@utils/helpers";

// Define the shape of the context data
interface UserContextProps {
  discordUser: UserData;
  setDiscordUser;
  showLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the UserContext with a default undefined value
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Styled component for the overlay
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

// Create the UserProvider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [discordUser, setDiscordUser] = useState<UserData>({
    discord_name: null,
    discord_email: null,
    discord_id: null,
    discord_image: null,
  });
  const { data: session } = useSession();

  useEffect(() => {
    const userData = convertSessionToUserData(session);
    setDiscordUser(userData);
  }, [session]);

  const [loading, showLoading] = useState<boolean>(false);

  return (
    <UserContext.Provider
      value={{
        discordUser,
        setDiscordUser,
        showLoading,
      }}
    >
      {loading && (
        <LoadingOverlay>
          <ClipLoader color="#FFFFFF" size={100} />
        </LoadingOverlay>
      )}
      {children}
    </UserContext.Provider>
  );
};
