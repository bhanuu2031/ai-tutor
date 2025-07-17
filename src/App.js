import React, { useState } from "react";
import TopicFilter from "./components/TopicFilter";
import QuestionList from "./components/QuestionList";
import Quiz from "./components/Quiz";
import "./App.css";

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizData, setQuizData] = useState([]);

  const handleStartQuiz = () => {
    if (!selectedTopic) {
      alert("⚠️ Please select a topic before starting the quiz.");
      return;
    }
    setShowQuiz(true);
  };

  return (
    <div className="container">
      <header>
        <h1>🧠 ExaMind</h1>
        <p>Practice Past Year Questions & Personalized Quizzes</p>
      </header>

      <TopicFilter onSelectTopic={setSelectedTopic} />

      {!showQuiz && (
        <>
          <button
            className="quiz-btn"
            onClick={handleStartQuiz}
            disabled={!selectedTopic}
            style={{
              opacity: selectedTopic ? 1 : 0.5,
              cursor: selectedTopic ? "pointer" : "not-allowed",
            }}
          >
            🎯 Start Quiz {selectedTopic ? `on "${selectedTopic}"` : ""}
          </button>

          {selectedTopic && <QuestionList topic={selectedTopic} />}
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
