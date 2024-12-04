import React from 'react';

function ThankYouScreen() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600">Thank You!</h1>
        <p className="mt-4 text-lg text-gray-600">Your answers have been submitted successfully.</p>
        <button
          onClick={() => window.location.href = "/"} // Redirect to home or a specific page
          className="mt-6 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
}

export default ThankYouScreen;
