import { Link } from "react-router-dom";
import { BsBag, BsHeart } from "react-icons/bs";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import { useWishlistContext } from "../context/WishlistContext";
import { useCartContext } from "../context/CartContext";

const WishlistPage = () => {
  const { wishlist, loading, error, removeFromWishlist, reload } = useWishlistContext();
  const { addToCart, actionLoading } = useCartContext();

  if (loading) return <LoadingSpinner label="Loading wishlist..." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;

  const products = wishlist.products || [];

  if (!products.length) {
    return (
      <main className="page wishlist-page">
        <EmptyState
          title="Your wishlist is empty"
          description="Save your favourite products here and shop later."
          actionLabel="Explore Products"
          onAction={() => (window.location.href = "/")}
        />
      </main>
    );
  }

  return (
    <main className="page wishlist-page">
      <h1>My Wishlist ({products.length})</h1>
      <div className="wishlist-grid">
        {products.map((product) => (
          <article key={product._id} className="wishlist-card">
            <Link to={`/product/${product._id}`}>
              <img src={product.images?.[0]} alt={product.title} />
            </Link>
            <div className="wishlist-card-body">
              <p className="product-brand">{product.brand}</p>
              <Link to={`/product/${product._id}`}>
                <h3>{product.title}</h3>
              </Link>
              <div className="product-price">
                <span className="current">₹{product.price}</span>
              </div>
              <div className="wishlist-actions">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => addToCart(product._id, 1)}
                  disabled={actionLoading}
                >
                  <BsBag /> Move to Bag
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => removeFromWishlist(product._id)}
                >
                  <BsHeart /> Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default WishlistPage;
