import styled from "@emotion/styled";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ClipLoader } from "react-spinners";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { UserData } from "@constants/types";

export interface User {
  user_id: number;
  osu_name: string;
  osu_picture: string;
}
// Define the shape of the context data
interface UserContextProps {
  user: UserData;
  showLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<UserData>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

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

// Create a provider component
export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<UserData>();
  const [loading, showLoading] = useState<boolean>(false);

  return (
    <UserContext.Provider
      value={{
        user: currentUser,
        showLoading,
        setUser: setCurrentUser,
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

// Create a custom hook to use the osu user context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
