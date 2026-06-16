import { useCallback, useEffect, useState } from "react";
import {
  addToWishlist as addToWishlistApi,
  getWishlist,
  removeFromWishlist as removeFromWishlistApi,
} from "../services/wishlistService";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState({ products: [] });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadWishlist = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getWishlist();
      setWishlist(response.data || { products: [] });
    } catch (err) {
      setError(err.message || "Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  const addToWishlist = async (productId) => {
    setActionLoading(true);
    try {
      const response = await addToWishlistApi(productId);
      setWishlist(response.data);
      return response;
    } finally {
      setActionLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    setActionLoading(true);
    try {
      const response = await removeFromWishlistApi(productId);
      setWishlist(response.data);
    } finally {
      setActionLoading(false);
    }
  };

  const isInWishlist = (productId) =>
    wishlist.products?.some((product) => product._id === productId);

  return {
    wishlist,
    wishlistCount: wishlist.products?.length || 0,
    loading,
    actionLoading,
    error,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    reload: loadWishlist,
  };
};
