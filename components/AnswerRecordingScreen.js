import { useState, useEffect, useRef } from "react";
import styles from '../styles/AnswerRecordingScreen.module.css'; // Adjusted import

export default function AnswerRecordingScreen({
  nextScreen,
  question,
  questionIndex,
  totalQuestions,
  onAnswerComplete,
  timerDuration = 60, // Timer duration in seconds
}) {
  const [isRecording, setIsRecording] = useState(true); // Automatically start recording
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [timer, setTimer] = useState(timerDuration);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [previewURL, setPreviewURL] = useState(null); // For video preview
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const streamRef = useRef(null);

  const resetTimer = () => {
    setTimer(timerDuration); // Reset timer to dynamic duration
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime === 1) {
          handleSubmit(); // Auto-submit when timer ends
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (e) => setChunks((prev) => [...prev, e.data]);
        recorder.start();
        setMediaRecorder(recorder);
        resetTimer(); // Start the timer
      } catch (error) {
        console.error("Error accessing media devices:", error);
        alert(
          "Failed to access camera or microphone. Please check permissions and try again."
        );
      }
    };

    if (isRecording) {
      startRecording();
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const generatePreview = () => {
    if (chunks.length > 0) {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setPreviewURL(url);
    }
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    if (onAnswerComplete) onAnswerComplete();

    if (mediaRecorder) {
      mediaRecorder.stop();
      generatePreview(); // Generate preview after recording stops
      setIsSubmitted(true);
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (questionIndex < totalQuestions - 1) {
      nextScreen();
      setIsSubmitted(false);
      setChunks([]);
    } else {
      nextScreen("thankYou");
    }
  };

  return (
    <div className={styles.container}>
      {/* Add margin-top to move the heading down */}


      {/* Removed the "Question X of Y" display */}
      <p className="text-center italic mb-6">{question}</p>
      <p className="text-center font-semibold text-xl mb-4">
        Time Remaining: <span className="text-yellow-300">{timer}s</span>
      </p>
      <video
        ref={videoRef}
        autoPlay
        muted
        className={styles.video}
      />
      <button
        className={styles.button}
        onClick={handleSubmit}
        disabled={isSubmitted}
      >
        {isSubmitted ? "Answer Submitted" : "Submit and next"}
      </button>
      {previewURL && (
        <div className="mt-6">
          <h2 className="text-center text-xl font-bold mb-2">Preview</h2>
          <video
            src={previewURL}
            controls
            className={styles.video}
          />
        </div>
      )}
    </div>
  );
}
