import React from 'react';
import './PageNotFound.css';
import Ghost from '../../components/Ghost';

const PageNotFound = (): JSX.Element => {
  return (
    <>
      <h2 className="not-found-page__greeting">404 PAGE NOT FOUND</h2>
      <div className="not-found-page__ghost">{<Ghost />}</div>
      <p className="not-found-page__info">
        Oops! The page you are looking for does not exist.
        <br />
        Please, check the URL.
        <br />
        The page also might have been removed, renamed, deleted or is temporarily unavailable.
      </p>
    </>
  );
};

export default PageNotFound;
