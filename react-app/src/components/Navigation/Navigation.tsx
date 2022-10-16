import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = (): JSX.Element => {
  return (
    <>
      <nav className="header__navigation navigation">
        <NavLink className="navigation__link" to="/" end>
          Main
        </NavLink>
        <NavLink className="navigation__link" to="/about">
          About Us
        </NavLink>
        <NavLink className="navigation__link" to="/form">
          Form
        </NavLink>
      </nav>
    </>
  );
};

export default Navigation;
