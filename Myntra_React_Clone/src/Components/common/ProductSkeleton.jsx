const ProductSkeleton = () => {
  return (
    <div className="product-card skeleton-card">
      <div className="skeleton skeleton-image" />
      <div className="skeleton skeleton-text short" />
      <div className="skeleton skeleton-text" />
      <div className="skeleton skeleton-text medium" />
      <div className="skeleton skeleton-button" />
    </div>
  );
};

export default ProductSkeleton;
