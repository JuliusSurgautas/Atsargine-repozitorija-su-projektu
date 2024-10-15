import styles from "./errorpage.module.css";

import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className={styles.error}>
      <h1 className={styles.error_code}>404 – puslapis nerastas</h1>
      <p className={styles.error_message}>
        Šis puslapis, kurio ieškote, galėjo būti pašalintas su pavadinimu
        pasikeitė arba laikinai nepasiekiamas.
      </p>
      <Link to="/" className="button">
        Grįžti į pagrindinį puslapį
      </Link>
    </div>
  );
};

export default ErrorPage;
