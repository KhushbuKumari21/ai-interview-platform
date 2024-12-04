import React, { useState, useEffect } from 'react';
import { useScreenContext } from '../context/ScreenContext';
import InstructionScreen from '../components/InstructionScreen';
import CheckPermissionScreen from '../components/CheckPermissionScreen';
import QuestionScreen from '../components/QuestionScreen';
import AnswerRecordingScreen from '../components/AnswerRecordingScreen';
import LoaderScreen from '../components/LoaderScreen';
import TestCompletionScreen from '../components/TestCompletionScreen';
import ThankYouScreen from '../components/ThankYouScreen';
import ScreenRecordingApp from '../components/ScreenRecordingApp';
import EntryScreen from '../components/EntryScreen';
import '../styles/base.css';  // Assuming base.css is in the 'styles' folder one level up from the current component


const Home = () => {
  const { currentScreen, setCurrentScreen } = useScreenContext();
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const totalQuestions = 5;
  const [stream, setStream] = useState(null);

  const handleAnswerCompletion = () => {
    if (answeredQuestions < totalQuestions) {
      setAnsweredQuestions((prev) => prev + 1);
    }
  };

  const stopCamera = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    if (answeredQuestions === totalQuestions) {
      stopCamera();
      setCurrentScreen('completion');
    }
  }, [answeredQuestions, setCurrentScreen, stream]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'entry':
        return <EntryScreen onNext={() => setCurrentScreen('instruction')} />;
      case 'instruction':
        return <InstructionScreen nextScreen={setCurrentScreen} />;
      case 'permission':
        return <CheckPermissionScreen nextScreen={setCurrentScreen} />;
      case 'question':
        return <QuestionScreen nextScreen={setCurrentScreen} />;
      case 'recording':
        return (
          <AnswerRecordingScreen
            nextScreen={setCurrentScreen}
            onAnswerComplete={handleAnswerCompletion}
            disabled={answeredQuestions >= totalQuestions}
            setStream={setStream}
          />
        );
      case 'loader':
        return <LoaderScreen />;
      case 'completion':
        return <TestCompletionScreen />;
      case 'thankYou':
        return <ThankYouScreen />;
      case 'record':
        return <ScreenRecordingApp nextScreen={setCurrentScreen} />;
      case 'end':
        return (
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <h1 className="text-xl font-bold text-center">Interview Ended. Thank you!</h1>
          </div>
        );
      default:
        return (
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <h1 className="text-xl font-bold text-center text-red-500">Thanku your answer has  submitted successfully</h1>
          </div>
        );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {renderScreen()}
    </div>
  );
};

export default Home;
