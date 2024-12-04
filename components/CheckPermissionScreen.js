import { useState, useEffect, useCallback } from "react";
import styles from "../styles/CheckPermissionScreen.module.css"; // Importing the CSS module

export default function CheckPermissionScreen({ nextScreen }) {
  const [permissions, setPermissions] = useState({
    camera: false,
    microphone: false,
    screen: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Memoized checkPermissions function to avoid unnecessary re-creations
  const checkPermissions = useCallback(async () => {
    try {
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

      const screenStream = await navigator.mediaDevices.getDisplayMedia();
      if (screenStream) {
        setPermissions((prev) => ({
          ...prev,
          screen: true,
        }));
        screenStream.oninactive = () => {
          // Automatically submit when screen sharing stops
          nextScreen("completion");
        };
      }
    } catch (error) {
      setErrorMessage(
        "Some permissions are missing. Please enable camera, microphone, and screen sharing."
      );
    }
  }, [nextScreen]);

  const handleStartInterview = () => {
    if (permissions.camera && permissions.microphone && permissions.screen) {
      nextScreen("question");
    } else {
      setErrorMessage(
        "Please ensure all permissions (camera, microphone, and screen sharing) are enabled before starting the interview."
      );
    }
  };

  // Automatically check permissions on component mount
  useEffect(() => {
    checkPermissions();
  }, [checkPermissions]);  // Add checkPermissions to the dependency array

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
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <button
          className={`${styles.button} ${allPermissionsGranted ? styles.startButton : styles.checkButton}`}
          onClick={handleStartInterview}
        >
          {allPermissionsGranted ? "Start Interview" : "Check Permissions"}
        </button>
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
