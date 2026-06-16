import ProductCard from "./ProductCard";
import ProductSkeleton from "../common/ProductSkeleton";
import EmptyState from "../common/EmptyState";
import ErrorState from "../common/ErrorState";

const ProductGrid = ({ products, loading, error, onRetry, emptyTitle, emptyDescription }) => {
  if (loading) {
    return (
      <div className="product-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (!products.length) {
    return (
      <EmptyState
        title={emptyTitle || "No products found"}
        description={emptyDescription || "Try a different category or search term."}
        actionLabel="Browse Home"
        onAction={() => (window.location.href = "/")}
      />
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product._id || product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
