import styles from "./checkout.module.css";

const CheckOut = () => {
  return (
    <div className="container">
      <form className={styles.place_order}>
        <div className={styles.place_order_left}>
          <p className={styles.title}>Delivery Information</p>
          <div className={styles.multi_fields}>
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <input type="email" placeholder="Email Address" />
          <input type="text" placeholder="Street Address" />
          <div className={styles.multi_fields}>
            <input type="text" placeholder="City" />
            <input type="text" placeholder="State" />
          </div>
          <div className={styles.multi_fields}>
            <input type="text" placeholder="Zip Code" />
            <input type="text" placeholder="Country" />
          </div>
          <input type="text" placeholder="Phone" />
        </div>
        <div className={styles.place_order_right}>dwqdwq</div>
      </form>
    </div>
  );
};

export default CheckOut;
