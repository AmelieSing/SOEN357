// BtnWithoutIcon.js
import React from 'react';

const BtnWithoutIcon = ({ onClick, text, className, frameClassName }) => (
  <div className={frameClassName}>
    <button className={className} type="button" onClick={onClick}>
      <div className="logout-button-text">{text}</div>
    </button>
  </div>
);

export default BtnWithoutIcon;