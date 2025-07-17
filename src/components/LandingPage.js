import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <section
      style={{
        height: "100vh",
        backgroundColor: "#000",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
        PERSONALIZED AI MENTORSHIP
      </h1>
      <h2 style={{ fontSize: "2rem", marginTop: "1rem" }}>
        FOR EXAM SUCCESS
      </h2>
      <p style={{ color: "#aaa", marginTop: "1rem", maxWidth: "500px" }}>
        ExaMind is your all-in-one AI mentor — get personalized study plans,
        adaptive mock tests, and smart insights to ace UPSC, JEE, NEET & more.
      </p>
      <Link
        to="/quiz"
        style={{
          marginTop: "2rem",
          padding: "10px 20px",
          background: "white",
          color: "black",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        🚀 Start Quiz
      </Link>
    </section>
  );
}

export default LandingPage;
