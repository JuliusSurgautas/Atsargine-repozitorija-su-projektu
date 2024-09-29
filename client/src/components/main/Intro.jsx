import introImage from "../../images/coffee_beans.webp";

import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./main.module.css";

import { useEffect } from "react";

const Intro = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className={styles.intro}>
      <div className={styles.intro__content}>
        <div className={styles.intro__info} data-aos="fade-up">
          <h1 className={styles.intro__title}>
            Kavos <br /> parduotuvė
          </h1>
        </div>
        <div className={styles.intro__info} data-aos="fade-down">
          <img src={introImage} alt="Intro Image" />
        </div>
      </div>
    </div>
  );
};

export default Intro;
