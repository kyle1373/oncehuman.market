import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

// Define the shape of the context data
interface UserContextProps {
  discordId: number | null;
  discordUsername: string | null;
  discordEmail: string | null;
  discordImage: string | null;
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
  const { data: session } = useSession();

  const [loading, showLoading] = useState<boolean>(false);

  const discordId = parseInt((session?.user as any)?.id) ?? null;
  const discordUsername = session?.user?.name ?? null;
  const discordEmail = session?.user?.email ?? null;
  const discordImage = session?.user?.image ?? null;

  return (
    <UserContext.Provider
      value={{
        discordId,
        discordUsername,
        discordEmail,
        discordImage,
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
