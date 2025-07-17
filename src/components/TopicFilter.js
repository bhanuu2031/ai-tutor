// src/components/TopicFilter.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function TopicFilter({ onSelectTopic }) {
  const [topics, setTopics] = useState([]);


  
  useEffect(() => {
    
    axios.get("http://localhost:5000/topics")
      .then(res => {
        console.log("TOPICS RECEIVED:", res.data);  // ✅ Check console
        setTopics(res.data);
      })
      .catch(err => {
        console.error("Error fetching topics:", err);
      });
  }, []);

  return (
    <div>
      <label>
        <strong>Select a Topic: </strong>
        <select onChange={(e) => onSelectTopic(e.target.value)}>
          <option value="">--Choose Topic--</option>
          {topics.map((topic, idx) => (
            <option key={idx} value={topic}>{topic}</option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default TopicFilter;
