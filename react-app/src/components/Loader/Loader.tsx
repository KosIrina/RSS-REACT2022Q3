import React from 'react';
import './Loader.css';

const Loader = (): JSX.Element => {
  return (
    <>
      <div className="loader-wrapper">
        <div className="loader" data-testid="cards-loader" />
      </div>
    </>
  );
};

export default Loader;
