import styles from "./cart.module.css";

function CartItem({
  item,
  quantity,
  onQuantityChange,
  onQuantityBlur,
  onRemove,
}) {
  const totalPrice = (parseFloat(item.price) || 0) * (quantity || 1);

  const handleKeyPress = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pasteData)) {
      e.preventDefault();
    }
  };

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
          <span>€{parseFloat(item.price).toFixed(2)}</span>
          <button className={styles.remove_item} onClick={onRemove}>
            Trinti
          </button>
        </div>
        <div className={styles.cart_item_row}>
          <input
            type="text"
            value={quantity}
            onChange={onQuantityChange}
            onBlur={onQuantityBlur}
            onKeyPress={handleKeyPress}
            onPaste={handlePaste}
            style={{ width: "60px", textAlign: "center" }}
          />
          <span>€{totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
