import { apiRequest } from "./api";

export const getCart = () => apiRequest("/api/cart", { auth: true });

export const addToCart = (productId, quantity = 1) =>
  apiRequest("/api/cart/add", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ productId, quantity }),
  });

export const updateCartItem = (productId, quantity) =>
  apiRequest(`/api/cart/update/${productId}`, {
    method: "PUT",
    auth: true,
    body: JSON.stringify({ quantity }),
  });

export const removeFromCart = (productId) =>
  apiRequest(`/api/cart/remove/${productId}`, {
    method: "DELETE",
    auth: true,
  });

export const clearCart = () =>
  apiRequest("/api/cart/clear", {
    method: "DELETE",
    auth: true,
  });
