import React, { useState, useEffect } from "react";

const Quiz = ({ selectedCategory, onFinishQuiz, setPage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizFinised, setQuizFinised] = useState(false);

  const currentQuestion = selectedCategory.questions[currentIndex];

  useEffect(() => {
    if (quizFinised) return;
    if (timeLeft === 0) {
      handleNextQuestion(); // Automatically move to the next question when timer hits 0
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, currentIndex, quizFinised]);

  const handleNextQuestion = () => {
    let updatedScore = score;

    const selectedValue = currentQuestion.options[selectedOption];

    if (selectedValue === currentQuestion.correctAnswer) {
      console.log("Correct answer selected, incrementing score.");
      updatedScore += 1;
      setScore(updatedScore);
    }

    setSelectedOption(null);

    if (currentIndex < selectedCategory.questions.length - 1) {
      console.log("Moving to the next question.");
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(10);
      updatedScore += 1;
      setScore(updatedScore);
    } else {
      // No more questions, finish the quiz
      console.log("Quiz finished, final score calculated.");
      onFinishQuiz(updatedScore); // Use the local updatedScore for accuracy
      setQuizFinised(true);
    }
  };

  const handleSkipQuestion = () => {
    setSelectedOption(null);
    if (currentIndex < selectedCategory.questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setTimeLeft(10);
    } else {
      onFinishQuiz(score);
      setQuizFinised(true);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60); // Get minutes
    const seconds = timeInSeconds % 60; // Get remaining seconds
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  return (
    <div className="quiz">
      <div className="text-[xxx-large] mb-4">
        <span className="text-magenta">
          QUIZ<span className="font-bold">Mania</span>
        </span>
        <p>Time left: {formatTime(timeLeft)}</p>
      </div>
      <button
        onClick={() => setPage("selectCategory")}
        className="bg-[#F4F4F4] p-2 border-[#B92B5D] rounded-[7px]"
      >
        Exit Quiz
      </button>
      <h2>{currentQuestion.question}</h2>
      <ul>
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name="option"
                checked={selectedOption === index}
                onChange={() => setSelectedOption(index)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      <button
        className="bg-[#B92B5D] py-2 px-8 mt-4 border-[#B92B5D] rounded-[7px]"
        onClick={handleNextQuestion}
        disabled={selectedOption === null}
      >
        Next
      </button>
      <button
        className="bg-[#f4f4f4] py-2 px-16 mt-4 border-[#B92B5D] ml-4 rounded-[7px]"
        onClick={handleSkipQuestion}
      >
        Skip
      </button>
    </div>
  );
};

export default Quiz;
