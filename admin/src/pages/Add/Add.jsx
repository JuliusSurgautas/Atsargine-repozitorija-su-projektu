import styles from "./add.module.css";
import { assets } from "../../images/assets.js";
import { useEffect, useState } from "react";
import axios from "axios";

const Add = () => {
  const url = "http://localhost:3000";
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((date) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new formData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("image", image);
    const response = await axios.post(`${url}/api/coffee/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
      });
      setImage(false);
    } else {
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className={styles.add}>
      <form className={styles.flex_col} onSubmit={onSubmitHandler}>
        <div className={styles.add_img_upload}>
          <p>Uload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className={`${styles.add_product_name} flex_col`}>
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className={`${styles.add_product_name} styles.flex_col`}>
          <p>Product Description</p>
          <input
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
          />
        </div>
        <div className={`${styles.add_product_description} flex_col`}>
          <p>Product Description</p>
          <textarea
            name="description"
            rows="6"
            placeholder="Write content here"
          />
        </div>
        <div className={`${styles.add_price} flex_col`}>
          <p>Product Price</p>
          <input
            onChange={onChangeHandler}
            value={data.price}
            type="Number"
            name="price"
            placeholder="20$"
          />
        </div>
        <button type="submit" className={styles.add_btn}>
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
