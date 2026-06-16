import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import LoadingSpinner from "../Components/common/LoadingSpinner";
import EmptyState from "../Components/common/EmptyState";
import ErrorState from "../Components/common/ErrorState";
import { useCartContext } from "../context/CartContext";

const CONVENIENCE_FEE = 99;
const GST_RATE = 0.18;

const CartPage = () => {
  const { cart, loading, error, updateQuantity, removeFromCart, reload } = useCartContext();

  if (loading) return <LoadingSpinner label="Loading your bag..." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;

  const items = cart.products || [];

  if (!items.length) {
    return (
      <main className="page cart-page">
        <EmptyState
          title="Your bag is empty"
          description="Looks like you have not added anything to your bag yet."
          actionLabel="Continue Shopping"
          onAction={() => (window.location.href = "/")}
        />
      </main>
    );
  }

  let totalMRP = 0;
  let totalDiscount = 0;

  items.forEach((entry) => {
    const product = entry.productId;
    if (!product) return;
    totalMRP += product.originalPrice * entry.quantity;
    totalDiscount += (product.originalPrice - product.price) * entry.quantity;
  });

  const subtotal = cart.totalAmount || 0;
  const gst = Math.round(subtotal * GST_RATE);
  const finalPrice = subtotal + gst + CONVENIENCE_FEE;

  return (
    <main className="page cart-page">
      <div className="cart-layout">
        <section className="cart-items">
          <h1>My Bag ({items.length} items)</h1>
          {items.map((entry) => {
            const product = entry.productId;
            if (!product) return null;

            return (
              <article key={product._id} className="cart-item">
                <img src={product.images?.[0]} alt={product.title} />
                <div className="cart-item-info">
                  <p className="product-brand">{product.brand}</p>
                  <h3>{product.title}</h3>
                  <div className="product-price">
                    <span className="current">₹{product.price}</span>
                    <span className="original">₹{product.originalPrice}</span>
                  </div>
                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product._id, Math.max(entry.quantity - 1, 1))}
                    >
                      -
                    </button>
                    <span>{entry.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product._id, entry.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeFromCart(product._id)}
                  aria-label="Remove item"
                >
                  <RiDeleteBin6Line />
                </button>
              </article>
            );
          })}
        </section>

        <aside className="cart-summary">
          <h2>Price Details</h2>
          <div className="summary-row">
            <span>Total MRP</span>
            <span>₹{totalMRP}</span>
          </div>
          <div className="summary-row discount">
            <span>Discount on MRP</span>
            <span>-₹{totalDiscount}</span>
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="summary-row">
            <span>GST (18%)</span>
            <span>₹{gst}</span>
          </div>
          <div className="summary-row">
            <span>Convenience Fee</span>
            <span>₹{CONVENIENCE_FEE}</span>
          </div>
          <hr />
          <div className="summary-row total">
            <span>Total Amount</span>
            <span>₹{finalPrice}</span>
          </div>
          <button type="button" className="btn-primary full-width">
            Place Order
          </button>
          <Link to="/" className="continue-link">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
};

export default CartPage;
