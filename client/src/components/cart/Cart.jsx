import { useState, useEffect } from "react";
import styles from "./cart.module.css";
import { useCart } from "../cartContext/CartContext";

function Cart() {
  const { cartItems, removeFromCart, updateItemQuantity } = useCart();
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach((item) => {
      initialQuantities[item.id] = item.quantity || 1;
    });
    setInputValues(initialQuantities);
  }, [cartItems]);

  const totalWithoutVAT = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = item.quantity || 1;
    return acc + price * quantity;
  }, 0);

  const vat = totalWithoutVAT * 0.21;
  const totalWithVAT = totalWithoutVAT + vat;

  function handleQuantityChange(item, newQuantity) {
    if (/^\d*$/.test(newQuantity)) {
      const quantityNumber = Number(newQuantity);
      if (quantityNumber <= 99) {
        setInputValues((prevValues) => ({
          ...prevValues,
          [item.id]: newQuantity,
        }));
      }
    }
  }

  function handleBlur(item) {
    const quantity = inputValues[item.id];
    if (quantity === "" || Number(quantity) <= 0) {
      setInputValues((prevValues) => ({
        ...prevValues,
        [item.id]: 1,
      }));
      updateItemQuantity(item.id, 1);
    } else {
      updateItemQuantity(item.id, Number(quantity));
    }
  }

  return (
    <div className={styles.cart_container}>
      <div className={styles.cart_header}>
        <span>Prekės</span>
        <span>Kiekis</span>
        <span>Tarpinė suma</span>
      </div>
      {cartItems.length === 0 ? (
        <div className={styles.empty_cart}>
          <p>Krepšelis dar tuščias.</p>
        </div>
      ) : (
        <>
          <ul className={styles.cart_items}>
            {cartItems.map((item) => {
              const price = parseFloat(item.price) || 0;
              const quantity = inputValues[item.id] || "";
              const totalPrice = price * (Number(quantity) || 1);

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
                          type="text"
                          value={quantity}
                          onChange={(e) =>
                            handleQuantityChange(item, e.target.value)
                          }
                          onBlur={() => handleBlur(item)}
                          style={{ width: "60px", textAlign: "center" }}
                          min="1"
                          max="99"
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
}

export default Cart;
