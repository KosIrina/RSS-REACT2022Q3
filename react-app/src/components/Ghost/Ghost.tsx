import React from 'react';
import './Ghost.css';

const Ghost = (): JSX.Element => {
  return (
    <>
      <div className="ghost-legs" data-testid="ghost-legs">
        <div className="one" data-testid="ghost-leg" />
        <div className="two" data-testid="ghost-leg" />
        <div className="three" data-testid="ghost-leg" />
        <div className="four" data-testid="ghost-leg" />
      </div>
      <div className="ghost" data-testid="ghost-body">
        <div className="face">
          <div className="eye-left" data-testid="ghost-left-eye" />
          <div className="eye-right" data-testid="ghost-right-eye" />
          <div className="mouth" />
        </div>
      </div>
      <div className="ghost-shadow" data-testid="ghost-shadow" />
    </>
  );
};

export default Ghost;
