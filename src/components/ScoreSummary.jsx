import React from "react";

const ScoreSummary = ({ score, totalQuestions, onRetry }) => (
  <div className="score-summary">
    <h2>Quiz Finished</h2>
    <p>
      You scored {score} out of {totalQuestions}.
    </p>
    <p>
      {score / totalQuestions >= 0.8
        ? "Great job!"
        : score / totalQuestions >= 0.5
        ? "Good effort!"
        : "Keep practicing!"}
    </p>
    <button onClick={onRetry}>Try Again</button>
  </div>
);

export default ScoreSummary;
