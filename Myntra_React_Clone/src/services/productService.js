import { apiRequest } from "./api";

export const fetchProducts = (params = {}) => {
  const query = new URLSearchParams();

  if (params.page) query.set("page", params.page);
  if (params.limit) query.set("limit", params.limit);
  if (params.category) query.set("category", params.category);
  if (params.search) query.set("search", params.search);

  const qs = query.toString();
  return apiRequest(`/api/products${qs ? `?${qs}` : ""}`);
};

export const fetchProductById = (id) => apiRequest(`/api/products/${id}`);
