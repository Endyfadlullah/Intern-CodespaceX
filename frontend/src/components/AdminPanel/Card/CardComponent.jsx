import React from 'react';
import './CardComponent.css'; // Import the CSS file

const CardComponent = ({ title, number }) => {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      <div className="card-number">{number}</div>
    </div>
  );
};

export default CardComponent;
