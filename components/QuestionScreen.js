import { useState, useEffect, useMemo } from "react";
import AnswerRecordingScreen from "./AnswerRecordingScreen";
import styles from '../styles/QuestionScreen.module.css'; // Import the CSS module

export default function QuestionScreen({ nextScreen }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  // Memoize the questions array to prevent unnecessary re-renders
  const questions = useMemo(() => [
    "Tell me about yourself.",
    "Why do you want to work at this company?",
    "What are your strengths and weaknesses?",
    "Where do you see yourself in 5 years?",
    "Can you describe a challenging situation you have faced and how you overcame it?",
  ], []); // Empty dependency array ensures this is only created once

  // Function to play the audio for the question
  const playAudio = (questionText) => {
    const audio = new SpeechSynthesisUtterance(questionText);
    window.speechSynthesis.speak(audio);
  };

  // Automatically play audio when a new question appears
  useEffect(() => {
    playAudio(questions[currentQuestionIndex]);
  }, [currentQuestionIndex]); // Only depend on currentQuestionIndex

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsRecording(false); // Reset recording state for the next question
    } else {
      alert("Interview complete. Thank you!");
      nextScreen();
    }
  };

  const questionProgress = `${currentQuestionIndex + 1} of ${questions.length}`;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Question</h1>
      <p className={styles.progress}>{questionProgress}</p>

      {isRecording ? (
        // Show the AnswerRecordingScreen if recording is active
        <AnswerRecordingScreen
          nextScreen={nextQuestion}
          question={questions[currentQuestionIndex]}
          questionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
        />
      ) : (
        // Show the question and Start Recording button
        <>
          <p className={styles.question}>{questions[currentQuestionIndex]}</p>
          <button
            className={styles.button}
            onClick={() => setIsRecording(true)}
          >
            Start Recording Answer
          </button>
        </>
      )}
    </div>
  );
}
