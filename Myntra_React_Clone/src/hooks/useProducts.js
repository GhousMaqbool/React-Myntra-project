import { useCallback, useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";

export const useProducts = ({ category = "", search = "", limit = 12, enabled = true } = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });

  const loadProducts = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetchProducts({ category, search, limit });
      setProducts(response.data || []);
      setMeta(response.meta || { page: 1, totalPages: 1, total: 0 });
    } catch (err) {
      setError(err.message || "Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [category, search, limit, enabled]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return { products, loading, error, meta, reload: loadProducts };
};
