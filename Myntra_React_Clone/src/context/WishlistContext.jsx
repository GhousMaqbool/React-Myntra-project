/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useWishlist as useWishlistHook } from "../hooks/useWishlist";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const wishlistState = useWishlistHook();
  return (
    <WishlistContext.Provider value={wishlistState}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlistContext must be used within WishlistProvider");
  }
  return context;
};
