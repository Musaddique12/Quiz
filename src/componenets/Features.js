import React from 'react';
import './all.css';


function Features() {
  return (
    <div className="features">
      <h2>Features</h2>
      <div className="features-grid">
        <div className="feature-item">
          <i className="icon fa fa-lightbulb"></i>
          <h3>Creative Questions</h3>
          <p>Engaging and thought-provoking questions to test your knowledge.</p>
        </div>
        <div className="feature-item">
          <i className="icon fa fa-chart-line"></i>
          <h3>Track Progress</h3>
          <p>Monitor your progress and see how you improve over time.</p>
        </div>
        <div className="feature-item">
          <i className="icon fa fa-users"></i>
          <h3>Compete with Friends</h3>
          <p>Challenge your friends and see who scores the highest!</p>
        </div>
      </div>
    </div>
  );
}

export default Features;
