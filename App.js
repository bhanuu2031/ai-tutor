import React, { useState } from "react";
import TopicFilter from "./components/TopicFilter";
import QuestionList from "./components/QuestionList";
import Quiz from "./components/Quiz";
import "./App.css";

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizData, setQuizData] = useState([]);

  return (
    <div className="container">
      <header>
        <h1>🧠 JEE AI Tutor</h1>
        <p>Practice Past Year Questions & Personalized Quizzes</p>
      </header>

      <TopicFilter onSelectTopic={setSelectedTopic} />

      {selectedTopic && !showQuiz && (
        <>
          <button className="quiz-btn" onClick={() => setShowQuiz(true)}>
            🎯 Start Quiz on "{selectedTopic}"
          </button>
          <QuestionList topic={selectedTopic} />
        </>
      )}

      {showQuiz && (
        <Quiz
          topic={selectedTopic}
          setShowQuiz={setShowQuiz}
          data={quizData}
          setQuizData={setQuizData}
        />
      )}
    </div>
  );
}

export default App;
