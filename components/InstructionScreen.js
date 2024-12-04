import React from "react";

const InstructionScreen = ({ nextScreen }) => {
  return (
    <div
      style={{
        backgroundColor: "#000E2A",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Instructions</h1>
        <ul style={{ listStyleType: "none", padding: 0, textAlign: "left" }}>
          <li>1. Ensure stable internet and choose a clean, quiet location.</li>
          <li>2. Permission for access to camera, microphone, and screen sharing is required.</li>
          <li>3. Be in professional attire and avoid distractions.</li>
          <li>4. Provide detailed responses with examples.</li>
          <li>5. Answer the questions based on your projects and experience.</li>
        </ul>
      </div>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#FFD700",
          color: "#000",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
        onClick={() => nextScreen("permission")}
      >
        Start Now
      </button>
    </div>
  );
};

export default InstructionScreen;
