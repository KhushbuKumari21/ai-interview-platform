import React from "react";
import styles from '../styles/InstructionScreen.module.css';

const InstructionScreen = ({ nextScreen }) => {
  return (
    <div className={styles.container}>
      <div className={styles.instructionBox}>
        <h1 className={styles.heading}>Instructions</h1>
        <ul className={styles.instructionsList}>
          <li>1. Ensure stable internet and choose a clean, quiet location.</li>
          <li>2. Permission for access to camera, microphone, and screen sharing is required.</li>
          <li>3. Be in professional attire and avoid distractions.</li>
          <li>4. Provide detailed responses with examples.</li>
          <li>5. Answer the questions based on your projects and experience.</li>
        </ul>
        <button
          className={styles.button}
          onClick={() => nextScreen("permission")}
        >
          Start Now
        </button>
      </div>
    </div>
  );
};

export default InstructionScreen;
