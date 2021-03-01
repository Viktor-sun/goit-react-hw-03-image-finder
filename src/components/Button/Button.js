import React from 'react';
import './Button.css';

const Button = ({ handleOnClick }) => (
  <button className="Button" onClick={handleOnClick} type="button">
    Load more
  </button>
);

export default Button;
