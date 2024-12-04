import { useState, useEffect } from "react";
import AnswerRecordingScreen from "./AnswerRecordingScreen";

export default function QuestionScreen({ nextScreen }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const questions = [
    "Tell me about yourself.",
    "Why do you want to work at this company?",
    "What are your strengths and weaknesses?",
    "Where do you see yourself in 5 years?",
    "Can you describe a challenging situation you have faced and how you overcame it?",
  ];

  const playAudio = (questionText) => {
    const audio = new SpeechSynthesisUtterance(questionText);
    window.speechSynthesis.speak(audio);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("Interview complete. Thank you!");
      nextScreen();
    }
  };

  const questionProgress = `${currentQuestionIndex + 1} of ${questions.length}`;

  useEffect(() => {
    playAudio(questions[currentQuestionIndex]);
  }, [currentQuestionIndex]);

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Question</h1>
      <p className="text-center mb-4">{questionProgress}</p>

      {isRecording ? (
        <AnswerRecordingScreen
          nextScreen={nextQuestion}
          question={questions[currentQuestionIndex]}
          questionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
        />
      ) : (
        <>
          <p className="text-lg text-center mb-4">{questions[currentQuestionIndex]}</p>
          <button
            className="w-full py-2 bg-blue-500 text-white rounded-lg mb-4"
            onClick={() => playAudio(questions[currentQuestionIndex])}
          >
            Play Question Audio
          </button>
          <button
            className="w-full py-2 bg-blue-500 text-white rounded-lg mt-4"
            onClick={() => setIsRecording(true)}
          >
            Start Recording Answer
          </button>
        </>
      )}
    </div>
  );
}
