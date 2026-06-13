import React from "react";
import { IoPersonCircle } from "react-icons/io5";
import { IoIosHeart } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const bag = useSelector((store) => store.Bag);

  return (
    <div>
      <header>
        <div className="logo_container">
          {/* Changed 'href' to 'to' for React Router consistency */}
          <Link to="/">
            <img
              className="myntra_home"
              src="images/myntra_logo.webp"
              alt="Myntra Home"
            />
          </Link>
        </div>
        <nav className="nav_bar">
          <a href="#">Men</a>
          <a href="#">Women</a>
          <a href="#">Kids</a>
          <a href="#">Home & Living</a>
          <a href="#">Beauty</a>
          <a href="#">
            Studio <sup>New</sup>
          </a>
          {/* Added the Contact Us link here */}
         <Link className="nav_link" to="/contact">Contact</Link>
        </nav>
        <div className="search_bar">
          <input className="input" placeholder="Search For Products" />
        </div>
        <div className="action_bar">
          <div className="action_container">
            <IoPersonCircle />
            <span className="action_name">Profile</span>
          </div>

          <div className="action_container">
            <IoIosHeart />
            <span className="action_name">Wishlist</span>
          </div>

          <Link className="action_container" to="/bag">
            <IoBagCheckOutline />
            <span className="action_name">Bag</span>
            <span className="bag-item-count">{bag.length}</span>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;