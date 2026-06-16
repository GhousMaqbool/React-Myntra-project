/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useCart as useCartHook } from "../hooks/useCart";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const cartState = useCartHook();
  return <CartContext.Provider value={cartState}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within CartProvider");
  }
  return context;
};
