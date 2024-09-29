import styles from "./pricerating.module.css";
import { useState } from "react";

const PriceRating = ({ price, onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    if (value === 1 && rating === 1) {
      setRating(0);
    } else {
      setRating(value);
    }
    onRatingChange(value);
  };

  return (
    <div className={styles.price_rating}>
      <div className={styles.price}>{price}</div>
      <div className={styles.rating}>
        <div className={styles.rating_number}>
          <span id="rating-number">{rating}</span>/5
        </div>
        <div className={styles.stars} id="stars">
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              className={`${styles.star}
                ${value <= rating ? styles.active : ""}`}
              data-value={value}
              onClick={() => handleRating(value)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceRating;
