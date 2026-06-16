/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo } from "react";
import { getUserId } from "../config/api";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const userId = useMemo(() => getUserId(), []);

  return (
    <UserContext.Provider value={{ userId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
