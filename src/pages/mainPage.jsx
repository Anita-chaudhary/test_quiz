import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SelectCategory from "../components/SelectCategory";
import Quiz from "../components/Quiz";
import ScoreSummary from "../components/ScoreSummary";
import { QuizData } from "../utils/quizData";

const App = () => {
  const [page, setPage] = useState("selectCategory");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [score, setScore] = useState(0);
  const [fullName, setFullName] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const startQuiz = () => {
    setPage("quiz");
  };

  const handleFinishQuiz = (finalScore) => {
    setScore(finalScore);
    setPage("summary");
  };

  const handleRetry = () => {
    setPage("selectCategory");
    setSelectedCategory(null);
    setScore(0);
  };

  return (
    <div className="app">
      <Navbar pageTitle={""} />
      {page === "selectCategory" && (
        <div className="flex justify-center items-center flex-col">
          <div className="text-[xxx-large] mb-4">
            Welcome to{" "}
            <span className="text-magenta">
              QUIZ<span className="font-bold">Mania</span>
            </span>
          </div>
          <div className="form-container w-[30%]">
            <div className="info-box bg-[#e5e7eb] p-4 rounded-[7px] mb-4 mx-auto">
              Please read all the rules about this quiz before you start.
              <span className="text-magenta">Quiz rules</span>
            </div>
          </div>
          <div className="quiz-details">
            <div className="mb-4">
              <label htmlFor="fullName ">Full name</label>
              <input
                className="border-[1px] border-[solid] border-[#e5e7eb] rounded-[7px] p-4 w-full mt-3"
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>
          <SelectCategory
            categories={QuizData.categories}
            onSelectCategory={handleCategorySelect}
          />

          <button
            disabled={!selectedCategory?.id || !fullName}
            onClick={startQuiz}
            className="bg-[#B92B5D] p-2 border-[#B92B5D] rounded-[7px]"
          >
            Start Quiz
          </button>
        </div>
      )}
      <div className="flex justify-center items-center flex-col">
        {page === "quiz" && (
          <Quiz
            selectedCategory={selectedCategory}
            onFinishQuiz={handleFinishQuiz}
            setPage={setPage}
          />
        )}
        {page === "summary" && (
          <ScoreSummary
            score={score}
            totalQuestions={10}
            onRetry={handleRetry}
          />
        )}
      </div>
    </div>
  );
};

export default App;
