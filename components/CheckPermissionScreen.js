import { useEffect, useState } from "react";

export default function CheckPermissionScreen({ nextScreen }) {
  const [hasPermissions, setHasPermissions] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const checkPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      await navigator.mediaDevices.getDisplayMedia();
      setHasPermissions(true);
    } catch (error) {
      setHasPermissions(false);
      setErrorMessage(
        error.message || "Permission denied. Please enable camera and microphone."
      );
    }
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  if (hasPermissions === null) {
    return <div>Checking permissions...</div>;
  }

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      {hasPermissions ? (
        <div>
          <h1 className="text-2xl font-bold text-center mb-4">Permissions Granted</h1>
          <button
            className="w-full py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => nextScreen("question")}
          >
            Start Interview
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-center mb-4">Permissions Denied</h1>
          <p className="text-center text-red-500">{errorMessage}</p>
          <button
            className="w-full py-2 bg-gray-500 text-white rounded-lg"
            onClick={checkPermissions}
          >
            Retry Permissions
          </button>
        </div>
      )}
    </div>
  );
}
