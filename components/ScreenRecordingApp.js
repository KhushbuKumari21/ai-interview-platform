import React, { useState, useRef } from "react";
import * as filestack from "filestack-js"; // Correct import

const ScreenRecordingApp = ({ nextScreen }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [chunks, setChunks] = useState([]);
  const [uploading, setUploading] = useState(false); // For loading state
  const [progress, setProgress] = useState(0); // For upload progress
  const [error, setError] = useState(null); // For error messages

  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const combinedStream = new MediaStream([
        ...screenStream.getTracks(),
        ...audioStream.getTracks(),
      ]);
      streamRef.current = combinedStream;

      mediaRecorderRef.current = new MediaRecorder(combinedStream, {
        mimeType: "video/webm",
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setChunks((prevChunks) => [...prevChunks, event.data]);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        streamRef.current?.getTracks().forEach((track) => track.stop());
      };
    } catch (err) {
      console.error("Error starting screen share:", err);
      setError("Failed to start screen sharing. Please check permissions.");
    }
  };

  const startRecording = () => {
    if (!mediaRecorderRef.current) return;

    setChunks([]); // Clear previous chunks
    mediaRecorderRef.current.start();
    setIsRecording(true);
    setError(null); // Clear previous errors
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleApiUpload = async () => {
    const blob = new Blob(chunks, { type: "video/webm" });
    const formData = new FormData();
    formData.append("file", blob, "recording.webm");

    // Initialize Filestack client
    const client = filestack.init("AkW24d4fqQhiPxswc1QkQz"); // Your Filestack API key

    try {
      setUploading(true);
      setProgress(0);
      setError(null);

      // Upload file with progress tracking
      const result = await client.upload(blob, {}, {
        onProgress: (evt) => {
          const percentCompleted = Math.round((evt.totalBytesSent / evt.totalBytes) * 100);
          setProgress(percentCompleted);
        },
      });

      if (result) {
        alert("Upload successful!");
        nextScreen("thankYou"); // Change screen after successful upload
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Upload failed. Please check your network or API key.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = () => {
    nextScreen("thankYou"); // Change screen to 'thankYou'
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Screen Recording with API Upload</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={startScreenShare} disabled={isRecording || uploading}>
        Start Screen Sharing
      </button>
      <button
        onClick={startRecording}
        disabled={isRecording || !streamRef.current || uploading}
      >
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording || uploading}>
        Stop Recording
      </button>
      <button onClick={handleApiUpload} disabled={chunks.length === 0 || uploading}>
        Upload Recording
      </button>
      <button
        onClick={handleSubmit}
        className="w-full py-2 bg-green-500 text-white rounded-lg"
        disabled={uploading}
      >
        End Interview
      </button>

      {uploading && (
        <div>
          <p>Uploading... {progress}%</p>
        </div>
      )}
    </div>
  );
};

export default ScreenRecordingApp;
