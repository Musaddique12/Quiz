import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './all.css';

const QuizSetup = () => {
  const categories = [
    { name: "Any Category", id: "" },
    { name: "General Knowledge", id: "9" },
    { name: "Science Mathematics", id: "19" },
    { name: "Science Gadgets & Equipments", id: "30" },
    { name: "Computers", id: "18" },
    { name: "Nature", id: "17" },
    { name: "Mythology", id: "20" },
    { name: "Sports", id: "21" },
    { name: "Geography", id: "22" },
    { name: "History", id: "23" },
    { name: "Politics", id: "24" },
    { name: "Art", id: "25" },
    { name: "Vehicles", id: "28" },
    { name: "Celebrities", id: "26" },
    { name: "Animals", id: "27" },
    { name: "Entertainment Books", id: "10" },
    { name: "Entertainment Film", id: "11" },
    { name: "Music", id: "12" },
    { name: "Musicals Theatres", id: "13" },
    { name: "Television", id: "14" },
    { name: "Video Games", id: "15" },
    { name: "Board Games", id: "16" },
    { name: "Comics", id: "29" },
    { name: "Japanese Anime & Manga", id: "31" },
    { name: "Cartoon & Animations", id: "32" },
  ];

  const difficulties = [
    "Any Difficulty",
    "Easy",
    "Medium",
    "Hard"
  ];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Any Difficulty");
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz', { state: { selectedCategory, selectedDifficulty } });
  };

  return (
    <div className="quiz-setup-container">
      <h2 className="quiz-setup-title">Select Category and Difficulty</h2>

      <div className="categories-section">
        <h3 className="section-title">Categories</h3>
        <div className="categories-container">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`category-card ${selectedCategory === category.id ? 'selected' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <p className="category-name">{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="difficulties-section">
        <h3 className="section-title">Difficulty</h3>
        <div className="difficulties-container">
          {difficulties.map((difficulty) => (
            <div
              key={difficulty}
              className={`difficulty-card ${selectedDifficulty.toLowerCase() === difficulty.toLowerCase() ? 'selected' : ''}`}
              onClick={() => setSelectedDifficulty(difficulty.toLowerCase())}
            >
              <p className="difficulty-name">{difficulty}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="quiz-setup-button" onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default QuizSetup;
