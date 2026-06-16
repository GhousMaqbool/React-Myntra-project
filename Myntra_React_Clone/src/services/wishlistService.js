import { apiRequest } from "./api";

export const getWishlist = () => apiRequest("/api/wishlist", { auth: true });

export const addToWishlist = (productId) =>
  apiRequest("/api/wishlist/add", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ productId }),
  });

export const removeFromWishlist = (productId) =>
  apiRequest(`/api/wishlist/remove/${productId}`, {
    method: "DELETE",
    auth: true,
  });
