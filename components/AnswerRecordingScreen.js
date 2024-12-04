import { useState, useEffect, useRef } from "react";

export default function AnswerRecordingScreen({
  nextScreen,
  question,
  questionIndex,
  totalQuestions,
  onAnswerComplete,
  timerDuration = 60, // New prop for dynamic timer duration
}) {
  const [isRecording, setIsRecording] = useState(false);
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
          handleSubmit();
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
        resetTimer();
      } catch (error) {
        console.error("Error accessing media devices:", error);
        alert(
          "Failed to access camera or microphone. Please check permissions and try again."
        );
      }
    };

    if (isRecording) {
      startRecording();
    } else if (mediaRecorder) {
      mediaRecorder.stop();
      clearInterval(timerRef.current);
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
      setIsRecording(false);
      setIsSubmitted(false);
      setChunks([]);
    } else {
      nextScreen("thankYou");
    }
  };

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Recording Answer</h1>
      <p className="text-center mb-4">{`${questionIndex + 1} of ${totalQuestions}`}</p>
      <p className="text-center mb-4">{question}</p>
      <p className="text-center mb-4">Time Remaining: {timer}s</p>
      <video ref={videoRef} autoPlay muted className="w-full h-60 mb-4" />
      <button
        className="w-full py-2 bg-blue-500 text-white rounded-lg mt-4"
        onClick={() => setIsRecording(!isRecording)}
        disabled={isRecording || isSubmitted}
      >
        {isRecording ? "Recording... Please Wait" : "Start Recording"}
      </button>
      <button
        className="w-full py-2 bg-blue-500 text-white rounded-lg mt-4"
        onClick={handleSubmit}
        disabled={isSubmitted}
      >
        Submit Answer Manually
      </button>
      {previewURL && (
        <div className="mt-4">
          <h2 className="text-center font-bold mb-2">Preview</h2>
          <video
            src={previewURL}
            controls
            className="w-full h-60 border rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
