import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { BsBag, BsHeart } from "react-icons/bs";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorState from "../components/common/ErrorState";
import { fetchProductById } from "../services/productService";
import { useCartContext } from "../context/CartContext";
import { useWishlistContext } from "../context/WishlistContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart, actionLoading } = useCartContext();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistContext();

  const loadProduct = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchProductById(id);
      setProduct(response.data);
      setSelectedImage(0);
    } catch (err) {
      setError(err.message || "Product not found");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  if (loading) return <LoadingSpinner label="Loading product..." />;
  if (error || !product) return <ErrorState message={error} onRetry={loadProduct} />;

  const inWishlist = isInWishlist(product._id);
  const images = product.images?.length ? product.images : [product.image];

  return (
    <main className="page product-detail-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <span>{product.title}</span>
      </div>

      <div className="product-detail-grid">
        <div className="product-gallery">
          <img src={images[selectedImage]} alt={product.title} className="main-image" />
          <div className="thumbnail-row">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${product.title} ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-detail-info">
          <p className="product-brand">{product.brand}</p>
          <h1>{product.title}</h1>
          <div className="product-rating large">
            <span>{product.rating?.stars || 0} ★</span>
            <span>{product.rating?.count || 0} ratings</span>
          </div>
          <div className="product-price large">
            <span className="current">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="original">₹{product.originalPrice}</span>
                <span className="discount">{product.discount}% OFF</span>
              </>
            )}
          </div>
          <p className="product-description">{product.description}</p>

          <div className="size-selector">
            <p>Select Size</p>
            <div className="size-options">
              {product.sizes?.map((size) => (
                <button key={size} type="button" className="size-btn">
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="product-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={() => addToCart(product._id, 1)}
              disabled={actionLoading}
            >
              <BsBag /> Add to Bag
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() =>
                inWishlist ? removeFromWishlist(product._id) : addToWishlist(product._id)
              }
            >
              <BsHeart /> {inWishlist ? "Remove from Wishlist" : "Wishlist"}
            </button>
          </div>

          <ul className="product-meta-list">
            <li>{product.returnPeriod} days return available</li>
            <li>Delivery by {product.deliveryDate}</li>
            <li>{product.stock} items in stock</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
