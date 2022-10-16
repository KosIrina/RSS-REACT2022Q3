import React from 'react';
import Navigation from '../Navigation';
import './Header.css';

const Header = (): JSX.Element => {
  return (
    <>
      <header className="header container">
        <h1 className="header__logo">Rick and Morty Characters</h1>
        <Navigation />
      </header>
    </>
  );
};

export default Header;
