import React from "react";
import styles from "../styles/EntryScreen.module.css";

const EntryScreen = ({ onNext }) => {
  return (
    <div className={styles.container}>
      <div className={styles.entryCard}>
        <h1 className={styles.entryTitle}>Welcome!</h1>
        <p className={styles.entrySubtitle}>
          Get ready to begin your journey. We wish you the best!
        </p>
        <button className={styles.entryButton} onClick={onNext}>
          Start Now
        </button>
      </div>
    </div>
  );
};

export default EntryScreen;
