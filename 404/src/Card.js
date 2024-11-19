import React from 'react';
import './card.css';

const Card = ({ title, description, content, footer }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
      <div className="card-content">
        {content}
      </div>
      <div className="card-footer">
        {footer}
      </div>
    </div>
  );
};

export default Card;
