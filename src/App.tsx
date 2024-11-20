import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage";
import QuizEnd from "./components/QuizEnd";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/end" element={<QuizEnd />} />
      </Routes>
    </Router>
  );
}

export default App;
