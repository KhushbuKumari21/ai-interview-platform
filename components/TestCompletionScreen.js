import React from "react";
import styles from "../styles/TestCompletionScreen.module.css"; // Importing the CSS module

export default function TestCompletionScreen({ stopCamera }) {
  const handleOkClick = () => {
    if (stopCamera) {
      stopCamera(); // Stop the camera when the "OK" button is clicked
      alert("Thank you! Your exam is complete."); // Notify the user
    } else {
      console.error("stopCamera function is not defined.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Test Completed</h1>
      <p className={styles.message}>Thank you for completing the interview!</p>
      <button onClick={handleOkClick} className={styles.button}>
        OK
      </button>
    </div>
  );
}
