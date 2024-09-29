import styles from "./login.module.css";

import { useState } from "react";

const LoginSignup = () => {
  const [is_login, setIsLogin] = useState(true);

  const handleSignupClick = () => {
    setIsLogin(false);
  };

  const handleLoginClick = () => {
    setIsLogin(true);
  };

  const handleSignupLinkClick = (e) => {
    e.preventDefault();
    handleSignupClick();
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const confirmPassword = e.target[2].value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Signup form submitted with", { email, password });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted");
  };

  return (
    <div className={styles.body}>
      <div className={styles.login_wrapper}>
        <div
          className={styles.login_title_text}
          style={{ marginLeft: is_login ? "0%" : "-100%" }}
        >
          <div className={styles.login_title}>Log in Form</div>
          <div className={styles.login_title}>Sign up Form</div>
        </div>
        <div className={styles.login_form_container}>
          <div className={styles.slide_controls}>
            <input
              type="radio"
              name="slide"
              id="login"
              checked={is_login}
              onChange={handleLoginClick}
            />
            <input
              type="radio"
              name="slide"
              id="signup"
              checked={!is_login}
              onChange={handleSignupClick}
            />
            <label
              htmlFor="login"
              className={`${styles.slide} ${styles.login_button}`}
              onClick={handleLoginClick}
            >
              Log in
            </label>
            <label
              htmlFor="signup"
              className={`${styles.slide} ${styles.signup_button}`}
              onClick={handleSignupClick}
            >
              Sign up
            </label>
            <div
              className={styles.slider_tab}
              style={{ left: is_login ? "0%" : "50%" }}
            ></div>
          </div>
          <div
            className={styles.form_inner}
            style={{ marginLeft: is_login ? "0%" : "-100%" }}
          >
            <form className={styles.login_form} onSubmit={handleLoginSubmit}>
              <div className={styles.field}>
                <input type="email" placeholder="Email Address" required />
              </div>
              <div className={styles.field}>
                <input type="password" placeholder="Password" required />
              </div>
              <div className={styles.pass_link}>
                <p>Forgot password?</p>
              </div>
              <div className={styles.btn}>
                <div className={styles.btn_layer}></div>
                <input type="submit" value="Log in" />
              </div>
              <div className={styles.signup_link}>
                Not a member?{" "}
                <a href="#" onClick={handleSignupLinkClick}>
                  Sign up now
                </a>
              </div>
            </form>
            <form className={styles.signup_form} onSubmit={handleSignupSubmit}>
              <div className={styles.field}>
                <input type="email" placeholder="Email Address" required />
              </div>
              <div className={styles.field}>
                <input type="password" placeholder="Password" required />
              </div>
              <div className={styles.field}>
                <input
                  type="password"
                  placeholder="Confirm password"
                  required
                />
              </div>
              <div className={styles.btn}>
                <div className={styles.btn_layer}></div>
                <input type="submit" value="Sign up" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
