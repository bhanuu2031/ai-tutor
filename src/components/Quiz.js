import React, { useEffect, useState } from "react";
import axios from "axios";

function Quiz({ topic, setShowQuiz, data, setQuizData }) {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (!topic) return;

    axios
      .get(`http://127.0.0.1:5000/quiz?topic=${topic}&count=1`)// ✅ Unified call
      .then((res) => {
        console.log("✅ Quiz data loaded:", res.data);
        setQuizData(res.data);
        setScore(null);
        setAnswers({});
      })
      .catch((err) => {
        console.error("Quiz API Error:", err);
        alert("❌ Quiz fetch failed: " + (err.response?.data?.error || err.message));
        setQuizData([]);
      });
  }, [topic, setQuizData]);

  const handleSubmit = () => {
    let correct = 0;

    data.forEach((q, idx) => {
      const selected = answers[idx]?.trim().toUpperCase();
      const correctAns = q["Correct Answer"]?.trim().toUpperCase();

      if (selected === correctAns) {
        correct += 1;
      }
    });

    setScore(correct);
  };

  return (
    <div>
      <h3>📝 Quiz on {topic}</h3>

      {data.length === 0 && <p>⚠️ No questions available.</p>}

      {data.map((q, idx) => (
        <div key={idx} className="question">
          <p>
            <strong>Q{idx + 1}:</strong> {q["Question no"]}
          </p>

          {["A", "B", "C", "D"].map((opt) => {
            const key = `option_${opt.toLowerCase()}`;
            return (
              <label key={opt} style={{ display: "block", margin: "6px 0" }}>
                <input
                  type="radio"
                  name={`q${idx}`}
                  value={opt}
                  checked={answers[idx] === opt}
                  onChange={() => setAnswers({ ...answers, [idx]: opt })}
                />{" "}
                <strong>{opt}:</strong> {q[key] || "❌ missing"}
              </label>
            );
          })}
        </div>
      ))}

      {score === null ? (
        <button className="quiz-btn" onClick={handleSubmit}>
          ✅ Submit Quiz
        </button>
      ) : (
        <h3>
          🎉 You scored {score} out of {data.length}
        </h3>
      )}

      <button
        style={{ marginTop: "20px" }}
        onClick={() => setShowQuiz(false)}
        className="quiz-btn"
      >
        🔙 Back to Questions
      </button>
    </div>
  );
}

export default Quiz;
