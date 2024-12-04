const levelsConfig = [
    {
      id: 1,
      instruction: "Welcome to the first level. Answer the questions accurately!",
      loaderText: "Preparing Level 1...",
      completionTask: "Review your answers and submit them.",
      questions: [
        { text: "What is your name?", audioUrl: "/audio/question1.mp3" },
        { text: "Describe your favorite project.", audioUrl: "/audio/question2.mp3" },
      ],
    },
  ];
  
  export default levelsConfig;
  