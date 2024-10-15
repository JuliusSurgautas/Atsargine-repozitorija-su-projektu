import { useEffect, useState, useRef } from "react";
import { useCart } from "../cartContext/CartContext";
import styles from "./login.module.css";
import logo from "../../images/logo.webp";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const LogIn = ({ setShowLogin }) => {
  const { url, setToken } = useCart();
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const popupRef = useRef(null);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      closePopup();
    } else {
      alert(response.data.message);
    }
  };

  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      closePopup();
    }
  };

  const closePopup = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowLogin(false);
      document.body.style.overflow = "auto";
    }, 300);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleOutsideClick);
    setTimeout(() => setIsVisible(true), 10);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={`${styles.login_popup} ${
        isVisible ? styles.visible : styles.hidden
      }`}
    >
      <form
        ref={popupRef}
        className={styles.login_popup_container}
        onSubmit={onLogin}
      >
        <div className={styles.login_popup_title}>
          <div className={styles.title_container}>
            <img
              src={logo}
              style={{ width: 70, height: 70 }}
              alt="Footer Logo"
            />
            <h2>{currState}</h2>
          </div>
          <RxCross2 color="#fff" onClick={closePopup} />
        </div>
        <div className={styles.login_popup_inputs}>
          {currState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Vartotojo vardas"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="El. pašto adresas"
            required
          />
          <div className={styles.password_container}>
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type={showPassword ? "text" : "password"}
              placeholder="Slaptažodis"
              required
            />
            <span
              className={styles.password_toggle_icon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </span>
          </div>
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Sign Up" : "Prisijungti"}
        </button>
        <div className={styles.login_popup_conditition}>
          <input type="checkbox" required />
          <p>Tęsdamas sutinku su naudojimo sąlygomis ir privatumo politika.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Don't have an account?
            <span onClick={() => setCurrState("Sign Up")}>Užsiregistruoti</span>
          </p>
        ) : (
          <p>
            Have an account?
            <span onClick={() => setCurrState("Login")}>Prisijungti</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LogIn;
