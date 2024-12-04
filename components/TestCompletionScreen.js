import React from 'react';

export default function TestCompletionScreen({ stopCamera }) {
  const handleOkClick = () => {
    stopCamera(); // Stop the camera when the "OK" button is clicked
    // Add any other logic to complete the test
    alert("Thank you! Your exam is complete.");
  };

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Test Completed</h1>
      <p className="text-lg text-center mb-4">Thank you for completing the interview!</p>
      <button
        onClick={handleOkClick}
        className="w-full py-2 bg-blue-500 text-white rounded-lg"
      >
        OK
      </button>
    </div>
  );
}
