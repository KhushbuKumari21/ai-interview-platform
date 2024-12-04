// components/EntryScreen.js

import styles from '../styles/EntryScreen.module.css';

const EntryScreen = ({ onNext }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Entry Screen</h1>
      <p className={styles.subtitle}>You are about to start the test.</p>
      <button className={styles.button} onClick={onNext}>
        Proceed to Questions
      </button>
    </div>
  );
};

export default EntryScreen;

