import React from 'react';
import styles from '../styles/TestCompletionScreen.module.css'; // Importing the CSS module

export default function TestCompletionScreen({ stopCamera }) {
  const handleOkClick = () => {
    stopCamera(); // Stop the camera when the "OK" button is clicked
    // Add any other logic to complete the test
    alert("Thank you! Your exam is complete.");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Test Completed</h1>
      <p className={styles.message}>Thank you for completing the interview!</p>
      <button
        onClick={handleOkClick}
        className={styles.button}
      >
        OK
      </button>
    </div>
  );
}
