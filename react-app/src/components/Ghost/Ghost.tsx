import React from 'react';
import './Ghost.css';

const Ghost = (): JSX.Element => {
  return (
    <>
      <div className="ghost-legs" data-testid="ghost-legs">
        <div className="ghost-legs__one" data-testid="ghost-leg" />
        <div className="ghost-legs__two" data-testid="ghost-leg" />
        <div className="ghost-legs__three" data-testid="ghost-leg" />
        <div className="ghost-legs__four" data-testid="ghost-leg" />
      </div>
      <div className="ghost-body" data-testid="ghost-body">
        <div className="ghost-face">
          <div className="ghost-face__eye-left" data-testid="ghost-left-eye" />
          <div className="ghost-face__eye-right" data-testid="ghost-right-eye" />
          <div className="ghost-face__mouth" />
        </div>
      </div>
      <div className="ghost-shadow" data-testid="ghost-shadow" />
    </>
  );
};

export default Ghost;
