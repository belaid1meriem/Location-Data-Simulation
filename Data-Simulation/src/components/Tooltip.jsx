// Tooltip.js
import React from 'react';
import '../App.css'; // Import the CSS file for styling

const Tooltip = ({ children, text }) => {
  return (
    <div className="tooltip">
      {children}
      <span className="tooltiptext">{text}</span>
    </div>
  );
};

export default Tooltip;
