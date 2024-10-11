import { NavLink } from "react-router-dom";
import { assets } from "../../images/assets";
import styles from "./sidebar.module.css";

const SideBar = () => {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.sidebar_options}>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive
              ? `${styles.sidebar_option} ${styles.active}`
              : styles.sidebar_option
          }
        >
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink
          to="/list"
          className={({ isActive }) =>
            isActive
              ? `${styles.sidebar_option} ${styles.active}`
              : styles.sidebar_option
          }
        >
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive
              ? `${styles.sidebar_option} ${styles.active}`
              : styles.sidebar_option
          }
        >
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </nav>
  );
};

export default SideBar;
