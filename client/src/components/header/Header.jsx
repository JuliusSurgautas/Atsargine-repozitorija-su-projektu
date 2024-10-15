import styles from "./header.module.css";
import logo from "../../images/logo.webp";
import userIcon from "../../images/header/user.webp";
import cartIcon from "../../images/header/cart.webp";
import profileIcon from "../../images/header/profile_icon.webp";

import { CiSearch } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../cartContext/CartContext.jsx";
import { headerLinksData, OurItems } from "../../data/data.js";
import { useState, useRef, useEffect } from "react";

const Header = ({ setShowLogin }) => {
  const [active, setActive] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems, token, setToken } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileMenuRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

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

  const handleProfileClick = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
      setIsProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__inner}>
          <ul className={active ? styles.activeList : ""}>
            {headerLinksData.map((link) => (
              <li key={link.id}>
                <NavLink to={link.to}>{link.title}</NavLink>
              </li>
            ))}
          </ul>
          <NavLink to="/">
            <img src={logo} alt="Logo" style={{ width: 90, height: 90 }} />
          </NavLink>

          <div className={styles.search} ref={dropdownRef}>
            <CiSearch className={styles.search_icon} />
            <input
              type="search"
              placeholder="Paieška"
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
            <NavLink to="/cart">
              <div style={{ position: "relative" }}>
                <img src={cartIcon} width={35} height={35} alt="Cart Icon" />
                {totalQuantity > 0 && (
                  <span className={styles.cart_badge}>{totalQuantity}</span>
                )}
              </div>
            </NavLink>
            {!token ? (
              <button
                className={styles.cart_login_button}
                onClick={() => setShowLogin(true)}
              >
                <img src={userIcon} width={35} height={35} alt="Account Icon" />
                <span>Profilis</span>
              </button>
            ) : (
              <div className={styles.header_profile}>
                <img
                  src={profileIcon}
                  width={35}
                  height={35}
                  alt="Profile Icon"
                  onClick={handleProfileClick}
                />
                {isProfileMenuOpen && (
                  <ul
                    className={styles.header_profile_dropdown}
                    ref={profileMenuRef}
                  >
                    <li>
                      <p>Užsakymai</p>
                    </li>
                    <li>
                      <p>Adresai</p>
                    </li>
                    <li>
                      <p>Paskyros Duomenys</p>
                    </li>
                    <li>
                      <p>Slaptažodis</p>
                    </li>
                    <li onClick={logout} className={styles.logout}>
                      <p>Atsijungti</p>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
