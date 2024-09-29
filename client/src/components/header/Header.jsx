import styles from "./header.module.css";

import logo from "../../images/logo.webp";
import accountIcon from "../../images/header/account.webp";
import cartIcon from "../../images/header/cart.webp";
import shopIcon from "../../images/header/shop.webp";
import homeIcon from "../../images/header/home.webp";

import { CiSearch } from "react-icons/ci";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../cartContext/CartContext.jsx";
import { OurItems } from "../../data/data.js";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const filtered = OurItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
      setIsDropdownOpen(true);
    } else {
      setFilteredItems([]);
      setIsDropdownOpen(false);
    }
  };

  const handleDropdownClose = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDropdownClose);
    return () => {
      document.removeEventListener("mousedown", handleDropdownClose);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && filteredItems.length > 0) {
      navigate(filteredItems[0].to);
      setSearchQuery("");
      setIsDropdownOpen(false);
    }
  };

  const handleDropdownItemClick = (item) => {
    navigate(item.to);
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__inner}>
          <NavLink to="/">
            <img src={logo} alt="Logo" style={{ width: 250, height: 105 }} />
          </NavLink>

          <div className={styles.search} ref={dropdownRef}>
            <CiSearch className={styles.search_icon} />
            <input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            {isDropdownOpen && filteredItems.length > 0 && (
              <div className={styles.search_dropdown}>
                {filteredItems.map((item) => (
                  <NavLink
                    to={item.to}
                    key={item.id}
                    className={styles.dropdown_item}
                    onClick={() => handleDropdownItemClick(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.dropdown_item_image}
                      style={{ width: "80px" }}
                    />
                    <div>
                      <div>{item.title}</div>
                      <div className={styles.dropdown_item_price}>
                        {item.price}
                      </div>
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <div className={styles.header__menu}>
            {location.pathname !== "/" ? (
              <NavLink to="/">
                <img src={homeIcon} width={40} height={40} alt="Home Icon" />
              </NavLink>
            ) : (
              <img src={shopIcon} width={40} height={40} alt="Shop Icon" />
            )}

            <NavLink to="/login">
              <img
                src={accountIcon}
                width={40}
                height={40}
                alt="Account Icon"
              />
            </NavLink>
            <NavLink to="/cart">
              <div style={{ position: "relative" }}>
                <img src={cartIcon} width={40} height={40} alt="Cart Icon" />
                {totalQuantity > 0 && (
                  <span className={styles.cart_badge}>{totalQuantity}</span>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
