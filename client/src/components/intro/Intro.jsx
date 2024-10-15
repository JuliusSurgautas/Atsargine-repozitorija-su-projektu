import styles from "./intro.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Intro = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className={styles.intro}>
      <div className="container">
        <div className={styles.intro_content}>
          <div className={styles.intro_info} data-aos="fade-up">
            <p className={styles.intro_subtitle}>Mes paruošėme jūsų rytą</p>
            <h1 className={styles.intro_title}>Cup O' Coffee</h1>
            <p className={styles.intro_text}>
              Geriausia dieną pradėti nuo kavos puodelio. Atraskite geriausio
              skonio kavą, kurią kada nors turėsite. Savo klientams teikiame
              tai, kas geriausia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
