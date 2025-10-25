import React from "react";
import styles from "./Banners.module.scss";

const Banners: React.FC = () => {
  return (
    <div className={styles.bannersContainer}>
      <div className={styles.banner}>
        <div className={styles.bannerIcon}>🎓</div>
        <div className={styles.bannerContent}>
          <h3>Students</h3>
          <p>Find your dream program and apply with confidence</p>
        </div>
      </div>

      <div className={styles.banner}>
        <div className={styles.bannerIcon}>🏛️</div>
        <div className={styles.bannerContent}>
          <h3>Universities</h3>
          <p>Reach qualified international students worldwide</p>
        </div>
      </div>

      <div className={styles.banner}>
        <div className={styles.bannerIcon}>🌍</div>
        <div className={styles.bannerContent}>
          <h3>Agencies</h3>
          <p>Partner with us to grow your student recruitment</p>
        </div>
      </div>
    </div>
  );
};

export default Banners;
