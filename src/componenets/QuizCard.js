import React from 'react';
import './all.css';


function QuizCard() {
  return (
    <div className="quiz-card">
      <div className="card-content1">
        <img src="https://i.makeagif.com/media/2-03-2021/1b_42N.gif" alt="Quiz GIF" className="quiz-gif" />
        <div className="card-text">
          <p>"Knowledge is power."</p>
          <button className="start-button">Start Quiz</button>
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
