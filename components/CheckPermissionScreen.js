<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import { useState, useEffect, useCallback } from "react";
>>>>>>> 068dbdb71a52d223b6dc17523f30129a7d8bea11
import styles from "../styles/CheckPermissionScreen.module.css"; // Importing the CSS module

export default function CheckPermissionScreen({ nextScreen }) {
  const [permissions, setPermissions] = useState({
    camera: false,
    microphone: false,
    screen: false,
  });
<<<<<<< HEAD
  const [errorMessage, setErrorMessage] = useState("");
  const [screenStream, setScreenStream] = useState(null);

  // Check permissions for camera, microphone, and screen sharing
  const checkPermissions = async () => {
    try {
=======
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message

  // Memoized checkPermissions function to avoid unnecessary re-creations
  const checkPermissions = useCallback(async () => {
    setErrorMessage(""); // Reset error message on permission check attempt

    try {
      // Try to get user media for both video and audio (camera and microphone)
>>>>>>> 068dbdb71a52d223b6dc17523f30129a7d8bea11
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (mediaStream) {
        setPermissions((prev) => ({
          ...prev,
          camera: true,
          microphone: true,
        }));
      }

<<<<<<< HEAD
=======
      // Try to get screen sharing permissions
>>>>>>> 068dbdb71a52d223b6dc17523f30129a7d8bea11
      const screenStream = await navigator.mediaDevices.getDisplayMedia();
      if (screenStream) {
        setPermissions((prev) => ({
          ...prev,
          screen: true,
        }));
<<<<<<< HEAD
        setScreenStream(screenStream); // Save the screen stream to track it
        screenStream.oninactive = () => {
          // Automatically submit when screen sharing stops
=======
        // Handle the end of screen sharing
        screenStream.oninactive = () => {
>>>>>>> 068dbdb71a52d223b6dc17523f30129a7d8bea11
          nextScreen("completion");
        };
      }
    } catch (error) {
<<<<<<< HEAD
      setErrorMessage(
        "Some permissions are missing. Please enable camera, microphone, and screen sharing."
=======
      // Set error message for specific permission issue
      if (error.name === "NotAllowedError") {
        setErrorMessage("Permissions not granted. Please enable camera, microphone, and screen sharing.");
      } else if (error.name === "NotFoundError") {
        setErrorMessage("Could not find media devices. Please check your device settings.");
      } else {
        setErrorMessage("An unknown error occurred while checking permissions.");
      }
    }
  }, [nextScreen]);

  const handleStartInterview = () => {
    if (permissions.camera && permissions.microphone && permissions.screen) {
      nextScreen("question");
    } else {
      setErrorMessage(
        "Please ensure all permissions (camera, microphone, and screen sharing) are enabled before starting the interview."
>>>>>>> 068dbdb71a52d223b6dc17523f30129a7d8bea11
      );
    }
  };

<<<<<<< HEAD
  const handleStartInterview = () => {
    if (permissions.camera && permissions.microphone && permissions.screen) {
      nextScreen("question");
    } else {
      setErrorMessage(
        "Please ensure all permissions (camera, microphone, and screen sharing) are enabled before starting the interview."
      );
    }
  };

=======
>>>>>>> 068dbdb71a52d223b6dc17523f30129a7d8bea11
  // Automatically check permissions on component mount
  useEffect(() => {
    checkPermissions();
  }, [checkPermissions]);

  // Helper function to check if all permissions are granted
  const allPermissionsGranted =
    permissions.camera && permissions.microphone && permissions.screen;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Ready to Join?</h1>
        <p className={styles.subheading}>Please make sure your device is properly configured.</p>
        <div className={styles.permissionList}>
          <div
            className={`${styles.permissionItem} ${
              permissions.camera ? styles.granted : styles.denied
            }`}
          >
            <span>Check Camera</span>
            <input
              type="checkbox"
              checked={permissions.camera}
              readOnly
              className={styles.checkbox}
            />
          </div>
          <div
            className={`${styles.permissionItem} ${
              permissions.microphone ? styles.granted : styles.denied
            }`}
          >
            <span>Check Microphone</span>
            <input
              type="checkbox"
              checked={permissions.microphone}
              readOnly
              className={styles.checkbox}
            />
          </div>
          <div
            className={`${styles.permissionItem} ${
              permissions.screen ? styles.granted : styles.denied
            }`}
          >
            <span>Enable Screen Share</span>
            <input
              type="checkbox"
              checked={permissions.screen}
              readOnly
              className={styles.checkbox}
            />
          </div>
        </div>
<<<<<<< HEAD
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
=======

        {/* Display error message if there is one */}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

>>>>>>> 068dbdb71a52d223b6dc17523f30129a7d8bea11
        <button
          className={`${styles.button} ${allPermissionsGranted ? styles.startButton : styles.checkButton}`}
          onClick={handleStartInterview}
        >
          {allPermissionsGranted ? "Start Interview" : "Check Permissions"}
        </button>
<<<<<<< HEAD
=======

        {/* Show retry button if not all permissions are granted */}
>>>>>>> 068dbdb71a52d223b6dc17523f30129a7d8bea11
        {!allPermissionsGranted && (
          <button
            className={styles.retryButton}
            onClick={checkPermissions}
          >
            Retry Permissions
          </button>
        )}
      </div>
    </div>
  );
}
