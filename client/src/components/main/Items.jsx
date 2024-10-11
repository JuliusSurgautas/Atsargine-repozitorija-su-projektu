import styles from "./main.module.css";

import { TopRatedItems } from "../../data/data";
import { useState } from "react";
import { OurItems } from "../../data/data";
import { Link } from "react-router-dom";

const Items = () => {
  const [visibleItems, setVisibleItems] = useState(8);

  const showMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 8);
  };

  return (
    <section className={styles.items}>
      <div className="small-containerEmpty">
      <h2 className={styles.items__title}>Geriausi pasiūlymai</h2>
      <div className={styles.items__row}>
      {TopRatedItems.slice(0, visibleItems).map((item) => (
            <div key={item.id} className={styles.items__product}>
              <Link to={item.to} className={styles.items__image}>
                <img src={item.image} alt={item.title} />
              </Link>
              <h4 className={styles.items__product_title}>{item.title}</h4>
              <p className={styles.items__product_price}>{item.price}</p>
            </div>
          ))}
      </div>
      </div>

      <div className="small-container">
        <h2 className={styles.items__title}>Visi Skelbimai</h2>
        <div className={styles.items__row}>
          {OurItems.slice(0, visibleItems).map((item) => (
            <div key={item.id} className={styles.items__product}>
              <Link to={item.to} className={styles.items__image}>
                <img src={item.image} alt={item.title} />
              </Link>
              <h4 className={styles.items__product_title}>{item.title}</h4>
              <p className={styles.items__product_price}>{item.price}</p>
            </div>
          ))}
        </div>

        {visibleItems < OurItems.length && (
          <div className={styles.items__button_wrapper}>
            <button className={styles.items__button} onClick={showMoreItems}>
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Items;
