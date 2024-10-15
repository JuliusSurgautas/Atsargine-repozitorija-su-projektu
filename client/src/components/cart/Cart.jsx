import { useState, useEffect } from "react";
import styles from "./cart.module.css";
import { useCart } from "../cartContext/CartContext";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import {
  calculateTotalWithoutVAT,
  calculateVAT,
  calculateTotalWithVAT,
} from "./CartUtils.jsx";

function Cart() {
  const { cartItems, removeFromCart, updateItemQuantity } = useCart();
  const [inputValues, setInputValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const initialQuantities = Object.fromEntries(
      cartItems.map(({ id, quantity = 1 }) => [id, quantity])
    );
    setInputValues(initialQuantities);
  }, [cartItems]);

  const totalWithoutVAT = calculateTotalWithoutVAT(cartItems);

  const handleQuantityChange = (id, newQuantity) => {
    setInputValues((prev) => ({
      ...prev,
      [id]:
        newQuantity === ""
          ? ""
          : Math.max(1, Math.min(99, Number(newQuantity))),
    }));
  };

  const handleQuantityBlur = (id, newQuantity) => {
    const quantity =
      newQuantity === "" ? 1 : Math.max(1, Math.min(99, Number(newQuantity)));
    setInputValues((prev) => ({ ...prev, [id]: quantity }));
    updateItemQuantity(id, quantity);
  };

  const handleBuyClick = () => {
    navigate("/checkout");
  };

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
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                quantity={inputValues[item.id]}
                onQuantityChange={(e) =>
                  handleQuantityChange(item.id, e.target.value)
                }
                onQuantityBlur={(e) =>
                  handleQuantityBlur(item.id, e.target.value)
                }
                onRemove={() => removeFromCart(item.id)}
              />
            ))}
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
              <span className={styles.summary_value}>
                €{calculateVAT(totalWithoutVAT).toFixed(2)}
              </span>
            </div>
            <div className={styles.summary_item}>
              <span className={styles.summary_label}>Viso</span>
              <span className={styles.summary_value}>
                €{calculateTotalWithVAT(totalWithoutVAT).toFixed(2)}
              </span>
            </div>
            <button className={styles.summary_btn} onClick={handleBuyClick}>
              Pirkti
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
