import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-column">
          <h4>Online Shopping</h4>
          <Link to="/men">Men</Link>
          <Link to="/women">Women</Link>
          <Link to="/kids">Kids</Link>
          <Link to="/beauty">Beauty</Link>
          <Link to="/studio">Studio</Link>
        </div>

        <div className="footer-column">
          <h4>Customer Policies</h4>
          <Link to="/contact">Contact Us</Link>
          <a href="#faq">FAQ</a>
          <a href="#terms">T&amp;C</a>
          <a href="#privacy">Privacy Policy</a>
        </div>

        <div className="footer-column">
          <h4>Experience Myntra App</h4>
          <p>Download the app for the best shopping experience on mobile.</p>
        </div>
      </div>
      <hr />
      <p className="copyright">© {new Date().getFullYear()} Myntra Clone. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
