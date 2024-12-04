import React from "react";

const InstructionScreen = ({ nextScreen }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Instructions</h1>
      <p className="text-center mb-4">
        Follow the instructions to proceed with the interview.
      </p>
      <button
        className="w-full py-2 bg-blue-500 text-white rounded-lg"
        onClick={() => nextScreen("permission")}
      >
        Proceed
      </button>
    </div>
  );
};

export default InstructionScreen;
