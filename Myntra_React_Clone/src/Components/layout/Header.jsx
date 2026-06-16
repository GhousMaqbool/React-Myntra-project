import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoPersonCircle, IoBagCheckOutline, IoMenu, IoClose } from "react-icons/io5";
import { IoIosHeart } from "react-icons/io";
import { useCartContext } from "../../context/CartContext";
import { useWishlistContext } from "../../context/WishlistContext";
import { useSearch } from "../../context/SearchContext";

const NAV_LINKS = [
  { to: "/men", label: "Men" },
  { to: "/women", label: "Women" },
  { to: "/kids", label: "Kids" },
  { to: "/beauty", label: "Beauty" },
  { to: "/studio", label: "Studio", badge: "New" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCartContext();
  const { wishlistCount } = useWishlistContext();
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    setMobileOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <IoClose /> : <IoMenu />}
        </button>

        <Link to="/" className="logo-link" onClick={() => setMobileOpen(false)}>
          <img className="myntra-logo" src="/images/myntra_logo.webp" alt="Myntra Home" />
        </Link>

        <nav className={`main-nav ${mobileOpen ? "open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
              {link.badge && <sup>{link.badge}</sup>}
            </NavLink>
          ))}
        </nav>

        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <input
            className="search-input"
            placeholder="Search for products, brands and more"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className="action-bar">
          <div className="action-item">
            <IoPersonCircle />
            <span>Profile</span>
          </div>

          <Link to="/wishlist" className="action-item" onClick={() => setMobileOpen(false)}>
            <IoIosHeart />
            <span>Wishlist</span>
            {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
          </Link>

          <Link to="/cart" className="action-item" onClick={() => setMobileOpen(false)}>
            <IoBagCheckOutline />
            <span>Bag</span>
            {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-sidebar">
          <form className="mobile-search" onSubmit={handleSearchSubmit}>
            <input
              placeholder="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={`mobile-${link.to}`}
              to={link.to}
              className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
