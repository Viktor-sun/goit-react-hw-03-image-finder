import React from 'react';
import './TitleOnError.scss';

const TitleOnError = () => (
  <h1 className="Title__error">
    Oops, something went wrong <span className="Title__error--red">!!!</span>
  </h1>
);

export default TitleOnError;
