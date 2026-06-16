import { useCallback, useEffect, useState } from "react";
import {
  addToCart as addToCartApi,
  clearCart as clearCartApi,
  getCart,
  removeFromCart as removeFromCartApi,
  updateCartItem as updateCartItemApi,
} from "../services/cartService";

export const useCart = () => {
  const [cart, setCart] = useState({ products: [], totalAmount: 0 });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCart = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getCart();
      setCart(response.data || { products: [], totalAmount: 0 });
    } catch (err) {
      setError(err.message || "Failed to load cart");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = async (productId, quantity = 1) => {
    setActionLoading(true);
    try {
      const response = await addToCartApi(productId, quantity);
      setCart(response.data);
      return response;
    } finally {
      setActionLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    setActionLoading(true);
    try {
      const response = await updateCartItemApi(productId, quantity);
      setCart(response.data);
    } finally {
      setActionLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    setActionLoading(true);
    try {
      const response = await removeFromCartApi(productId);
      setCart(response.data);
    } finally {
      setActionLoading(false);
    }
  };

  const clearCart = async () => {
    setActionLoading(true);
    try {
      const response = await clearCartApi();
      setCart(response.data || { products: [], totalAmount: 0 });
    } finally {
      setActionLoading(false);
    }
  };

  const cartCount = cart.products?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return {
    cart,
    cartCount,
    loading,
    actionLoading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    reload: loadCart,
  };
};
