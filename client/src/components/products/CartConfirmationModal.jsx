import styles from "./productdetail.module.css";

const CartConfirmationModal = ({ show, onClose }) => {
  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <div className={styles.checkmark_container}>
            <div className={styles.checkmark_circle}>
              <span className={styles.checkmark}>✓</span>
            </div>
            <p className={styles.confirmation_text}>Prekė įdėta į krepšelį</p>
          </div>
          <button className={styles.close_button} onClick={onClose}>
            ✖
          </button>
        </div>
        <div className={styles.modal_body}></div>
        <div className={styles.modal_actions}>
          <button className={`${styles.continue_button}`} onClick={onClose}>
            Tęsti apsipirkimą
          </button>
          <button
            className={`${styles.cart_button}`}
            onClick={() => (window.location.href = "/cart")}
          >
            Į krepšelį
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartConfirmationModal;
