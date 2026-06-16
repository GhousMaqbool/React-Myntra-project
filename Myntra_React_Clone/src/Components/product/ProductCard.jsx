import { Link } from "react-router-dom";
import { BsBag, BsHeart } from "react-icons/bs";
import { useCartContext } from "../../context/CartContext";
import { useWishlistContext } from "../../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToCart, actionLoading, cart } = useCartContext();
  const { addToWishlist, removeFromWishlist, isInWishlist, actionLoading: wishlistLoading } =
    useWishlistContext();

  const productId = product._id;
  const inCart = cart.products?.some(
    (item) => item.productId?._id === productId || item.productId === productId
  );
  const inWishlist = isInWishlist(productId);
  const image = product.images?.[0] || product.image || "/images/placeholder.webp";

  const handleCartClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inCart) {
      await addToCart(productId, 1);
    }
  };

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  return (
    <article className="product-card">
      <Link to={`/product/${productId}`} className="product-card-link">
        <div className="product-image-wrap">
          <img src={image} alt={product.title || product.item_name} loading="lazy" />
          {product.discount > 0 && (
            <span className="product-badge">{product.discount}% OFF</span>
          )}
          <button
            type="button"
            className={`wishlist-btn ${inWishlist ? "active" : ""}`}
            onClick={handleWishlistClick}
            disabled={wishlistLoading}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <BsHeart />
          </button>
        </div>
        <div className="product-info">
          <p className="product-brand">{product.brand || product.company}</p>
          <h3 className="product-title">{product.title || product.item_name}</h3>
          <div className="product-rating">
            <span>{product.rating?.stars || 0} ★</span>
            <span>({product.rating?.count || 0})</span>
          </div>
          <div className="product-price">
            <span className="current">₹{product.price || product.current_price}</span>
            {(product.originalPrice || product.original_price) >
              (product.price || product.current_price) && (
              <>
                <span className="original">₹{product.originalPrice || product.original_price}</span>
                <span className="discount">{product.discount || product.discount_percentage}% OFF</span>
              </>
            )}
          </div>
        </div>
      </Link>
      <button
        type="button"
        className={`btn-cart ${inCart ? "in-cart" : ""}`}
        onClick={handleCartClick}
        disabled={actionLoading || inCart}
      >
        <BsBag /> {inCart ? "Added to Bag" : "Add to Bag"}
      </button>
    </article>
  );
};

export default ProductCard;
