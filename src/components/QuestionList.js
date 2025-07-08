import React, { useEffect, useState } from "react";
import axios from "axios";

function QuestionList({ topic }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!topic) return;

    setLoading(true);
    setError("");

    axios
      .get(`http://192.168.29.163:5000/questions?topic=${encodeURIComponent(topic)}`)
      .then((res) => {
        console.log("🟢 Raw Response from /questions:", res.data);

        if (Array.isArray(res.data)) {
          setQuestions(res.data);
        } else {
          console.error("❌ Unexpected response format:", res.data);
          setError("❌ Invalid format: Response is not an array");
        }
      })
      .catch((err) => {
        console.error("❌ Failed to load questions:", err);
        setError("❌ Error fetching questions.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [topic]);

  return (
    <div>
      <h3>📘 Past Year Questions on {topic}</h3>

      {loading ? (
        <p>⏳ Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : questions.length === 0 ? (
        <p>⚠️ No questions available for this topic.</p>
      ) : (
        questions.map((q, idx) => (
          <div className="question-item" key={idx} style={{ marginBottom: "15px" }}>
            <p>
              <strong>Q{idx + 1}:</strong> {q["Question no"] || "❌ Question missing"}
            </p>
            <ul>
              <li><strong>A.</strong> {q.option_a}</li>
              <li><strong>B.</strong> {q.option_b}</li>
              <li><strong>C.</strong> {q.option_c}</li>
              <li><strong>D.</strong> {q.option_d}</li>
            </ul>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default QuestionList;
