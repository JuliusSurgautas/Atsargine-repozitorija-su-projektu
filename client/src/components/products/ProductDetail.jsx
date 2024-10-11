import styles from "./productdetail.module.css";
import Item from "../main/Items.jsx";
import PriceRating from "../priceRating/PriceRating.jsx";
import NumberInput from "../numberInput/NumberInput.jsx";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { OurItems } from "../../data/data";
import { useCart } from "../../components/cartContext/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const product = OurItems.find((item) => item.id === parseInt(id));
  const [mainImage, setMainImage] = useState(product.image);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    setMainImage(product.image);
  }, [product]);

  const handleThumbnailClick = (clickedImage) => {
    setMainImage(clickedImage);
  };

  const handleSubmit = () => {
    if (review.trim() && rating > 0) {
      setReviews((prevReviews) => [
        ...prevReviews,
        { id: product.id, rating, text: review },
      ]);
      setReview("");
      setRating(0);
    } else {
      alert("Please write a review and select a rating before submitting.");
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <>
      <div className={styles.product_detail}>
        <div className="small-container">
          <div className={styles.product_row}>
            <div className={styles.product_col}>
              <img
                className={styles.product_image}
                src={mainImage}
                alt={product.title}
              />
              <div className={styles.thumbnail_row}>
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    className={styles.thumbnail_image}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => handleThumbnailClick(image)}
                  />
                ))}
              </div>
            </div>
            <div className={styles.product_col}>
              <p className={styles.product_toptitle}>{product.toptitle}</p>
              <h2 className={styles.product_secondtitle}>
                {product.secondtitle}
              </h2>
              <PriceRating
                price={product.price}
                rating={rating}
                onRatingChange={setRating}
              />
              <NumberInput onChange={setQuantity} />
              <button className={styles.product_btn} onClick={handleAddToCart}>
                Add To Cart
              </button>
              <p className={styles.product_info}>Aprašymas</p>
              <ul className={styles.product_list}>
                {product.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className={styles.product_review}>
                <p>Share your review:</p>
                <textarea
                  placeholder="Write your review here"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
                <button className="button" onClick={handleSubmit}>
                  Submit
                </button>
                <div className="reviews">
                  {reviews
                    .filter((r) => r.id === product.id)
                    .map((r, index) => (
                      <div key={index} className="review-item">
                        Rating: {r.rating}/5
                        <br />
                        {r.text}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Item />
    </>
  );
};

export default ProductDetail;
