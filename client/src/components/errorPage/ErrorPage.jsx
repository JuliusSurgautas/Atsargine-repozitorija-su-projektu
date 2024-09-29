import styles from "./errorpage.module.css";

import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className={styles.error}>
      <h1 className={styles.error_code}>404 - Page not found</h1>
      <p className={styles.error_message}>
        This page you are looking for might have been removed had its name
        changed or is temporarily unavailable.
      </p>
      <Link to="/" className="button">
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
