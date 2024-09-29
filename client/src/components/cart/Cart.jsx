import styles from "./cart.module.css";

import { useCart } from "../cartContext/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateItemQuantity } = useCart();

  const totalWithoutVAT = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = item.quantity || 1;
    return acc + price * quantity;
  }, 0);

  const vat = totalWithoutVAT * 0.21;
  const totalWithVAT = totalWithoutVAT + vat;

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    updateItemQuantity(item.id, newQuantity);
  };

  return (
    <div className={styles.cart_container}>
      <div className={styles.cart_header}>
        <span>Prekės</span>
        <span>Kiekis</span>
        <span>Tarpinė suma</span>
      </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className={styles.cart_items}>
            {cartItems.map((item) => {
              const price = parseFloat(item.price) || 0;
              const quantity = item.quantity || 1;
              const totalPrice = price * quantity;

              return (
                <li key={item.id} className={styles.cart_item}>
                  <div className={styles.cart_info}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.cart_item_image}
                    />
                    <div className={styles.cart_item_details}>
                      <p>
                        {item.title}, {item.weight}
                      </p>
                      <span>€{price.toFixed(2)}</span>
                      <div>
                        <button
                          className={styles.remove_item}
                          onClick={() => removeFromCart(item.id)}
                        >
                          Trinti
                        </button>
                      </div>
                    </div>
                    <div className={styles.cart_item_row}>
                      <div className={styles.cart_quantity}>
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={quantity}
                          onChange={(e) =>
                            handleQuantityChange(item, Number(e.target.value))
                          }
                          style={{ width: "60px", textAlign: "center" }}
                        />
                      </div>
                      <div className={styles.cart_total_price}>
                        <span>€{totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className={styles.cart_summary}>
            <div className={styles.summary_item}>
              <span className={styles.summary_label}>Suma Be PVM</span>
              <span className={styles.summary_value}>
                €{totalWithoutVAT.toFixed(2)}
              </span>
            </div>
            <div className={styles.summary_item}>
              <span className={styles.summary_label}>PVM (21%)</span>
              <span className={styles.summary_value}>€{vat.toFixed(2)}</span>
            </div>
            <div className={styles.summary_item}>
              <span className={styles.summary_label}>Viso</span>
              <span className={styles.summary_value}>
                €{totalWithVAT.toFixed(2)}
              </span>
            </div>
            <button className={styles.summary_btn}>Pirkti</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
