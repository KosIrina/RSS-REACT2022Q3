import React from 'react';
import './Ghost.css';

const Ghost = (): JSX.Element => {
  return (
    <>
      <div className="ghost-legs">
        <div className="one" />
        <div className="two" />
        <div className="three" />
        <div className="four" />
      </div>
      <div className="ghost">
        <div className="face">
          <div className="eye-left" />
          <div className="eye-right" />
          <div className="mouth" />
        </div>
      </div>
      <div className="ghost-shadow" />
    </>
  );
};

export default Ghost;
